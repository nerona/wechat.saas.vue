<script>
/**
 * @overview 上课详情-课程介绍
 *
 * @author suyanping
 */

import { ButtonTab, ButtonTabItem } from 'vux';
import courseMenu from './courseMenu';

export default {
  name: 'LearnDetail',

  components: {
    ButtonTab,
    ButtonTabItem,
    courseMenu,
  },

  data() {
    return {
      showContent: true,
      courseData: [
        { id: 1, date: '05.05', week: '周一', time: '17:00-18:00', content: 'Learn A B' },
        { id: 2, date: '05.10', week: '周二', time: '17:00-18:00', content: 'Learn A B' },
      ],
    };
  },

  methods: {
    lookDetail(key) {
      if (key === 1) {
        this.showContent = true;
      } else {
        this.showContent = false;
      }
    },
  },
};
</script>

<template>
  <div class="learn-detail">
    <div class="learn-detail__header">
      <p>课程名称：自然拼读</p>
      <p>课时数：共20学时，剩余15学时</p>
      <p>校区：五缘湾校区</p>
    </div>
    <div class="learn-detail__tab">
      <button-tab>
        <button-tab-item
          selected
          @on-item-click="lookDetail(1)">课程介绍</button-tab-item>
        <button-tab-item
          @on-item-click="lookDetail(2)">课程目录</button-tab-item>
      </button-tab>
    </div>
    <div class="learn-detail__content">
      <div
        v-if="showContent === true"
        class="learn-detail-content__none">
        <p>课程介绍内容</p>
        <p>暂无</p>
      </div>
      <div
        v-else
        class="learn-detail-content__menu">
        <courseMenu
          :course-data="courseData"/>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.learn-detail__header{
  width: 100%;
  padding: px2vw(40) px2vw(30);
  background: white;
}
.learn-detail__tab{
  margin: px2vw(20) 0;
  height: px2vw(100);
}
.learn-detail__tab .vux-button-tab-item{
  color: black;
  height: px2vw(105);
  border-radius: 0px !important;
  line-height: px2vw(105);
}
.learn-detail__tab .vux-button-group-current{
  color: black !important;
  background: @button-primary-bg-color !important;
}
.learn-detail__tab .vux-button-group > a:after{
    border: none !important;
  }
.learn-detail-content__none{
  text-align: center;
  margin: px2vw(100) auto;
}
</style>
