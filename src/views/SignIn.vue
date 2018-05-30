<script>
/**
 * @overview 登录 & 注册页面
 *
 * @author huojinzhao
 */

import {
  formUtils,
} from '@/mixins';

import {
  VerificationCode,
} from '@/views/components';

import {
  Group,
  XButton,
  XInput,
  Swiper,
} from 'vux';

export default {
  name: 'SignIn',

  components: {
    Group,
    XButton,
    XInput,
    Swiper,
    VerificationCode,
  },

  mixins: [
    formUtils,
  ],

  data: () => ({
    data: {
      mobile: '',
      code: '',
    },

    rules: {
      mobile: '请填写手机号码',
      code: '请输入验证码',
    },

    // 提交数据的后端接口地址
    url: '/bind/bind_phone',

    submitLoading: false,
  }),

  computed: {
    isFormValid() {
      const pattern = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

      return this.data.code && this.data.mobile.match(pattern);
    },
  },

  methods: {
    directRoute() {
      const to = this.$route.params.from || '/curriculum';

      this.$router.replace(to);
    },

    v_submit() {
      this.submitLoading = true;

      this.$http.post('/bind/bind_phone', { ...this.data })
        .then(this.directRoute)
        .catch(this.$_formMixin_alertError)
        .finally(() => { this.submitLoading = false; });
    },
  },
};
</script>

<template>
  <div class="signin">
    <div class="signin__banner">
      <XButton
        text="快去报名>>"
        type="warn"
        mini
      />
    </div>
    <Group
      label-width="4em"
      gutter="15px"
    >
      <XInput
        v-model="data.mobile"
        is-type="china-mobile"
        title="+86"
        placeholder="请输入手机号"
        keyboard="number"
        required
      />
      <VerificationCode
        v-model="data.code"
        :mobile="data.mobile"
      />
    </Group>
    <XButton
      :disabled="!isFormValid"
      :show-loading="submitLoading"
      class="signin__confirm"
      type="primary"
      text="登录"
      @click.native="() => v_submit()"
    />
  </div>
</template>

<style lang="less">
.signin__banner {
  padding: 1em;
  height: px2vw(360);
  background-color: grey;
}

.signin .signin__confirm {
  margin: px2vw(40) px2vw(20) 0 px2vw(20);
  width: px2vw(710);
}
</style>
