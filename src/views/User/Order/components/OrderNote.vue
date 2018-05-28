<script>
/**
 * @overview 订单 - 详情便签
 *
 * @author huojinzhao
 */

export default {
  name: 'OrderNote',

  props: {
    label: {
      type: String,
      default: '',
    },

    content: {
      type: String,
      required: true,
    },

    isJoint: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    justify() {
      if (this.isJoint) return 'flex-start';

      return this.label ? 'space-between' : 'center';
    },
  },
};
</script>

<template>
  <div
    :style="{ 'justify-content': justify }"
    class="order-note"
  >
    <span
      v-if="isJoint"
    >
      {{ label }}: {{ content }}
    </span>

    <template v-else>
      <span v-if="label">{{ label }}</span>
      <span>{{ content }}</span>
    </template>
  </div>
</template>

<style lang="less">
@margin: 6px 0;
@padding: 8px 14px;

.order-note {
  display: flex;
  margin: @margin;
  padding: @padding;
  background-color: white;
}
</style>
