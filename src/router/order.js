/**
 * @overview 订单管理路由
 */

import * as views from '@/views';

export default [
  // 订单列表
  {
    path: '/order/list',
    name: 'UserOrderList',
    component: views.OrderList,
    meta: {
      title: '订单管理',
    },
  },
  // 订单详情
  {
    path: '/order/detail/:id',
    name: 'UserOrderDetail',
    component: views.OrderDetail,
    meta: {
      title: '订单详情',
    },
  },
  // 订单退费
  {
    path: '/order/refund/:id',
    name: 'UserOrderRefund',
    component: views.OrderRefund,
    meta: {
      title: '退款申请',
    },
  },
];
