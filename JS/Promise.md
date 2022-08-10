# Promise

## Promise 解决了什么问题？
在 Promise 出现以前，在我们处理多个异步请求嵌套时，都是一层一层的 回调函数，为了获取到回调的结果，我们必须一层一层的嵌套，可以说是相当恶心了。而且基本上我们还要对每次请求的结果进行一系列的处理，使得代码变得更加难以阅读和难以维护，这就是传说中臭名昭著的**回调地狱** ～ 产生回调地狱的原因归结起来有两点：

- 嵌套调用，第一个函数的输出往往是第二个函数的输入参数
- 处理多个异步请求并发，开发时往往需要同步请求最终的结果

Promise 的出现就是用一种更加友好的代码组织方式，解决了异步嵌套和回调地狱的问题。将嵌套调用改为链式调用，增加了代码的可阅读性和可维护性。

Promise.all 可以获取合并多个任务的错误处理。

## Promise 的业界实现都有哪些

Promise 的业界实现 比较著名的 实现 Promise 的 类库 有  bluebird、Q、ES6-Promise。





## 能不能手写一个符合 Promise/A+ 规范的 Promise?

符合 Promise/A+ 规范的 Promise 基本特征：
- 1、promise 有三个状态：`pending`,`fulfiled`,or`rejected`; 「规范 Promise/A+ 2.1」
- 2、`new Promise`时，需要传递一个 `executor()执行器`,执行器立即执行；
- 3、`executor`接受两个参数，分别是`resolve`和`reject`
- 4、promise 的默认状态是  `pending`
- 5、promise 有一个 `value` 保存成功状态的值，可以是`undefined/thenable/promise`; 「规范 Promise/A+ 1.3」
- 6、promise 有一个 `reason` 保存失败状态的值； 「规范 Promise/A+ 1.3」
- 7、promise 只能从 `pending` 到 `reject`,或者从 `pending` 到 `fulfiled`,状态一旦确认，就不会再改变；
- 8、promise 必须有一个 `then` 方法，`then` 接受两个参数，分别是 promise 成功的回调 onFulfiled,和 promise 失败的回调 onRejected; 「规范 Promise/A+ 2.2」
- 9、如果调用`then`时，promise 已经成功，则执行`onFulfiled`,参数是  `promise` 的 `value`
- 10、如果调用`then`时，promise 已经失败，那么执行`onRejected`,参数是 `promise` 的 `reason`
- 11、如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调  `onRejected`

```JS
const PENDING = 'PENDING',
FULFILED = 'FULFILED',
REJECTED='REJECTED';

class MyPromise {
  constructor(executor){
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    // 存放成功的回调
    this.onResolvedCallbacks=[];
    // 存放失败的回调
    this.onRejectedCallbacks=[];

    let resolve = value=>{
      if(this.status === PENDING){
        this.status = FULFILED
        this.value = value
        // 依次将对应的函数执行
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }

    let reject = reason => {
      if(this.status === PENDING){
        this.status = REJECTED
        this.reason = reason
        // 依次将对应的函数执行
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }

    try{
      executor(resolve,reject)
    }catch(error){
      reject(error)
    }
  }

  then(onFulfiled,onRejected){
    if(this.status === FULFILED){
      onFulfiled(this.value)
    }

    if(this.status === REJECTED){
      onRejected(this.reason)
    }

    if(this.status === PENDING){
      // 如果 promise 的状态是 pending,需要将 onFulfiled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(()=>{onFulfiled(this.value)})

      this.onRejectedCallbacks.push(()=>{onRejected(this.reason)})
    }
  }
}

// 测试同步任务
const p1 = new MyPromise((resolve,reject)=>{
  // resolve('成功')
  reject(new Error({msg:'error'}))
}).then(res=>{
  console.log('success',res)
},err=>{
  console.log('failed',err)
})

const p2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('成功');
  },1000);
}).then(
  (data) => {
    console.log('success', data)
  },
  (err) => {
    console.log('faild', err)
  }
)

```

上面的实现类似于**发布订阅模式**，这种`收集依赖 -> 触发通知 -> 取出依赖执行`的方式，被广泛运用于发布订阅模式的实现。


## then 的链式调用&值穿透特性

