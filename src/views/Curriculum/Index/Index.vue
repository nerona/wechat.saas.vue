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
import ThumbList from './ThumbList';

export default {
  name: 'CurriculumIndex',
  components: {
    ThumbList,
    XAddress,
    Group,
  },
  data() {
    return {
      banner: {
        id: 1,
        src: 'http://placeholder.qiniudn.com/750x300/4CD964',
      },
      location: '福建省 厦门市 思明区',
      addressData: ChinaAddressV4Data,
      showAddress: false,
      addressValue: [],

      thumbs: [],
    };
  },
  created() {
    this.$vux.loading.show();
  },
  mounted() {
    // 微信config
    const url = /(Android)/i.test(navigator.userAgent) ?
    location.href : localStorage.getItem('linkUrl');

    this.$http.post('/bind/jssdk', { url, debug: true }).then((res) => {
      this.$wechat.config(res);
    });

    // 判断是否第一次用微信进入
    // if (localStorage.getItem('_getLocation') === null
    // && /MicroMessenger/i.test(navigator.userAgent)) {
    this.getLocation();
    // } else {
    //   this.addressValue = name2value(this.location.split(' '), ChinaAddressV4Data).split(' ');
    //   this.getCurriculum();
    // }
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
      this.$vux.loading.show();
      this.getCurriculum();
    },
    getCurriculum() {
      this.$http.get(`/course_packet/${this.addressValue[2]}`).then((res) => {
        this.$vux.loading.hide();
        this.thumbs = res.course_packets;
      });
    },
    getLocation() {
      const vm = this;
      vm.$wechat.ready(() => {
        vm.$wechat.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            localStorage.setItem('_getLocation', 'no');
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
      // eslint-disable-next-line
      alert('enter recode');
      const lnglatXY = [latitude, longitude]; // 已知点坐标
      // eslint-disable-next-line
      alert(lnglatXY);
      const geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all',
      });
      geocoder.getAddress(lnglatXY, (status, result) => {
        // eslint-disable-next-line
        alert(status);
        // eslint-disable-next-line
        alert(JSON.stringify(result));
        if (status === 'complete' && result.info === 'OK') {
          // eslint-disable-next-line
          alert("enter result");
          this.geocoder_CallBack(result);
        }
      });
    },
    geocoder_CallBack(data) {
      // eslint-disable-next-line
      alert('enter callback');
      const address = data.regeocode.addressComponent; // 返回地址描述
      const { province, city, district } = address;
      // eslint-disable-next-line
      alert(province, city, district);
      this.location = `${province} ${city} ${district}`;
      this.addressValue = name2value(this.location.split(' '), ChinaAddressV4Data).split(' ');

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
      <thumb-list :thumbs="thumbs" />

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
  background: url('./../../../assets/location.png') no-repeat;
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
</style>
