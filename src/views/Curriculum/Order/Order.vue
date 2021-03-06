<script>
/**
 * @overview 订单详情
 *
 * @author  lindongfnag
 */

import { pageUtils } from '@/mixins';
import { Cell, Group, Popup } from 'vux';

import Childs from './Childs';
import Voucher from './Voucher';

export default {
  name: 'CurriculumOrder',
  components: {
    Cell,
    Group,
    Popup,
    Childs,
    Voucher,
  },
  mixins: [pageUtils],

  data() {
    return {
      product: {
        price: '0.00',
      },
      // 小孩
      childs: [],
      childValue: '',
      childId: '',
      showChilds: false,
      // 优惠券
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
    this.getInherit();
    this.getChilds();

    // 优惠券
    // if (this.vouchers.length > 0) {
    //   this.vouchersValue = this.vouchers[0].price;
    // }
  },

  methods: {
    getInherit() {
      this.$_pageMixin_http(`/course_packet/surface/${this.$route.query.course_packet_id}`, (res) => {
        this.product = res;
      });
    },
    getChilds() {
      this.$_pageMixin_http('/student', (res) => {
        this.childs = res.students;
         // 小孩
        if (this.childs.length > 0) {
          this.childValue = this.childs[0].name;
          this.childId = this.childs[0].id;
        }
      });
    },
    // 添加小孩
    addChild() {
      this.$router.push('/learn/kid');
    },
    // 跳出选择小孩弹窗
    chooseChild() {
      this.showChilds = true;
    },
    // 更新选中小孩
    updateChild(id) {
      this.showChilds = false;
      this.childId = id;
      this.childs.forEach((item) => {
        if (item.id === id) {
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

      const cb = (res) => {
        // eslint-disable-next-line
        console.log(res);
        this.$vux.toast.show({
          text: '订单创建成功',
          type: 'success',
          position: 'middle',
        });

        // 微信config
        const url = /(Android)/i.test(navigator.userAgent) ?
                    location.href : localStorage.getItem('linkUrl');

        this.$http.post('/bind/jssdk', { url }).then((config) => {
          this.$wechat.config(config);
        }).then(() => {
          // 调用支付;
          // this.wechatPay(res);
        });
      };

      this.$_pageMixin_http('/order', cb, 'post', {
        department_id: Number.parseInt(this.$route.query.department_id, 10),
        curriculum_id: Number.parseInt(this.$route.query.curriculum_id, 10),
        course_packet_id: Number.parseInt(this.$route.query.course_packet_id, 10),
        student_id: this.childId,
      });
    },

    // 生成试听订单
    listenOrder() {
      this.$_pageMixin_http('/order', () => {
        this.$router.push('/order/list?type=0');
      }, 'post', {
        department_id: Number.parseInt(this.$route.query.department_id, 10),
        curriculum_id: Number.parseInt(this.$route.query.curriculum_id, 10),
        course_packet_id: Number.parseInt(this.$route.query.course_packet_id, 10),
        student_id: this.childId,
      });
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
        <img :src="product.cover_url">
      </div>
      <div class="curriculum-order-info__desc">
        <div class="curriculum-order-info-desc__name">{{ product.name }}</div>
        <div class="curriculum-order-info-desc__price">
          <span v-if="product.price === '0.00' || product.price === null">
            ￥{{ product.original_price }}
          </span>
          <span v-else>
            ￥{{ product.price }}
          </span>
        </div>
      </div>
    </div>

    <group>
      <cell
        :value="product.category_type === 1 ? '正常课程' : '试听课程'"
        title="订单类型"/>
    </group>
    <group>
      <cell
        v-if="product.category_type === 1"
        value="￥0.00"
        title="押金抵扣"/>
    </group>
    <!-- <group>
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
    </group> -->
    <group v-if="product.category_type === 1">
      <cell
        v-if="product.price === '0.00' || product.price === null"
        :value="`￥${product.original_price}`"
        class="curriculum-order-cur-price"
        title="课程金额"/>
      <cell
        v-else
        :value="`￥${product.price}`"
        class="curriculum-order-cur-price"
        title="课程金额"/>
    </group>

    <!-- 支付方式 -->
    <group
      v-if="product.category_type === 1"
      title="支付方式">
      <cell style="padding: 15px 15px;">
        <img
          slot="icon"
          width="120"
          style="display:block;margin-right:5px;"
          src="./../../../assets/wepay.png">
      </cell>
    </group>

    <!-- 支付 -->
    <div
      slot="bottom"
      class="curriculum-order-pay">
      <div
        v-if="product.category_type === 1"
        class="curriculum-order-pay__amount">
        实付金额:
        <span v-if="product.price === '0.00' || product.price === null">
          ￥ {{ product.original_price }}元
        </span>
        <span v-else>
          ￥ {{ product.price }}元
        </span>
      </div>
      <div
        v-if="product.category_type === 1"
        class="curriculum-order-pay__sure"
        @click="createOrder">去支付</div>
      <div
        v-else
        class="curriculum-order-pay__sure"
        @click="listenOrder">完成</div>
    </div>

    <!-- 选择小孩 -->
    <div
      v-transfer-dom>
      <popup
        v-model="showChilds"
        position="bottom"
        height="100%">
        <childs
          v-if="showChilds"
          :child-value="childValue"
          :childs="childs"
          @updateChild="updateChild"
        />
      </popup>
    </div>

    <!-- 优惠券 -->
    <voucher
      :show-vouchers="showVouchers"
      :vouchers="vouchers"
      @updateVoucher="updateVoucher" />
  </app-page>
</template>

<style lang="less">
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
  margin-right: px2vw(28);
  img {
    width: px2vw(160);
  }
}
.curriculum-order-info__desc {
  flex: 1;
  font-size: px2vw(34);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.curriculum-order-info-desc__name {
  letter-spacing: px2vw(2);
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.curriculum-order-info-desc__price,
.curriculum-order-cur-price .weui-cell__ft,
.curriculum-order-pay__amount > span {
  color: #e60012;
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
  background-color: #efefef;
  box-shadow: 0 -1px 5px #999;
}
.curriculum-order-pay__sure {
  background-color: #ccc;
  text-align: center;
  width: 30%;
  letter-spacing: 1px;
  margin-left: px2vw(30);
  background-color: #ffd900;
}
</style>
