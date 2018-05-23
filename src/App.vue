<script>
/**
 * @overview 应用入口组件
 */

export default {
  name: 'App',
  created() {
    // 记录进入路由
    localStorage.setItem('linkUrl', location.origin + this.$router.currentRoute.fullPath);
  },
};
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
  background-color: #efeff4;
}
</style>
