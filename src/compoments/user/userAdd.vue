<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" tabindex="-1" role="dialog" id="myModalAdd" aria-labelledby="gridSystemModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" style="text-align: center">新增用户</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2  control-label">真实姓名</label>
                                <div class="col-lg-9">
                                    <div class="iconic-input right">
                                        <i class="fa fa-book"></i>
                                        <input type="text" v-model="realName" class="form-control" placeholder="真实姓名">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2  control-label">手机号码</label>
                                <div class="col-lg-9">
                                    <div class="iconic-input right">
                                        <i class="fa fa-book"></i>
                                        <input type="text" v-model="phone" class="form-control" placeholder="手机号码">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2  control-label">员工部门</label>
                                <div class="col-lg-9">
                                    <div class="iconic-input right">
                                        <select class="form-control" v-model="branchId" @change="getVocation">
                                            <option value="">全部</option>
                                            <option :value="item.id" v-for="item in branchList">{{item.name}}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="col-lg-2 col-sm-2  control-label">所在区域</label>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                    <select class="form-control" v-model="areaId" @change="getGroup">
                                        <option value="">全部</option>
                                        <option :value="item.id" v-for="item in areaList">{{item.area_name}}</option>
                                    </select>
                                    </div>
                                </div>
                                <label class="col-lg-3 col-sm-2  control-label">区域小组</label>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                    <select  class="form-control"  v-model="groupId">
                                        <option value="">全部</option>
                                        <option :value="item.id" v-for="item in groupList">{{item.groups}}</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label class="col-lg-2 col-sm-2  control-label">角色</label>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                    <select  class="form-control" v-model="roleId">
                                        <option value="">全部</option>
                                        <option :value="item.id" v-for="item in roleList">{{item.role}}</option>
                                    </select>
                                    </div>
                                </div>
                                <label class="col-lg-3 col-sm-2  control-label">职位</label>
                                <div class="col-lg-3">
                                    <div class="form-group">
                                    <select class="form-control" v-model="vocationId">
                                        <option value="">全部</option>
                                        <option :value="item.id" v-for="item in vocationList">{{item.vocation}}</option>
                                    </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="increaseUse">新增</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>
<script>
    const addr='http://test.v2.api.boss.lejias.cn/manager/user/';
    export default {
        data(){
            return {
                areaList:[], //区域列表
                groupList:[],//小组列表
                roleList:[],//角色列表
                vocationList:[],//职位列表
                branchList:[], //部门
                areaId:'',// 区域id
                roleId:'',//角色id
                groupId:'',//区域小组
                vocationId:'',//职位id
                realName:'',//真实姓名
                phone:'', //手机号
                branchId:'',
            }
        },
        mounted(){
            this.getArea(); //请求区域列表
            this.getRole(); //请求角色列表
            this.searchBranch();
        },
        methods:{
            getArea(){
                this.$http.get(addr+'searchArea').then((res)=>{
                    this.areaList=res.data.data;
                })
            },
            getGroup(){
                this.$http.get(addr+'searchGroups/id/'+this.areaId).then((res)=>{
                    this.groupList=res.data.data;
                })
            },
            getRole(){
                this.$http.get(addr+'searchRoles').then((res)=>{
                    this.roleList=res.data.data;
                })
            },
            getVocation(){
                this.$http.get(addr+'searchVocation/id/'+this.branchId).then((res)=>{
                    this.vocationList=res.data.data;
                })
            },
            searchBranch(){
                this.$http.get(addr+'searchbranch').then((res)=>{
                    console.log(res)
                    this.branchList=res.data.data;
                })
            },
            increaseUse(){
                this.$http.post(addr+'saveUser',
                    {
                        "real_name":this.realName,//真实姓名
                        "mobile":this.phone,
                        "area_id":this.areaId,//区域id
                        "sales_group_id":this.branchId,//小组id
                        "department":this.roleId, //部门id
                        "position_id":this.vocationId,//职位id
                        "role":this.roleId//角色id
                    },
                    {headers:{'Content-Type': 'application/json'}}
                ).then((res)=>{
                    if(res.data.code==90030){
                        this.areaId='';
                        this.roleId='';
                        this.groupId='';
                        this.vocationId='';
                        this.realName='';
                        this.phone='';
                        this.branchId='';
                        $("#myModalAdd").modal('hide');
                    }
                })
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>