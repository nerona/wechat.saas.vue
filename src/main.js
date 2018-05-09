import { ToastPlugin, LoadingPlugin, WechatPlugin, TransferDom } from 'vux';
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
  .use(componentsRegister)
  .use(ToastPlugin, { position: 'middle' })
  .use(LoadingPlugin)
  .use(WechatPlugin);

Vue.directive('transfer-dom', TransferDom);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
