<script>
/**
 * @overview 用户中心 - 首页
 *
 * @author
 */

import {
  pageUtils,
} from '@/mixins';
import { Card, Cell, XButton, Group } from 'vux';

export default {
  name: 'UserIndex',
  components: {
    Card,
    Cell,
    Group,
    XButton,
  },
  mixins: [pageUtils],
  data() {
    return {
      info: {},
      roles: [],
      banner: {
        id: 1,
        //eslint-disable-next-line
        src: require('./../../assets/curr_user.png'),
      },
      activityRecord: null,

      order: {},
      logoutConfirm: false,
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      this.$_pageMixin_http('/wechat_user/show', (res) => {
        this.$_pageMixin_http('/order/count', (count) => {
          this.order = count;
        });
        this.info = res;
        if (this.info.headimgurl === null || this.info.headimgurl === '') {
          this.info.headimgurl = 'http://placeholder.qiniudn.com/60x60/FFEF7D/fff';
        }
        if (this.info.nickname === null || this.info.nickname === '') {
          this.info.nickname = 'imkid';
        }
      });
    },
    goEdit() {
      this.$router.push('/user/edit');
    },
    goOrder(type) {
      this.$router.push(`/order/list?type=${type}`);
    },
    // 退出登录
    logout() {
      const vm = this;
      // this.logoutConfirm = true;
      this.$vux.confirm.show({
        content: '确认退出？',
        onCancel() {
        },
        onConfirm() {
          vm.$_pageMixin_http('/bind/logout', () => {
            vm.$router.push('/sign-in');
          }, 'post');
        },
      });
    },
  },
};
</script>

<template>
  <AppPageWithTabbar class="user-index">
    <!-- 个人信息 -->
    <cell
      :title="info.name || info.nickname"
      :inline-desc="info.phone"
      is-link
      link="/user/edit"
      style="margin-top: 10px;">
      <img
        slot="icon"
        :src="info.headimgurl"
        width="60"
        style="display:block;margin-right:12px;border-radius: 50%;">
    </cell>

    <!-- 订单信息 -->
    <card :header="{title: '课程订单'}">
      <div
        slot="content"
        class="user-index-card">
        <div
          class="vux-1px-r"
          @click="goOrder(0)">
          <span>{{ order.all }}</span>
          <br>
          全部
        </div>
        <div
          class="vux-1px-r"
          @click="goOrder(1)">
          <span>{{ order.unpaid }}</span>
          <br>
          待付款
        </div>
        <div @click="goOrder(2)">
          <span>{{ order.paid }}</span>
          <br>
          已付款
        </div>
      </div>
    </card>

    <!-- banner -->
    <div class="user-index-banner">
      <img :src="banner.src">
    </div>

    <group gutter="10 0">
      <cell
        :value="activityRecord"
        title="参与活动记录"
        is-link
        link="/user/activity-record"
      />
    </group>

    <div class="user-index-logout">
      <x-button
        type="primary"
        @click.native="logout">退出</x-button>
    </div>

  </AppPageWithTabbar>
</template>

<style lang="less">
.user-index {
  .weui-cell {
    background-color: #fff;
  }
}
.user-index-info {
  background-color: #fff;
  position: relative;
  font-size: px2vw(30);
  padding-top: px2vw(40);
  text-align: center;
}

.user-index-card {
  display: flex;
  font-size: px2vw(28);
  padding: 10px 0;
}
.user-index-card > div {
  flex: 1;
  text-align: center;
}
.user-index-card span {
  color: #f74c31;
}
.user-index-banner {
  margin-top: px2vw(20);
}
.user-index-banner > img {
  width: 100%;
}
.user-index-logout {
  margin-top: px2vw(60);
  padding: 0 px2vw(60);
}
</style>
