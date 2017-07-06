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


                <button id="custom_service" type="button"
                        class="btn btn-default"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="陆宣羽(15851899908)蔡云杰(13327823182)">

                    <i class="fa fa-phone"></i>
                </button>


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
                if (res.data.code === 80019) {
                    window.location.href = 'login.html'
                } else {
                    globalConfig.urlName = res.data.name;
                    this.urlName = res.data.name;
                    this.urlCard = res.data.avatar;
                }
            });
        }
    }
</script>

<style scoped>
    #custom_service {

        position: fixed;
        bottom: 10px;
        right: 10px;
        font-size: 20px;
        background: #00C1DE;
        z-index: 100;
        border: 0;
        border-radius: 50%;
    }
</style>
