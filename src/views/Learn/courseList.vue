<script>
/**
 * @overview 课程列表的信息
 *
 * @author suyanping
 */
import { XButton } from 'vux';

export default {
  name: 'CourseList',

  components: {
    XButton,
  },

  props: {
    courseData: {
      type: Array,
      default: () => [],
    },
    studentId: {
      type: Number,
      default: null,
    },
  },

  data() {
    return {

    };
  },

  methods: {
    goCurrStore() {
      this.$router.push('/curriculum/index');
    },

    lookDetail(id) {
      this.$router.push(`/learn/detail/${this.studentId}_${id}`);
    },
  },
};
</script>

<template>
  <div class="course-list">
    <div
      v-if="courseData.length === 0"
      class="course-list__empty">
      <p>您小孩还未学习哦</p>
      <p>学习是最好的投资</p>
      <x-button
        class="course-list-empty__about"
        @click.native="goCurrStore">了解课程</x-button>
    </div>
    <div
      v-for="item in courseData"
      v-else
      :key="item.curriculum_id"
      class="course-list__fill"
      @click="lookDetail(item.curriculum_id)">
      <p>
        <span class="course-list-fill__line">
          <span v-if="item.curriculum_status === 1">{{ item.curriculum_status_name }}</span>
          <span
            v-else-if="item.curriculum_status === 2"
            class="course-list-fill-span__firText">{{ item.curriculum_status_name }}</span>
          <span
            v-else
            class="course-list-fill-span__secText">{{ item.curriculum_status_name }}</span>
        </span>
        <span>课程名称：{{ item.curriculum_name }}</span>
      </p>
      <p>课程时间：{{ item.range }}</p>
      <p>学时：共{{ item.course_total }}课时，剩余{{ item.course_total - item.course_finish }}课时</p>
      <p>校区：{{ item.department_name }}</p>
    </div>
  </div>
</template>

<style lang="less">
.course-list .weui-cells{
  margin-top: px2vw(0);
}
.course-list__empty{
  text-align: center;
  margin: px2vw(200) auto;
}
.course-list__empty p{
  font-size: px2vw(32);
}
.course-list-empty__about{
  width: px2vw(260) !important;
  font-size: px2vw(32) !important;
}
.course-list__fill{
  background: white;
  margin-top: px2vw(4);
  padding: px2vw(10) px2vw(30);
  position: relative;
  font-size: px2vw(32);
}
.course-list-fill__line{
  position: absolute;
  right: px2vw(20);
}
.course-list-fill-span__firText{
  color: red;
}
.course-list-fill-span__secText{
  color: #F9D500;
}
</style>
