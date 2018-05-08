/**
 * @overview 全局组件注册
 */
import AppPageWithTabbar from './AppPageWithTabbar';

const components = {
  AppPageWithTabbar,
};

export default (Vue) => {
  Object.keys(components)
    .forEach(key => Vue.component(key, components[key]));
};
