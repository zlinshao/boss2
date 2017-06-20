<template>
    <div>
        <UserAdd></UserAdd>
        <Organize></Organize>
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">姓名</th>
                            <th class="text-center">真实姓名</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">区域</th>
                            <th class="text-center">小组</th>
                            <th class="text-center">职位</th>
                            <th class="text-center">角色</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in arrList">
                            <th class="text-center">{{list.id}}</th>
                            <th class="text-center">{{list.name}}</th>
                            <th class="text-center">{{list.real_name}}</th>
                            <th class="text-center">{{list.mobile}}</th>
                            <th class="text-center">{{list.area_id}}</th>
                            <th class="text-center">{{list.sales_group_id}}</th>
                            <th class="text-center">{{list.position_id}}</th>
                            <th class="text-center">{{list.role}}</th>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <div class="row pull-right" style="padding-right: 15px;">
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li>
                                <input type="button" class="btn btn-white Previous" value="上一页">
                            </li>
                            <li>
                                <input type="button" class="btn btn-white Next" value="下一页">
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import UserAdd from './userAdd.vue'
    import {mapGetters,mapActions} from 'vuex'
    import Organize from './organize.vue'
    export default {
        components:{
            UserAdd,
            Organize
        },
        data(){
            return {
                arrList:[],
            }
        },
        mounted(){
            this.fetchData();
        },
        methods:{
            fetchData(){
                this.$http.get('http://test.api.boss.lejias.cn/manager/user/readUser').then((res)=>{
                    this.arrList=res.data.data;
                })
            },
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>