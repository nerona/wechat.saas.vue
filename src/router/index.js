import Vue from 'vue';
import Router from 'vue-router';
import * as views from '@/views';
import activity from './activity';
import curriculum from './curriculum';
import learn from './learn';
import order from './order';
import user from './user';

Vue.use(Router);

const STATIC_TITLE = '爱考拉';

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      redirect: '/curriculum',
    },

    {
      path: '/sign-in',
      name: 'SignIn',
      component: views.SignIn,
      meta: {
        title: '登录',
      },
    },

    ...activity,

    ...curriculum,

    ...learn,

    ...user,

    ...order,
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  } else {
    document.title = STATIC_TITLE;
  }

  next();
});

export default router;
