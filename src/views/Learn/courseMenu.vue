<script>
/**
 * @overview 上课详情-课程目录
 *
 * @author suyanping
 */
export default {
  name: 'CourseMenu',

  filters: {
    getWeek(str) {
      const week = new Date(str).getDay();
      switch (week) {
        case 1:
          return '周一';
        case 2:
          return '周二';
        case 3:
          return '周三';
        case 4:
          return '周四';
        case 5:
          return '周五';
        case 6:
          return '周六';
        case 0:
          return '周日';
        default:
          return '周一';
      }
    },
    getDate(str) {
      const month = new Date(str).getMonth() + 1;
      const day = (new Date(str).getDate() < 10 ? `0${new Date(str).getDate()}` : new Date(str).getDate());
      return `${month}.${day}`;
    },
    getTime(str) {
      const timeArr = str.split(':');
      return `${timeArr[0]}:${timeArr[1]}`;
    },
  },

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
        :class="item.block_status === 3 ? 'course-menu-detail__round '
        + 'course-menu-detail___color' : 'course-menu-detail__round'">
        <div>{{ item.date | getDate }}</div>
        <div>{{ item.date | getWeek }}</div>
      </div>
      <div
        :class="item.block_status === 3 ? 'course-menu-detail__div '
        + 'course-menu-detail___color' : 'course-menu-detail__div'">
        <div>上课时间：{{ item.start_time | getTime }}-{{ item.end_time | getTime }}</div>
        <div>学习内容：{{ item.name }}</div>
      </div>
      <div
        :class="item.block_status === 3 ? 'course-menu-detail__line '
        + 'course-menu-detail___lineColor' : 'course-menu-detail__line'"/>
    </div>
  </div>
</template>

<style lang="less">
.course-menu{
  background: #EDEDF2;
  font-size: px2vw(32);
}
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
.course-menu-detail___color{
  color: #E6E6E6;
}
.course-menu-detail___lineColor{
  background: darkgrey;
}
</style>
