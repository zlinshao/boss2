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
        created (){
            this.$http.get('staff/info').then((res) => {
                if(res.data.code === 80019){
                    window.location.href = globalConfig.host + 'login.html'
                }else{
                    globalConfig.urlName = res.data.name;
                    this.urlName = res.data.name;
                    this.urlCard = res.data.avatar;

                }
            });
//            let url = window.location.href;
//            let url_name = url.split("?")[1].split("&")[0].split("=")[1];
//            let url_card = url.split("?")[1].split("&")[1].split("=")[1];
//            this.urlName = decodeURIComponent(url_name);
//            globalConfig.urlName = this.urlName;
//            this.urlCard = decodeURIComponent(url_card);
        }
    }
</script>

<style scoped>

</style>
