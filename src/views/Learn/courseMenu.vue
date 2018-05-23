<script>
/**
 * @overview 上课详情-课程目录
 *
 * @author suyanping
 */

export default {
  name: 'CourseMenu',

  props: {
    courseData: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {

    };
  },
};
</script>

<template>
  <div class="course-menu">
    <div
      v-for="item in courseData"
      :key="item.id"
      class="course-menu__detail">
      <div
        class="course-menu-detail__round">
        <div>{{ item.date }}</div>
        <div>{{ item.week }}</div>
      </div>
      <div
        class="course-menu-detail__div">
        <div>上课时间：{{ item.time }}</div>
        <div>学习内容：{{ item.content }}</div>
      </div>
      <div class="course-menu-detail__line"/>
    </div>
  </div>
</template>

<style lang="less">
.course-menu__detail{
  height: px2vw(180);
  position: relative;
}
.course-menu-detail__round{
  text-align: center;
  line-height: px2vw(110);
  width: px2vw(150);
  min-height: px2vw(150);
  border-radius: 50%;
  background: white;
  display: inline-block;
  position: relative;
  z-index: 10000;
}
.course-menu-detail__round div{
  height: px2vw(40);
}
.course-menu-detail__div{
  padding: px2vw(20);
  height: px2vw(110);
  line-height: px2vw(50);
  position: relative;
  top: px2vw(-150);
  margin: 0 px2vw(50) 0 px2vw(200);
  background: white;
}
.course-menu-detail__line{
  height: 100%;
  width: px2vw(4);
  background: #ffd900;
  position: absolute;
  left: px2vw(75);
  top: 0;
  z-index: 1000;
}
</style>
