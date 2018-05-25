<script>
/**
 * @overview 用户中心 - 订单列表
 *
 * @author huojinzhao
 */

import { Tab, TabItem } from 'vux';
import { pageUtils, formUtils } from '@/mixins';
import OrderItem from './OrderItem';

export default {
  name: 'UserOrder',

  components: {
    Tab,
    TabItem,
    OrderItem,
  },

  mixins: [pageUtils, formUtils],

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

      return this.$http.get(api)
        .then(({ data }) => {
          this.orderList = data;
        })
        .catch((error) => {
          this.$_pageMixin_checkSession(error);
          this.$_formMixin_alertError(error);
        })
        .then(this.$_pageMixin_hideLoading);
    },
  },
};
</script>
<template>
  <AppPageWithTabbar class="user-order">
    <Tab
      class="user-order__tab"
      active-color="black"
    >
      <TabItem
        v-for="item in orderTypes"
        :key="item.state"
        :class="{
          'user-order__tab-item': true,
          'user-order__tab-item--active': item.state === $route.params.type,
        }"
        @on-item-click="() => changeOrderState(item.state)"
      >
        {{ item.text }}
      </TabItem>
    </Tab>

    <OrderItem
      v-for="order in orderList"
      :key="order.id"
      :data="order"
    />
  </AppPageWithTabbar>
</template>

<style lang="less">
.user-order {
  font-size: 14px;
}

.user-order .weui-tab__panel {
  padding-top: 51px;
}

.user-order .vux-tab-ink-bar {
  display: none !important;
}

.user-order__tab {
  position: fixed !important;
  z-index: 1;
  top: 0;
  width: 100%;
  margin-bottom: 0.5em !important;
}

.user-order__tab-item--active {
  color: black !important;
  background-color: @button-background-color !important;
}
</style>