在使用 Promise的时候，当then函数中 return 了一个值，不管是什么值，我们都能在下一个then中获取到，这就是所谓的**then的链式调用**。而且，当我们不在 `then`中放入参数，例如`promise.then().then()`,那么其后面的`then`依旧可以得到之前`then`返回的值，这就是所谓的**值得穿透**。

then 的 基本特征：

- 1、`then`的参数`onFulfiled` 和`onRejected` 可以缺省，如果`onFulfiled`或者`onRejected`不是函数，将其忽略，且依旧可以在下面的`then`函数中获取到之前返回的值； 「Promise/A+ 2.2.1、 2.2.1.1、 2.2.1.2」
- 2、promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个新的 promise; 「Promise/A+ 2.2.7」
- 3、如果then的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个then的成功的回调中
- 4、如果then中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then的失败的回调中； 「Promise/A+ 2.2.7.2」
- 5、如果then的返回值x 是一个 promise，那么会等这个 promise执行完，promise如果成功，就走下一个then的成功；如果失败，就走下一个then的失败；如果抛出异常，就走下一个then的失败； 「Promise/A+ 2.2.7.3、 2.2.7.4」
- 6、如果then的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个then的失败回调中； 「Promise/A+ 2.3.1」
- 7、如果 then 的返回值 下是一个 promise，且 x 同时调用 resolve函数 和 reject函数，则第一次调用优先，其他所有调用被忽略； 「Promise/A+ 2.3.3.3.3」

```JS

const PENDING = 'PENDING', FULFILED = 'FULFILED', REJECTED = 'REJECTED';

const resolvePromise = (promise2,x,resolve,reject)=>{
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise
  if(promise2 === x){
    return reject(new TypeError('Chaining cycle detected for  promise #<Promise>'))
  }
  // 只能调用一次
  let called;
  // 后续的条件要严格判断，保证代码能和别的库一起使用
  if((typeof x === 'object' && x!=null )|| typeof x === 'function'){
    try{
      // 为了判断resolve 过的就不再 reject 了（比如 reject 和 resolve同时调用的时候）
      let then = x.then;
      if(typeof then === 'function'){
        // 不要写成 x.then,直接 then.call 就可以了，因为 x.then 会再次取值， Object.defineProperty
        then.call(x,y=>{ // 根据 promise 的状态决定是成功还是失败
          if(called) return;
          called = true;
          // 递归解析的过程（因为可能 promise 中还有 promise）
          resolvePromise(promise2,y,resolve,reject)
        },r=>{
          // 只要失败就是进入 失败的回调
          if(called) return ;
          called = true;
          reject(r)
        })
      }else{
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果
        resolve(x)
      }
    }catch(e){
      if(called) return ;
      called = true;
      reject(e)
    }
  }else{
    // 如果 x 是个普通值就直接返回 resolve 作为结果
  }
}


class MyPromise {
  constructor(){
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    let resolve = value =>{
      if(this.status === PENDING){
        this.status = FULFILED
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }

     let reject = reason =>{
      if(this.status === PENDING){
        this.status = REJECTED
        this.value = reason
        this.onRejectedCallbacks.forEach(fn=>fn())
      }
    }

    try{
      executor(resolve,reject)
    }catch(error){
      reject(error)
    }

  }

  then(onFulfiled,onRejected){
    // 解决 onFulfiled, onRejected 没有传值的问题
    onFulfiled = typeof onFulfiled === 'function' ? onFulfiled : v=>v;
    // 因为错误的值要让后面访问到，所以这里也要抛出个错误，不然会在之后 then 的  resolve 中捕获
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}

    // 每次调用 then 都返回一个新的 promise
    let promise2 = new MyPromise((resolve,reject)=>{
      if(this.status === FULFILED){
        setTimeout(()=>{
          try{
            let x = onFulfiled(this.value)
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        },0)
      }

      if(this.status === REJECTED){
        setTimeout(()=>{
          try{
            let x = onRejected(this.reason);
            resolvePromise(promise2,x,resolve,reject)
          }catch(e){
            reject(e)
          }
        },0)
      }

      if(this.status === PENDING){
        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
            try{
              let x = onFulfiled(this.value)
              resolvePromise(promise2,x,resolve,reject)
            }catch(e){
              reject(e)
            }
          })
        })

        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
            try{
              let x = onRejected(this.reason)
              resolvePromise(promise2,x,resolve,reject)
            }catch(e){
              reject(e)
            }
          },0)
        })
      }
    })

    return promise2
  }
}

//测试
const promise = new MyPromise((resolve, reject) => {
  reject('失败');
}).then().then().then(data=>{
  console.log(data);
},err=>{
  console.log('err',err);
})

```

