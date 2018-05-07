/**
 * @overview 学习中心路由
 */

import * as views from '@/views';

export default [
  {
    path: '/learn',
    redirect: '/learn/index',
  },

  {
    path: '/learn/index',
    name: 'LearnIndex',
    component: views.LearnIndex,
  },
];
