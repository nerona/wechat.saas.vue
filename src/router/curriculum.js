/**
 * @overview 课程中心路由
 */

import * as views from '@/views';

export default [
  {
    path: '/curriculum',
    redirect: '/curriculum/index',
  },

  {
    path: '/curriculum/index',
    name: 'CurriculumIndex',
    component: views.CurriculumIndex,
    meta: {
      title: '课程中心',
    },
  },
  {
    path: '/curriculum/detail/:id',
    name: 'CurriculumDetail',
    component: views.CurriculumDetail,
    meta: {
      title: '课程详情',
    },
  },
  {
    path: '/curriculum/order',
    name: 'CurriculumOrder',
    component: views.CurriculumOrder,
    meta: {
      title: '订单详情',
    },
  },
];