## Promise 常用的API有哪些

- Promise.resolve / Promise.reject

```JS



class Promise {
  //其他业务实现代码

  constructor(executor){
    // ...

    let resolve = value =>{
      // 新增逻辑
      // 如果value 是一个 promise,那我们的库中应该也要实现一个递归解析
      if(value instanceof Promise){
        // 递归解析
        return value.then(resolve,reject)
      }

      if(this.status === PENDING){
        this.status = FULFILED
        this.value = value
        this.onResolvedCallbacks.forEach(fn=>fn())
      }
    }

    //...
  }


  static resolve(value){
    return new Promise((resolve,reject)=>{
      resolve(value)
    })
  }

  static reject(reason){
    return new Promise((resolve,reject)=>{
      reject(reason)
    })
  }

}

```

- Promise.prototype.catch

Promise.prototype.catch 用来捕获 promise 的异常，就相当于一个没有成功的 then。

```JS
Promise.prototype.catch = function (errcallback){
  return this.then(null,errcallback)
}
```

- Promise.prototype.finally

finally 表示不是最终的意思，而是无论如何都会执行的意思。
如果返回一个 promise 会等待这个 promise 也执行完毕。如果返回的是成功的 promise，会采用上一次的结果；如果返回的是失败的 promise，会用这个失败的结果，传到 catch 中。

```JS

Promise.prototype.catch = function(callback){
  return this.then(value=>{
    return Promise.resolve(callback()).then(()=>value)
  },reason=>{
    return Promise.resolve(callback()).then(()=>throw reason)
  })
}
```

- Promise.all

promise.all 是解决并发问题的，多个异步并发获取最终的结果（如果有一个失败则失败）。

```JS
Promise.all = function(values){
  if(!Array.isArray(values)){
    const type = typeof values
    return new TypeError(`TypeError: ${type} ${values} is not iterable`)
  }

  return new Promise((resolve,reject)=>{
    let resultArr = [];
    let orderIndex = 0
    const processResultByKey = (value,index) =>{
      resultArr[index] = value
      if(++orderIndex === values.length){
        resolve(resultArr)
      }
    }

    for(let i=0;i<values.length;i++){
      let value = values[i]
      if(value && typeof value.then === 'function'){
        value.then(value=>processResultByKey(value,i),reject)
      }else{
        processResultByKey(value,i)
      }
    }
  })
}
```

- Promise.race

Promise.race 用来处理多个请求，采用最快的（谁先完成用谁的）

```JS
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    // 一起执行就是for循环
    for(let  i=0;i<promises.length;i++){
      let val = promises[i]
      if(val && typeof val.then === 'function'){
        val.then(resolve,reject);
      }else{ // 普通值
        resolve(val)
      }
    }
  })
}
```

## Promise 在事件循环中的执行过程是怎样的

## Promise 有什么缺陷，可以如何解决
 Promise 没有中断方法，不向 xhr.abort() 、ajax 有自己的中断方法，axios shi 基于 ajax 实现的；fetch 基于 promise;
所以 fetch 的请求是无法中断的。

这也是 Promise 存在的缺陷，我们可以使用 race 来自己封装 中断方法：

```JS
function wrap(promise){
  // 在这里包装一个 promise,可以控制 原来的promise 是成功还是失败
  let abort;
  let newPromise = new Promise((resolve,reject)=>{ // defer 方法
    abort = reject
  })
  let p = Promise.race([promise,newPromise]); // 任何一个先成功或失败 就可以获取到结果
  p.abort = abort
  return p
}

// 测试

const promise = new Promise((resolve, reject) => {
  setTimeout(() => { // 模拟的接口调用 ajax 肯定有超时设置
      resolve('成功');
  }, 1000);
});

let newPromise = wrap(promise);

setTimeout(() => {
  // 超过3秒 就算超时 应该让 proimise 走到失败态
  newPromise.abort('超时了');
}, 3000);

newPromise.then((data => {
    console.log('成功的结果' + data)
})).catch(e => {
    console.log('失败的结果' + e)
})
```
