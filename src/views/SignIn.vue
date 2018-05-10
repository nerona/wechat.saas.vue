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
} from 'vux';

export default {
  name: 'SignIn',

  components: {
    Group,
    XButton,
    XInput,
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
  }),

  methods: {
    directRoute() {
      const to = this.userInfo.students.length
        ? this.from
        : `/child-binding?from=${this.from}`;

      this.toResultPage({
        title: '绑定结果',
        message: '绑定成功，稍后跳转',
        to,
      });
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
        :min="11"
        :max="11"
        v-model="data.mobile"
        title="+86"
        placeholder="请输入手机号"
        keyboard="number"
      />
      <VerificationCode
        v-model="data.code"
        :mobile="data.mobile"
      />
    </Group>
    <XButton
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
