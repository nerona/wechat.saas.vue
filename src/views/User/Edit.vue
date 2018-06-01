<script>
/**
 * @overview 用户中心 - 编辑资料
 *
 * @author
 */

import {
  pageUtils,
} from '@/mixins';
import { XInput, Group, XButton, PopupPicker, Cell } from 'vux';
import { setTimeout } from 'timers';

export default {
  name: 'UserEdit',
  components: {
    XInput,
    Group,
    XButton,
    PopupPicker,
    Cell,
  },
  mixins: [pageUtils],
  data() {
    return {
      info: {},
      list: [],
      roles: [],

      name: '',
      role: [],
      roleValue: 0,
    };
  },
  created() {
    this.getBefore();
  },
  methods: {
    getBefore() {
      this.$_pageMixin_http('/wechat_user/store_before', (res) => {
        this.list = res.typeArr;
        const arr = [];
        res.typeArr.forEach((item) => {
          arr.push(item.name);
        });
        this.roles.push(arr);
      }).then(() => {
        this.getInfo();
      });
    },
    getInfo() {
      this.$_pageMixin_http('/wechat_user/show', (res) => {
        // eslint-disable-next-line
        this.info = res;
        this.name = res.name;

        if (res.role_type !== 0) {
          this.list.forEach((item) => {
            if (item.value === res.role_type) {
              this.role.push(item.name);
            }
          });
        }
        if (this.info.headimgurl === null || this.info.headimgurl === '') {
          this.info.headimgurl = 'http://placeholder.qiniudn.com/60x60/FFEF7D/fff';
        }
      });
    },
    onChange(str) {
      // eslint-disable-next-line
      if (str) {
        this.list.forEach((item) => {
          if (item.name === this.role[0]) {
            this.roleValue = item.value;
          }
        });
      }
    },
    submit() {
      const pattern = /^[\u4e00-\u9fa5a-zA-Z]+$/;

      let name;
      let roleType;
      if (this.name !== '') {
        if (pattern.test(this.name)) {
          name = this.name;
        } else {
          this.$vux.toast.show({
            text: '姓名格式不正确',
            type: 'text',
            width: 'auto',
          });
          return;
        }
      }
      if (this.roleValue !== 0) {
        roleType = this.roleValue;
      }

      if (this.name !== '' || this.roleValue !== 0) {
        this.$_pageMixin_http('/wechat_user', () => {
          this.$vux.toast.show({
            text: '提交成功',
            type: 'text',
            width: 'auto',
          });
          setTimeout(() => {
            this.$router.push('/user/index');
          }, 2000);
        }, 'patch', { name, role_type: roleType });
      }
    },
  },
};
</script>
<template>
  <AppPage class="user-edit">
    <group gutter="5 5">
      <cell title="微信头像">
        <img
          :src="info.headimgurl"
          width="50"
          style="display:block;border-radius: 50%;">
      </cell>
    </group>
    <group gutter="5 5">
      <x-input
        v-model="info.phone"
        :readonly="true"
        type="tel"
        placeholder="请输入手机号"
        text-align="right"
        title="手机号"/>
    </group>

    <group gutter="5 5">
      <x-input
        v-model="info.nickname"
        :readonly="true"
        type="text"
        placeholder="暂无昵称"
        text-align="right"
        title="微信昵称"/>
    </group>

    <group gutter="5 5">
      <x-input
        v-model="name"
        :max="10"
        :show-clear="false"
        type="text"
        placeholder="请输入您的姓名"
        text-align="right"
        title="姓名"/>
    </group>

    <group gutter="5 5">
      <popup-picker
        :data="roles"
        v-model="role"
        title="角色"
        placeholder="请选择"
        @on-hide="onChange"/>
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
