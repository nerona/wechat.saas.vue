/**
 * @overview 全局组件注册
 */

const components = {

};

export default (Vue) => {
  Object.keys(components)
    .forEach(key => Vue.component(key, components[key]));
};
