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
];
