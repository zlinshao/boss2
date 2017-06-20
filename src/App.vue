<template>
  <div id="app">
    <section id="container">
      <!--header-->
      <HeaderVue></HeaderVue>
      <!--router-->
      <section id="main-content">
        <section class="wrapper">
          <router-view></router-view>
        </section>
      </section>
      <!--loading-->
      <loading v-show="loading"></loading>
    </section>
  </div>
</template>

<script>
    import HeaderVue from './compoments/header/header.vue'
    import {mapGetters,mapActions} from 'vuex'

    export default {
        computed:mapGetters([
            'loading'
        ]),
        components:{
            HeaderVue
        }
    }
</script>

<style scoped>

</style>
