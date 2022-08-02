<template>
  <div>
    <p>toRefs demo</p>
    <p>name {{ name }}</p>
    <p>age {{ age }}</p>
  </div>
</template>

<script>
import { ref, toRef, toRefs, reactive } from 'vue'

export default {
  name: 'ToRefs',
  setup () {
    const state = reactive({
      age: 20,
      name: '张三'
    })

    const stateAsRefs = toRefs(state) // 将响应式对象，变成普通对象

    // setTimeout(()=>{
    //   state.age = 25
    // },2000)

    // return {...state} // state 中的属性会失去响应式

    setTimeout(()=>{
      state.age = 25
    },2000)

    return stateAsRefs // 或者 return toRefs(state)
    // const { age: ageRef,name:nameRef} = stateAsRefs // 每个属性，都是 ref

    // return {
    //   ageRef,
    //   nameRef
    // }
  }
}
</script>

<style lang="scss" scoped>
</style>
