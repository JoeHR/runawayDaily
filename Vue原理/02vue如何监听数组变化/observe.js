//触发视图更新
function updateView(){
  console.log('视图更新')
}

// 重新定义数组原型，避免污染原生数组
const oldArrayProperty = Array.prototype
// 创建新对象，原型指向 oldArrayProperty,再扩展新的方法不会影响原型
const arrProto = Object.create(oldArrayProperty);

['push','pop','shift','unshift','splice'].forEach(methodName=>{
  arrProto[methodName]=function(){
    updateView() //触发视图更新
    oldArrayProperty[methodName].call(this,...arguments)
    // Array.prototype[methodName].call(this,...arguments)
  }
})

// 重新定义属性，监听起来
function defineReactive(target,key,value){
  // 深度监听
  observer(value)

  // 核心API
  Object.defineProperty(target, key, {
    get(){
      return value
    },
    set(newValue){
      if(newValue!==value){
        // 设置新值时 深度监听 data.name={firstName:'张五'}
        observer(value)
        // 注意 value 一直再闭包中，此处设置完之后，再get时候也是
        value = newValue

        // 触发更新视图
        updateView()
      }
    }
  })
}

// 监听对象属性
function observer(target){
  if(typeof target !== 'object' || target === null){
    //不是对象或数组
    return target
  }


  if(Array.isArray(target)){
    target.__proto__ = arrProto
  }

  //重新定义各个属性（for in 也可以遍历数组）
  for(let key in target){
    defineReactive(target, key, target[key])
  }
}

// 准备数据
const data = {
  // name:'张三',
  // age:20,
  // info:{
  //   address:'北京'
  // },
  nums:[1,2,3]
}

//监听数据
observer(data)

//测试
// data.name = 'lisi'
// data.age=21
// data.x = '100' // 新增属性，监听不到 ———— 所以有 Vue.set
// delete data.name //删除属性，监听不到 ———— 所以有 Vue.delete
// data.info.address = '上海' // 深度监听
data.nums.push(4) // 监听数组
