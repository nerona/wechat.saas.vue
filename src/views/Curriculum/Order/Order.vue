<template>
  <app-page class="curriculum-order">
    <div class="curriculum-order-block"/>
    <group gutter="0">
      <cell
        :value="childValue"
        title="小孩姓名"
        is-link
        @click.native="chooseChild"/>
    </group>

    <!-- 课程信息 -->
    <div class="curriculum-order-info">
      <div class="curriculum-order-info__thumb">
        <img src="http://placeholder.qiniudn.com/100x80/FF3B3B/fff">
      </div>
      <div class="curriculum-order-info__desc">
        <div class="curriculum-order-info-desc__name">秋季自然拼读</div>
        <div class="curriculum-order-info-desc__price">￥2800</div>
      </div>
    </div>

    <group>
      <cell
        value="试听课程"
        title="订单类型"/>
    </group>
    <group>
      <cell
        value="0.00"
        title="押金抵扣"/>
    </group>
    <group>
      <cell
        value="无可用"
        title="优惠券"
        is-link/>
    </group>
    <group>
      <cell
        value="2880.00"
        title="课程金额"/>
    </group>

    <!-- 支付方式 -->
    <group title="支付方式">
      <cell
        title="微信支付"
        inline-desc="微信安全支付">
        <img
          slot="icon"
          width="60"
          style="display:block;margin-right:5px;"
          src="http://placeholder.qiniudn.com/80x60/8AEEB1/fff">
      </cell>
    </group>

    <!-- 支付 -->
    <div class="curriculum-order-pay">
      <div class="curriculum-order-pay__amount">实付金额: ￥2800</div>
      <div
        class="curriculum-order-pay__sure"
        @click="createOrder">去支付</div>
    </div>

  </app-page>
</template>
<script>
import { Cell, Group } from 'vux';

export default {
  name: 'CurriculumOrder',
  components: {
    Cell,
    Group,
  },

  data() {
    return {
      childValue: '请选择',
      list: [{
        src: 'http://somedomain.somdomain/x.jpg',
        fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
        title: '暑期进阶课程-1',
        desc: '￥2800',
      }],
    };
  },

  created() {
    // this.wechatConfig();
  },

  methods: {
    // 微信配置
    wechatConfig() {
      this.$vux.loading.show('加载中');
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

    // 选择小孩
    chooseChild() {
      console.log(1);
    },

    // 生成订单
    createOrder() {
      if (this.childValue === '请选择') {
        this.$vux.toast.show({
          text: '请选择小孩',
          type: 'cancel',
          position: 'middle',
        });
        return;
      }
      if (this.childValue === '暂无小孩去添加') {
        this.$vux.toast.show({
          text: '请先添加小孩',
          type: 'cancel',
          position: 'middle',
        });
        return;
      }
      // const order = {
      //   id: '',
      //   create_time: Date.parse(new Date()),
      // };
      // this.$vux.loading.show({ text: '创建订单中' });
      this.$vux.toast.show({
        text: '创建订单',
        type: 'success',
        position: 'middle',
      });

      // const url = location.href;
      // this.$http.post(`${url}create-order`, order).then((response) => {
      //   this.$vux.loading.hide();
      //   if (response.status === 200 && response.data.status === 1) {
      //     this.wechatPay(response.data.data);
      //   } else {
      //     this.$vux.alert.show({
      //       title: '创建订单失败',
      //       content: response.data.message,
      //     });
      //   }
      // }).catch((error) => {
      //   console.error(error);
      //   this.$vux.loading.hide();
      //   this.$vux.toast.show({
      //     text: '网络错误',
      //     type: 'cancel',
      //   });
      // });
    },

    // 调用微信支付
    goPay(config) {
      alert('pay');
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
</script>
<style lang="less">
@group-title-margin-top: 12px;
.curriculum-order {

}
.curriculum-order-block {
  width: 100%;
  height: 12px;
  background: transparent;
}
.curriculum-order-info {
  margin-top: 20px;
  background-color: #fff;
  display: flex;
  padding: 12px
}
.curriculum-order-info__thumb {
  margin-right: 12px;
}
.curriculum-order-info__desc {
  flex: 1;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: bold;
}
.curriculum-order-info-desc__name {
  letter-spacing: 1px;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.curriculum-order-pay {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
}
.curriculum-order-pay__sure {
  background-color: #ccc;
  text-align: center;
  width: 30%;
  letter-spacing: 1px;
  margin-left: 15px;
}
</style>
