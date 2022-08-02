<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->

  <!-- <life-cycles  :msg="msg" v-if="flag" />
  <button @click="changeHandler">change msg</button> -->
  <!-- <button @click="changeFlagHandler">change flag</button> -->

  <!-- <ref /> -->
  <!-- <to-refs /> -->
  <!-- <why-ref /> -->
  <!-- <MousePosition v-if="flag" /> -->
  <!-- <VModel /> -->
  <!-- <Watch /> -->
  <CurrentInstance />

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LifeCycles from './components/LifeCycles.vue'
import Ref from './components/Ref.vue'
import ToRef from './components/ToRef.vue'
import ToRefs from './components/ToRefs.vue'
import WhyRef from './components/WhyRef.vue'
import MousePosition from './components/MousePosition/index.vue'
import VModel from './components/vmodel/index.vue'
import Watch from './components/Watch.vue'
import CurrentInstance from './components/CurrentInstance.vue'

export default {
  name: 'App',
  data(){
    return {
      msg:"hello vue3",
      flag:true
    }
  },
  components: {
    HelloWorld,
    LifeCycles,
    Ref,
    ToRef,
    ToRefs,
    WhyRef,
    MousePosition,
    VModel,
    Watch,
    CurrentInstance
  },
  methods: {
    changeHandler(){
      this.msg = 'hello vue3' + Date.now()
    },
    changeFlagHandler(){
      this.flag = !this.flag
    }
  },
}
</script>
