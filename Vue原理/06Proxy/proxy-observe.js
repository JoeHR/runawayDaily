// 创建响应式
function reactive(target={}){
  if(typeof target !== 'object' || target == null){
    // 不是对象或数组，则返回
    return target
  }

  // 代理配置
  const proxyConf = {
    get(target,key,receiver){
      // 只处理 target 本身（非原型上的）属性
      const ownKeys = Reflect.ownKeys(target) // Reflect.ownKeys 可以获取到 不属于 target 原型上的属性
      if(ownKeys.includes(key)){
        console.log('get',key)
      }
      const result = Reflect.get(target,key,receiver)
      // return result // 返回结果

      // 深度监听
      // 性能如何提升：  什么时候用(读取 get) 的时候，才会返回 递归后的结果(响应式的对象)
      return reactive(result)
    },
    set(target,key,val,receiver){
      // 重复的数据，不处理
      const oldVal = target[key]
      if(val===oldVal){
        return true
      }

      const ownKeys = Reflect.ownKeys(target) // Reflect.ownKeys 可以获取到 不属于 target 原型上的属性
      if(ownKeys.includes(key)){
        console.log('已有的key')
      }else{
        console.log('新增的key',key)
      }

      const result = Reflect.set(target,key,val,receiver)
      console.log('🚀👻👻👻 ~ file: 01baseuse.js ~ line 11 ~ set ~ result', result)
      console.log('set',key,val)
      return result // 是否设置成功
    },
    deleteProperty(target, key){
      const result = Reflect.defineProperty(target, key)
      console.log('🚀👻👻👻 ~ file: 01baseuse.js ~ line 17 ~ deleteProperty ~ result', result)
      console.log('delete property',key)
      return result // 是否删除成功
    }
  }

  // 生成代理对象
  const observed = new Proxy(target,proxyConf)
  return observed
}

// 测试数据

const data = {
  name:'zhangsan',
  age:20,
  info:{
    city:'北京',
    a:{
      b:{
        c:{
          d:{
            e:100
          }
        }
      }
    }
  }
}

const proxyData = reactive(data)


// proxyData.info
// get info
// Proxy { city:'北京', a:{...}}


// proxyData.info.a
// get info
// get a
// Proxy {b:{...}}
