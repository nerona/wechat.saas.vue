<script>
/**
 * @overview 订单 - 详情卡片
 *
 * @author huojinzhao
 */

import { XButton } from 'vux';

export default {
  name: 'OrderCard',

  components: {
    XButton,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },

    showControl: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<template>
  <div class="order-card">
    <div
      :style="{
        'background-image': `url(${data.course_packet.cover_url})`
      }"
      class="order-card__avatar"
    />
    <ul class="order-card__content">
      <li>{{ data.course_packet.name }}</li>
      <li>课程金额: <span>￥{{ data.amount_paid }}</span></li>
      <li
        v-if="data.is_can_refund"
        class="order-card__refund-control"
      >
        <XButton
          v-if="showControl"
          :text="data.order_refund ? '查看' : '退款'"
          type="primary"
          default
          mini
          @click.native="() => $emit('click')"
        />
        <span class="order-card__refund-status">
          {{
            data.order_refund
              && data.order_refund.order_refund_status_name
          }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
@gutter-x: 20;
@bg-default: #ccc;
@margin: 6px 0;
@padding: 8px 14px;

.order-note {
  font-size: 14px;
  color: @font-size-second-color;
}

.order-card {
  display: flex;
  margin: @margin;
  padding: @padding;
  background-color: white;
}

.order-card__avatar {
  flex-shrink: 0;
  background-size: 100% 100%;
  margin-right: px2vw(@gutter-x);
  height: px2vw(140);
  width: px2vw(140);
  background-color: @bg-default;
}

.order-card__content {
  list-style: none;
  flex: auto;
  min-width: 0;
  line-height: 1.75;
  font-size: 12px;
}

.order-card__content > li:first-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-card__refund-status {
  color: @font-size-error-color;
}

.order-card__refund-control {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
}

.order-card__refund-control button {
  margin: 0;
  padding: 0;
  width: 4em !important;
  font-size: 12px;
}
</style>
