<script>
/**
 * @overview 订单详情 - 便签组件
 *
 * @author huojinzhao
 */

export default {
  name: 'DetailNote',

  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div
    :style="{
      'justify-content': data.length === 1
        ? 'center'
        : 'space-between'
    }"
    class="order-detail-note"
  >
    <span
      v-for="item in data"
      :key="item"
    >
      {{ item }}
    </span>
  </div>
</template>

<style lang="less">
@margin: 6px 0;
@padding: 8px 14px;

.order-detail-note {
  display: flex;
  margin: @margin;
  padding: @padding;
  background-color: white;
}
</style>
