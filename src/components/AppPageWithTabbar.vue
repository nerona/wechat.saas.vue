<script>
/**
 * @overview 带tabbar的页面容器
 *
 * @author  lindongfnag
 */
import { ViewBox, Tabbar, TabbarItem } from 'vux';

import iconCurriculumGray from './../assets/curriculum_gray.png';
import iconCurriculum from './../assets/curriculum.png';
import iconUserGray from './../assets/user_gray.png';
import iconUser from './../assets/user.png';
import iconLearnGray from './../assets/learn_gray.png';
import iconLearn from './../assets/learn.png';

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
          img_gray: iconCurriculumGray,
          img_highlight: iconCurriculum,
          label: '课程中心',
          link: '/curriculum/index',
          isActive: false,
        },
        {
          img_gray: iconLearnGray,
          img_highlight: iconLearn,
          label: '学习中心',
          link: '/learn/index',
          isActive: false,
        },
        {
          img_gray: iconUserGray,
          img_highlight: iconUser,
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
<style lang="less">
.weui-tabbar__label {
  color: #666 !important;
}
.weui-tabbar > a:nth-child(1) > .weui-tabbar__icon {
  width: 23px;
  height: 23px;
  padding: 2px 0;
}
.weui-tabbar > a:nth-child(2) > .weui-tabbar__icon {
  width: 25px;
  height: 25px;
  padding: 1px 0;
}
.weui-tabbar > a:nth-child(3) > .weui-tabbar__icon {
  width: 21px;
  height: 25px;
  padding: 1px 0;
}
</style>
