/**
 * @overview 组件登记
 */

/* 登录页 */

export { default as SignIn } from './SignIn';

/* 活动页 */

export { default as ActivityLearnIndex } from './Activity/Learn/Index';
export { default as ActivityLearnOver } from './Activity/Learn/Gameover';
export { default as ActivityLearnShare } from './Activity/Learn/Share';

export { default as ActivityEvaluateIndex } from './Activity/Evaluate/Index';

/* 课程中心 */

export { default as CurriculumIndex } from './Curriculum';
export { default as CurriculumDetail } from './Curriculum/Detail/Detail';
export { default as CurriculumOrder } from './Curriculum/Order/Order';

/* 学习中心 */

export { default as LearnIndex } from './Learn/index';
export { default as LearnKid } from './Learn/kid';
export { default as LearnDetail } from './Learn/detail';
export { default as LearnCurriculum } from './Learn/curriculum';

/* 用户中心 */

export { default as UserIndex } from './User';
export { default as UserEdit } from './User/Edit';
export { default as UserActivity } from './User/ActivityRecord';

/* 订单管理 */
export { default as OrderList } from './Order/List';
export { default as OrderDetail } from './Order/Detail';
export { default as OrderRefund } from './Order/Refund';
