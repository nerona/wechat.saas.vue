/**
 * @overview - 页面工具混入
 *
 * @author  huojinzhao
 */

import httpUtils from './httpUtils';

export default {

  mixins: [httpUtils],

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
    $_pageMixin_checkSession(body) {
      this.$_checkSession(body);
    },

    // 请求数据的统一方法
    $_pageMixin_http(url, callback, method = 'get') {
      this.$_pageMixin_showLoading();

      return this.$http[method](url)
        .then(callback)
        .catch((error) => {
          this.$_pageMixin_checkSession(error);
          this.$_alertError(error);
        })
        .then(this.$_pageMixin_hideLoading);
    },
  },
};
