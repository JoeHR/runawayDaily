<template>
  <p>{{msg}}</p>
</template>

<script>
import {onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'

export default {
  name: 'LifeCycles',

  props:{
    msg:String
  },

  // setup 等于 beforeCreate 和 created
  setup(){
    console.log('setup')

    onBeforeMount(()=>{
      console.log('onBeforeMount')
    })
    onMounted(()=>{
      console.log('onMounted')
    })
    onBeforeUpdate(()=>{
      console.log('onBeforeUpdate')
    })
    onUpdated(()=>{
      console.log('onUpdated')
    })
    onBeforeUnmount(()=>{
      console.log('onBeforeUnmount')
    })
    onUnmounted(()=>{
      console.log('onUnmounted')
    })
  },

  beforeCreate () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 10 ~ beforeCreate ~ beforeCreate')
  },
  created () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 13 ~ created ~ created')
  },
  beforeMount () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 16 ~ beforeMount ~ beforeMount')
  },
  mounted () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 19 ~ mounted ~ mounted')
  },
  beforeUpdate () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 23 ~ beforeUpdate ~ beforeUpdate')

  },
  updated () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 27 ~ updated ~ updated')

  },
  // beforeDestroy 改名
  beforeUnmount () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 31 ~ beforeUnmount ~ beforeUnmount')

  },
  // destroyed 改名
  unmounted () {
    console.log('🚀👻👻👻 ~ file: LifrCycles.vue ~ line 37 ~ unmouned ~ unmouned')
  }
}
</script>

