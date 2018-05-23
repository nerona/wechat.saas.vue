<script>
/**
 * @overview 活动页 - 课程列表-领取
 *
 * @author lindongfang
 */
import { formUtils } from '@/mixins';

export default {
  name: 'LearnCurriculum',

  mixins: [formUtils],
  props: {
    prizeId: {
      type: Number,
      default: 1,
    },
    activityId: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      phone: '',
      active: false,
      curriculums: [
        {
          id: 1,
          title: '领取价值3600元幼小衔接课程',
          line1: '针对幼儿园升小学',
          line2: '语、数、英各10节课程',
        },
        {
          id: 2,
          title: '领取价值1200元精品英语启蒙课程',
          line1: '针对对英语口语学习兴趣的学生',
          line2: '英语启蒙10节课程',
        },
      ],
    };
  },
  watch: {
    phone(newVal) {
      const pattern = /^[^]{11}$/;
      if (pattern.test(newVal)) {
        this.active = true;
      } else {
        this.active = false;
      }
    },
  },

  methods: {
    // eslint-disable-next-line
    goDetail(id) {
      // this.$router.push(`/curriculum/detail/${id}`);
    },
    submit() {
      if (!this.active) {
        return;
      }
      const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9]|19[0-9])\d{8}$/;
      if (!pattern.test(this.phone)) {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'text',
          width: 'auto',
        });
        return;
      }

      this.$vux.loading.show();

      // eslint-disable-next-line
      this.$http.postNoRedirect(`/activity/${this.activityId}/reserve`, { prize_id: this.prizeId }).then((res) => {
        this.$vux.loading.hide();
        this.$vux.toast.show({
          text: '领取成功',
          type: 'text',
          width: 'auto',
        });
        setTimeout(() => {
          this.$router.push('/activity/learn/share');
        }, 1000);
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
            this.$router.push('/activity/learn/share');
          }, 1000);
        }
      });
    },
  },
};
</script>
<template>
  <div class="learn-index-curriculum">
    <div
      v-for="item in curriculums"
      :key="item.id"
      class="learn-index-curriculum__item"
      @click="goDetail(item.id)">
      <div class="learn-index-curriculum-item__title">
        {{ item.title }}
      </div>
      <div class="learn-index-curriculum-item__text1">
        {{ item.line1 }}
      </div>
      <div class="learn-index-curriculum-item__text2">
        {{ item.line2 }}
      </div>
    </div>

    <div class="learn-index-curriculum__receive">
      <div class="learn-index-curriculum-receive-input">
        <input
          v-model="phone"
          type="tel"
          maxlength="11"
          placeholder="请输入您的手机号">
      </div>
      <div
        :class="[active ? 'learn-index-curriculum-receive-submit--active' : '']"
        class="learn-index-curriculum-receive-submit"
        @click="submit">
        免费领取课程
      </div>
    </div>
  </div>
</template>
<style lang="less">
.learn-index-curriculum {
  margin-top: px2vw(120);
  font-size: px2vw(28);
  padding-top: px2vw(60);
  padding-bottom: px2vw(60);
  position: relative;
  &::before {
    content: '';
    display: block;
    width: px2vw(154);
    height: px2vw(131);
    background: url('./../../../assets/activity/learn/l6.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: px2vw(-112);
    right: px2vw(40);
  }
}
.learn-index-curriculum__item {
  width: px2vw(588);
  height: px2vw(280);
  margin: 0 auto;
  background: url('./../../../assets/activity/learn/l14.png') no-repeat;
  background-size: 100% 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: px2vw(70);
}
.learn-index-curriculum-item__title {
  font-weight: bold;
  font-size: px2vw(32);
}
.learn-index-curriculum-item__text1 {
  margin-top: px2vw(8)
}
.learn-index-curriculum-item__text2 {
  margin-top: px2vw(-6)
}

.learn-index-curriculum__receive {
  width: 94%;
  margin: 0 auto;
  height: px2vw(80);
  display: flex;
}
.learn-index-curriculum-receive-input {
  flex: 1;
  background-color: #dcdddd;
  input {
    width:  100%;
    border: none;
    outline: none;
    background-color: #dcdddd;
    font-size: px2vw(32);
    line-height: px2vw(80);
    text-indent: px2vw(30);
    letter-spacing: px2vw(2);
    &::-webkit-input-placeholder {
      letter-spacing: px2vw(4);
    }
  }
}
.learn-index-curriculum-receive-submit {
  padding: 0 px2vw(20);
  line-height: px2vw(80);
  letter-spacing: px2vw(6);
  background-color: #070002;
  color: #fff;
  font-size: px2vw(30);
}
.learn-index-curriculum-receive-submit--active {
  background-color: #ffd900;
}
</style>
