<template>
  <div id="app">
    <section id="container">
      <Header></Header>
      <section id="main-content">
        <section class="wrapper">
          <router-view></router-view>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
    export default {
        name: 'app',
//  data () {
//    return {
//      msg: 'Welcome to Your Vue.js App'
//    }
//  }
    }
</script>

<style scoped>

</style>
