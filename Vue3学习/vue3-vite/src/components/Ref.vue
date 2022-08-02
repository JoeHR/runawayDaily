<template>
  <p>ref demo</p>
  <p>nameRef: {{ nameRef }}</p>
  <p>sexRef: {{ sexRef }}</p>
  <p>ageRef: {{ ageRef }}</p>
  <hr/>
  <p>state.name ---- nameRef {{ state.name }}</p>
  <p>state.sex ---- sexRef {{ state.sex }}</p>
  <p>state.age ---- ageRef.value {{ state.age }}</p>
  <hr>
  <p ref="elemRef">我是一行文字</p>
</template>

<script>
import { ref, reactive,onMounted } from 'vue'
export default {
  name: 'Ref',
  setup () {
    const ageRef = ref(20) //  值类型，响应式
    const nameRef = ref('张三')
    const sexRef = ref('男')
    const elemRef = ref(null)

    const state = reactive({
      name: nameRef,
      sex:sexRef,
      age:ageRef.value
    })


    setTimeout(()=>{
      console.log('ageRef',ageRef.value)
      console.log('nameRef',nameRef.value)
      console.log('sexRef',sexRef.value)
      ageRef.value = 25
      nameRef.value = '李四'
      sexRef.value = '女'
    },1500)


    onMounted(()=>{
      console.log('ref template',elemRef.value.innerHTML)
    })

    return {
      ageRef,
      sexRef,
      nameRef,
      elemRef,
      state
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
