/**
 * @overview 用户中心路由
 */

import * as views from '@/views';

export default [
  {
    path: '/user',
    redirect: '/user/index',
  },

  {
    path: '/user/index',
    name: 'UserIndex',
    component: views.UserIndex,
    meta: {
      title: '个人中心',
    },
  },
  // 订单列表
  {
    path: '/user/order',
    name: 'UserOrderList',
    component: views.UserOrderList,
  },
  // 订单详情
  {
    path: '/user/order/:id',
    name: 'UserOrderDetail',
    component: views.UserOrderDetail,
  },
  {
    path: '/user/edit',
    name: 'UserEdit',
    component: views.UserEdit,
  },
  {
    path: '/user/activity-record',
    name: 'UserActivity',
    component: views.UserActivity,
  },
];
