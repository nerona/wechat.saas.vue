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

<script>
/**
 * @overview 课程中心 - 首页
 *
 * @author
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
          desc: '课程简介课程简简课程简介课程简介程程',
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
      alert('我要跳到活动页面咯');
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

<style lang="less">
.curriculum-index {

}
.curriculum-index__location {
  font-size: 14px;
  padding: 4px 0;
  position: relative;
  background-color: #fff;
}
.curriculum-index-location__content {
  position: relative;
  padding-right: 20px;
  padding-left: 20px;
}
.curriculum-index-location__content::after {
  content: '';
  display: block;
  width: 0;
  height: 0;
  border-width: 8px 8px;
  border-style: solid;
  border-color: #999 transparent transparent transparent;
  position: absolute;
  right: 0px;
  top: 6px;
}
.curriculum-index__banner {}
.curriculum-index-banner__image {
  width: 100%;
}
</style>
