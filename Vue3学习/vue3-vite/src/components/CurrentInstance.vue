<template>
  <div>
    get Instance
  </div>
</template>

<script>
import { onMounted,getCurrentInstance } from 'vue'
  export default {
    name:'GetInstance',
    data(){
      return {
        x:1,
        y:1
      }
    },
    setup(){
      console.log('this1',this)
      const instance = getCurrentInstance()

      onMounted(()=>{
        console.log('this in onMounted',this)
        console.log('x in onMounted',instance.data.x)
      })


      console.log('instance',instance)
      console.log('x',instance.data.x)
    },
    mounted() {
      console.log('this2',this)
      console.log('y',this.y)
    },
  }
</script>

<style lang="scss" scoped>

</style>
