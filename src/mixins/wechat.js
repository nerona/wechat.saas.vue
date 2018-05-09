/**
 *  @desc 微信相关jssdk
 *
 *  @author lindongfang
 *
*/

export default {
  created() {
    // this.wechatConfig();
  },
  method: {
    /**
     * @desc 微信配置
     *
     * */
    wechatConfig() {
      this.$vux.loading.show('加载中');
      // hash模式
      // const url = location.href.split('#')[0];
      const url = location.href;
      this.$http.post(`${url}js-sdk-config`, { url }).then((response) => {
        this.$vux.loading.hide();
        if (response.status === 200 && response.data.status === 1) {
          this.$wechat.config(JSON.parse(response.data.data));
        } else {
          this.$vux.toast.show({
            text: '微信参数错误',
            type: 'cancel',
          });
        }
      }).catch(() => {
        this.$vux.loading.hide();
      });
    },

    /**
     * @desc 调用微信支付
     *
     * */
    wechatPay(config) {
      this.$wechat.chooseWXPay({
        timestamp: config.timestamp, // 支付签名时间戳，最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
        package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: config.paySign, // 支付签名
        success(response) {
          console.log(response);
          this.$vux.toast.show('支付成功');
          this.$rotuer.push('/curriculum/index');
        },
        cancel(re) {
          console.log(re);
          this.$vux.toast.show({
            text: '支付已取消',
            type: 'cancel',
          });
        },
      });
    },
  },
};
