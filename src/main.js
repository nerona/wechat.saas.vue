import {
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin,
  WechatPlugin,
  TransferDom,
} from 'vux';
import Vue from 'vue';
import FastClick from 'fastclick';
import VueLazyload from 'vue-lazyload';
import router from '@/router';
import '@/styles/global.less';
import pluginsRegister from '@/plugins';
import componentsRegister from '@/components';
import App from './App';

import loadingImage from './assets/loading-spin-h.png';

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: loadingImage,
  loading: loadingImage,
  attempt: 1,
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

Vue.use(pluginsRegister)
  .use(componentsRegister)
  .use(ToastPlugin, { position: 'middle' })
  .use(LoadingPlugin)
  .use(WechatPlugin)
  .use(ConfirmPlugin);

Vue.directive('transfer-dom', TransferDom);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app-box');
