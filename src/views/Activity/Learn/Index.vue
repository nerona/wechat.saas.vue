<script>
/**
 * @overview 活动页 - 一起学
 *
 * @author lindongfang
 */

import { Popup } from 'vux';
import Curriculum from './Curriculum';
import Rule from './Rule';
import Class from './Class';
import Qrcode from './Qrcode';
import ValidateCode from './ValidateCode';
// 二维码
import qrcode from './../../../assets/activity/learn/l5.png';

export default {
  name: 'ActivityIndex',
  components: {
    Curriculum,
    Rule,
    Class,
    Qrcode,
    ValidateCode,
    Popup,
  },
  data() {
    return {
      qrcode,
      phone: '',
      showCode: false,
      titleNumber: '3000',
      activityLimit: '20000',
      activityRange: '6月1日至8月31日',
    };
  },
  methods: {
    toCurriculum() {
      this.$router.push('/curriculum/index');
    },
    // 课程领取打开验证码
    openCode(val) {
      this.showCode = true;
      this.phone = val;
    },
  },
};
</script>

<template>
  <AppPage class="learn-index">
    <!-- logo -->
    <div class="learn-index-logo">
      <img src="./../../../assets/activity/learn/l2.png">
    </div>

    <!-- title -->
    <div class="learn-index-banner">
      <div class="learn-index-banner__title">
        <div class="learn-index-banner-title__number">{{ titleNumber }}万! !</div>
        <div class="learn-index-banner-title__text">
          <span>英</span>
          <span>语</span>
          <span>课</span>
          <span>程</span>
          <span>免</span>
          <span>费</span>
          <span>学</span>
        </div>
      </div>
      <div class="learn-index-banner__desc">
        家门口的美国小学英语
      </div>
    </div>
    <!-- range -->
    <div class="learn-index-range">
      <div class="learn-index-range__all">[全国仅限{{ activityLimit }}名]</div>
      <div class="learn-index-range__time">活动时间: {{ activityRange }}</div>
    </div>
    <!-- advance -->
    <div class="learn-index-advance">
      <img src="./../../../assets/activity/learn/l11.png">
      <img src="./../../../assets/activity/learn/l12.png">
      <img src="./../../../assets/activity/learn/l13.png">
    </div>
    <!-- curriculum -->
    <curriculum
      class="learn-index-board"
      @openCode="openCode"/>
    <!-- rule -->
    <rule class="learn-index-board"/>
    <!-- class -->
    <class class="learn-index-board"/>

    <!-- qrcode -->
    <qrcode :qrcode="qrcode"/>
    <!-- anchor -->
    <div class="learn-index-tabs">
      <div
        class="learn-index-tabs--active"
        @click="toCurriculum">课程介绍</div>
      <div>
        <a href="#rule">活动规则</a>
      </div>
      <div>
        <a href="#class">上课地点</a>
      </div>
    </div>

    <!-- 短信验证 -->

    <div v-transfer-dom>
      <popup
        v-model="showCode"
        :should-scroll-top-on-show="true"
        height="auto"
      >
        <validate-code
          v-if="showCode"
          :phone="phone"
        />
      </popup>
    </div>
  </AppPage>
</template>

<style lang="less">
.learn-index {
  background-color: #ffd900;
  position: relative;
  overflow-x: hidden;
}
.learn-index .weui-tab__panel {
  overflow-x: hidden !important;
  padding-bottom: 0 !important;
}
.learn-index-logo {
  padding-top: px2vw(60);
  position: relative;
  img {
    width: px2vw(224);
    margin: 0 auto;
  }
   &::before {
    content: '';
    display: block;
    width: px2vw(230);
    height: px2vw(334);
    background: url('./../../../assets/activity/learn/l3.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
}
.learn-index-banner {
  margin-top: px2vw(140);
}

.learn-index-banner__title {
  margin: 0 auto;
  padding-left: px2vw(300);
}
.learn-index-banner-title__number {
  font-weight: bold;
  color: #04a1e9;
  letter-spacing: px2vw(8);
  font-size: px2vw(40);
  padding-left: px2vw(10);
}
.learn-index-banner-title__text {
  margin-top: px2vw(4);
  width: px2vw(390);
  display: flex;
  justify-content: space-between;
  span {
    display: block;
    width: px2vw(48);
    height: px2vw(48);
    line-height: px2vw(48);
    background: url('./../../../assets/activity/learn/l8.png') no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-size: px2vw(28);
    font-weight: bold;
  }
}

.learn-index-banner__desc {
  width: px2vw(650);
  margin: 0 auto;
  height: px2vw(148);
  background: url('./../../../assets/activity/learn/l9.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: px2vw(50);
  letter-spacing: px2vw(8);
  color: #231714;
  position: relative;
  margin-top: px2vw(36);

  &::before {
    content: '';
    display: block;
    width: px2vw(245);
    height: px2vw(275);
    background: url('./../../../assets/activity/learn/l7.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: px2vw(-235);
    left: px2vw(-20);
  }
}

.learn-index-range {
  color: #040000;
  margin-top: px2vw(60);
  text-align: center;
  &__all {
    display: inline-block;
    letter-spacing: px2vw(4);
    font-size: px2vw(34);
    position: relative;
    &::before {
      content: '';
      display: block;
      width: px2vw(71);
      height: px2vw(65);
      background: url('./../../../assets/activity/learn/l10.png') no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: px2vw(-30);
      left: px2vw(-35);
    }
  }
  &__time {
    letter-spacing: px2vw(2);
    font-size: px2vw(34);
    margin-top: px2vw(8);
    font-size: px2vw(30);
  }
}

.learn-index-advance {
  width: px2vw(690);
  margin: 0 auto;
  margin-top: px2vw(20);
  display: flex;
  justify-content: space-between;
  img {
    width: px2vw(230);
    height: px2vw(230);
  }
}

.learn-index-board {
  background-color: #fff;
  width: px2vw(700);
  margin: 0 auto;
  font-size: px2vw(28);
  text-align: center;
}
.learn-index-board__title {
  text-align: center;
  font-weight: bold;
  font-size: px2vw(32);
  letter-spacing: px2vw(4);
  padding-top: px2vw(40);
  padding-bottom: px2vw(30);
  color: #333;
  span {
    position: relative;
    display: inline-block;
    line-height:  px2vw(40);
    z-index: 2;

    &::before {
      content: '';
      display: block;
      width: 130%;
      height: px2vw(34);
      background-color: #ffd900;
      position: absolute;
      bottom: px2vw(-12);
      left: -15%;
      z-index: -1;
    }
  }
}

.learn-index-tabs {
  display: flex;
  height: px2vw(90);
  line-height: px2vw(90);
  font-size: px2vw(30);
  letter-spacing: px2vw(2);
  background-color: #fff;
  div {
    flex: 1;
    text-align: center;
    position: relative;
    a {
      color: #333;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  &--active {
    background-color: #fabe00;
  }
}
</style>
