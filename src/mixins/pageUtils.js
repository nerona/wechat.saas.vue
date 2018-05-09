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
  },

  created() {
    this.$_pageMixin_showLoading();
  },
};
