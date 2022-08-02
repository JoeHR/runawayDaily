// 何为深拷贝：拷贝对象与 被拷贝对象 的属性和方法 都是相同的，包括二者的原型指向等也要相同
// 所以在拷贝的时候，除了要拷贝对象上的可枚举属性,还要拷贝对象的原型，这才是深拷贝

function _deepClone(obj,hash=new WeakMap()){
  // 1、判断是否为基本类型，如果基本类型直接返回,非基本类型继续
  if(typeof obj !=='obj' || typeof obj=== null) return obj
  // 非基本类型，判断是否为 Date,RegExp 内置对象
  if(Object.prototype.toString.call(obj) === '[object RegExp]') return obj
  if(Object.prototype.toString.call(obj) === '[object Date]') return obj
  // 是对象的话就进行拷贝操作
  if(hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  hash.set(obj,cloneObj)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      //实现一个递归拷贝
      cloneObj[key]=_deepClone(obj[key],hash)
    }
  }
  return cloneObj
}


const a = new Date()
console.log('🚀👻👻👻 ~ file: 手写深拷贝.js ~ line 25 ~ a', a)
const aCopy = _deepClone(a)
console.log('🚀👻👻👻 ~ file: 手写深拷贝.js ~ line 27 ~ aCopy', aCopy)

const obj = {a:1,b:new Date(),c:/\a/g,d:{person:{name:'张三',age:20,handler:function(){console.log(this)}}}}
console.log('🚀👻👻👻 ~ file: 手写深拷贝.js ~ line 31 ~ obj', obj)
const objCopy = _deepClone(obj)
console.log('🚀👻👻👻 ~ file: 手写深拷贝.js ~ line 32 ~ objCopy', objCopy)


function _deepCloneV2(obj,hash=new WeakMap()){
  if(typeof obj!=='object' || obj===null) return obj
  if(obj instanceof Date || obj instanceof RegExp) return obj
  if(hash.get(obj)){
    return hash.get(obj)
  }
  const cloneObj = new obj.constructor(obj)
  hash.set(obj,cloneObj)
  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      cloneObj[key] = _deepCloneV2(obj[key],hash)
    }
  }
  return cloneObj
}
