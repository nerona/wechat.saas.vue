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
  {
    path: '/user/order',
    name: 'UserOrder',
    component: views.UserOrder,
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
