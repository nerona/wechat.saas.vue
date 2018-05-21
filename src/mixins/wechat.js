/**
 *  @desc 微信相关jssdk
 *
 *  @author lindongfang
 *
*/

export default {
  created() {
    // this.$_wechatConfig();
  },
  method: {
    /**
     * @desc 微信配置
     *
     * */
    $_wechatConfig() {
      this.$vux.loading.show('加载中');
      // hash模式
      // const url = location.href.split('#')[0];
      const url = location.href;
      this.$http.post(`${url}js-sdk-config`, { url }).then((response) => {
        this.$vux.loading.hide();
        if (response.status === 200 && response.data.status === 1) {
          this.$wechat.config(JSON.parse(response.data.data));
          this.$wechat.ready(() => {});
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
     * @desc 调用微信支付接口
     *
     * */
    $_wechatPay(config) {
      this.$wechat.chooseWXPay({
        timestamp: config.timestamp, // 支付签名时间戳，最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: config.nonceStr, // 支付签名随机串，不长于 32 位
        package: config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: config.paySign, // 支付签名
        success(response) {
          // eslint-disable-next-line
          console.log(response);
          this.$vux.toast.show('支付成功');
          this.$rotuer.push('/curriculum/index');
        },
        cancel(re) {
          // eslint-disable-next-line
          console.log(re);
          this.$vux.toast.show({
            text: '支付已取消',
            type: 'cancel',
          });
        },
      });
    },

    /**
     * @desc 微信分享朋友圈接口
     *
     * @param title  分享标题
     * @param link  分享链接
     * @param imgUrl  分享图标
     *
     * */
    $_wechatShareTimeline(title, link, imgUrl) {
      this.$wechat.onMenuShareTimeline({
        title, // 分享标题
        link, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl, // 分享图标
        success() {
          this.$vux.$toast.bottom('分享成功');
        },
        cancel() {
          this.$vux.$toast.bottom('取消分享');
        },
      });
    },

     /**
     * @desc 微信分享好友接口
     *
     * @param title  分享标题
     * @param link  分享链接
     * @param imgUrl  分享图标
     * @param desc  分享描述
     *
     * */
    $_wechatShareAppMessage(title, link, imgUrl, desc) {
      this.$wechat.onMenuShareAppMessage({
        title, // 分享标题
        desc, // 分享描述
        link, // 分享链接，该链接域名必须与当前企业的可信域名一致
        imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        //                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success() {
          this.$vux.$toast.bottom('分享成功');
        },
        cancel() {
          this.$vux.$toast.bottom('取消分享');
        },
      });
    },

    /**
     *
     * @desc 获取地理位置接口
     *
     * @param title  分享标题
     * @param link  分享链接
     *
    */
    $_wechatLocation() {
      this.$wechat.ready(() => {
        this.$wechat.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            const speed = res.speed; // 速度，以米/每秒计
            const accuracy = res.accuracy; // 位置精度
            // eslint-disable-next-line
            console.log(latitude, longitude, speed, accuracy);
            const lnglatXY = [latitude, longitude]; // 已知点坐标
            this.$_geocoder(lnglatXY);
          },
        });
      });
    },
    /**
     *
     * @desc 逆向地理编码
     *
     *
    */
    $_geocoder(lnglatXY) {
      // eslint-disable-next-line
      console.log(lnglatXY);
      // const geocoder = new AMap.Geocoder({
      //   radius: 1000,
      //   extensions: 'all',
      // });
      // geocoder.getAddress(lnglatXY, (status, result) => {
      //   if (status === 'complete' && result.info === 'OK') {
      //     const address = result.regeocode.formattedAddress; // 返回地址描述
      //   }
      // });
    },

    /**
     *
     * @desc 关闭当前网页窗口接口
     *
    */
    $_wechatClose() {
      this.$wechat.closeWindow();
    },

    /**
     *
     * @desc 接口调用失败
     *
    */
    $_wechatError() {
      // this.$wechat.error((res) => {
        // `调用微信jsapi返回的状态:${res.errMsg}`;
      // });
    },
  },
};
