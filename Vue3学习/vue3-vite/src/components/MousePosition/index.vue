<template>
  <p>mouse position {{ x }} {{ y }}</p>
  <p>mouse position {{ state.x }} {{ state.y }}</p>
</template>

<script>
import { reactive } from 'vue'
// import useMousePosition from './useMousePosition'
import { useMousePosition, useMousePosition2 } from './useMousePosition'
export default {
  name: 'MousePosition',
  setup () {
    const { x, y } = useMousePosition()
    const state = useMousePosition2()
    return {
      x,
      y,
      state
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
