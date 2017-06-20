<template>
    <div>
        <div class="row">
            <div class="panel-body">
                <form class="form-inline" role="form">
                    <div class="form-group">
                        <select name="area" id="area" class="form-control" v-model="areaId" @change="getGroup">
                            <option :value="item.id" v-for="item in areaList">{{item.area_name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="area" id="sales_group_id" class="form-control">
                            <option :value="item.id" v-for="item in groupList">{{item.groups}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="role" class="form-control" v-model="roleId">
                            <option :value="item.id" v-for="item in roleList">{{item.role}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="vocation" class="form-control" v-model="vocationId">
                            <option value="">全部</option>
                            <option :value="item.id" v-for="item in vocationList">{{item.vocation}}</option>
                        </select>
                    </div>
                    <div class="input-group bootstrap-timepicker">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="地址/手机/开单人">
                        <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button"><i
                                        class="fa fa-search"></i></button>
                            </span>
                    </div>
                    <div class="form-group" style="float: right">
                        <a class="btn btn-success">
                            <i class="fa fa-plus-square"></i>&nbsp;新增用户
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                areaList:[],
                groupList:[],
                roleList:[],
                vocationList:[],
                areaId:'802',
//                groupId:'1',
                roleId:'1',
                vocationId:''
            }
        },
        mounted(){
            this.getArea();
            this.getRole();
            this.getVocation();
        },
        methods:{
            getArea(){
                this.$http.get('http://test.api.boss.lejias.cn/manager/user/searchArea').then((res)=>{
                    this.areaList=res.data.data;
                })
            },
            getGroup(){
                this.$http.get('http://test.api.boss.lejias.cn/manager/user/searchGroups/id/'+this.areaId).then((res)=>{
                    this.groupList=res.data.data;
                })
            },
            getRole(){
                this.$http.get('http://test.api.boss.lejias.cn/manager/user/searchRoles').then((res)=>{
                    this.roleList=res.data.data;
                })
            },
            getVocation(){
                this.$http.get('http://test.api.boss.lejias.cn/manager/user/searchVocation').then((res)=>{
                    this.vocationList=res.data.data;
                })
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>