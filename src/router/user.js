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
    path: '/user/edit',
    name: 'UserEdit',
    component: views.UserEdit,
    meta: {
      title: '个人信息',
    },
  },
  {
    path: '/user/activity-record',
    name: 'UserActivity',
    component: views.UserActivity,
    meta: {
      title: '活动记录',
    },
  },
];
