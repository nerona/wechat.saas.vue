<script>
/**
 * @overview 在线评测-进入评测前
 *
 * @author suyanping
 */
import { XButton } from 'vux';

export default {
  name: 'ActivityEvaluateFirst',

  components: {
    XButton,
  },

  data() {
    return {

    };
  },

  methods: {
    skipCurriculum() {
      this.$router.push('/curriculum/detail/28');
    },

    skipIndex() {
      this.$router.push('/activity/evaluate/index');
    },
  },

};
</script>

<template>
  <div class="evaluate-first">
    <div class="evaluate-first__header">
      <p>亲爱的家长：</p>
      <p>您的孩子下半年是否就读小学一年级？</p>
    </div>
    <div
      class="evaluate-first__content"
      @click="skipCurriculum">
      <p>是的，我需要幼小衔接课程</p>
      <img src="./../../../assets/activity/evaluate/frame.png">
    </div>
    <div
      class="evaluate-first__footer"
      @click="skipIndex">
      <p>不是，我需要英语评测推荐课程</p>
      <img src="./../../../assets/activity/evaluate/frame.png">
    </div>
  </div>
</template>

<style lang="less">
.evaluate-first{
  height: 100%;
  background: url('./../../../assets/activity/evaluate/background.png') no-repeat;
  background-size: 100% 100%;
}
.evaluate-first__header{
  padding: px2vw(120) px2vw(50) px2vw(50) px2vw(50);
  & p{
    font-size: px2vw(38);
    margin-bottom: px2vw(10);
  }
}
.evaluate-first__content{
  height: px2vw(200);
  width: 90%;
  color: #86300E;
  margin-left: px2vw(40);
  position: relative;
  & p{
    position: absolute;
    font-size: px2vw(40);
    top: px2vw(70);
    left: px2vw(50);
  }
  & img{
    width: 100%;
    height: px2vw(200);
  }
}
.evaluate-first__footer{
  height: px2vw(200);
  width: 90%;
  color: #86300E;
  margin-left: px2vw(40);
  margin-top: px2vw(50);
  position: relative;
  & p{
    position: absolute;
    font-size: px2vw(40);
    top: px2vw(70);
    left: px2vw(50);
  }
  & img{
    width: 100%;
    height: px2vw(200);
  }
}
</style>
