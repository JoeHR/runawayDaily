<template>
  <div>
    <p>toRef demo</p>
    <hr />
    <p>ageReaRef： {{ ageReaRef }}</p>
    <p>stateRea.name {{ stateRea.name }}</p>
    <p>stateRea.age {{ stateRea.age }}</p>
    <hr />
    <p>ageRef： {{ ageRef }}</p>
    <p>state.name {{ state.name }}</p>
    <p>state.age {{ state.age }}</p>
  </div>
</template>

<script>
import { ref, toRef, reactive } from 'vue'
export default {
  setup () {
    const stateRea = reactive({
      age: 20,
      name: '张三'
    })

    const state = {
      age: 20,
      name: '张三'
    }

    const ageReaRef = toRef(stateRea, 'age')

    // toRef 如果用于普通对象（非响应式对象），产出的结果不具备响应式
    const ageRef = toRef(state, 'age')

    setTimeout(() => {
      // stateRea.age = 25
      state.age = 50
    }, 2000)

    setTimeout(() => {
      // ageReaRef.value = 30
      ageRef.value = 100
    }, 4000)

    return {
      ageReaRef,
      stateRea,
      ageRef,
      state
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
