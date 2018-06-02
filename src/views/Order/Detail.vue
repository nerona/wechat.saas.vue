<script>
/**
 * @overview 用户中心 - 订单详情
 *
 * @author huojinzhao
 */

import {
  Confirm,
  XButton,
} from 'vux';
import { pageUtils } from '@/mixins';
import OrderNote from './components/OrderNote';
import OrderCard from './components/OrderCard';

export default {
  name: 'UserOrderDetail',

  components: {
    Confirm,
    OrderNote,
    OrderCard,
    XButton,
  },

  mixins: [pageUtils],

  data: () => ({
    data: null,
  }),

  computed: {
    statusText() {
      if (!this.data) return null;

      return this.data.pay_count_down
        ? `${this.data.order_status_name} 剩余时间${this.data.pay_count_down}`
        : this.data.order_status_name;
    },
  },

  created() {
    this.getOrderDetail();
  },

  methods: {
    getOrderDetail(route = this.$route) {
      this.$_pageMixin_showLoading();

      const id = Number(route.params.id);
      const api = `/order/${id}`;
      const callback = ({ order }) => {
        this.data = order;

        if (this.$route.query.ispay) this.toPay();
      };

      return this.$_pageMixin_http(api, callback);
    },

    checkCancel() {
      this.$vux.confirm.show({
        title: '操作提示',
        content: '是否确认取消订单？',
        onCancel: this.onCancelAlert,
        onConfirm: this.onConfirmAlert,
      });
    },

    onCancelAlert() {
      this.$vux.confirm.hide();
    },

    onConfirmAlert() {
      this.toCancelOrder();
    },

    toCancelOrder(route = this.$route) {
      this.$_pageMixin_showLoading();

      const id = Number(route.params.id);
      const api = `/order/${id}/cancel`;
      const callback = () => {
        this.$router.replace('/order/list?type=0');
      };

      this.$_pageMixin_http(api, callback, 'patch')
        .then(this.onCancelAlert);
    },

    toRefund(route = this.$route) {
      const id = Number(route.params.id);

      this.$router.push(`/order/refund/${id}`);
    },

    toPay() {

    },
  },
};
</script>

<template>
  <AppPage
    v-if="data"
    class="order-detail"
  >
    <OrderNote :content="statusText"/>
    <OrderNote
      :content="data.student.name"
      label="学员姓名"
    />
    <OrderNote
      :content="data.order_type_name"
      label="订单类型"
    />

    <OrderCard
      :data="data"
      @click="toRefund"
    />

    <OrderNote
      v-if="Number(data.amount_pledge)"
      :content="data.amount_pledge"
      label="押金抵扣"
    />
    <OrderNote
      :content="data.amount_paid"
      label="实付金额"
    />

    <ul class="order-detail__message">
      <li>订单编号: {{ data.order_number }}</li>
      <li>下单时间: {{ data.created_at }}</li>
      <li>支付方式: {{ data.pay_type_name }}</li>
      <li>支付时间: {{ data.paid_at }}</li>
    </ul>

    <div
      v-if="data.pay_count_down"
      class="order-detail__footer"
    >
      <XButton
        text="取消订单"
        default
        @click.native.stop="() => checkCancel()"
      />
      <XButton
        type="primary"
        text="确定支付"
        @click.native.stop="() => toPay()"
      />
    </div>
  </AppPage>
</template>

<style lang="less">
@gutter-x: 20;
@bg-default: #ccc;
@margin: 6px 0;
@padding: 8px 14px;

.order-detail button[default] {
  background-color: @bg-default;
}

.order-detail__message {
  margin: @margin;
  padding: @padding;
  background-color: white;
  line-height: 1.25;
  font-size: 0.5em;
  color: @font-size-third-color;
  list-style: none;
}

.order-detail__footer {
  box-shadow: -3px -1px 5px #aaa;
  position: absolute;
  display: flex;
  z-index: 500;
  bottom: 0;
  width: 100%;
  background-color: #F7F7FA;
}

.order-detail__footer button {
  margin: 0 !important;
  border-radius: 0;
}
</style>
