<script>
/**
 * @overview 课程中心 - 首页
 *
 * @author lindongfang
 */
import AMap from 'AMap';
import {
  XAddress,
  ChinaAddressV4Data,
  Group,
  Value2nameFilter as value2name,
  Name2valueFilter as name2value,
  } from 'vux';
import {
  pageUtils,
} from '@/mixins';
import ThumbItem from './components/ThumbItem';

export default {
  name: 'CurriculumIndex',
  components: {
    ThumbItem,
    XAddress,
    Group,
  },
  mixins: [
    pageUtils,
  ],
  data() {
    return {
      banner: {
        id: 1,
        //eslint-disable-next-line
        src: require('./../../assets/curr_user.png'),
      },
      location: '福建省 厦门市 思明区',
      addressData: ChinaAddressV4Data,
      showAddress: false,
      addressValue: [],

      thumbs: [],
    };
  },
  created() {
    // 清除位置信息
    // localStorage.removeItem('_getLocation');
  },
  mounted() {
    // 微信config
    const url = /(Android)/i.test(navigator.userAgent) ?
    location.href : localStorage.getItem('linkUrl');

    this.$http.post('/bind/jssdk', { url }).then((res) => {
      this.$wechat.config(res);
    }).then(() => {
      // 判断是否第一次用微信进入;
      if (localStorage.getItem('_getLocation') === null
          && /MicroMessenger/i.test(navigator.userAgent)) {
        this.getLocation();
      } else if (localStorage.getItem('_getLocation') !== null) {
        this.location = localStorage.getItem('_getLocation');
        this.addressValue = name2value(this.location.split(' '), ChinaAddressV4Data).split(' ');
        this.getCurriculum();
      } else {
        this.addressValue = name2value(this.location.split(' '), ChinaAddressV4Data).split(' ');
        this.getCurriculum();
      }
    });
  },
  methods: {
    goActivity() {
      this.$router.push('/activity/learn/index');
    },

    // 打开位置选择
    openAddress() {
      this.showAddress = true;
    },
    // 关闭地址选择
    closeAddress(str) {
      // 取消
      if (!str) return;
      // 确定
      this.location = value2name(this.addressValue, ChinaAddressV4Data);
      localStorage.setItem('_getLocation', this.location);
      this.$vux.loading.show();
      this.getCurriculum();
    },

    // 获取课程包信息
    getCurriculum() {
      this.$_pageMixin_http(`/course_packet/${this.addressValue[2]}`, (res) => {
        this.thumbs = res.course_packets;
      });
    },

    // 微信获取位置
    getLocation() {
      const vm = this;
      vm.$wechat.ready(() => {
        vm.$wechat.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            // eslint-disable-next-line
            const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // eslint-disable-next-line
            const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            vm.regeocoder(res.longitude, res.latitude);
          },
          fail() {
            vm.addressValue = name2value(vm.location.split(' '), ChinaAddressV4Data).split(' ');
            vm.getCurriculum();
          },
          cancel() {
            vm.addressValue = name2value(vm.location.split(' '), ChinaAddressV4Data).split(' ');
            vm.getCurriculum();
          },
        });
      });
    },

    // 逆向地理编码
    regeocoder(latitude, longitude) {
      const lnglatXY = [latitude, longitude]; // 已知点坐标
      const geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all',
      });
      geocoder.getAddress(lnglatXY, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          this.geocoder_CallBack(result);
        }
      });
    },
    geocoder_CallBack(data) {
      const address = data.regeocode.addressComponent; // 返回地址描述
      const { province, city, district } = address;

      this.location = `${province} ${city} ${district}`;
      this.addressValue = name2value(this.location.split(' '), ChinaAddressV4Data).split(' ');
      localStorage.setItem('_getLocation', this.location);

      this.getCurriculum();
    },
  },
};
</script>
<template>
  <AppPageWithTabbar>
    <div class="curriculum-index">
      <x-address
        v-model="addressValue"
        :list="addressData"
        :show.sync="showAddress"
        style="display: none;"
        title="选择地址"
        @on-hide="closeAddress"
      />
      <!-- 位置信息 -->
      <div class="curriculum-index__location">
        <span
          class="curriculum-index-location__content"
          @click="openAddress">{{ location }}</span>
      </div>

      <!-- banner -->
      <div
        class="curriculum-index__banner"
        @click="goActivity">
        <img
          :src="banner.src"
          class="curriculum-index-banner__image">
      </div>

      <!-- 课程列表 -->
      <template v-if="thumbs.length != 0">
        <div class="curriculum-list">
          <ThumbItem
            v-for="item in thumbs"
            :item="item"
            :key="item.id"/>
        </div>
      </template>
      <template v-else>
        <div class="curriculum-list-empty">
          <div>该地区暂无课程,</div>
          <div>敬请期待!</div>
        </div>
      </template>

    </div>
  </AppPageWithTabbar>
</template>

<style lang="less">
.curriculum-index__location {
  font-size: px2vw(@font-size-big);
  position: relative;
  background-color: #fff;
}
.curriculum-index-location__content {
  position: relative;
  padding-right: px2vw(40);
  padding-left: px2vw(50);
  display: inline-block;
  line-height: px2vw(64);
}
.curriculum-index-location__content::before {
  content: '';
  display: block;
  width: px2vw(18);
  height: px2vw(26);
  background: url('./../../assets/location.png') no-repeat;
  background-size: 100% 100%;
  position: absolute;
  left: px2vw(22);
  top: px2vw(20);
}
.curriculum-index-location__content::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-width: px2vw(16) px2vw(8);
  border-style: solid;
  border-color: #999 transparent transparent transparent;
  position: absolute;
  right: px2vw(10);
  top: px2vw(26);
}
.curriculum-index-banner__image {
  width: 100%;
}
.curriculum-list {
  margin-top: px2vw(10);
}
.curriculum-list-empty {
  text-align: center;
  margin-top: px2vw(160);
  font-size: px2vw(40);
  letter-spacing: px2vw(4);
}
</style>
