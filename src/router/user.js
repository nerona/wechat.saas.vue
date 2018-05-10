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
  },
  {
    path: '/user/order/:type',
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
