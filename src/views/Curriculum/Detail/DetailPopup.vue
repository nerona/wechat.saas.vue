<script>
/**
 * @overview 课程详情弹窗
 *
 * @author  lindongfnag
 */

import { XButton } from 'vux';

export default {
  name: 'DetailOrder',
  components: {
    XButton,
  },
  filters: {
    toDay(str) {
      switch (str) {
        case 1:
          return '星期一';
        case 2:
          return '星期二';
        case 3:
          return '星期三';
        case 4:
          return '星期四';
        case 5:
          return '星期五';
        case 6:
          return '星期六';
        case 7:
          return '星期日';
        default:
          return '星期一';
      }
    },
  },
  props: {
    popupData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      stock_remain: null,
      curriculum: [],

      isSchoolActive: null,
      isDateActive: null,
    };
  },
  created() {
    this.curriculum = this.popupData.department[0].curriculum;
    this.stock_remain = this.popupData.stock_remain;
  },

  methods: {
    // 选择校区
    chooseSchool(index) {
      if (this.isSchoolActive !== index) {
        this.isSchoolActive = index;

        const currentItem = this.popupData.department.find(item =>
                        item.department_id === index);
        this.curriculum = currentItem.curriculum;
        this.stock_remain = currentItem.stock_remain;
        // this.isDateActive = null;
      } else {
        this.isSchoolActive = null;
      }
    },
    // 选择上课时间
    chooseDate(item) {
      if (item.stock_remain === 0) { return; }
      if (this.isDateActive !== item.id) {
        this.isDateActive = item.id;
        this.stock_remain = item.stock_remain;
      } else {
        this.isDateActive = null;
        if (this.isSchoolActive) {
          const schools = this.popupData.department.find(school =>
                        school.department_id === this.isSchoolActive);
          this.stock_remain = schools.stock_remain;
        }
      }
    },
    // 提交
    submit() {
      const query = {};
      if (this.isSchoolActive === null) {
        this.$vux.toast.text('请选择校区！', 'middle');
        return;
      }
      if (this.isDateActive === null) {
        this.$vux.toast.text('请选择上课时间！', 'middle');
        return;
      }
      query.department_id = this.isSchoolActive;
      query.curriculum_id = this.isDateActive;
      query.course_packet_id = this.$route.params.id;

      this.$router.push({ path: '/curriculum/order', query });
    },
  },
};
</script>

<template>
  <div class="curriculum-detail-order">
    <!--  -->
    <div class="curriculum-detail-order__card">
      <div class="curriculum-detail-order-card__header">
        <img :src="popupData.cover_url">
      </div>
      <div class="curriculum-detail-order-card__content">
        <div class="curriculum-detail-order-card-content__price">
          ￥{{ popupData.price }}
        </div>
        <div class="curriculum-detail-order-card-content__left">
          剩余{{ stock_remain }}个名额
        </div>
      </div>
    </div>
    <!--  -->
    <div class="curriculum-detail-order__school">
      <div class="curriculum-detail-order-school__title">
        校区选择
      </div>
      <div class="curriculum-detail-order-school__list">
        <div
          v-for="item in popupData.department"
          :key="item.department_id"
          :class="{active: item.department_id == isSchoolActive}"
          class="curriculum-detail-order-school-list__item"
          @click="chooseSchool(item.department_id)">
          {{ item.department_name }}
        </div>
      </div>
    </div>
    <!--  -->
    <div class="curriculum-detail-order__date">
      <div class="curriculum-detail-order-date__title">
        上课时间
      </div>
      <div class="curriculum-detail-order-date__list">
        <div
          v-for="item in curriculum"
          :key="item.id"
          :class="{'active': item.id == isDateActive,
                   'curriculum-detail-order-date-list__item--full': item.stock_remain == 0}"
          class="curriculum-detail-order-date-list__item"
          @click="chooseDate(item)">
          <div>{{ item.range }}</div>
          <div
            v-for="(cycle, cindex) in item.cycle"
            :key="cindex">
            {{ cycle.day | toDay }}<span style="display:inline-block;width: 4px;"/>
            {{ cycle.start_time.substring(0,5) }}-{{ cycle.end_time.substring(0,5) }}
          </div>
          <div
            v-if="item.stock_remain == 0"
            class="curriculum-detail-order-date-list-item__full">爆满</div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="curriculum-detail-sure">
      <x-button
        type="primary"
        @click.native="submit">确定</x-button>
    </div>
  </div>
</template>

<style lang="less">
.curriculum-detail-order {
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  font-size: px2vw(@font-size-big);
  margin-bottom: px2vw(100);
}
.curriculum-detail-order__card {
  padding: px2vw(24) px2vw(32);
  display: flex;
}
.curriculum-detail-order-card__header {
  width: 32%;
  margin-right: 4%;
}
.curriculum-detail-order-card__header > img {
  width: 100%;
}
.curriculum-detail-order-card__content {
  flex: 1;
}
.curriculum-detail-order-card-content__price {
  font-size: px2vw(48);
  color: @font-size-error-color;
}
.curriculum-detail-order-card-content__left {
  margin-left: px2vw(10);
  font-size: px2vw(@font-size-big);
  color: @button-background-color;
  letter-spacing: 1px;
}
.curriculum-detail-order__school,
.curriculum-detail-order__date {
  padding: 0 px2vw(32);
  margin-top: px2vw(8);
}
.curriculum-detail-order-school__title,
.curriculum-detail-order-date__title {
  font-weight: bold;
}
.curriculum-detail-order-school__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: px2vw(16);
  font-size: px2vw(@font-size-big);
}
.curriculum-detail-order-school-list__item {
  min-width: 48%;
  line-height: px2vw(66);
  height: px2vw(66);
  border: 1px solid #333;
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: px2vw(20);
}
.curriculum-detail-order-date__list{
  margin-top: px2vw(16);
}
.curriculum-detail-order-date-list__item {
  border: 1px solid #333;
  padding: px2vw(16) px2vw(32);
  margin-bottom: px2vw(30);
  position: relative;
}
.curriculum-detail-order-date-list__item--full {
  color: @font-size-third-color;
  // border-color: @font-size-third-color;
}
.curriculum-detail-order-date-list-item__full {
  position: absolute;
  border: 2px solid @font-size-error-color;
  color: @font-size-error-color;
  font-size: px2vw(@font-size-big);
  font-weight: bold;
  padding: 0 px2vw(16);
  top: px2vw(36);
  right: px2vw(30);
  letter-spacing: 1px;
  transform: rotateZ(30deg);
}
.curriculum-detail-order .active {
  border-color: #ffd900;
  color: #ffd900;
}
.curriculum-detail-sure {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
