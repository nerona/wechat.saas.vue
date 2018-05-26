/**
 * @overview - http事务混入
 *
 * @author huojinzhao
 */

export default {

  methods: {
    /**
     * @desc 显示错误提示
     */
    $_alertError(error) {
      this.$_checkSession(error);

      const message = typeof error === 'object'
        ? this.$_resolveError(error) : error;

      this.$vux.toast.text(message);
    },

    /**
     * @desc 解析后端错误体
     */
    $_resolveError(body) {
      const message = body.errors
        ? this.$_resolveFirstMessage(body.errors)
        : body.message;

      return message;
    },

    /**
     * @desc 从body.error中解析出错误信息
     */
    $_resolveFirstMessage(errors) {
      const key = Object.keys(errors)[0];

      const message = errors[key] instanceof Array
        ? errors[key][0] : errors[key];

      return message;
    },

    // 验证是否登录有效，无效跳转登录页
    $_checkSession({ status }) {
      if (status === 401) {
        const from = this.$route.fullpath;

        this.$router.push(`/sign-in?from=${from}`);
      }
    },
  },
};
