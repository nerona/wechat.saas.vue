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
  },
];
