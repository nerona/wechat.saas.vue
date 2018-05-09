<script>
/**
 * @overview 优惠券
 *
 * @author  lindongfnag
 */

import { Popup } from 'vux';

export default {
  name: 'OrderVouchers',
  components: {
    Popup,
  },
  props: {
    showVouchers: {
      type: Boolean,
      default: () => (false),
    },
    vouchers: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      selected: null,
    };
  },
  created() {
  },
  methods: {
    updateVoucher(item) {
      if (item.status === 0) {
        this.$vux.toast.show({
          text: '代金券已过期！',
          type: 'text',
        });
        return;
      }
      this.selected = item.id;
      this.$emit('updateVoucher', item.id);
    },
  },
};
</script>
<template>
  <div
    v-transfer-dom>
    <popup
      v-model="showVouchers"
      position="bottom"
      height="100%">

      <div class="order-vouchers">
        <div
          v-for="item in vouchers"
          :key="item.id"
          :class="{'order-vouchers-item--active': selected===item.id}"
          class="order-vouchers-item"
          @click="updateVoucher(item)">
          <div class="order-vouchers-item__status vux-1px-b">
            {{ item.status_name }}
          </div>
          <div class="order-vouchers-item__content vux-1px-b">
            <div class="order-vouchers-item-content__left">
              ￥{{ item.price }}
            </div>
            <div class="order-vouchers-item-content__right">
              <div style="font-weight:bold;">{{ item.range }}</div>
              <div style="margin-top:4px;">满￥{{ item.base_price }}可用</div>
            </div>
          </div>

          <div
            :class="{'order-vouchers-animate': true}"
            class="order-vouchers-item__rule"
          >
            {{ item.rule }}
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>

<style lang="less">
.order-vouchers {
  padding: px2vw(40) px2vw(20);
}
.order-vouchers-item {
  background-color: #fff;
  margin-bottom: px2vw(24);
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: px2vw(30);
}
.order-vouchers-item--active {
  border-color: red;
}
.order-vouchers-item__status {
  line-height: px2vw(60);
  text-align: right;
  padding:0 px2vw(20);
  letter-spacing: 1px;
  color: #ccc;
}
.order-vouchers-item__content {
  padding:0 px2vw(20);
  display: flex;
}
.order-vouchers-item-content__left {
  font-size: px2vw(64);
  font-weight: bold;
  padding:  px2vw(40) 0;
  width: 32%;
}
.order-vouchers-item-content__right {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}
.order-vouchers-item__rule {
  padding: px2vw(16) px2vw(20);
  text-align: justify;
  overflow: hidden;
  max-height: 0;
  transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
}
.order-vouchers-animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
