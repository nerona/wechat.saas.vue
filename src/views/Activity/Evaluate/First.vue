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
      <p>你的小孩下半年是否就读小学一年级？</p>
    </div>
    <div
      class="evaluate-first__content"
      @click="skipCurriculum">
      <p>是的，我需要幼小衔接课程</p>
      <img src="./../../../assets/activity/evaluate/yes.png">
    </div>
    <div class="evaluate-first__footer">
      <p>不是，通过英语能力评测选择课程</p>
      <img
        src="./../../../assets/activity/evaluate/icon.png"
        @click="skipIndex">
    </div>
  </div>
</template>

<style lang="less">
.evaluate-first{
  height: 100%;
  background: #FCFCCB;
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
  color: #863D0E;
  margin-left: 5%;
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
  height: px2vw(350);
  margin-top: px2vw(50);
  color: #863D0E;
  font-size: px2vw(36);
  width: 90%;
  margin-left: 5%;
  background: url('./../../../assets/activity/evaluate/frame-no.png') no-repeat;
  background-size: 100% 100%;
  & p{
    padding: px2vw(50) px2vw(60);
  }
  & img{
    width: px2vw(350);
    margin-left: px2vw(160);
  }
}
</style>
