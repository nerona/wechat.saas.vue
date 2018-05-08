<template>
  <view-box ref="viewBox">
    <!-- <x-header
      slot="header"
      style="width:100%;position:absolute;left:0;top:0;z-index:100;"/> -->

    <slot/>
  </view-box>
</template>
<script>
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
<style lang="less">

</style>
