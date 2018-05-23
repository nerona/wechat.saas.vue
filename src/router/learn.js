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
    meta: {
      title: '学习中心',
    },
  },
  {
    path: '/learn/kid',
    name: 'LearnKid',
    component: views.LearnKid,
    meta: {
      title: '添加小孩',
    },
  },
  {
    path: '/learn/edit/:id',
    name: 'LearnEdit',
    component: views.LearnKid,
    meta: {
      title: '编辑小孩',
    },
  },
  {
    path: '/learn/detail/:id',
    name: 'LearnDetail',
    component: views.LearnDetail,
    meta: {
      title: '上课详情',
    },
  },
  {
    path: '/learn/curriculum/:id',
    name: 'LearnCurriculum',
    component: views.LearnCurriculum,
    meta: {
      title: '课程表',
    },
  },
];
