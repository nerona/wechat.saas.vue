<script>
/**
 * @overview 在线评测-评测结果
 *
 * @author suyanping
 */
import { XButton } from 'vux';

export default {
  name: 'ActivityEvaluateFinish',

  components: {
    XButton,
  },

  data() {
    return {
      score: Number(this.$route.params.score),
    };
  },

  methods: {
    getMoreInfo() {
      if (this.score <= 5) {
        this.$router.push('/curriculum/detail/28');
      } else {
        this.$router.push('/curriculum/detail/29');
      }
    },
  },

};
</script>

<template>
  <div class="evaluate-finish">
    <div class="evaluate-finish__result">
      <p class="evaluate-finish__text1">评测结果</p>
      <img src="./../../../assets/activity/evaluate/congratulation.png">
      <p class="evaluate-finish__text2">恭喜你顺利通过测评</p>
      <p class="evaluate-finish__text2">现在可以开始
        <span v-if="score <= 5">Phonics2</span>
        <span v-else>Pre-K</span>
        课程的学习啦</p>

      <div class="evaluate-finish-result__submit">
        <x-button
          type="primary"
          @click.native="getMoreInfo">立即约课</x-button>
      </div>
    </div>
    <div class="evaluate-finish__sawtooth"/>
    <div class="evaluate-finish__content">
      <div v-if="score <= 5">
        <span>Phonics2</span>
        课程介绍：Phonics也称为自然拼读。核心是建立字母（letter）与语音（sounds)）之间的对应关系，不借助音标，看着字母就可以直接读出该词的发音。
      </div>
      <div v-else>
        <span>Pre-k</span>
        从身边息息相关的主题入手，积累大量原汁原味的语音，激发学习英文的兴趣。采用主题式教学和螺旋式复习的编排方式，通过游戏，歌曲，互动，TPR等充分调动学习兴趣。
      </div>
    </div>
  </div>
</template>

<style lang="less">
.evaluate-finish{
  background: #e0e9f9;
  height: 100%;
}
.evaluate-finish__result{
  background: white;
  padding: px2vw(20);
}
.evaluate-finish__text1{
  font-size: px2vw(50);
  color:#333333;
}
.evaluate-finish img{
  width: px2vw(605);
  height: px2vw(384);
  margin: px2vw(20) 0;
  margin-left: 10%;
}
.evaluate-finish__text2{
  font-size: px2vw(40);
  color:#333333;
  text-align: center;
}
.evaluate-finish__text2 span{
  color:red;
}
.evaluate-finish__content{
  background: #e0e9f9;
  padding: px2vw(20);
}
.evaluate-finish__content>div{
  font-size: px2vw(36);
}
.evaluate-finish__content span{
  color:red;
}
.evaluate-finish-result__submit button.weui-btn,.evaluate-finish-result__submit input.weui-btn{
  font-size: px2vw(40);
  border-radius: px2vw(20);
  width: px2vw(334);
  height: px2vw(100);
  margin: px2vw(60) auto;
}
.evaluate-finish__sawtooth{
  height: px2vw(38);
  background: white;
  background-image:-webkit-gradient(
    linear,50% 0,0 100%,
    from(transparent),
    color-stop(0.5,transparent),
    color-stop(0.5,#e0e9f9),
    to(#e0e9f9)
  ),
  -webkit-gradient(
    linear,50% 0,100% 100%,
    from(transparent),
    color-stop(0.5,transparent),
    color-stop(0.5,#e0e9f9),
    to(#e0e9f9)
  );
  background-size:px2vw(80) px2vw(40);
  background-repeat:repeat-x;

}
</style>
