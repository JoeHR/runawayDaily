## v-show 和 v-if 的区别

- v-show 通过 css display 控制显示和隐藏
- v-if 组件真正的渲染和销毁，而不是显示和隐藏，会真正挂载和销毁组件， 并且触发组件的生命周期，
- 频繁切换显示状态 用 v-show ,否则用 v-if


## 为何在 v-for 中用 key

- 必须用key,且不能是 index 和 random
- diff 算法中通过 tag 和 key 来判断，是否是 sameNode
- 减少渲染次数，提升渲染性能

## 描述 Vue 组件的生命周期（父子组件）
vue 组件实例 从创建 到销毁的过程就是组件的生命周期(创建、初始化数据、编译模板生成vdom、挂载DOM渲染、更新渲染、卸载);
在vue组件的生命周期过程中，vue 提供了在各个阶段可以调用的生命周期钩子的函数，以便开发者在特定阶段有机会添加他们自己的代码。


<table>
	<thead>
		<th>阶段</th>
		<th>生命周期V2</th>
		<th>生命周期V3</th>
		<th>描述</th>
	</thead>
	<tbody>
		<tr>
			<td rowspan="2">创建阶段</td>
			<td>beforeCreate</td>
			<td>beforeCreate</td>
			<td>组件实例被创建之初，data和el均未初始化，值为undefined</td>
		</tr>
		<tr>
			<td>created</td>
			<td>created</td>
			<td>组件实例已经完全创建，data已配置好，可以读取data的值，但是el 还未初始化</td>
		</tr>
		<tr>
			<td rowspan="2">挂载阶段</td>
			<td>beforeMount</td>
			<td>beforeMount</td>
			<td>组件挂载之前，data和el均已经初始化，但此时el并没有渲染进数据，el的值为“虚拟”的元素节点</td>
		</tr>
		<tr>
			<td>mounted</td>
			<td>mounted</td>
			<td>组件挂载到实例上去之后，此时el已经渲染完成并挂载到实例上</td>
		</tr>
		<tr>
			<td rowspan="2">更新阶段</td>
			<td>beforeUpdate</td>
			<td>beforeUpdate</td>
			<td>组件数据发生变化，更新之前，el中的数据都已经渲染完成</td>
		</tr>
		<tr>
			<td>updated</td>
			<td>updated</td>
			<td>数据数据更新之后，组件dom被更新</td>
		</tr>
		<tr>
			<td rowspan="2">销毁阶段</td>
			<td>beforeDestroy</td>
			<td>beforeUnmount</td>
			<td>组件实例销毁之前</td>
		</tr>
		<tr>
			<td>destroyed</td>
			<td>unmounted</td>
			<td>组件实例销毁之后</td>
		</tr>
		<thead>
			<th colspan="4" rowspan="2">特殊生命周期</th>
		</thead>
		<tr>
			<td rowspan="2">keep-alive 场景</td>
			<td>activated</td>
			<td>activated</td>
			<td>keep-alive 缓存的组件激活时</td>
		</tr>
		<tr>
			<td>deactivated</td>
			<td>deactivated</td>
			<td>keep-alive 缓存的组件停用时调用</td>
		</tr>
		<tr>
			<td>捕获错误 场景</td>
			<td>errorCaptured</td>
			<td>errorCaptured</td>
			<td>在捕获一个来自后代组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。</td>
		</tr>
		<tr>
			<td rowspan="2">调试场景</td>
			<td>-</td>
			<td>renderTracked</td>
			<td>调试钩子，响应式依赖被收集时调用</td>
		</tr>
		<tr>
			<td>-</td>
			<td>renderTriggered</td>
			<td>调试钩子，响应式依赖被触发时调用</td>
		</tr>
		<tr>
			<td>SSR 场景</td>
			<td>-</td>
			<td>serverPrefetch</td>
			<td>ssr only，组件实例在服务器上被渲染前调用</td>
		</tr>
	</tbody>
</table>

**单组件生命周期图**
- Vue2 生命周期示意图
<img src="https://cn.vuejs.org/images/lifecycle.png" />

- Vue3 生命周期示意图
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/779f7121823d4118a5b6ad2aa4007c28~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp">

