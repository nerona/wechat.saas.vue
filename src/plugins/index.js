import { http } from '@/utils';
import assets from '@/assets';

/* eslint-disable no-param-reassign */
export default (Vue) => {
  Vue.prototype.$http = http;
  Vue.prototype.$assets = assets;
};
