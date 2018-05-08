<template>
  <view-box class="curriculum-detail">
    <!-- 轮播图 -->
    <swiper-list :swiper-list="swiperList" />

    <!-- 课程信息 -->
    <div class="curriculum-detail__info">
      <div class="curriculum-detail-info__name">
        暑期课程-Phonics
      </div>
      <div class="curriculum-detail-info__desc">
        Phonics1-进阶Phonics1-进阶Phonics1-进阶Phonics1-进阶
      </div>
      <div class="curriculum-detail-info__price">
        <span class="curriculum-detail-info__price--old">￥2990元</span>
        <span class="curriculum-detail-info__price--null">￥0元</span>
        <span class="curriculum-detail-info__price--new">￥100元</span>
      </div>
    </div>

    <!-- 课程详情 -->
    <div class="curriculum-detail__detail">
      <div class="curriculum-detail-detail__title">课程详情</div>
      <div class="curriculum-detail-detail__content">
        Phonics 1 进阶课程<br>
        Phonics 1 进阶课程<br>
        Phonics 1 进阶课程Phonics 1<br>
        进阶课程Phonics 1 <br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1 <br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1 <br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1<br>
        进阶课程Phonics 1 进阶课程<br>
      </div>
    </div>

    <!-- 购买-试听 -->
    <div class="curriculum-detail__btns">
      <x-button
        type="primary"
        @click.native="openPopup">购买</x-button>
        <!-- <x-button type="primary">试听</x-button> -->
    </div>

    <!-- 购买详情 -->

    <div v-transfer-dom>
      <popup
        v-model="showOrder"
        :should-scroll-top-on-show="true"
        height="75%"
      >

        <order/>

      </popup>
    </div>

  </view-box>
</template>
<script>
import { XButton, ViewBox, TransferDom, Popup } from 'vux';
import SwiperList from './SwiperList';
import Order from './Order';

export default {
  name: 'CurriculumDetail',
  components: {
    SwiperList,
    XButton,
    ViewBox,
    Popup,
    Order,
  },
  directives: {
    TransferDom,
  },
  data() {
    return {
      showOrder: false,
      swiperList: [{
        img: 'http://placeholder.qiniudn.com/750x350/FF3B3B/ffffff',
        title: '送你一朵fua',
      }, {
        img: 'http://placeholder.qiniudn.com/750x350/FFEF7D/ffffff',
        title: '送你一次旅行',
      }, {
        img: 'http://placeholder.qiniudn.com/750x350/8AEEB1/ffffff',
        title: '送你一朵fua',
      }],
    };
  },
  created() {
      // 获取id
    console.log(this.$route.params.id);
  },
  methods: {
    openPopup() {
      this.showOrder = true;
    },
  },
};
</script>
<style lang="less">
.curriculum-detail {
    color: #585859;
}
.curriculum-detail__info {
  background-color: #fff;
  padding: 15px 15px;
  font-size: 16px;
  overflow: hidden;
}
.curriculum-detail-info__name {
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: bold;
}
.curriculum-detail-info__desc {
  font-size: 15px;
  line-height: 22px;
  margin-top: 3px;
  text-align: justify;
  word-break: break-all;
}
.curriculum-detail-info__price {
  margin-top: 8px;
  color: red;
  font-size: 18px;
}
.curriculum-detail-info__price--old {
  margin-right: 10px;
  text-decoration:line-through
}
.curriculum-detail__detail {
  background-color: #fff;
  margin-top: 8px;
  padding: 15px 15px;
  font-size: 14px;
  overflow: hidden;
}
.curriculum-detail-detail__title {
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: bold;
}
.curriculum-detail-detail__content {
  margin-top: 5px;
  text-align: justify;
}
.curriculum-detail__btns {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>

