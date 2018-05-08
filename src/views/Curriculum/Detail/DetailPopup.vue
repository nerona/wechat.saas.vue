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
<script>
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
<style lang="less">
.curriculum-detail-order {
  height: 100%;
  overflow-y: scroll;
  background-color: #fff;
  font-size: 16px;
  padding-bottom: 50px;
}
.curriculum-detail-order__card {
  padding: 12px 16px;
  display: flex;
}
.curriculum-detail-order-card__header {
  margin-right: 20px;
}
.curriculum-detail-order-card__content {
  flex: 1;
}
.curriculum-detail-order-card-content__price {
  font-size: 24px;
  color: red;
}
.curriculum-detail-order-card-content__left {
  margin-left: 5px;
  font-size: 15px;
  color: #FFEF7D;
  letter-spacing: 1px;
}
.curriculum-detail-order__school,
.curriculum-detail-order__date {
  padding: 0 16px;
  margin-top: 4px;
}
.curriculum-detail-order-school__title,
.curriculum-detail-order-date__title {
  font-weight: bold;
}
.curriculum-detail-order-school__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 15px;
}
.curriculum-detail-order-school-list__item {
  min-width: 47%;
  line-height: 32px;
  height: 32px;
  border: 1px solid #ccc;
  text-align: center;
  letter-spacing: 1px;
  margin-bottom: 10px;
}
.curriculum-detail-order-date__list{
  margin-top: 8px;
}
.curriculum-detail-order-date-list__item {
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin-bottom: 15px;
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