**总结**
- 所有的生命周期钩子自动绑定 this 上下文到实例中，所以不能使用箭头函数来定义一个生命周期方法 (例如 created: () => this.fetchTodos())，会导致this指向父级。


**父子组件生命周期关系**

> 挂载阶段

父组件 beforeCreate -> 父组件 created -> 父组件 beforeMount ->  子组件 beforeCreate -> 子组件 created -> 子组件 beforeMount ->子组件 mounted -> 父组件 mounted

> 更新阶段

父组件 beforeUpdate -> 子组件 beforeUpdate -> 子组件 updated -> 父组件 updated

> 销毁阶段

父组件 beforeDestroy -> 子组件 beforeDestroy -> 子组件 destroyed -> 父组件 destroyed

**Vue3 中的setup函数**

- setup 函数 执行顺序 在 beforeCreate 和 created 这两个钩子函数之前，在程序运行中，因此作用上取代了beforeCreate 和created，但概念上它并不是beforeCreate 和created，所以你理解的mounted 放在created 里是有误的，setup函数只执行一次，创建的是 data 和 method
- setup 中没有 this
- setup 函数的参数 props，context
	+ props 是响应式的，当传入新的prop时，他将被更新。因为 props 是响应式的，不能使用 ES6 解构，它会消除 prop 的响应性。如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数。
	+ context,是一个普通的JavaScript 对象，可以使用 es6 解构，有三个 property：attrs,emit,slots
		- attrs: 接收在父组件传递过来的，并且没有在 props中声明的参数
		- emit: 子组件对父组件发送事件，在vue2中，子对父发送事件采用`this.$emit` 父组件发送事件，在 vue3中子组件对父组件发送事件采用 `context.emit` 发送
		- slots: 和 vue2中的 插槽使用类似

## Vue组件如何通信（常见）

常用的方式有以下8种
- props
- $emit/<del>$on</del>(自定义事件 event.$on enent.$off event.$emit，eventbus)
- <del>$children</del>/$parent
- $attrs/<del>$listeners</del>
- ref
- $root
- eventbus
- vuex

按组件关系划分：
- 父子组件 props 和 $emit , $parent ,ref,$attrs
- 兄弟组件： $parents,$root,eventbus,vuex
- 跨层级关系： eventbus,vuex,provide+inject


## 描述组件的渲染和更新过程

**初次渲染过程：**
- 解析模板为 render 函数（或在开发环境已完成，vue-loader）
- 触发响应式，监听data 属性 getter
- 执行 render 函数，生产vnode, patch(elem,vnode)

**更新过程**
- 修改 data, 触发 setter （此前已在 getter 中已被监听）
- 重新执行 render 函数，生产new Vnode
- patch(vnode,newVnode)

## 双向数据绑定 v-model 的实现原理

- input 元素的  value = this.name
- 绑定 input 事件，执行 this.name = $event.target.value
- data 更新触发 re-render

## 对 MVVM 的理解

view (Dom) - viewModel(DOM listeners/ Directives) - Model(palin javascript objects)

view - Dom Listeners -> Model
view <- Directives - Model

## computed 和 watch

- computed 有缓存，只要data不变，computed就不会重新计算,可以提高性能
- watch 没有缓存，watch 默认是浅监听，如果监听的是引用类型数据，那么会获取不到 oldValue(因为引用类型存的是堆中数据的引用地址，引用数据发生变化，那么对应的引用的堆中数据 也发生了变化，无法取到oldValue)

## 为何组件　data 必须是一个函数？

不是 vue 的问题，是一个 js 代码的问题

定义的每个 .vue组件 实际上 都是 一个 class 类

因此每个地方在使用 这个 组件 的时候 都是一个类实例化的过程

如果不是 一个和函数,那么在不同的地方 使用相同组件的时候，就会出现在某一地方 修改 data中的值，那么 会影响 在其他地方使用 这个 组件的data 属性，产生数据污染。

- 根组件 因为是 单例模式（可以理解为只有一个），所以使用对象或者函数都可以，不会产生数污染
- 组件实例对象 data 则必须 为 函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象

## ajax 请求应该放在哪个生命周期

- mounted
- js 是单线程的，ajax 异步获取数据
- 放在 mounted 之前没有用，只会让逻辑更加混乱


## 如何将组件所有props 传递给子组件？

- $props
- <User v-bind="$props" />

