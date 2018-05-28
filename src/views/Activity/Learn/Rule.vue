<script>
/**
 * @overview 活动页 - 活动规则
 *
 * @author lindongfang
 */
  export default {
    name: 'LearnRule',
    data() {
      return {
        phone: '0592-6666710',
        callPhone: 'tel:0592-6666710',
      };
    },
  };
</script>
<template>
  <div
    id="rule"
    class="learn-index-rule">
    <div class="learn-index-board__title">
      <span>活动规则</span>
    </div>
    <div class="learn-index-rule__text">1.注册即可领取对应课程包。</div>
    <div class="learn-index-rule__text">2.家长可以选择就近校区上课，片区内未开设校区，家长可到官方合作校区或旗舰校区上课。</div>
    <div class="learn-index-rule__text">3.约课成功需要交纳99元座位占用费，课程结束后即可在系统申请退还。
    （无故缺课则不退座位占用费，特殊情况需要请假，提前与课程顾问联系：<a
      href="tel:0592-6666710"
      style="color:#898989">0592-6666710</a>）</div>
    <div class="learn-index-rule__text">4.关注公众号完善孩子信息，排课将在第一时间通过公众号推送，家长可进行约课。</div>
    <div class="learn-index-rule__text">5.小部分校区未开放幼小衔接课程，自动转为英语启蒙班。</div>
    <div class="learn-index-rule__text">6.幼小衔接班仅接受2018级一年级新生（校区对应小学新生）不符合条件则自动转为英语启蒙课程。</div>
    <div class="learn-index-rule__text">7.名额有限，招满即止。</div>
    <div class="learn-index-rule__text">8.最终解释权归imkid超级课堂。</div>

    <div class="learn-index-board__title">
      <span>客服热线</span>
    </div>
    <div class="learn-index-rule__call">
      <a :href="callPhone">{{ phone }}</a>
    </div>
  </div>
</template>
<style lang="less">
.learn-index-rule {
  margin-top: px2vw(20);
  color: #898989;
  text-align: justify;
  font-size: px2vw(30);
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
.learn-index-rule__text {
  padding: 0 px2vw(50);
  letter-spacing: px2vw(2);
}
.learn-index-rule__call {
  text-align: center;
  margin-top: px2vw(4);
  padding-bottom: px2vw(60);
  a {
    color: #333;
    font-weight: bold;
    font-size: px2vw(30);
    letter-spacing: px2vw(2);
    -webkit-touch-callout: default;
  }
}
</style>
