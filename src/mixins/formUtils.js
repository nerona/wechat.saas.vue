/**
 * @overview - 表单工具混入
 *
 * @author huojinzhao
 *
 * @desc 验证部分：当前仅支持字段填写验证
 */

export default {

  methods: {
    /**
     * @desc 表单验证
     *
     * @param   data  {Object}  表单数据
     * @param   rules {Object}  键名和data相同的信息描述
     */
    $_formMixin_validateForm(data, rules) {
      const result = Object.keys(rules)
        .every(key => this.$_formMixin_validateProp(data[key], rules[key]));

      return result;
    },

    /**
     * @desc 字段值校验
     *
     * @param   value   字段对应值
     * @param   mse     验证失败信息
     */
    $_formMixin_validateProp(value, message) {
      const bool = value instanceof Array
        ? !!value.length
        : Boolean(value);

      if (!bool) this.$_formMixin_alertError(message);

      return bool;
    },

    /**
     * @desc 错误信息回显
     *
     * @param { Object | string } error
     */
    $_formMixin_alertError(error) {
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
