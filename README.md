# test-demo

## 介绍

用于平常一个单独的页面或功能的调试

## ant-design-vue 组件的三种加载方式

地址 https://my.oschina.net/tongjh/blog/1928824

## 开发须知

1. 路由传参的时候请不要使用耦合度高的`this.$route.query`或者`this.$route.params`,请[使用 props 将组件和路由解耦](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F),其实对于每一个路由我已经洗了一遍自动注入了 props 了，分别为`query`和`params`,所以大家在某个模块中要使用路由传入的参数的时候请直接如下这样写

```js
// 在router.js中，全部注入

const props = (route) => {
  const { query, params } = route;
  return { query, params };
};

routes.forEach((route) => {
  route.props = props;
  (route.children || []).forEach((child) => {
    child.props = props;
  });
});
```

```js
export default {
  props: {
    query: {
      type: Object,
      default() {
        return {};
      },
    },
    params: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
```

比如路由 query 传参一个 id 这时候可以在模块中直接使用`this.query.id`来获取
