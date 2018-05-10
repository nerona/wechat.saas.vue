<script>
/**
 * @overview 用户中心 - 编辑资料
 *
 * @author
 */

import { XInput, Group, XButton, PopupPicker } from 'vux';

export default {
  name: 'UserEdit',
  components: {
    XInput,
    Group,
    XButton,
    PopupPicker,
  },
  data() {
    return {
      info: {
        id: 1,
        openid: '12341234adsfdsf',
        headerUrl: 'http://placeholder.qiniudn.com/60x60/FFEF7D/fff',
        name: '张娜',
        nickname: '张娜a',
        tel: '18689238934',
        role: ['爸爸'],
      },
      roles: [['爸爸', '妈妈', '爷爷', '奶奶']],
    };
  },
  methods: {
    onChange(val) {
      // eslint-disable-next-line
      console.log('val change', val);
    },
    submit() {
      this.$router.push('/user/index');
    },
  },
};
</script>
<template>
  <AppPage class="user-edit">
    <group gutter="5 5">
      <x-input
        v-model="info.tel"
        :readonly="true"
        type="tel"
        placeholder="请输入手机号"
        text-align="right"
        title="手机号"/>
    </group>

    <group gutter="5 5">
      <x-input
        :show-clear="false"
        :readonly="true"
        text-align="right"
        title="微信头像"
      >
        <img
          slot="right-full-height"
          :src="info.headerUrl"
          class="user-edit-header">
      </x-input>
    </group>

    <group gutter="5 5">
      <x-input
        v-model="info.nickname"
        :readonly="true"
        type="text"
        placeholder="请输入昵称"
        text-align="right"
        title="微信昵称"/>
    </group>

    <group gutter="5 5">
      <x-input
        v-model="info.name"
        :max="20"
        :show-clear="false"
        type="text"
        placeholder="请输入姓名"
        text-align="right"
        title="姓名"/>
    </group>

    <group gutter="5 5">
      <popup-picker
        :data="roles"
        v-model="info.role"
        title="角色"
        placeholder="please select"
        @on-change="onChange"/>
    </group>

    <div class="user-edit-submit">
      <x-button
        type="primary"
        @click.native="submit">提交</x-button>
    </div>

  </AppPage>
</template>
<style lang="less">
.user-edit-submit {
  padding: 0 px2vw(40);
  margin-top: px2vw(80);
}
.vux-x-input-right-full .user-edit-header {
  width: 34px;
  height: 34px;;
  border-radius: 50%;
  margin-right: px2vw(16);
  padding: 5px;
}
</style>
