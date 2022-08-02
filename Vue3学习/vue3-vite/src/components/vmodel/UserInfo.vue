<template>
  <div>
    <input type="text" :value="name" @input="$emit('update:name',$event.target.value)">
    <input type="text" :value="age" @input="$emit('update:age',$event.target.value)">
  </div>
</template>

<script>
  export default {
    name:'UserInfo',
    props:{
      name:String,
      age:Number
    }
  }
</script>

<style lang="scss" scoped>

</style>
