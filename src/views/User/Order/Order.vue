<script>
/**
 * @overview 用户中心 - 编辑资料
 *
 * @author
 */

import { Tab, TabItem } from 'vux';

export default {
  name: 'UserOrder',
  components: {
    Tab,
    TabItem,
  },
  data() {
    return {

    };
  },
  methods: {
    onItemClick() {},
  },
};
</script>
<template>
  <AppPage class="user-order">
    <tab bar-position="bottom">
      <tab-item
        :selected="$route.params.type==='0'"
        @on-item-click="onItemClick">全部</tab-item>
      <tab-item
        :selected="$route.params.type==='1'"
        @on-item-click="onItemClick">代付款</tab-item>
      <tab-item
        :selected="$route.params.type==='2'"
        @on-item-click="onItemClick">已付款</tab-item>
    </tab>
  </AppPage>
</template>
<style lang="less">

</style>