## 如何自己实现 v-model

``` vue
// CustomVModel.vue
<template>
	<input type="text" :value="text1" @input="$emit('change1',$event.target.value)"
	<!--
		1、上面的 input 使用了 :value 而不是 v-model
		2、上面的 change1 和 model.event1 要对应起来
		3、text1 属性对应起来
	-->
</template>
<script>
import CustomVModel from './CustomVModel'

export default {
	model:{
		prop:'text1',
		event:'change1'
	},
	props:{
		text1:String,
		default(){
			return ''
		}
	}
</script>

```

## 多个组件有相同的逻辑，如何抽离？

- mixin 以及 mixin 的一些缺点

 ## 何时要使用异步组件

 - 加载大组件(编辑器，图表等大组件)
 - 路由异步组件

## 何时需要使用 keep-alive?

- 缓存组件，不需要重复渲染
- 如多个静态 tab 页的切换
- 优化性能

## 何时需要使用 beforeDestroy(防止内存泄漏)

- 解绑自定义事件 event.$off
- 清除定时器
- 解绑自定义的DOM事件，如 window.scroll addEventListener

## 什么是作用域插槽

在父组件中的 获取子组件传递的属性作用域 slot-scope

常见场景： element-ui 中的 el-table 的 列子组件 el-table-column 可以 通过 slot-scope 获取 每行的数据 及 当前列的 属性key

```vue

// 子组件
<slot :nickName="'withreesix'">

// 父组件
<slot-child>
<template slot-scope="scope">
	<div>{{scope.nickName}}</div>
</template>
</slot-child>

```

## Vuex 中 action和　mutaion 有何区别？

- action 中处理异步，mutation 不可以
- mutation 做原子操作
- action 可以整合多个mutation

## Vue-router 常用的路由模式

- hash 默认
- H5 history(需要服务端支持)
- 两者比较

## 如何配置 Vue-router 异步加载

```js

export default new VueRouter({
	routes:[
		{
			path:'/',
			component:()=>import(/* webpackChunkName:"navigator" */ './../components/Navigator)
		},
		{
			path:'/feedback',
			component:()=>import(/* webpackChunkName:"feedback" */ './../components/Feedback)
		}
		...
	]
})
```

## 请用 vnode 描述一个DOM 结构

``` vue
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

## 监听 data 变化的核心API 是什么

- Object.defineProperty
- 以及深度监听、监听数组
- 有何缺点

## Vue 如何监听数组变化

- Object.defineProperty 不能监听数组变化
- 重新定义原型，重写 push pop  等方法，实现监听
- Proxy 可以原生支持监听数组变化

## 请描述响应式原理

- 监听data变化
- 组件渲染和更新的流程

## diff 算法的时间复杂度

- O(n)

- 是在 O(n^3)基础上 做了一些调整


> 正常树 diff的时间复杂度 为 O(n^3)
> 第一 遍历 tree1,第二 遍历 tree2
> 第三 排序
> 1000个节点，要计算1亿次，算法不可用

- 只比较同一层级，不跨级比较
- tag 不相同，则直接删掉重建，不再深度比较
- tag 和 key, 两者都相同，则认为是相同节点，不在深度比较

## 简述 diff 算法过程

- patch(elem,vnode) 和 patch(vnode.newVnode)

- patchVnode 和 addVnodes 和 removeVnodes

- updateChildren(key的重要性)

## Vue 为何是异步渲染，$nextTick 何用

- 异步渲染（以及合并data修改），以提高渲染性能
- $nextTick 在DOM 更新完之后，触发回调

## Vue 常见性能优化方式

- 合理使用 v-show 和 v-if
- 合理使用 computed (缓存)
- v-for 时 加key,以及避免和 v-if 同时使用(vue2中 v-for 的优先级 高于 v-if)
- 自定义事件、Dom事件及时销毁
- 合理使用异步组件
- 合理使用 keep-alive
- data层级不要太深(对data响应式监听时，深度监听需要在一次性遍历完成的，data太深 就会导致在 做监听的时候 计算的深度比较多，定位次数比较高，尽量设计比较扁平话一些)
- 使用vue-loader 在开发环境做模板编译（预编译）

**webpack 层面的优化**
**前端通用的性能优化，如图片懒加载，合并请求**
**使用SSR**




