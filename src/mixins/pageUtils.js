/**
 * @overview - 页面工具混入
 *
 * @author  huojinzhao
 */

export default {

  methods: {
    /**
     * @desc    显示loading
     * @param   {String}  text - 提示文字
     */
    $_pageMixin_showLoading(text) {
      this.$vux.loading.show({
        text: text || '加载中...',
      });
    },

    // 隐藏loading
    $_pageMixin_hideLoading() {
      this.$vux.loading.hide();
    },

    // 验证是否登录有效，无效跳转登录页
    $_pageMixin_checkSession({ status }) {
      if (status === 401) {
        const from = this.$route.fullpath;

        this.$router.push(`/sign-in?from=${from}`);
      }
    },
  },

  created() {
    this.$_pageMixin_showLoading();
  },
};
