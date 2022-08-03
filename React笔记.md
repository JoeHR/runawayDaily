# React Vs Vue

- React 和 Vue 一样重要，力求两者都学会
- React 和 Vue 有很多相通之处，而且整在趋于一致
- React 比 Vue 学习成本高，尤其对于初学者

# React 使用

## 脚手架创建项目 create-react-app

[create-react-app](https://create-react-app.bootcss.com/)

快速创建 react 应用

```
npx create-react-app react-demo

```

如果全局安装了 create-react-app`npm install -g create-react-app`

可以执行 下列命令创建项目
```
npm init react-app react-demo
```

## 基本使用

- JSX语法
- 条件
- 事件
- 组件和 props(类型检查)
- state 和 setState
- 组件生命周期

### JSX 基本使用

- 变量、表达式
- class style
- 原生html
- 子元素和组件


```JSX
  class demo extends React.Component{
    constructor(props){
      super(props)
      this.state={
        name:'张三',
        class:'top'
        flag:false
      }
    }
    // 变量插值，表达式
    render(){
       const rawHtml = '<span>可正常渲染的html字符串<i>斜体</i><b>加粗</b></span>'

      return <div>
        {/* 变量插值 */}
        <p>{this.state.name}</p>
        {/* 表达式 */}
        <p>{this.state.flag ? 'yes' : 'no'}</p>
        {/* class - 静态class */}
        <p className="title">设置 css class</p>
        {/* class - 动态class */}
        <p className={this.state.class}>设置 css class</p>
        {/* style - 静态样式 */}
        <p style="font-size:16px;line-height:24px;background-color:red;">设置 style</p>
        {/* style - 动态样式 */}
        <p style={ {fontSize:'16px',lineHeight:'24px',backgroundColor:'red'} }>设置 style</p>
        {/* 原生html */}
         <p dangerouslySetInnerHTML={ {__html: rawHtml} }></p>
         <p>不可正常渲染的html字符串：{rawHtml}</p>
      </div>
    }
  }
```

### 条件判断

- if else
- 三元表达式
-  逻辑运算符 && ||

```JSX
  class demo extends React.Component{
    constructor(props){
      super(props)
      this.state={
       flag:false
      }
    }
    // 变量插值，表达式
    render(){
        const blackBtn = <button className="btn-black">black btn</button>
        const whiteBtn = <button className="btn-white">white btn</button>

        /* if-else */
        if (this.state.flag) {
            return blackBtn
        } else {
            return whiteBtn
        }

        /* 三元表达式 */
      //  return  <>{ this.state.flag  ? blackBtn : whiteBtn }</>
    }
  }
```


### 渲染列表
- map
- key

```JSX
class demo extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      list:[
        {id:'id-1',title:'标题1'},
        {id:'id-2',title:'标题2'},
        {id:'id-3',title:'标题3'},
        {id:'id-4',title:'标题4'},
        ]
    }
  }

  render(){
    return <ul>
      {/* 列表渲染 */}
      {
        this.state.list.map(
          (item,index)=>{
            // 这里的 key 和 Vue 的 key 类似，必填，不能是 index 或 random
            return <li key={item.id}>
              index {index}; id {item.id}; title {item.title}
            </li>
          }
        )
      }
      </ul>
  }
}
```

### 事件

- bind this
- 关于 event 参数 (是 react 封装的组合事件)
- 传递自定义参数

react 中jsx 绑定的dom事件 是基于浏览器的事件机制自身实现了一套事件机制,包括事件注册、事件的合成、事件的冒泡、事件派发等

在 `react` 中这套事件机制被称为合成事件

- event 是 SyntheticBaseEvent ，合成事件对象
- event.nativeEvent 是原生事件对象
- React 所有事件都挂载在 document 对象上
- 当真实DOM 元素触发事件，会冒泡到 document 对象后，再处理 react 事件
- 所以会先执行原生事件，然后处理 react 事件
- 最后真正执行 document 上挂载的事件

**而 Vue 中的事件机制中的 event事件对象是 原生的事件对象，事件也是被挂载到当前元素上的，和dom 事件一样**

```jsx

class eventDemo extends React.Component{
  constructor(){
    this.state={name:'张三'}

    // 写在 constructor 中只执行一次，在render 中写，会重复执行,render 函数每执行一次，这个bind就执行一次
    // this.clickHandler1 = this.clickHandler1.bind(this)
  }

  clickHandler1(){
    this.setState({name:'李四'})
  }

  // 利用箭头函数可以固定this，就不需要 bind 修改this指向了
  clickHandler2=()=>{
    this.setState({name:'王五'})
  }

  clickHandler3=(event)=>{
    event.preventDefault(); // 阻止默认行为
    event.stopPropagation(); // 阻止冒泡

    const {target,currentTarget,nativeEvent} = event

    console.log('event',event) //
    console.log('event.__proto__.constructor',event.__proto__.constructor)


  }

  render(){
    return <div>
        {/* 点击会报错，因为在 jsx绑定的事件 默认 this 是 undefined,如果绑定的事件中需要用到组件 this ，就需要手动修改 this指向,如 bind 方法 */}
        {/* 事件  this */}
       <p onClick={this.clickHandler1}>点击这个会报错，因为没有修改this:{this.state.name}</p>
      <p onClick={this.clickHandler1.bind(this)}>点击这个会变成李四：{this.state.name}</p>
      <p onClick={this.clickHandler2}>点击这个会变成王五：{this.state.name}</p>
      {/* 事件对象 - 利用  */}
      <a href="https://imooc.com/" onClick={this.clickHandler3}>click me</a>
    </div>
  }
}

```


### 表单

- 受控组件

- input textarea select 用 value

- checkbox radio 用 checked

### 组件使用

- props 传递数据
- props 传递函数
- props 类型检查

### setState

state 必须在 constructor 中初始化

- 不可变值
所谓不可变值 就是不能直接(绕过 setState方法)对 state中的数据做修改赋值，但可以直接对 state中的数据复制创建的副本 进行修改 复制
然后再 通过 setState 方法 将修改后的副本 赋值给 state 中的数据

- 可能是异步更新
  + 在组件生命周期或React合成事件中，setState 是异步更新
  + 在 settimeout 或 dom原生事件中， setState 是同步更新
  + 如果像确保能拿到更新后的state值，可以在 setState 函数的第二个参数传递一个回调，在该回调中可以拿取到更新后的state
  + 为了确保与UI 同步 可以 这样写 this.setState(state=>{return {count:state.count+1}})

- 可能会被合并
state 异步更新的话，更新前会被合并，传入对象


### 组件生命周期

[react 组件生命周期图实](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

- 挂载阶段： constructor -> render -> React updates Dom and refs -> componentDidMount
- 更新阶段： new prop/setSate()/forceUpdate() -> render -> React updates Dom and refs -> componentDidUpdate
- 卸载阶段： componentWillUnmount

父子组件生命周期 和 Vue 的一样


## 高级使用

- 函数组件
- 受控和非受控组件
- refs
- Protals
- 异步组件(懒加载)
- context
- 性能优化
- shouldComponentUpdate
- 纯组件
- 不可变值 immutablejs
- 高阶组件 HOC
- render prop

### 函数组件

传函数，输入props,输出jsx
没有实例，没有生命周期，没有state
不能扩展其他的方法


```js
// class 组件

class List extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    const {list} = this.props
    return <ul>
      {list.map((item,index)=>{
        return <li key={item.id}><span>{item.title}</span></li>
      })}
    </ul>
  }
}


// 函数组件
function List(props){
  const {list} = this.props
    return <ul>
      {list.map((item,index)=>{
        return <li key={item.id}><span>{item.title}</span></li>
      })}
    </ul>
}

```

### 非受控组件
- ref
- defaultValue defaultChecked
- 手动操作 DOM 元素

非受控组件 -使用场景
- 必须手动操作 `DOM`元素，setState 实现不了
- 文件上传 <input type = "file">
- 某些富文本编辑器，需要传入DOM 元素

受控组件 vs 非受控组件
- 优先使用受控组件，符合React设计元素
- 必须操作DOM时，在使用非受控组件




### 什么场景需要用 React Portals
使用方法

``` jsx
import ReactDom from 'react-dom'

render(){
  return ReactDom.createPortals(ReactDOM.createPortal(
      <div className='modal'>{this.props.children}</div>,
      document.body // DOM 节点
    ))
}

```

可以使用 React.Portals 的场景
- overflow:hidden ，父组件具备该样式属性，如果像渲染到父组件以外的区域就可以使用 该特性
- 父组件 z-index 值 太小
- fixed 需要放在body 第一层级


- 组件默认会按照既定层次嵌套渲染
- 如何让组件渲染到父组件以外

### 是否用过 React Context
- 公共信息（语言，主题）如何传递给每个组件？
- 用 props 太繁琐
- 用 redux 小题大做

### 异步组件

- import()
- React.lazy
- React.Suspense

### React性能优化-SCU的核心问题在哪里

> 在 react 中，父组件有更新，子组件则无条件也更新

- shouldComponentUpdate (简称 SCU)
- PureComponent 和 React.memo
- 不可变值 immutable.js

SCU 一定要每次都用吗？ -- 需要的时候才优化

SCU 默认返回 true,即 React 默认重新渲染所有子组件

SCU 必须配和 "不可变值" 一起使用

可先不用 SCU，有性能问题时再考虑使用

>  PureComponent 和 memo

PureComponent(纯组件), SCU 中实现了浅比较，只比较 props或 state的 第一层，不进行深度比较

PureComponent 是 class组件

memo　是　PureComponent 的函数组件版本

浅比较已适用大部分情况(尽量不要做深度比较)

```jsx

// memo 用法
function MyComponent(props){
  /* 使用 props 渲染 */
}

function areEqual(prevProps,nextProps){
  /**
   * 如果把 nextProps 传入 render 方法的返回结果与
   * 将 prevProps 传入 render 方法的返回结果一致则返回 true,
   * 否则则返回 false
   */
}



export default  React.memo(MyComponent,areEqual)
```

**immutable.js**

- 彻底拥抱 "不可变值"
- 基于共享数据（不是深拷贝），速度好
- 有一定学习和迁移成本，按需使用

```js

const map1 = immutable.Map({a:1,b:2,c:3})
const map2 = map1.set('b',50)

map1.get('b') // 2
map2.get('b') // 50

```




```JSX

// SCU 基本用法 SCU 不修改的话默认 会返回true
shouldComponentUpdate(nextProps,nextState){
  if(nextState.count !== this.state.count){
    return true // 可以渲染
  }
  return false // 不重复渲染
}
```

## redux
- store
- reducer
- action
- dispatch
- 单向数据流模型
- 中间件redux-thunk redux-saga


