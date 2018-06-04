<script>
/**
 * @overview 在线评测-首页
 *
 * @author suyanping
 */

export default {
  name: 'ActivityEvaluateIndex',

  data() {
    return {
      formData: [
        {
          number: 1,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/apple.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/1/banana.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/1/apple.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/1/pear.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/1/orange.png') },
          ],
          answer: 'B',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 2,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/head.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/2/shoulders.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/2/head.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/2/knees.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/2/legs.png') },
          ],
          answer: 'B',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 3,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/father.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/3/mother.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/3/father.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/3/grandpa.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/3/grandma.png') },
          ],
          answer: 'B',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 4,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/yellow.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/4/red.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/4/yellow.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/4/blue.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/4/pink.png') },
          ],
          answer: 'B',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 5,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/rabbit.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/5/cat.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/5/rabbit.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/5/dog.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/5/frog.png') },
          ],
          answer: 'B',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 6,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/C.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/6/C.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/6/A.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/6/K.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/6/S.png') },
          ],
          answer: 'A',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 7,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/S.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/7/S.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/7/T.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/7/L.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/7/R.png') },
          ],
          answer: 'A',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 8,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/p.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/8/P.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/8/B.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/8/T.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/8/U.png') },
          ],
          answer: 'A',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 9,
          type: 'audio',
          //eslint-disable-next-line
          audioSrc: require('./../../../assets/activity/evaluate/audio/d.wav'),
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/pause.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/9/D.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/9/B.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/9/G.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/9/R.png') },
          ],
          answer: 'A',
          choose: '',
          chooseIndex: null,
        },
        {
          number: 10,
          type: 'picture',
          audioSrc: '',
          //eslint-disable-next-line
          question: require('./../../../assets/activity/evaluate/10/Q-C.png'),
          select: [
            { name: 'A',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/10/cat.png') },
            { name: 'B',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/10/octopus.png') },
            { name: 'C',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/10/apple.png') },
            { name: 'D',
            //eslint-disable-next-line
              url: require('./../../../assets/activity/evaluate/10/tiger.png') },
          ],
          answer: 'A',
          choose: '',
          chooseIndex: null,
        },
      ],

      currPage: 1,
      finshPage: 1,
      score: 0,

      isMove: false,

      isPlay: false,
      //eslint-disable-next-line
      pauseSrc: require('./../../../assets/activity/evaluate/pause.png'),
      //eslint-disable-next-line
      playSrc: require('./../../../assets/activity/evaluate/play.png'),
    };
  },

  mounted() {
    const body = document.getElementsByTagName('body')[0];
    let startX = 0;
    let endX = 0;

    body.addEventListener('touchstart', (e) => {
      // e.preventDefault();
      startX = 0;
      startX = e.targetTouches[0].pageX;
    });
    body.addEventListener('touchmove', (e) => {
      // e.preventDefault();
      endX = 0;
      endX = e.targetTouches[0].pageX;
      this.isMove = true;
    });
    body.addEventListener('touchend', () => {
      // e.preventDefault();
      const X = endX - startX;

      if (this.isMove) {
        if (X > 0) {
          if (this.currPage > 1) {
            this.currPage -= 1;
            this.isPlay = false;
          }
        } else if (X < 0) {
          if (this.currPage !== 10 && this.currPage !== this.finshPage) {
            this.currPage += 1;
            this.isPlay = false;
          }
        } else {
        // 只是点击  没拖动
        }
        this.isMove = false;
      }
    });
  },

  methods: {
    choosePic(number, answer, name, index, choose) {
      if (choose) {
        return;
      }
      if (answer === name) {
        this.score += 1;
      }
      this.formData[number - 1].choose = name;
      this.formData[number - 1].chooseIndex = index;
      this.finshPage += 1;

      setTimeout(() => {
        if (this.finshPage <= 10) {
          this.currPage = this.finshPage;
          this.isPlay = false;
        } else {
          this.$router.push(`/activity/evaluate/finish/${this.score}`);
        }
      }, 3000);
    },
    palyAudio() {
      const audio = document.getElementById('audio');
      if (audio.paused) {
        audio.play();
        this.isPlay = true;
      } else {
        audio.pause();
        this.isPlay = false;
      }
      audio.addEventListener('ended', () => {
        this.isPlay = false;
      }, false);
    },
  },

};
</script>

