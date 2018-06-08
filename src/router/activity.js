/**
 * @overview 活动路由
 */

import * as views from '@/views';

export default [
  {
    path: '/activity/learn/index',
    name: 'ActivityLearnIndex',
    component: views.ActivityLearnIndex,
    meta: {
      title: '3000万英语课程免费学',
    },
  },
  {
    path: '/activity/learn/share',
    name: 'ActivityLearnShare',
    component: views.ActivityLearnShare,
    meta: {
      title: '3000万英语课程免费学',
    },
  },
  {
    path: '/activity/learn/over',
    name: 'ActivityLearnOver',
    component: views.ActivityLearnOver,
    meta: {
      title: '活动已结束',
    },
  },

  /* 在线评测 */
  {
    path: '/activity/evaluate/first',
    name: 'ActivityEvaluateFirst',
    component: views.ActivityEvaluateFirst,
    meta: {
      title: '在线评测',
    },
  },
  {
    path: '/activity/evaluate/index',
    name: 'ActivityEvaluateIndex',
    component: views.ActivityEvaluateIndex,
    meta: {
      title: '在线评测',
    },
  },
  {
    path: '/activity/evaluate/finish/:score',
    name: 'ActivityEvaluateFinish',
    component: views.ActivityEvaluateFinish,
    meta: {
      title: '在线评测',
    },
  },
];
