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
import DetailNote from './DetailNote';

export default {
  name: 'UserOrderDetail',

  components: {
    Confirm,
    DetailNote,
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
        this.$router.replace('/user/order?type=0');
      };

      this.$_pageMixin_http(api, callback, 'patch')
        .then(this.onCancelAlert);
    },

    toRefund() {

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
    <DetailNote :data="[statusText]"/>
    <DetailNote :data="['学员姓名', data.student.name]"/>
    <DetailNote :data="['订单类型', data.order_type_name]"/>

    <div class="order-detail__info">
      <div
        :style="{
          'background-image': `url(${data.course_packet.cover_url})`
        }"
        class="order-detail__avatar"
      />
      <ul class="order-detail__introduce">
        <li>{{ data.course_packet.name }}</li>
        <li>课程金额: <span>￥{{ data.amount_paid }}</span></li>
        <li
          v-if="data.is_can_refund"
          class="order-detail__introduce__control"
        >
          <XButton
            v-if="data.order_refund"
            type="primary"
            text="查看"
            default
            mini
            @click.native="() => toCheck()"
          />
          <XButton
            v-else
            type="primary"
            text="退款"
            default
            mini
            @click.native="() => toRefund()"
          />
          <span>退费中</span>
        </li>
      </ul>
    </div>

    <DetailNote
      v-if="Number(data.amount_pledge)"
      :data="['押金抵扣',data.amount_pledge]"
    />
    <DetailNote :data="['实付金额', data.amount_paid]"/>

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

.order-detail__info {
  display: flex;
  margin: @margin;
  padding: @padding;
  background-color: white;
}

.order-detail__introduce {
  list-style: none;
  flex: auto;
  min-width: 0;
  font-size: 12px;
}

.order-detail__introduce > li:first-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-detail__introduce > li:last-child > span {
  color: @font-size-error-color;
}

.order-detail__introduce__control {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.order-detail__introduce__control button {
  margin: 0;
  padding: 0;
  width: 4em !important;
  font-size: 12px;
}

.order-detail__avatar {
  flex-shrink: 0;
  background-size: 100% 100%;
  margin-right: px2vw(@gutter-x);
  height: px2vw(160);
  width: px2vw(160);
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