<template>
  <AppPage class="evaluate-index">
    <div
      v-for="item in formData"
      v-if="item.number === currPage"
      :key="item.number">
      <header class="evaluate-index__header">
        <p v-if="item.type === 'picture'">{{ item.number }}.根据字母选对应单词图片</p>
        <p v-else>{{ item.number }}.听声音，选择正确的字母</p>
        <div class="evaluate-index-header__block">
          <img
            v-if="item.type === 'picture'"
            :src="item.question"
            class="evaluate-index-header__picture">
          <div
            v-else>
            <img
              v-if="isPlay === false"
              :src="pauseSrc"
              class="evaluate-index-header__audio"
              @click="palyAudio">
            <img
              v-else
              :src="playSrc"
              class="evaluate-index-header__audio"
              @click="palyAudio">
            <audio id="audio">
              <source :src="item.audioSrc">
            </audio>
          </div>
        </div>
      </header>

      <div class="evaluate-index__body">
        <div
          v-for="(imgs,index) in item.select"
          :key="imgs.url">
          <div
            v-if="(item.choose === item.answer) && (item.chooseIndex === index)"
            class="evaluate-index-body__success">
            <img
              :src="imgs.url">
            <img
              src="./../../../assets/activity/evaluate/success.png"
              class="evaluate-index-body__successImg">
          </div>
          <div
            v-else-if="(item.choose !== item.answer) && (item.chooseIndex === index)"
            class="evaluate-index-body__error">
            <img
              :src="imgs.url">
            <img
              src="./../../../assets/activity/evaluate/error.png"
              class="evaluate-index-body__errorImg">
          </div>
          <div
            v-else
            @click="choosePic(item.number,item.answer,imgs.name,index,item.choose)">
            <img
              :src="imgs.url">
          </div>
        </div>
      </div>
    </div>
    <div class="evaluate-index__footer">
      <div
        id="evaluate-index-footer__pro"
        :style="'width:' + (finshPage - 1) * 9.7 + '%'"/>
    </div>
  </AppPage>
</template>

<style lang="less">
.evaluate-index{
  width: 100%;
  background: url('./../../../assets/activity/evaluate/back.png') no-repeat;
  background-size: 100% 100%;
}
.evaluate-index__header{
  font-size: px2vw(36);
  padding: px2vw(40);
  color: #333333;
}
.evaluate-index-header__block{
  margin: px2vw(70) 0 px2vw(90) 0;
}
.evaluate-index-header__picture{
  width: px2vw(284);
  height: px2vw(325);
  margin-left: 27%;
}
.evaluate-index-header__audio{
  width: px2vw(174);
  height: px2vw(174);
  margin-left: 35%;
}
.evaluate-index__body>div{
  width: 45%;
  display: inline-block;
  margin: 0 px2vw(18);
}
.evaluate-index__body>div div{
  border: px2vw(5) solid transparent ;
  box-sizing: border-box;
}
.evaluate-index__body img{
  width: 100%;
  margin-right: px2vw(20);
}
.evaluate-index-body__success{
  position: relative;
  border: px2vw(5) solid #86BD2C !important;
  box-sizing: border-box;
  background: url('./../../../assets/activity/evaluate/success.png') no-repeat;
  background-size: 100% 100%;
}
.evaluate-index-body__error{
  position: relative;
  border: px2vw(5) solid red !important;
  box-sizing: border-box;
  background: url('./../../../assets/activity/evaluate/error.png') no-repeat;
  background-size: 100% 100%;
}
.evaluate-index-body__successImg{
  position: absolute;
  width: px2vw(140) !important;
  height: px2vw(102);
  top: 20%;
  left: 30%;
}
.evaluate-index-body__errorImg{
  position: absolute;
  width: px2vw(130) !important;
  height: px2vw(130);
  top: 20%;
  left: 30%;
}
.evaluate-index__footer{
  height: px2vw(65);
  margin: px2vw(20) px2vw(80) 0;
  background: url('./../../../assets/activity/evaluate/pro1.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
}
#evaluate-index-footer__pro{
  background: #86BD2C;
  width: 0;
  height: px2vw(41);
  border-radius: px2vw(30);
  position: absolute;
  top: px2vw(12);
  left: px2vw(9);
}
</style>
