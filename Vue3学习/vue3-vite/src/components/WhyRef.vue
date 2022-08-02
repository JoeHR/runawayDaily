<template>
<div>
  <p>why ref demo</p>
  <p>age: {{age}}</p>
  <p>age: {{age1}}</p>
  </div>

</template>


<script>
import { ref, toRefs, reactive,computed, watchEffect } from 'vue'

function useFeatureX () {
  const state = reactive({
    x: 1,
    y: 2
  })
  return toRefs(state)
}

export default {
  name: 'WhyRef',
  setup () {

    const { x, y } = useFeatureX()

    const state = reactive({
      age:20,
      name:'张三'
    })

    // computed 返回的也是一个 类似于 ref 的value,
    const age1 = computed(() => {
      return  state.age + 1
    })

    console.log(age1.value)

    const age = 20

    setTimeout(()=>{
      age = 25
    },1500)

    return {
      age,
      age1
    }
  }
}

// 错误 值类型保存不了传入的值，对象可以存储引用类型的引用地址
// function computed(getter){
//   let value
//   watchEffect(() => {
//     value = getter()
//   })
//   return value
// }

// 正确
// function computed(getter){
//   const ref =  {value:null}
//   watchEffect(()=>{
//     ref.value = getter()
//   })
//   return ref
// }


</script>
