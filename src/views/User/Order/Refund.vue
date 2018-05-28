<script>
/**
 * @overview 订单 - 订单退费
 *
 * @author huojinzhao
 */

import {
  Confirm,
  XButton,
  XTextarea,
} from 'vux';
import { pageUtils } from '@/mixins';
import OrderNote from './components/OrderNote';
import OrderCard from './components/OrderCard';

const dataInit = () => {
  const devData = {
    order_refund: {
      amount_refund: '50.00',
      refunded_at: '2018-05-23 16:23:08', // 退款时间
      refund_reason: '同意退款',
      created_at: '2018-05-23 10:51:25', // 退款申请时间
      pay_type_name: '微信支付',
      order_refund_status_name: '退款成功',
    },
  };

  return process.env.NODE_ENV === 'development' ? devData : null;
};

export default {
  name: 'UserOrderRefund',

  components: {
    Confirm,
    XButton,
    XTextarea,
    OrderNote,
    OrderCard,
  },

  mixins: [pageUtils],

  data: () => ({
    data: dataInit(),

    fdata: {
      reason: '',
    },

    submitLoading: false,
  }),


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
      };

      return this.$_pageMixin_http(api, callback);
    },

    v_submit() {
      const api = `/order/${this.data.id}/refund`;
      const callback = () => {
        this.$router.replace(`/user/order/${this.data.id}`);
      };

      this.$_pageMixin_http(api, callback, 'post', this.fdata);
    },
  },
};
</script>

<template>
  <div
    v-if="data"
    class="order-refund"
  >
    <OrderCard
      :data="data"
      :show-control="false"
    />
    <OrderNote
      :content="
        Number(data.order_refund.amount_refund)
          ? data.order_refund.amount_refund
          : '申请提交后，客服将联系您退款相关事宜'
      "
      label="退款金额"
      is-joint
    />
    <!-- 有退款详情的时候才显示 -->
    <OrderNote
      v-if="data.order_refund"
      :content="data.order_refund.created_at"
      label="申请时间"
      is-joint
    />

    <!-- 退款成功才显示 -->
    <template
      v-if="
        data.order_refund
          && order_refund_status_name === '退款成功'
      "
    >
      <OrderNote
        :content="data.order_refund.refunded_at"
        label="退款时间"
        is-joint
      />
      <!-- 缺少控制字段 -->
      <OrderNote
        :content="data.order_refund.pay_type_name"
        label="退款方式"
        is-joint
      />
      <OrderNote
        :content="data.order_refund.refund_reason"
        label="退款理由"
        is-joint
      />
    </template>

    <!-- 没有退款信息 || 退款失败 才显示 -->
    <template
      v-if="
        !data.order_refund
          && order_refund_status_name === '退款失败'
      "
    >
      <XTextarea
        v-model="fdata.refund_reason"
        :row="4"
        autosize
        placeholder="请填写退款理由...（选填）"
      />

      <XButton
        :show-loading="submitLoading"
        :text="!data.order_refund ? '申请退款' : '重新申请'"
        class="order-refund__confirm"
        type="primary"
        @click.native="() => v_submit()"
      />
    </template>
  </div>
</template>

<style lang="less">
@padding: 8px 14px;

.order-refund {
  padding: 6px 0;
}

.order-refund .vux-x-textarea {
  padding: 0;
}

.order-refund .weui-cell__bd textarea {
  box-sizing: border-box;
  padding: @padding;
}

.order-refund__confirm {
  margin: px2vw(40) px2vw(20) 0 px2vw(20);
  width: px2vw(710) !important;
}
</style>
