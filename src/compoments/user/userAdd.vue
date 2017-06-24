<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="myModalAdd">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title" style="text-align: center">新增用户</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3 style="margin-top: -15px">个人信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >真实姓名</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >姓别</label>
                                        <div class="col-lg-4">
                                            <label class="radio-inline">
                                                <input type="radio" checked value="option1"> 男
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="option2"> 女
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >手机号</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >生日</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >紧急电话</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >身份证号</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >身份证照</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                    </div>
                                    <hr>
                                    <h3 style="margin-top: -15px">工作信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >所在部门</label>
                                        <div class="col-md-4">
                                            <select class="form-control">
                                                <option value="">全部小组</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <select class="form-control">
                                                <option value="">全部小组</option>
                                            </select>
                                        </div>
                                        <div class="col-md-3">
                                            <select class="form-control">
                                                <option value="">全部小组</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4">
                                            <select class="form-control">
                                                <option value="">全部小组</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >职务</label>
                                        <div class="col-md-4">
                                            <select class="form-control">
                                                <option value="">全部小组</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >职务</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control">
                                                <option value="">全部</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >等级</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" placeholder=".col-lg-2">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">用户组</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first">
                                                <input type="checkbox" class="pull-left" value="option2"> 业务员
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 片区经理
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 区域经理
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 区助
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 财务
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 督导主管
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 督导员
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 人事
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 研发部
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 行政主管
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> BOSS
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">用户组</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first">
                                                <input type="checkbox" class="pull-left" value="option2"> 意外险
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 五险
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">资料</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first">
                                                <input type="checkbox" class="pull-left" value="option2"> 身份证复印近
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="option2"> 照片
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
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
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 5px;
        width: 17px;
        height: 17px;
    }

    .check {
        display: inline-block;
        padding: 5px 0;
        font-size: 14px;
        margin-top: 2px;
    }
    .first{
        margin-left: 10px;
    }
</style>