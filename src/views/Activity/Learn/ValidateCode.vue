<script>
  /**
 * @overview 活动页 - 短信验证
 *
 * @author lindongfang
 */
import {
  Countdown,
} from 'vux';

export default {
  name: 'ValidateCode',
  components: {
    Countdown,
  },

  props: {
    phone: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: true,
      time: 60,
      active: false,

      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: '',
    };
  },
  watch: {
    code1(val) {
      if (val !== '' && val !== null) {
        this.$refs.code2.click();
      } else {
        this.active = false;
      }
    },
    code2(val) {
      if (val !== '' && val !== null) {
        this.$refs.code3.click();
      } else {
        this.active = false;
      }
    },
    code3(val) {
      if (val !== '' && val !== null) {
        this.$refs.code4.click();
      } else {
        this.active = false;
      }
    },
    code4(val) {
      if (val !== '' && val !== null) {
        this.active = true;
      } else {
        this.active = false;
      }
    },
  },
  mounted() {
    this.$refs.code1.click();

    this.sendCode();
  },
  methods: {
    sendCode() {
      // eslint-disable-next-line
      this.$http.post('/bind/send_code', { mobile: this.phone}).then((res) => {});
    },
    // 倒计时结束
    finish() {
      this.show = false;
    },

    // 获取验证码
    getCode() {
      this.time = 60;
      this.show = true;
      this.sendCode();
    },

    // 提交
    submit() {
      if (this.active) {
        const code = this.$refs.code1.value +
                     this.$refs.code2.value +
                     this.$refs.code3.value +
                     this.$refs.code4.value;

        this.$http.post('/bind/bind_phone', { mobile: this.phone, code }).then(() => {
          this.$emit('closeCode');
        }).catch((err) => {
          this.$vux.toast.show({
            text: err.message,
            type: 'text',
            width: 'auto',
            position: 'bottom',
          });
        });
      }
    },
  },
};
</script>
<template>
  <div class="popup-code">
    <div class="popup-code__title">验证码已发送到 {{ phone }}</div>
    <div class="popup-code__input">
      <input
        ref="code1"
        v-model="code1"
        type="tel"
        maxlength="1">
      <input
        ref="code2"
        v-model="code2"
        type="tel"
        maxlength="1">
      <input
        ref="code3"
        v-model="code3"
        type="tel"
        maxlength="1">
      <input
        ref="code4"
        v-model="code4"
        type="tel"
        maxlength="1">
    </div>

    <div
      v-if="show"
      class="popup-code__tips">
      <countdown
        v-model="time"
        @on-finish="finish"/>秒后可重新获取
    </div>
    <div
      v-else
      class="popup-code__tips"
      @click="getCode">
      重新获取
    </div>

    <div
      :class="[active ? 'popup-code__submit--active' : '']"
      class="popup-code__submit"
      @click="submit"
    >完成验证</div>
  </div>
</template>
<style lang="less">
.popup-code {
  padding: px2vw(80) 0;
  text-align: center;
  font-size: px2vw(30);
  letter-spacing: px2vw(2);
  color: #000;
}
.popup-code__input {
  margin-top: px2vw(40);
  display: flex;
  justify-content: center;

  input {
    display: block;
    width: px2vw(70);
    height: px2vw(70);
    margin-right: px2vw(40);
    text-align: center;
    font-size: px2vw(50);
  }
}
.popup-code__tips {
  margin-top:  px2vw(30);
  display: inline-block;
}
.popup-code__submit {
  width: 84%;
  height: px2vw(80);
  line-height: px2vw(80);
  margin: 0 auto;
  margin-top:  px2vw(40);
  margin-bottom:  px2vw(40);
  background-color: #dcdddd;
  color:#fff;
  font-size: px2vw(32);
  letter-spacing: px2vw(4);
  border-radius: 6px;
}
.popup-code__submit--active {
  background-color: #fe9a00;
}

</style>
