<script>
/**
 * @overview 用户中心 - 首页
 *
 * @author
 */

import { Card, Cell, XButton, Group } from 'vux';

export default {
  name: 'UserIndex',
  components: {
    Card,
    Cell,
    Group,
    XButton,
  },
  data() {
    return {
      info: {
        id: 1,
        openid: '12341234adsfdsf',
        headerUrl: 'http://placeholder.qiniudn.com/60x60/FFEF7D/fff',
        name: '张娜',
        nickname: '张娜',
        tel: '18689238934',
      },
      banner: {
        id: 1,
        src: 'http://placeholder.qiniudn.com/750x240/FFEF7D/fff',
      },
      activityRecord: 12,
    };
  },
  methods: {
    goEdit() {
      this.$router.push('/user/edit');
    },
    goOrder(type) {
      this.$router.push(`/user/order/${type}`);
    },
  },
};
</script>

<template>
  <AppPageWithTabbar class="user-index">
    <!-- 个人信息 -->
    <div class="user-index-info">
      <div class="user-index-info__header">
        <img :src="info.headerUrl">
      </div>
      <div class="user-index-info__name">{{ info.name || info.nickname || '暂无昵称' }}</div>
      <div class="user-index-info__tel">{{ info.tel }}</div>
      <x-icon
        class="user-index-info__edit"
        type="ios-ionic-outline"
        size="30"
        @click.native="goEdit()"/>
    </div>

    <!-- 订单信息 -->
    <card :header="{title: '课程订单'}">
      <div
        slot="content"
        class="user-index-card">
        <div
          class="vux-1px-r"
          @click="goOrder(0)">
          <span>1130</span>
          <br>
          全部
        </div>
        <div
          class="vux-1px-r"
          @click="goOrder(1)">
          <span>15</span>
          <br>
          代付款
        </div>
        <div @click="goOrder(2)">
          <span>0</span>
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
      <x-button type="primary">退出</x-button>
    </div>

  </AppPageWithTabbar>
</template>

<style lang="less">
.user-index {}
.user-index-info {
  background-color: #fff;
  position: relative;
  font-size: px2vw(30);
  padding-top: px2vw(40);
  text-align: center;
}
.user-index-info__header {}
.user-index-info__header > img {
  margin: 0 auto;
  width: px2vw(120);
  border-radius: 50%;
  overflow: hidden;
}
.user-index-info__name {
  margin-top: px2vw(14);
}
.user-index-info__tel {
  margin-top: px2vw(4);
  padding-bottom: px2vw(28);
}
.user-index-info__edit {
  position: absolute;
  top: px2vw(40);
  right: px2vw(40);
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
