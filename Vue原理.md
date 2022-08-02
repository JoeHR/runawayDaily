#################################
Vue 原理范围

1、组件化和MVVM
2、响应式
3、vdom 和 diff
4、模板编译
5、渲染过程
6、前端路由

#################################
组件化基础

很久以前的组件化：asp,jsp,php；nodejs 中也有类似的组件化，后端模板渲染的场景其实就是一个组件化的思想
传统组件，只是静态渲染，更新还要依赖于操作DOM（类似于 jquery框架）

数据驱动视图（vue-MVVM,react-setState）

MVVM


#################################
Vue响应式

组件 data 的数据一旦变化，立刻触发视图的更新

核心API： Object.defineProperty

Object.defineProperty 的一些缺点（Vue3.0 启用 Proxy; Proxy 有兼容性问题，且无法 polyfill ）

Object.defineProperty 基本用法

```
const data = {}
let name = "张山"
 Object.defineProperty(data,"name",{
    get:function(){
        console.log("get")
        return name
    },
    set:function(newVal){
        console.log('set')
        name = newVal
    }
 })

```

- 监听对象，监听数组
- 复杂对象，深度监听

Object.defineProperty 几个缺点
- 深度监听，需要递归到底，一次性计算量大
- 无法监听新增/删除属性(Vue.set Vue.delete)，只能监听已申明的属性
- 无法原生监听数组，需要特殊处理


#################################
虚拟Dom (virtual Dom) 和 diff

虚拟Dom 的背景
- Dom 操作非常耗费性能
- 以前用jQuery, 可以自行控制 DOM 操作的时机，手动调整
- Vue 和 React 是数据驱动视图，如何有效控制 DOM 操作

有了一定复杂度，想减少计算次数比较难
能不能把计算，更多的转为 JS 计算，因为JS 执行速度很快

虚拟Dom(vdom) - 用JS 模拟 Dom 结构，计算出最小的变更，操作DOM

```html
用 JS 模拟 DOM 结构

<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size:20px">
        <li>a</li>
    </ul>
</div>


{
    tag:'div',
    props:{
        className:'container',
        id:'div1'
    },
    children:[
        {
            tag:'p',
            children:'vdom'
        },
        {
            tag:'ul',
            props:{style:'font-size:20px'},
            children:[
                {
                    tag:'li',
                    children:'a'
                }
            ]
        }
    ]
}
```

通过 snabbdom 学习 虚拟 Dom

- 简洁强大的 vdom 库，易学易用
- Vue 参考它实现的 vdom 和diff
- [https://github.com/snabbdom/snabbdom](https://github.com/snabbdom/snabbdom)

**虚拟dom diff算法概述 时间复杂度O(n)**
> 正常树 diff的时间复杂度 为 O(n^3)
> 第一 遍历 tree1,第二 遍历 tree2
> 第三 排序
> 1000个节点，要计算1亿次，算法不可用

- 只比较同一层级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key, 两者都相同，则认为是相同节点，不在深度比较

vdom 核心概念：h、vnode、patch、diff、key等

#################################
模板编译

模板是vue开发中最常用的部分，即与使用相关联的原理

它不是 html,有 指令、插值、JS表达式，到底是什么？

相关问题："组件渲染 和更新 过程"

JS 的 with 语法

vue template complier 将模板编译为 render函数

执行 render 函数 生产 vnode

- with 语法

```js

const obj = {a:100, b:200}
console.log(obj.a)  // 100
console.log(obj.b)  // 200
console.log(obj.c) // undefined

// 使用with,能改变 {} 自由变量的查找方式
// 将 {}内自由变量，当作 obj 的属性来查找
// 如果找不到匹配的 obj 属性，就会报错
// with 要慎用，它打破了作用域 规则，易读性变差
with(obj){
    console.log(a) // 100
    console.log(b) // 200
    console.log(c) // 会报错 ！！！
}


```

- 编译模板

模板不是 html,有指令、插值、 JS 表达式，能实现判断、循环
html  是标签语言，之哟 JS 才能实现判断、循环
因此，模板一定是转换为 某种 JS 代码，即编译模板


模板编译为 render 函数，执行 render 函数返回 vnode
基于 vnode 再执行 patch 和 diff
使用 webpack vue-loader,会在开发环境下编译模板（重要）

在 html中引用 vue.js 时，会在运行时浏览器中编译，耗性能

Vue组件中使用 render 代替 template

```
Vue.component('heading',{
    render:function(createElement){
        return createElement(
            'h'+this.level,
            [
                createElement('a',{
                    attrs:{
                        name:'headerId',
                        href:'#'+'headerId'
                    }
                },'this is a tag')
            ]
        )
    }
})

```

在有些复杂情况下，不能用 template, 可以考虑用 render

React 一直都用 render （没有模板），和这里一样

###########################################
前端路由原理

稍微复杂一点的 SPA，都需要路由
vue-router 也是vue 全家桶的标配之一

vue-router 的路由模式： hash, H5 history

### hash

网页url的组成部分
// http://127.0.0.1:8881/01-hash.html?a=1--&b=20#/aaa/bbb

location.protocol  // http
location.hostname  // 127.0.0.1
location.host  // 127.0.0.1:8881
location.port  // 8881
location.pathname  // /01-hash.html
location.search  // ?a=10&b=20
location.hash  // #/aaa/bbb

hash变化 会触发网页跳转，及浏览器的前进、后退
hash 变化不会刷新页面，SPA 必须的特点
hash 永远不会提交到 server 端

### H5 history
-用 url 规范的路由，但跳转时不刷新页面
- history.pushState
- window.onpopstate

https://github.com/xxx 刷新页面
https://github.com/xxx/yyy 前端跳转，不刷新页面
https://github.com/xxx/yyy/zzz 前端跳转，不刷新页面

### 两者选择

- toB 的系统推荐用 hash， 简单易用，对 url 规范不敏感
- toC 的系统，可以考虑选择H5 history,但需要服务端支持
- 不用考虑 seo的 toC 系统，也可以使用 hash模式
- 能选择简单的，就别用复杂的，要考虑成本和收益

###########################################
总结：

### 组件 渲染/更新 过程
- 一个组件渲染到页面，修改 data 触发更新（数据驱动视图）
- 其背后原理是什么，需要掌握哪些要点？
- 考察对流程了解的全面程度


### 回顾学过的知识
- 响应式： 监听 data 属性 getter setter(包括数组）
- 模板编译 模板 到 render 函数 再到 vnode
- vdom: patch(elem,vnode) 和 patch(vnode, newVnode)

###########################################
Vue 组件是如何 渲染 和 更新

**初次渲染过程：**
- 解析模板为 render 函数（或在开发环境已完成，vue-loader）
- 触发响应式，监听data 属性 getter
- 执行 render 函数，生产vnode, patch(elem,vnode)

**更新过程**
- 修改 data, 触发 setter （此前已在 getter 中已被监听）
- 重新执行 render 函数，生产new Vnode
- patch(vnode,newVnode)

**异步渲染**
$nextTick
汇总 data 的修改，一次性更新视图
减少 dom 操作次数，提高性能
