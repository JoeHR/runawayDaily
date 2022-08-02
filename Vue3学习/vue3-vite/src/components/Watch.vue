<template>
  <div>
    watch vs watchEffect
    <div>{{ numberRef }}</div>
    <div>{{ name }} {{ age }}</div>
  </div>
</template>

<script>
import { reactive, ref, toRefs, watch, watchEffect } from 'vue'

export default {
  name: 'Watch',
  setup () {
    const numberRef = ref(100)
    const state = reactive({
      name: '张三',
      age: 20
    })

    // watch(numberRef, (newVal, oldVal) => {
    //   console.log('ref watch', newVal, oldVal)
    // }, {
    //   immediate: true, // 初始化就执行监听
    // })

    // setTimeout(() => {
    //   numberRef.value = 200
    // }, 1500)

    // watch(
    //   // 第一个参数，确定要监听哪个属性
    //   () => state.age,
    //   // 第二个参数,回调函数
    //   (newVal, oldVal) => {
    //     console.log('state watch', newVal, oldVal)
    //   },
    //   // 第三个参数，配置项
    //   {
    //     immediate:true, // 初始化就执行监听
    //     deep:true // 深度监听
    //   }
    // )


    // 初始化时一定会执行一次
    watchEffect(() => {
      console.log('hello watchEffect')
    })
    watchEffect(() => {
      console.log('state.name only', state.name)
    })
     watchEffect(() => {
      console.log('state.name', state.name)
      console.log('state.age', state.age)
    })

    setTimeout(() => {
      state.age = 30
    }, 2000)

    setTimeout(() => {
      state.name = '李四'
    }, 4000)

    return {
      numberRef,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
