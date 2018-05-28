<script>
/**
 * @overview 用户中心 - 订单项
 *
 * @author huojinzhao
 */

import {
  XButton,
} from 'vux';

export default {
  name: 'UserOrderItem',

  components: {
    XButton,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    toDetail() {
      this.$router.push(`/user/order/${this.data.id}`);
    },

    toPay() {
      this.$router.push(`/user/order/${this.data.id}?ispay=true`);
    },
  },
};
</script>

<template>
  <div class="order-item">
    <div class="order-item__header">
      <span>{{ data.order_type_name }}</span>
      <span
        :style="
          data.order_status_name === '待支付'
            ? { color: 'red' } : ''
        "
      >{{ data.order_status_name }}</span>
    </div>
    <div
      class="order-item__body"
      @click="toDetail"
    >
      <div
        :style="{
          'background-image': `url(${data.course_packet.cover_url})`
        }"
        class="order-item__avatar"
      />
      <ul class="order-item__info">
        <li>{{ data.course_packet.name }}</li>
        <li>{{ data.created_date }}</li>
        <li>课程金额: <span>￥{{ data.amount_paid }}</span></li>
      </ul>
    </div>
    <div
      v-if="data.pay_count_down"
      class="order-item__footer"
    >
      <XButton
        type="primary"
        text="去支付"
        mini
        @click.native="() => toPay()"
      />
    </div>
  </div>
</template>

<style lang="less">
@gutter-y: 10;
@gutter-x: 20;
@bg-default: #999;
@color-split: lighten(@border-line-color, 20%);

.order-item {
  margin-bottom: 0.6em;
  background-color: white;
}

.order-item__header,
.order-item__body,
.order-item__footer {
  display: flex;
  padding: px2vw(@gutter-y) px2vw(@gutter-x);
}

.order-item__body,
.order-item__footer {
  border-top: 1px solid @color-split;
}

.order-item__header {
  color: @font-size-second-color;
  justify-content: space-between;
  align-items: stretch;
}

.order-item__header > span:first-child {
  display: inline-block;
}

.order-item__header > span:first-child::after {
  content: '';
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  border-right: 2px solid @font-size-second-color;
  border-top: 2px solid @font-size-second-color;
  transform: rotateZ(45deg);
}

.order-item__info {
  display: flex;
  flex-direction: column;
}

.order-item__info > li {
  list-style: none;
}

.order-item__info > li:first-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item__info > li:nth-child(2) {
  color: @font-size-third-color;
  font-size: 0.9em;
}

.order-item__info > li:last-child {
  margin-top: auto;
}

.order-item__info > li:last-child > span {
  font-size: 1.2em;
}

.order-item__avatar {
  flex-shrink: 0;
  background-size: 100% 100%;
  margin-right: px2vw(@gutter-x);
  height: px2vw(160);
  width: px2vw(160);
  background-color: @bg-default;
}

.order-item__info {
  flex: auto;
  min-width: 0;
}

.order-item__footer {
  justify-content: flex-end;
}

.order-item__footer .weui-btn {
  margin: 0;
}
</style>
