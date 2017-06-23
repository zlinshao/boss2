<template>
    <div>
        <organization></organization>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import organization from './organization.vue'
    export default {
        components:{
            organization
        },
        data(){
            return {
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>