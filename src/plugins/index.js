import { http } from '@/utils';

/* eslint-disable no-param-reassign */
export default (Vue) => {
  Vue.prototype.$http = http;
};
