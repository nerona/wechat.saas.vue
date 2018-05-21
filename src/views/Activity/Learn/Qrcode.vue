<script>
/**
 * @overview 活动页 - 二维码
 *
 * @author lindongfang
 */


export default {
  name: 'ActivityQrcode',
  props: {
    qrcode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    };
  },

};
</script>

<template>
  <div class="learn-index-qrcode">
    <div class="learn-index-qrcode__img">
      <img :src="qrcode">
    </div>
    <div class="learn-index-qrcode__desc">
      <div>长按关注<span>【imkid超级课堂】</span></div>
      <div>了解课程介绍，预约课程</div>
    </div>
  </div>
</template>

<style lang="less">
.learn-index-qrcode {
  width: px2vw(700);
  margin: 0 auto;
  margin-top: px2vw(10);
  display: flex;
  font-size: px2vw(28);
}

.learn-index-qrcode__img {
  padding: px2vw(40);
  img {
    width: px2vw(220);
    height: px2vw(220);
  }
}
.learn-index-qrcode__desc {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    width: 100%;
    line-height: px2vw(60);
    text-align: center;
    span {
      font-weight: bold;
    }
  }
}
</style>
