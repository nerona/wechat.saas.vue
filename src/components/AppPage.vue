<script>
/**
 * @overview 不带tabbar的页面容器
 *
 * @author  lindongfnag
 */
import { ViewBox } from 'vux';

export default {
  name: 'AppPage',
  components: {
    ViewBox,
  },
  props: {},
  data() {
    return {};
  },
  created() {},
};
</script>

<template>
  <view-box ref="viewBox">
    <!-- <x-header
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"/> -->

    <slot/>

    <slot
      slot="bottom"
      name="bottom"
    />
  </view-box>
</template>

<style lang="less">

</style>
