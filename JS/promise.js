/**
 * 1、使用Promise实现每隔一秒输出1，2，3
 *
 * 如何让异步操作顺序执行
 */

const arr = [1, 2, 3];
const result = arr.reduce(
    (p, x) => p.then(
      new Promise(
        r => setTimeout(() => r(console.log(x)), 1000))
        )
    ,Promise.resolve()
  );

  /**
   * 2、红灯3秒亮一次，黄灯2秒亮一次，绿灯1秒亮一次；如何让三个灯不断交替重复亮灯？三个亮灯函数已存在
   *
   * function red(){console.log('red')}
   * function green(){console.log('green')}
   * function yellow(){console.log('yellow')}
   */

  const red = ()=>console.log('red')
  const green = ()=>console.log('green')
  const yellow = ()=>console.log('yellow')

const light = (timer,cb)=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
      cb()
      resolve()
    },timer)
  })
}

const step = function(){
  Promise.resolve().then(()=>{
    return light(3000,red)
  }).then(()=>{
    return light(2000,green)
  }).then(()=>{
    return ligth(1000,yellow)
  }).then(()=>{
    return step()
  })
}

step()
