import Vue from 'vue';
import FastClick from 'fastclick';
import router from '@/router';
import '@/styles/global.less';
import pluginsRegister from '@/plugins';
import componentsRegister from '@/components';
import App from './App';

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(pluginsRegister)
  .use(componentsRegister);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
