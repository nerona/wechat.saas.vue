<script>
/**
 * @overview 上课详情-课程介绍
 *
 * @author suyanping
 */

import { ButtonTab, ButtonTabItem } from 'vux';
import { pageUtils } from '@/mixins';
import courseMenu from './courseMenu';

export default {
  name: 'LearnDetail',

  components: {
    ButtonTab,
    ButtonTabItem,
    courseMenu,
  },

  mixins: [pageUtils],

  data() {
    return {
      formData: {
        course_finish: 0,
        course_total: 0,
        curriculum_introduce: '',
        curriculum_name: '',
        department_name: '',
        schedule: [],
      },

      showContent: true,
    };
  },

  created() {
    const arrId = this.$route.params.id.split('_');
    this.$_pageMixin_http(`/student/curriculum/${arrId[0]}/${arrId[1]}`, (res) => {
      this.formData = res;
    });
  },

  methods: {

  },
};
</script>

<template>
  <div class="learn-detail">
    <div class="learn-detail__header">
      <p>课程名称：{{ formData.curriculum_name }}</p>
      <p>课时数：共{{ formData.course_total }}学时，
      剩余{{ formData.course_total - formData.course_finish }}学时</p>
      <p>校区：{{ formData.department_name }}</p>
    </div>
    <div class="learn-detail__block">
      <button-tab>
        <button-tab-item
          selected
          @on-item-click="showContent = true">课程介绍</button-tab-item>
        <button-tab-item
          @on-item-click="showContent = false">课程目录</button-tab-item>
      </button-tab>
    </div>
    <div class="learn-detail__content">
      <div
        v-if="showContent === true"
        class="learn-detail-content__none">
        <div v-if="!formData.curriculum_introduce">
          <p>课程介绍内容</p>
          <p>暂无</p>
        </div>
        <div v-else>
          <p>{{ formData.curriculum_introduce }}</p>
        </div>
      </div>
      <div
        v-else
        class="learn-detail-content__menu">
        <courseMenu
          :course-data="formData.schedule"/>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.learn-detail__header{
  width: 100%;
  padding: px2vw(40) 0;
  background: white;
  font-size: px2vw(32);
}
.learn-detail__header p{
  margin: 0 px2vw(40);
  word-break: break-all;
}
.learn-detail__block{
  margin: px2vw(20) 0;
  height: px2vw(100);
}
.learn-detail__block .vux-button-tab-item{
  color: black;
  height: px2vw(105);
  border-radius: 0px !important;
  line-height: px2vw(105);
  font-size: px2vw(32);
}
.learn-detail__block .vux-button-group-current{
  color: black !important;
  background: @button-primary-bg-color !important;
}
.learn-detail__block .vux-button-group > a:after{
    border: none !important;
  }
.learn-detail-content__none{
  text-align: center;
  margin: px2vw(100) auto;
  font-size: px2vw(32);
}
</style>
