<template>
  <div>
    {{name}} {{age}}

    <user-info v-model:name="name" v-model:age="age"></user-info>
    <user-info :name="name" @update:name="name=$event" :age="age" @update:age="age=$event"></user-info>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import UserInfo from './UserInfo.vue'
  export default {
    name:'VModel',
    components:{UserInfo},
    setup() {
      const state = reactive({
        name:'张三',
        age:20
      })

      return toRefs(state)
    }
  }
</script>

<style lang="scss" scoped>

</style>
