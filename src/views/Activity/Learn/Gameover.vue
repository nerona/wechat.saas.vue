<script>
  /**
 * @overview 活动结束页
 *
 * @author lindongfang
 */
import qrcode from './../../../assets/activity/learn/l16.png';

export default {
  name: 'ActivityLearnOver',
  data() {
    return {
      qrcode,
    };
  },
  methods: {
    goHome() {
      this.$router.push('/curriculum/index');
    },
  },
};
</script>
<template>
  <AppPage class="learn-over">
    <div class="learn-over-container">
      <div class="learn-over-container__title">
        活动已结束
      </div>
      <div class="learn-over-container__qrcode">
        <img :src="qrcode">
      </div>
      <div class="learn-over-container_desc">
        长按关注
        <span>【imkid超级课堂】</span>
      </div>
      <div class="learn-over-container_desc">
        了解课程介绍，预约课程
      </div>
    </div>
    <div
      class="learn-over-home"
      @click="goHome">
      前往课程中心
    </div>
  </AppPage>
</template>
<style lang="less">
.learn-over {
  background-color: #ffd900;
  position: relative;
  overflow-x: hidden;
}

.learn-over-container {
  background-color: #fff;
  width: 92%;
  margin: 0 auto;
  text-align: center;
  margin-top: px2vw(80);
  padding-bottom: px2vw(80);
}
.learn-over-container__title {
  font-size: px2vw(50);
  letter-spacing: px2vw(6);
  font-weight: bold;
  padding-top: px2vw(60);
}
.learn-over-container__qrcode {
  margin-top: px2vw(60);
  margin-bottom: px2vw(60);
  img {
    margin: 0 auto;
    width: px2vw(400);
    height: px2vw(400);;
  }
}
.learn-over-container_desc {
  span {
    font-weight: bold;
  }
}

.learn-over-home {
  background-color: #fff;
  width: 92%;
  height: px2vw(80);
  line-height: px2vw(80);
  margin: 0 auto;
  margin-top: px2vw(80);
  text-align: center;
  border-radius: 6px;
  font-size: px2vw(36);
  letter-spacing: px2vw(8);
}
</style>
