<template>
  <view-box ref="viewBox">
    <!-- <x-header
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"/> -->

    <slot/>

    <tabbar slot="bottom">
      <tabbar-item
        v-for="(item, index) in tabList"
        :key="index"
        :selected="item.isActive"
        :link="item.link">
        <img
          slot="icon"
          :src="item.img_gray">
        <img
          slot="icon-active"
          :src="item.img_highlight">
        <span slot="label">{{ item.label }}</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>
<script>
import { ViewBox, Tabbar, TabbarItem } from 'vux';

export default {
  name: 'AppPageWithTabbar',
  components: {
    ViewBox,
    Tabbar,
    TabbarItem,
  },
  props: {},
  data() {
    return {
      tabList: [
        {
          img_gray: 'http://placeholder.qiniudn.com/40x40/CCCCCC/fff',
          img_highlight: 'http://placeholder.qiniudn.com/40x40/4CD964/fff',
          label: '课程',
          link: '/curriculum/index',
          isActive: false,
        },
        {
          img_gray: 'http://placeholder.qiniudn.com/40x40/CCCCCC/fff',
          img_highlight: 'http://placeholder.qiniudn.com/40x40/4CD964/fff',
          label: '学习中心',
          link: '/learn/index',
          isActive: false,
        },
        {
          img_gray: 'http://placeholder.qiniudn.com/40x40/CCCCCC/fff',
          img_highlight: 'http://placeholder.qiniudn.com/40x40/4CD964/fff',
          label: '个人中心',
          link: '/user/index',
          isActive: false,
        },
      ],
    };
  },
  created() {
    this.tabList.forEach((item) => {
      if (window.location.href.indexOf(item.link) !== -1) {
        // eslint-disable-next-line
        item.isActive = true;
      }
    });
  },
};
</script>
<style lang="less">

</style>
