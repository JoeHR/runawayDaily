
# 事件循环的概念 与  解决了什么问题？

事件循环就：JS代码在执行时，遇到同步任务直接进入主线程，即主执行栈，异步任务则进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行，这个不断循环的过程就是事件循环；

它解决了 单线程的JS 在执行的过程中不会堵塞的问题。使单线程的JS 永不阻塞。保持执行结果的一致性（单线程的特点）


JS 从诞生之日起就是一门单线程的非阻塞的脚本语言。单线程意味着，JS代码在执行的任何时候，都只有一个主线程来处理所哟任务。

web worker 技术虽然可以让js 再开启额外的线程来处理。但是这个多线程有着诸多的限制。例如 所有新线程都受主线程的完全控制 ，不能独立执行。这意味着这些“线程”实际上应属于主线程的子线程。另外，这些子线程并没有 执行 I/ 和 Dom操作 分担一些诸如计算等任务。

# 并发模型和事件循环
Javascript 有一个基于 事件循环的并发模型，事件循环负责执行代码、收集和处理事件以及执行队列中的子任务,这是 JS 非阻塞特点的实现机制。

> 可视化描述
![JS运行](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg)


在 JS中，所有的任务都可以分为：

- 同步任务： 立即执行的任务，同步任务一般会直接进入到主线程中执行
- 异步任务：异步执行的任务，比如 `ajax`网络请求，事件触发，setTimeout定时器、promise.then（）、async/await

同步任务和异步任务 的运行流程图如下：

![同步任务和异步任务的运行流程图](../imgs/event_loop2.png)

从上面可以看出，同步任务进入主线程，即主执行栈，异步任务进入任务队列，主线程内的任务执行完毕为空，会去任务队列读取对应的任务，推入主线程执行。上述过程的不断重复就是事件循环的模型。

## 异步任务中的宏任务 与 微任务

```JS

console.log(1)  // 同步任务 - 主线程-直接执行

setTimeout(() => {
  console.log(2)   // 定时器回调 - 异步任务 - eventTable
}, 0);

new Promise((resolve,reject)=>{  // new Prmise 同步任务 - 主线程直接执行
  console.log('new Promise')
  resolve()
}).then(()=>{       // promise.then  异步任务 - eventTable
  console.log('then')
})

console.log(3) // 同步任务，主线程直接执行

// 按照分析结果 ： 1 => ' new promise' => 3 => 2 => 'then'

// 但实际运行结果：1 => 'new promise' => 3 => 'then' => 2
```

出现分歧的原因在于 异步任务执行顺序，事件队列其实是一个“先进先出”的数据结构，排在前面的事件会优先被主线程读取

例子中 `setTimeout` 回调事件是先进入队列的，按理说应该咸鱼 `.then` 中的执行，但是结果却偏偏相反。其原因在于 **异步任务 还可以细分为 微任务和 宏任务**

### 微任务

一个需要异步执行的函数，执行时机是在主函数执行结束之后、当前红任务结束之前

常见的微任务由：

- Promise.then
- MutationObserver
- Object.observe(已废弃；Proxy 对象替代)
- process.nextTick (Node.js)

## 宏任务

宏任务的时间粒度比较大，执行的时间间隔是不能精确控制的，对一些高实时性的需求就不太符合

常见的宏任务由：

- script 加载（可怜理解为外层同步代码）
- setTimeout/setInterval
- UI rendering/ UI事件
- postMessage、MessageChannel
- setImmediate、 I/O（node.js）

这时候，事件循环，宏任务，微任务的关系如图所示

![宏任务于微任务的关系](../imgs/event_loop3.png)

按照这个流程，它的执行机制是：

- 执行一个宏任务，如果遇到微任务就讲它放到微任务的事件队列中
- 当前宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

再次回顾上面的例子

```JS
console.log(1)
setTimeout(()=>{
    console.log(2)
}, 0)
new Promise((resolve, reject)=>{
    console.log('new Promise')
    resolve()
}).then(()=>{
    console.log('then')
})
console.log(3)
```

 流程如下

 - 1、遇到 console.log（1），直接打印输出 1
 - 2、遇到定时器，属于新的宏任务，留着后面执行
 - 3、遇到 new Promise, 直接执行， 打印输出 ‘new promise’
 - 4、promise.then 属于 微任务，放入微任务队列，后面再执行
 - 5、遇到console.log(3) 直接打印输出 3
 - 6、好了，本轮宏任务执行完毕，现在去微任务列表查看是否有微任务，发现 .then 的回调，执行它，打印输出 ‘then’
 - 7、当一次宏任务执行完，再去执行新的宏任务，这里就剩一个定时器的宏任务了，执行它，打印2


**不管 await 后面跟着的是什么，await 都会阻塞后面的代码执行；await 表达式中的代码 可以看成 new Promise; await 表达式语句后面的代码可以看成 在 promise.then 回调中执行**

```JS
async function async1(){
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2(){
  console.log('async2')
}

console.log('script start')

setTimeout(function(){
  console.log('settimeout')
},0)

async1()

new Promise((resolve,reject)=>{
  console.log('promise1')
  resolve()
}).then(function(){
  console.log('promise2')
})

console.log('script end')

// 输出结果： ‘script start’ => 'async1 start' => 'promise1' => 'script end' => 'async2' => 'async1 end' => 'promise2' => settimeout

```
分析过程

- 1、遇到 console.log('script start') 同步任务 - 直接打印输出 script start
- 2、遇到定时器了，是宏任务，先放着不执行
- 3、遇到 async（）函数执行，里面先遇到 `console.log('async1 start')` 同步任务，直接执行打印输出 async1 start; 后面遇到 `await async2()`； 可认为 是同步任务，直接执行 async2函数，里面遇到 `console.log(async2)` 打印输出 async2;然后阻塞后面的代码（即 console.log（async1 end）这行代码，可以理解为 promise.then) 属于微任务们加入微任务列表，跳出去执行同步代码
- 4、遇到 new Promise；同步任务 直接执行输出 promise1， `.then` 微任务，加入到微任务列表中等待执行
- 5、遇到`console.log(script end)` 同步任务 - 直接执行输出 script end
- 6、当前同步任务 都已执行完毕，开始执行微任务，当前微任务队列中 存放着两个微任务 `console.log（async1 end）`,`promise.then的回调 console.log(promsie2)`； 按照 队列的 FIFO 原则，先进先出，所以先执行 微任务 `console.log(async1 end)` 输出 async1 end; 然后依次顺序继续执行下一个微任务 `promise.then的回调 console.log(promsie2)` 输出 promise2
- 上一个宏任务所有的事情都做完了，开始执行下一个宏任务，执行定时器，输出 settimeout

所以上面的输出结果应为： script start => async1 start => async2 => promise1 => script end => async1 end => promise2 => settimeout


## 为什么会有 宏任务 和微任务

**事件循环有宏任务和在执行宏任务期间产生的所有微任务组成。完成当前的宏任务后，会礼盒执行所有在此期间入队的微任务。这种设计是为了给紧急任务一个插队的机会，否则新入队的任务永远被放在队尾。区分了微任务和宏任务后，本轮循环中的微任务是技术就是在插队，这样微任务中所做的状态修改，在下轮事件循环中也能得到同步**
