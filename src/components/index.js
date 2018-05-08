/**
 * @overview 全局组件注册
 */
import AppPageWithTabbar from './AppPageWithTabbar';
import AppPage from './AppPage';

const components = {
  AppPageWithTabbar,
  AppPage,
};

export default (Vue) => {
  Object.keys(components)
    .forEach(key => Vue.component(key, components[key]));
};
