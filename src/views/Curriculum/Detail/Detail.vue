<script>
/**
 * @overview 课程详情首页
 *
 * @author  lindongfnag
 */

import {
  formUtils,
} from '@/mixins';
import { XButton, ViewBox, Popup, Confirm, Alert } from 'vux';
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
    Alert,
  },
  mixins: [
    formUtils,
  ],
  data() {
    return {
      showPopup: false,
      noPermissionActivity: false,
      alertMsg: false,
      errMsg: '',

      popupData: {},

      info: {
        attachment: [],
      },
    };
  },
  created() {
    this.$vux.loading.show();
    this.getDetail();
  },
  methods: {
    // 打开购买详情
    openPopup() {
      this.$http.get(`/course_packet/inherent/${this.$route.params.id}`).then((res) => {
         // 未领取试听课程
        if (res.status === 2) {
          this.noPermissionActivity = true;
        } else {
          this.popupData = res;
          this.showPopup = true;
        }
      }).catch((err) => {
        this.alertMsg = true;
        this.errMsg = err.message;
      });
    },

    // 知道了
    getIt() {
      this.noPermissionActivity = false;
    },
    // 前往活动页
    goActivity() {
      this.$router.push('/activity/learn/index');
    },

    getDetail() {
      this.$http.get(`/course_packet/surface/${this.$route.params.id}`).then((res) => {
        this.$vux.loading.hide();
        this.info = res;
      }).catch((err) => {
        this.$vux.loading.hide();
        this.$_formMixin_alertError(err);
      });
    },
  },
};
</script>

<template>
  <app-page class="curriculum-detail">
    <!-- 轮播图 -->
    <swiper-list
      v-if="info.attachment.length != 0"
      :attachment="info.attachment" />

    <!-- 课程信息 -->
    <div class="curriculum-detail__info">
      <div class="curriculum-detail-info__name">
        {{ info.name }}
      </div>
      <div class="curriculum-detail-info__desc">
        {{ info.introduce }}
      </div>
      <div class="curriculum-detail-info__price">
        <span class="curriculum-detail-info__price--old">￥{{ info.original_price }}元</span>
        <!-- <span
          v-if="info.category_type == 2"
          class="curriculum-detail-info__price--null">￥0元</span> -->
        <span
          class="curriculum-detail-info__price--new">￥{{ info.price }}元</span>
      </div>
    </div>

    <!-- 课程详情 -->
    <div class="curriculum-detail__detail">
      <div class="curriculum-detail-detail__title">课程详情</div>
      <div class="curriculum-detail-detail__content">
        <div v-html="info.info"/>
      </div>
    </div>

    <!-- 购买-试听 -->
    <div
      slot="bottom"
      class="curriculum-detail__btns">
      <x-button
        v-if="info.category_type == 1"
        type="primary"
        @click.native="openPopup">购买</x-button>
      <x-button
        v-if="info.category_type == 2"
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
        <detail-popup
          v-if="showPopup"
          :popup-data="popupData"/>
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

    <!-- 错误弹窗 -->
    <div v-transfer-dom>
      <alert v-model="alertMsg"> {{ errMsg }}</alert>
    </div>

  </app-page>
</template>

<style lang="less">
@button-global-height: px2vw(@button-default-height);
@button-global-font-size: px2vw(@font-size-big);

.curriculum-detail {
  color: @font-size-default-color;
}
.curriculum-detail .weui-btn_primary:not(.weui-btn_disabled):active {
    color: rgba(0, 0, 0, 0.9);
    background-color: #ffd900;
}
.curriculum-detail__info {
  background-color: #fff;
  padding: px2vw(30) px2vw(28);
  font-size: px2vw(@font-size-big);
  overflow: hidden;
}
.curriculum-detail-info__name {
  font-size: px2vw(@font-size-bigger);
  letter-spacing: 1px;
}
.curriculum-detail-info__desc {
  line-height: px2vw(44);
  margin-top: px2vw(8);
  text-align: justify;
  word-break: break-all;
}
.curriculum-detail-info__price {
  margin-top: px2vw(16);
  font-size: px2vw(@font-size-bigger);
}
.curriculum-detail-info__price--old {
  margin-right: px2vw(30);
  text-decoration:line-through
}
.curriculum-detail-info__price--null,
.curriculum-detail-info__price--new {
  color: @font-size-error-color;
}
.curriculum-detail__detail {
  background-color: #fff;
  margin-top: px2vw(20);
  padding: px2vw(30) px2vw(30);
  font-size: px2vw(@font-size-big);
  overflow: hidden;
}
.curriculum-detail-detail__title {
  font-size: px2vw(@font-size-bigger);
  letter-spacing: 1px;
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

