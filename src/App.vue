<template>
  <Home/>
</template>

<script>
import Home from './containers/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="scss">
  @import '~normalize.css';

  * {
    box-sizing: border-box;
    font-family: 'Helvetica', 'Roboto', 'Open Sans', 'sans-serif', 'Arial';
  }
</style>
