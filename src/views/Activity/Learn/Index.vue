<script>
/**
 * @overview 活动页 - 一起学
 *
 * @author lindongfang
 */

import AMap from 'AMap';
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
      activityLimit: '-',
      activityRange: '--月--日',
      prizeId: 1,
      source: 3,
      activityId: 1,

      adcode: '350203',
      isLogged: false,
      isReserved: false,

      title: '3000万英语课程免费学',
      link: (process.env.NODE_ENV === 'production')
            ? 'https://wechat.aikaola.com/activity/learn/index?source=1' :
            'https://wechat.caihonggou.com/activity/learn/index?source=1',
      imgUrl: 'https://oa-statics.caihonggou.com/iamkid_wechat_share.png',
      desc: '一起参加吧！家门口的美国小学英语课堂，名额有限。',
    };
  },
  created() {
    this.source = Number.parseInt(this.$route.query.source, 10);

    this.getActivity();
    // this.visit();
  },
  mounted() {
    const vm = this;
    // ios 坑
    // const url = location.href;
    const url = /(Android)/i.test(navigator.userAgent) ? location.href : localStorage.getItem('linkUrl');

    vm.$http.post('/bind/jssdk', { url }).then((res) => {
      vm.$wechat.config(res);
    });

    vm.$wechat.ready(() => {
      // 第一次进入此页面
      vm.getLocation();

      vm.$wechat.onMenuShareAppMessage({
        title: vm.title,
        link: vm.link,
        imgUrl: vm.imgUrl,
        desc: vm.desc,
        success() {
          vm.share();
        },
        cancel() {
          vm.$vux.toast.show({
            text: '分享取消',
            type: 'text',
            width: 'auto',
            position: 'middle',
          });
        },
        fail(res) {
          // eslint-disable-next-line
          alert(JSON.stringify(res));
        },
      });
      vm.$wechat.onMenuShareTimeline({
        title: vm.title,
        link: vm.link,
        imgUrl: vm.imgUrl,
        desc: vm.desc,
        success() {
          vm.share();
        },
        cancel() {
          vm.$vux.toast.show({
            text: '分享取消',
            type: 'text',
            width: 'auto',
          });
        },
        fail(res) {
          // eslint-disable-next-line
          alert(JSON.stringify(res));
        },
      });
    });
  },
  methods: {
    // 活动详情
    getActivity() {
      this.$http.get(`/activity/${this.activityId}`).then((res) => {
        if (res.progress === '已结束') {
          this.$router.push('/activity/learn/over');
        }
        this.prizeId = res.activity_prize[0].id;
        this.activityLimit = res.user_limit;
        this.activityRange = `${res.start_at.split(' ')[0].split('-')[1]}月${
           res.start_at.split(' ')[0].split('-')[2]}日${
           res.end_at.split(' ')[0].split('-')[1]}月${
           res.end_at.split(' ')[0].split('-')[2]}日`;

        this.isReserved = res.is_reserved;
        this.isLogged = res.is_logged_in;
      });
    },
    toCurriculum() {
      // this.$router.push('/curriculum/index');
      this.$vux.toast.show({
        text: '敬请期待',
        type: 'text',
        width: 'auto',
      });
    },
    // 课程领取打开验证码
    openCode(val) {
      this.showCode = true;
      this.phone = val;
    },
    closeCode() {
      this.showCode = false;
      this.$vux.loading.show();

      // eslint-disable-next-line
      this.$http.postNoRedirect(`/activity/${this.activityId}/reserve`, {
        prize_id: this.prizeId,
        source: this.source,
        district_code: this.adcode || 0,
        city_code: this.adcode ? `${this.adcode.substring(0, 4)}00` : 0,
        province_code: this.adcode ? `${this.adcode.substring(0, 2)}0000` : 0,
      }).then(() => {
        this.$vux.loading.hide();
        this.$vux.toast.show({
          text: '领取成功',
          type: 'text',
          width: 'auto',
        });
        setTimeout(() => {
          this.$router.push('/activity/learn/share');
        }, 2000);
      }).catch((err) => {
        this.$vux.loading.hide();
        if (err.status === 401) {
           // 未登录
          this.$emit('openCode', this.phone);
        } else {
          this.$vux.toast.show({
            text: err.message,
            type: 'text',
            width: 'auto',
          });
          setTimeout(() => {
            if (err.message.indexOf('已领取') !== -1) {
              this.$router.push('/activity/learn/share');
            }
          }, 2000);
        }
      });
    },
    // 上传统计次数
    visit(adcode) {
      if (adcode !== undefined) {
        this.$http.post(`/activity/${this.activityId}/visit`, {
          source: this.source,
        }).then(() => {});
      } else {
        this.$http.post(`/activity/${this.activityId}/visit`, { source: this.source }).then(() => {});
      }
    },
    //
    share() {
      this.$http.post(`/activity/${this.activityId}/share`).then(() => {
        this.$vux.toast.show({
          text: '分享成功',
          type: 'text',
          width: 'auto',
          position: 'middle',
        });
      }).catch((err) => {
        this.$vux.toast.show({
          text: err.message,
          type: 'text',
          width: 'auto',
          position: 'middle',
        });
      });
    },
    getLocation() {
      const vm = this;
      if (/MicroMessenger/i.test(navigator.userAgent)) {
        vm.$wechat.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            // eslint-disable-next-line
            const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            // eslint-disable-next-line
            const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            vm.regeocoder(res.longitude, res.latitude);
          },
          fail() {
            vm.visit();
          },
          cancel() {
            vm.visit();
          },
        });
      } else {
        vm.visit();
      }
    },
    // 逆向地理编码
    regeocoder(latitude, longitude) {
      const lnglatXY = [latitude, longitude]; // 已知点坐标
      const geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: 'all',
      });
      geocoder.getAddress(lnglatXY, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          this.geocoder_CallBack(result);
        }
      });
    },
    geocoder_CallBack(data) {
      const address = data.regeocode.addressComponent; // 返回地址描述

      // localStorage.setItem('_getLocation_code', address.adcode);
      this.adcode = address.adcode;

      this.visit(address.adcode);
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
      :prize-id="prizeId"
      :activity-id="activityId"
      :is-logged="isLogged"
      :is-reserved="isReserved"
      :source="source"
      :adcode="adcode"
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
          @closeCode="closeCode"
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
