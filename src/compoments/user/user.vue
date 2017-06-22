<template>
    <div>
        <!--<UserAdd></UserAdd>-->
        <!--<ReviseUse></ReviseUse>-->
        <!--<OrganizA></OrganizA>-->
        <organization></organization>
    </div>
</template>
<script>
//    import UserAdd from './userAdd.vue'
//    import {mapGetters,mapActions} from 'vuex'
//    import Organize from './organize.vue'
//    import ReviseUse from './reviseUse.vue'
    import organization from './organization.vue'
    export default {
        components:{
//            UserAdd,
//            Organize,
//            ReviseUse
            organization
        },
        data(){
            return {
                arrList:[],
            }
        },
        mounted(){
        },
        methods:{

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>