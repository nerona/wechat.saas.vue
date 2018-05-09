<script>
/**
 * @overview 订单详情
 *
 * @author  lindongfnag
 */

import { wechat } from '@/mixins';
import { Cell, Group } from 'vux';
import Childs from './Childs';
import Voucher from './Voucher';

export default {
  name: 'CurriculumOrder',
  components: {
    Cell,
    Group,
    Childs,
    Voucher,
  },
  mixins: [wechat],

  data() {
    return {
      childs: [{
        id: 1,
        src: 'http://placeholder.qiniudn.com/150x150/8AEEB1/fff',
        name: '张晓1',
      },
      {
        id: 2,
        src: 'http://placeholder.qiniudn.com/150x150/8AEEB1/fff',
        name: '张晓2',
      }],
      childValue: '',
      showChilds: false,
      vouchersValue: '',
      showVouchers: false,
      vouchers: [
        {
          id: 1,
          range: '2018-05-05至2018-05-06',
          status: 0, // 已过期，可使用
          status_name: '已过期',
          price: 100,
          base_price: 2990,
          rule: '一次只能使用一张，订单会自动匹配最佳优惠券。一次只能使用一张，订单会自动匹配最佳优惠券。',
        },
        {
          id: 2,
          range: '2018-05-05至2018-05-06',
          status: 1, // 已过期，可使用
          status_name: '可使用',
          price: 500,
          base_price: 2990,
          rule: '一次只能使用一张，订单会自动匹配最佳优惠券。一次只能使用一张，订单会自动匹配最佳优惠券。',
        },
      ],
    };
  },

  created() {
    if (this.childs.length > 0) {
      this.childValue = this.childs[0].name;
    }
    if (this.vouchers.length > 0) {
      this.vouchersValue = this.vouchers[0].price;
    }
  },

  methods: {
    // 添加小孩
    addChild() {
      alert('go add child');
      // this.$router.push('/learn/addchild')
    },
    // 跳出选择小孩弹窗
    chooseChild() {
      this.showChilds = true;
    },
    // 更新选中小孩
    updateChild(e) {
      this.showChilds = false;
      this.childs.forEach((item) => {
        if (item.id === e) {
          this.childValue = item.name;
        }
      });
    },
    // 选择优惠券
    chooseVoucher() {
      this.showVouchers = true;
    },
    // 更新选中优惠券
    updateVoucher(e) {
      this.showVouchers = false;
      this.vouchers.forEach((item) => {
        if (item.id === e) {
          this.vouchersValue = item.price;
        }
      });
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
  },
};
</script>

<template>
  <app-page class="curriculum-order">
    <div class="curriculum-order-block"/>
    <group gutter="0">
      <cell
        v-if="childs.length == 0"
        value="暂无小孩去添加"
        title="小孩姓名"
        is-link
        @click.native="addChild"/>
      <cell
        v-else
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
        v-if="vouchers.length === 0"
        value="无可用"
        title="优惠券"
        is-link
      />
      <cell
        v-else
        :value="`￥${vouchersValue}`"
        title="优惠券"
        is-link
        @click.native="chooseVoucher"/>
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

    <!-- 选择小孩 -->
    <childs
      :show-childs="showChilds"
      :childs="childs"
      @updateChild="updateChild"
    />

    <!-- 优惠券 -->
    <voucher
      :show-vouchers="showVouchers"
      :vouchers="vouchers"
      @updateVoucher="updateVoucher" />
  </app-page>
</template>

<style lang="less">
@group-title-margin-top: px2vw(24);
.curriculum-order {}
.curriculum-order-block {
  width: 100%;
  height: px2vw(24);
  background: transparent;
}
.curriculum-order-info {
  margin-top: px2vw(40);
  background-color: #fff;
  display: flex;
  padding: px2vw(24)
}
.curriculum-order-info__thumb {
  margin-right: px2vw(24);
}
.curriculum-order-info__desc {
  flex: 1;
  font-size: px2vw(32);
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
  height: px2vw(100);
  line-height: px2vw(100);
  display: flex;
  justify-content: flex-end;
  background-color: #fff;
}
.curriculum-order-pay__sure {
  background-color: #ccc;
  text-align: center;
  width: 30%;
  letter-spacing: 1px;
  margin-left: px2vw(30);
}
</style>
