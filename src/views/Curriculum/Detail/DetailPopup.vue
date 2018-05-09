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
  data() {
    return {
      isSchoolActive: null,
      isDateActive: null,
      school: [
         { id: 1, name: '爱考拉旗舰校区1' },
         { id: 2, name: '爱考拉旗舰校区2' },
         { id: 3, name: '爱考拉旗舰校区3' },
         { id: 4, name: '爱考拉旗舰校区4' },
         { id: 5, name: '爱考拉旗舰校区5' },
      ],
      date: [
        {
          id: 1,
          range: '2018-05-05至2018-05-06',
          cycle: [
            '星期一 16:00-16:40', '星期三 16:00-16:40', '星期五 16:00-16:40',
          ],
        },
        {
          id: 2,
          range: '2018-05-05至2018-05-06',
          cycle: [
            '星期一 16:00-16:40', '星期三 16:00-16:40', '星期五 16:00-16:40',
          ],
        },
        {
          id: 3,
          range: '2018-05-05至2018-05-06',
          cycle: [
            '星期一 16:00-16:40', '星期三 16:00-16:40', '星期五 16:00-16:40',
          ],
        },
      ],
    };
  },
  methods: {
    chooseSchool(index) {
      if (this.isSchoolActive !== index) {
        this.isSchoolActive = index;
      } else {
        this.isSchoolActive = null;
      }
    },
    chooseDate(index) {
      if (this.isDateActive !== index) {
        this.isDateActive = index;
      } else {
        this.isDateActive = null;
      }
    },
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
      query.school_id = this.isSchoolActive;
      query.date_id = this.isDateActive;
      query.curriculum_id = this.$route.params.id;
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
        <img src="http://placeholder.qiniudn.com/110x100/FF3B3B/fff">
      </div>
      <div class="curriculum-detail-order-card__content">
        <div class="curriculum-detail-order-card-content__price">￥2880</div>
        <div class="curriculum-detail-order-card-content__left">剩余50个名额</div>
      </div>
    </div>
    <!--  -->
    <div class="curriculum-detail-order__school">
      <div class="curriculum-detail-order-school__title">
        校区选择
      </div>
      <div class="curriculum-detail-order-school__list">
        <div
          v-for="item in school"
          :key="item.id"
          :class="{active: item.id == isSchoolActive}"
          class="curriculum-detail-order-school-list__item"
          @click="chooseSchool(item.id)">
          {{ item.name }}
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
          v-for="item in date"
          :key="item.id"
          :class="{active: item.id == isDateActive}"
          class="curriculum-detail-order-date-list__item"
          @click="chooseDate(item.id)">
          <div>{{ item.range }}</div>
          <div
            v-for="(cycle, cindex) in item.cycle"
            :key="cindex">{{ cycle }}</div>
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
  font-size: px2vw(32);
  padding-bottom: px2vw(100);
}
.curriculum-detail-order__card {
  padding: px2vw(24) px2vw(32);
  display: flex;
}
.curriculum-detail-order-card__header {
  margin-right: px2vw(40);
}
.curriculum-detail-order-card__header > img {
  width: 100%;
}
.curriculum-detail-order-card__content {
  flex: 1;
}
.curriculum-detail-order-card-content__price {
  font-size: px2vw(48);
  color: red;
}
.curriculum-detail-order-card-content__left {
  margin-left: px2vw(10);
  font-size: px2vw(30);
  color: #FFEF7D;
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
  font-size: px2vw(30);
}
.curriculum-detail-order-school-list__item {
  min-width: 47%;
  line-height: px2vw(64);
  height: px2vw(64);
  border: 1px solid #ccc;
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: px2vw(20);
}
.curriculum-detail-order-date__list{
  margin-top: px2vw(16);
}
.curriculum-detail-order-date-list__item {
  border: 1px solid #ccc;
  padding: px2vw(16) px2vw(32);
  margin-bottom: px2vw(30);
}
.curriculum-detail-order .active {
  border-color: red;
}

.curriculum-detail-sure {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>
