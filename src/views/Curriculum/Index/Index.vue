<script>
/**
 * @overview 课程中心 - 首页
 *
 * @author lindongfang
 */

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
      thumbs: [
        {
          id: 1,
          thumb: 'http://placeholder.qiniudn.com/120x120/caac23/fff',
          title: '进阶课程1',
          desc: '课程简介课程简简课程简课程',
          status: 0,
          price: 2990,
          left: 10,
          created: '2018-05-05 至 2018-05-06',
        },
        {
          id: 2,
          thumb: 'http://placeholder.qiniudn.com/120x120/caac23/fff',
          title: '进阶课程2',
          desc: '课程简介课程',
          status: 1,
          price: 2990,
          left: 10,
          created: '2018-05-05 至 2018-05-06',
        },

      ],
    };
  },
  created() {
    this.addressValue = name2value(this.location.split(' '), ChinaAddressV4Data).split(' ');
  },
  methods: {
    goActivity() {
      // this.$router.push(`/action/${this.banner.id}`)
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
          class="curriculum-index-banner__image"
          alt="">
      </div>

      <!-- 课程列表 -->
      <thumb-list :thumbs="thumbs" />

    </div>
  </AppPageWithTabbar>
</template>

<style lang="less">
.curriculum-index {}
.curriculum-index__location {
  font-size: px2vw(@font-size-big);
  position: relative;
  background-color: #fff;
}
.curriculum-index-location__content {
  position: relative;
  padding-right: px2vw(50);
  padding-left: px2vw(40);
  display: inline-block;
  line-height: px2vw(64);
}
.curriculum-index-location__content::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-width: px2vw(16) px2vw(16);
  border-style: solid;
  border-color: #999 transparent transparent transparent;
  position: absolute;
  right: 0px;
  top: px2vw(24);
}
.curriculum-index__banner {}
.curriculum-index-banner__image {
  width: 100%;
}
</style>
