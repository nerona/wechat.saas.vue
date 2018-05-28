<script>
/**
 * @overview 活动分享页
 *
 * @author lindongfang
 */
// 二维码
import qrcode from './../../../assets/activity/learn/l16.png';
import Qrcode from './Qrcode';

export default {
  name: 'ActivityShare',
  components: { Qrcode },

  data() {
    return {
      activityId: 1,
      qrcode,
      title: '3000万英语课程免费学',
      link: 'https://wechat.caihonggou.com/activity/learn/index?source=1',
      imgUrl: 'https://oa-statics.caihonggou.com/iamkid_wechat_share.png',
      desc: '一起参加吧！家门口的美国小学英语课堂，名额有限。',
    };
  },
  created() {
    // if (!/(Android)/i.test(navigator.userAgent)) {
    //   window.location.reload();
    // }
  },

  mounted() {
    const vm = this;
    // ios 坑
    // const url = location.href;
    const url = /(Android)/i.test(navigator.userAgent) ? location.href : localStorage.getItem('linkUrl');
    // eslint-disable-next-line
    alert('test-share:' + url);
    vm.$http.post('/bind/jssdk', { url }).then((res) => {
      vm.$wechat.config(res);
    });

    vm.$wechat.ready(() => {
      vm.$wechat.checkJsApi({
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success() {},
      });
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
  },
};
</script>

<template>
  <AppPage class="learn-share">
    <!-- logo -->
    <div class="learn-share-logo">
      <img src="./../../../assets/activity/learn/l2.png">
    </div>
    <!--  -->
    <div class="learn-share-msg">
      <!-- 英 -->
      <div class="learn-share-msg__item learn-share-msg-item__en">
        <div class="learn-share-msg-item__title">Letter of Admission</div>
        <div class="learn-share-msg-item__text">
          <div class="learn-share-msg-item-text__to">Dear Kid:</div>
          <div class="learn-share-msg-item-text__tomsg">
            Congratulations！
            We are glad to inform that you have been admitted to the Imkid Super Class.
            Through which the superior international classes and the whole
            world will be at your fingertips.
            Looking forward to your arrival！
          </div>
        </div>
      </div>
      <!-- 汉 -->
      <div class="learn-share-msg__item learn-share-msg-item__cn">
        <div class="learn-share-msg-item__title">录取通知书</div>
        <div class="learn-share-msg-item__text">
          <div class="learn-share-msg-item-text__to">你好，孩子：</div>
          <div class="learn-share-msg-item-text__tomsg">
            这一刻你被imkid超级课堂录取，从现在开始，
            imkid将带你连接世界优质课堂，与世界对话。
          </div>
        </div>
      </div>
      <div class="learn-share-send">领取成功短信已发送，请查收</div>
      <div class="learn-share-title">
        <span>您获得以下特权</span>
      </div>
      <div class="learn-share-tips">将课程送给2位好友，让他们成为<br>你的同班同学</div>
    </div>
    <!-- qrcode -->
    <qrcode
      :qrcode="qrcode"
      class="learn-share-qrcode"/>
  </AppPage>
</template>

<style lang="less">
.learn-share {
  background-color: #ffd900;
  position: relative;
  overflow-x: hidden;
  color: #000;
}
.learn-share .weui-tab__panel {
  overflow-x: hidden !important;
  padding-bottom: 0 !important;
}
.learn-share-logo {
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
    top: px2vw(-50);
    right: px2vw(30);
  }
}

.learn-share-msg {
  background-color: #fff;
  width: px2vw(700);
  margin: 0 auto;
  margin-top: px2vw(110);
  position: relative;
  padding-top: px2vw(60);
  padding-bottom: px2vw(40);
  font-size: px2vw(28);
  text-align: justify;
  word-break: break-all;
  &::before {
    content: '';
    display: block;
    width: px2vw(71);
    height: px2vw(65);
    background: url('./../../../assets/activity/learn/l10.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: px2vw(-45);
    left: 10%;
  }
}
.learn-share-msg__item {
  width: px2vw(666);
  height: px2vw(450);
  margin: 0 auto;
  background: url('./../../../assets/activity/learn/l14.png') no-repeat;
  background-size: 100% 100%;
}
.learn-share-msg-item__title {
  font-size: px2vw(30);
  font-weight: bold;
  text-align: center;
  padding-top: px2vw(60);
}
.learn-share-msg-item__text {
  width: px2vw(560);
  margin: 0 auto;
  margin-top: px2vw(6);
}

.learn-share-msg-item-text__tomsg {
  text-indent: px2vw(50);
}

.learn-share-msg-item__en {
  margin-bottom: px2vw(40);
}
.learn-share-msg-item__en .learn-share-msg-item-text__tomsg  {
  line-height: px2vw(38);
}
.learn-share-msg-item__cn .learn-share-msg-item__title {
  padding-top: px2vw(100);
}
.learn-share-msg-item__cn .learn-share-msg-item__text {
  margin-top: px2vw(10);
}
.learn-share-msg-item__cn .learn-share-msg-item-text__tomsg  {
  line-height: px2vw(50);
}

.learn-share-send {
  text-align: center;
  font-size: px2vw(30);
  letter-spacing: px2vw(2);
}
.learn-share-title {
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
.learn-share-tips {
  text-align: center;
  margin-top: px2vw(10);
  font-size: px2vw(30);
  letter-spacing: px2vw(2);
}


.learn-share-qrcode {
  background-color: #fff;
  margin-top: px2vw(20) !important;
  margin-bottom: px2vw(40) !important;
  position: relative;
  &::before,
  &::after {
    content: '';
    display: block;
    width: px2vw(26);
    height: px2vw(82);
    background: url('./../../../assets/activity/learn/l15.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: px2vw(-50);
    left: 23%;
  }
  &::after {
    left: auto;
    right: 23%
  }
}
</style>
