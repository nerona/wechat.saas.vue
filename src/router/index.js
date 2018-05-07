import Vue from 'vue';
import Router from 'vue-router';
import * as views from '@/views';
import activity from './activity';
import curriculum from './curriculum';
import learn from './learn';
import user from './user';

Vue.use(Router);

export default new Router({
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
    },

    ...activity,

    ...curriculum,

    ...learn,

    ...user,
  ],
});
