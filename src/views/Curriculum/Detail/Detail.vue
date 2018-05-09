<script>
/**
 * @overview 课程详情首页
 *
 * @author  lindongfnag
 */

import { XButton, ViewBox, Popup, Confirm } from 'vux';
import SwiperList from './SwiperList';
import DetailPopup from './DetailPopup';

export default {
  name: 'CurriculumDetail',
  components: {
    SwiperList,
    XButton,
    ViewBox,
    Popup,
    DetailPopup,
    Confirm,
  },
  data() {
    return {
      showPopup: false,
      noPermissionActivity: false,
      info: {
        id: 1,
        type: 0, // 0购买-1试听
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
      },

    };
  },
  created() {
      // 获取id
    console.log(this.$route.params.id);
  },
  methods: {
    // 打开购买详情
    openPopup() {
      // 购买
      if (this.info.type === 0) {
        this.showPopup = true;
      } else if (this.info.type === 1) {
        // 试听
        this.noPermissionActivity = true;
      }
    },
    // 知道了
    getIt() {
      this.noPermissionActivity = false;
    },
    // 前往活动页
    goActivity() {
      alert('我要去活动页面了哦');
    },
  },
};
</script>

<template>
  <app-page class="curriculum-detail">
    <!-- 轮播图 -->
    <swiper-list :swiper-list="info.swiperList" />

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
        <span
          v-if="info.type == 1"
          class="curriculum-detail-info__price--null">￥0元</span>
        <span
          v-if="info.type == 0"
          class="curriculum-detail-info__price--new">￥100元</span>
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
        v-if="info.type == 0"
        type="primary"
        @click.native="openPopup">购买</x-button>
      <x-button
        v-if="info.type == 1"
        type="primary"
        @click.native="openPopup">试听</x-button>
    </div>

    <!-- 购买详情 -->
    <div v-transfer-dom>
      <popup
        v-model="showPopup"
        :should-scroll-top-on-show="true"
        height="75%"
      >
        <detail-popup/>
      </popup>
    </div>

    <!-- 未登陆or没有领取试听 -->
    <div v-transfer-dom>
      <confirm
        v-model="noPermissionActivity"
        content="您尚未领取试听课程到活动页领取哦"
        confirm-text="参与活动"
        cancel-text="知道了"
        @on-cancel="getIt"
        @on-confirm="goActivity"/>
    </div>

  </app-page>
</template>

<style lang="less">
.curriculum-detail {
    color: #585859;
}
.curriculum-detail__info {
  background-color: #fff;
  padding: px2vw(30) px2vw(28);
  font-size: px2vw(32);
  overflow: hidden;
}
.curriculum-detail-info__name {
  font-size: px2vw(32);
  letter-spacing: 1px;
  font-weight: bold;
}
.curriculum-detail-info__desc {
  font-size: px2vw(28);
  line-height: px2vw(44);
  margin-top: px2vw(8);
  text-align: justify;
  word-break: break-all;
}
.curriculum-detail-info__price {
  margin-top: px2vw(16);
  color: red;
  font-size: px2vw(36);
}
.curriculum-detail-info__price--old {
  margin-right: px2vw(22);
  text-decoration:line-through
}
.curriculum-detail__detail {
  background-color: #fff;
  margin-top: px2vw(16);
  padding: px2vw(30) px2vw(30);
  font-size: px2vw(28);
  overflow: hidden;
}
.curriculum-detail-detail__title {
  font-size: px2vw(32);
  letter-spacing: 1px;
  font-weight: bold;
}
.curriculum-detail-detail__content {
  margin-top: px2vw(10);
  text-align: justify;
}
.curriculum-detail__btns {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>

