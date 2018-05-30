<script>
/**
 * @overview 用户中心 - 订单列表
 *
 * @author huojinzhao
 */

import { Tab, TabItem } from 'vux';
import { pageUtils } from '@/mixins';
import ListItem from './ListItem';

export default {
  name: 'UserOrderList',

  components: {
    Tab,
    TabItem,
    ListItem,
  },

  mixins: [pageUtils],

  data: () => ({
    orderTypes: [
      {
        state: '0',
        text: '全部',
      },
      {
        state: '1',
        text: '待付款',
      },
      {
        state: '2',
        text: '已付款',
      },
    ],

    orderList: [],
  }),

  computed: {
    orderStatus() {
      return this.$route.query.type || '0';
    },
  },

  created() {
    this.getOrderList();
  },

  beforeRouteUpdate(to, from, next) {
    this.getOrderList(to).then(next);
  },

  methods: {
    changeOrderState(state) {
      this.$router.replace({ query: { type: state } });
    },

    getOrderList(route = this.$route) {
      this.$_pageMixin_showLoading();

      const state = Number(route.query.type);
      const api = state ? `/order?order_status=${state}` : '/order';
      const callback = ({ data }) => {
        this.orderList = data;
      };

      return this.$_pageMixin_http(api, callback);
    },
  },
};
</script>
<template>
  <AppPageWithTabbar class="order-list">
    <Tab
      class="order-list__tab"
      active-color="black"
    >
      <TabItem
        v-for="item in orderTypes"
        :key="item.state"
        :class="{
          'order-list__tab-item': true,
          'order-list__tab-item--active': item.state === orderStatus,
        }"
        @on-item-click="() => changeOrderState(item.state)"
      >
        {{ item.text }}
      </TabItem>
    </Tab>

    <ListItem
      v-for="order in orderList"
      :key="order.id"
      :data="order"
    />
  </AppPageWithTabbar>
</template>

<style lang="less">
.order-list {
  font-size: 14px;
}

.order-list .weui-tab__panel {
  padding-top: 51px;
}

.order-list .vux-tab-ink-bar {
  display: none !important;
}

.order-list__tab {
  position: fixed !important;
  z-index: 1;
  top: 0;
  width: 100%;
  margin-bottom: 0.5em !important;
}

.order-list__tab-item--active {
  color: black !important;
  background-color: @button-background-color !important;
}
</style>
