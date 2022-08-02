# Vue3的知识点

> 新功能

- createApp
- emits 属性
- 多事件处理
- Fragment
- 移除 .sync 改为 v-model 参数
- 异步组件的引用方式
- 移除 filter
- Teleport
- Suspense
- Composition API
  + reactive
  + ref toRef toRefs
  + readonly
  + computed
  + watch watchEffect
  + 钩子函数生命周期

> 原理

- Proxy 实现响应式
- 编译优化
  + PatchFlag 静态标记
  + hoistStatic 静态提升
  + cacheHandler 缓存事件
  + SSR 优化
  + Tree-shaking 优化

> vite

- Es6 module

