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
      info: {},
      roles: [],
      banner: {
        id: 1,
        src: 'http://placeholder.qiniudn.com/750x300/FFEF7D/fff',
      },
      activityRecord: null,

      order: {},
    };
  },
  created() {
    this.getBefore();
    this.getInfo();
  },
  methods: {
    getBefore() {
      this.$http.get('/order/count').then((res) => {
        this.order = res;
      });
    },
    getInfo() {
      this.$http.get('/wechat_user/show').then((res) => {
        // eslint-disable-next-line
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
      this.$router.push(`/user/order/${type}`);
    },
    // 退出登录
    logout() {
      this.$http.post('/bind/logout').then(() => {
        this.$router.push('/sign-in');
      }).catch(({ message }) => {
        this.$vux.toast.show({
          text: message,
          type: 'text',
          width: 'auto',
        });
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
          代付款
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
