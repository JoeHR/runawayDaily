const data = {name:'张三',age:20}
const arr = [1,2,3,4]

function handleProxy (data){
  return new Proxy(data,{
    get(target,key,receiver){
      // 只处理 target 本身（非原型上的）属性
      const ownKeys = Reflect.ownKeys(target) // Reflect.ownKeys 可以获取到 不属于 target 原型上的属性
      if(ownKeys.includes(key)){
        console.log('get',key)
      }
      const result = Reflect.get(target,key,receiver)
      return result // 返回结果
    },
    set(target,key,val,receiver){
      // 重复的数据，不处理
      const oldVal = target[key]
      if(val===oldVal){
        return true
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
  })
}

const proxyData =handleProxy(data)
const proxyArr = handleProxy(arr)


