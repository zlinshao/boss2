<template>
    <div id="app">
        <section id="container">
            <!--header-->
            <HeaderVue :Name="urlName" :Card="urlCard"></HeaderVue>
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
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data (){
            return {
                urlName: '',
                urlCard: ''
            }
        },
        computed: mapGetters([
            'loading'
        ]),
        components: {
            HeaderVue
        },
        mounted (){
            let url = window.location.href;
            let url_name = url.split("?")[1].split("&")[0].split("=")[1];
            let url_card = url.split("?")[1].split("&")[1].split("=")[1];
            this.urlName = decodeURIComponent(url_name);
            this.urlCard = decodeURIComponent(url_card);

        }
    }
</script>

<style scoped>

</style>
