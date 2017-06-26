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
                        <h4 class="modal-title" style="text-align: center" v-if="myResult.length==0">新增用户</h4>
                        <h4 class="modal-title" style="text-align: center" v-if="myResult.length!=0">修改用户</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <form class="form-horizontal tasi-form">
                                    <h3 style="margin-top: -15px">个人信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >真实姓名</label>
                                        <div class="col-lg-4">
                                            <input type="text" v-model="real_name" class="form-control" placeholder="真实姓名">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >姓别</label>
                                        <div class="col-lg-4">
                                            <label class="radio-inline">
                                                <input type="radio" checked value="1" v-model="gender"> 男
                                            </label>
                                            <label class="radio-inline">
                                                <input type="radio" value="2" v-model="gender"> 女
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >手机号码</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="mobile" placeholder="手机号码">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >生日</label>
                                        <div class="col-md-4">
                                            <input type="date" class="form-control" v-model="birthday">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >紧急电话</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="emergency_call" placeholder="紧急联系电话">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >身份证号</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="id_num" placeholder="身份证号码">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >身份证照</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="身份证照片">
                                        </div>
                                    </div>
                                    <hr>

                                    <h3 style="margin-top: -15px">工作信息</h3>
                                    <!--<div v-if="myResult.length!=0">-->
                                        <!--<div class="row">-->
                                            <!--<label class="col-sm-2 control-label col-lg-2" >部门</label>-->
                                            <!--<div class="col-lg-8">-->
                                                <!--<input type="text" class="form-control"  v-for="(value,key) in department" :value="value">-->
                                            <!--</div>-->
                                            <!--<input type="button" class="btn btn-primary" value="修改部门" @click="selectDep">-->
                                        <!--</div>-->
                                        <!--<div class="row">-->
                                            <!--<label class="col-sm-2 control-label col-lg-2" >职位</label>-->
                                            <!--<div class="col-lg-8">-->
                                                <!--<input type="text" class="form-control"  v-for="(value,key) in position_id" :value="value">-->
                                            <!--</div>-->
                                            <!--<input type="button" class="btn btn-primary" value="修改职位"-->
                                                   <!--data-toggle="modal" data-target=".bs-example-modal-sm">-->
                                        <!--</div>-->
                                    <!--</div>-->

                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >选择部门</label>
                                        <div class="col-md-4" >
                                            <select class="form-control" v-model="firstId" @change="getSecondDepart()">
                                                <option :value="item.id" v-for="item in firstDepart" >{{item.name}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4">
                                            <select class="form-control" v-model="secondId" @change="getThirdDepart()">
                                                <option :value="item.id" v-for="item in secondDepart">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4" >
                                            <select class="form-control" v-model="thirdId" @change="getFourDepart()">
                                                <option :value="item.id" v-for="item in thirdDepart" >{{item.name}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4">
                                            <select class="form-control" v-model="fourId" @change="departmentId()">
                                                <option :value="item.id" v-for="item in fourDepart">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >职务</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control" v-model="position_id">
                                                <option :value="item.id" v-for="item in positionList">{{item.vocation}}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">用户组</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first" v-for="item in roleList">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="rules(item.id,$event)"
                                                > {{item.role}}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">入职时间</label>
                                        <div class="col-md-4">
                                            <input type="date" class="form-control" v-model="enroll">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >等级</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control" v-model="level">
                                                <option :value="key" v-for="(value,key) in levelList">{{value}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">保险</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first">
                                                <input type="checkbox" class="pull-left" value="1" v-model="accident_insurance"> 意外险
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="1" v-model="five_insurance"> 五险
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">资料</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first">
                                                <input type="checkbox" class="pull-left" value="1" v-model="id_copy"> 身份证复印近
                                            </label>
                                            <label class="checkbox-inline check">
                                                <input type="checkbox" class="pull-left" value="1" v-model="photo"> 照片{{photo}}
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="increaseUse" v-if="myResult.length==0">新增</button>
                        <button type="button" class="btn btn-warning" v-if="myResult.length!=0">修改</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div>
</template>

<script>
    const addr='http://test.v2.api.boss.lejias.cn/manager/user/';
    export default {
        props:['editDate'],
        data(){
            return {
                //字典列表
                firstDepart:[],
                secondDepart:[],
                thirdDepart:[],
                fourDepart:[],
                roleList:[],
                positionList:[],
                levelList:[],
                //id
                firstId:'',
                secondId:'市场部',
                thirdId:'',
                fourId:'',
                //其余新增用户字段
                real_name:'',       //真实姓名
                gender:'',          //性别
                birthday:'2016-07-26',        //生日
                mobile:'',          //手机号
                emergency_call:'',  //紧急联系方式
                id_num:'',          //身份证
                bank_num:'',        //银行卡
                id_pic:[],          //照片
                department:'',      //部门
                position_id:'',     //职位
                role:[],            //角色
                accident_insurance:'',//意外险
                five_insurance:'',  //五险
                level:'',           //等级
                enroll:'',          //入职时间
                id_copy:'',         //身份证复印件
                photo:'',           //有无照片
                myResult: this.editDate,
            }
        },
        mounted(){
            this.getFirstDepart(); //请求公司列表
            this.searchRoles();    //请求角色列表
            this.getLevel();       //请求等级字典
        },
        watch:{
            editDate(val) {
                this.myResult = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
                console.log(this.myResult)
                this.real_name=this.myResult.real_name;
                this.gender=this.myResult.gender;
                this.birthday=this.myResult.birthday;
                this.mobile=this.myResult.mobile;
                this.emergency_call=this.myResult.emergency_call;
                this.id_num=this.myResult.id_num;
                this.bank_num=this.myResult.bank_num;
                this.department=this.myResult.department;
                this.position_id=this.myResult.position_id;
                this.role=this.myResult.role;
                this.accident_insurance=this.myResult.accident_insurance;
                this.five_insurance=this.myResult.five_insurance;
                this.level=this.myResult.level;
                this.id_copy=this.myResult.id_copy;
                this.photo=this.myResult.photo;
                this.enroll=this.myResult.enroll_time;
            },
        },
        methods:{
            getFirstDepart(){
                this.$http.get(addr+'departmentWb').then((res)=>{
                    this.firstDepart=res.data.data;
                })
            },
            getSecondDepart(){
                if(this.firstId!==''){
                    this.$http.get(addr+'departmentWb/id/'+this.firstId).then((res)=>{
                        this.secondDepart=res.data.data;
                        this.department=this.firstId;
                        this.thirdDepart=[];
                        this.fourDepart=[];
                    })
                }else{
                    this.secondDepart=[];
                    this.thirdDepart=[];
                    this.fourDepart=[];
                }

            },
            getThirdDepart(){
                if(this.secondId!==''){
                    this.$http.get(addr+'departmentWb/id/'+this.secondId).then((res)=>{
                        this.thirdDepart=res.data.data;
                        this.department=this.secondId;
                        this.fourDepart=[];
                    });
                    this.$http.get(addr+'positionWb/id/'+this.secondId).then((res)=>{
                        this.positionList=res.data.data;
                    });
                }else{
                    this.thirdDepart=[];
                    this.fourDepart=[];
                }

            },
            getFourDepart(){
                if(this.thirdId!==''){
                    this.$http.get(addr+'departmentWb/id/'+this.thirdId).then((res)=>{
                        this.fourDepart=res.data.data;
                        this.department=this.thirdId;
                    })
                }else{
                    this.fourDepart=[];
                }
            },
            departmentId(){
                if(this.fourId!==''){
                    this.department=this.fourId;
                }
            },
            searchRoles(){
                this.$http.get(addr+'searchRoles').then((res)=>{
                    this.roleList=res.data.data;
                })
            },
            getLevel(){
                this.$http.get(addr+'level').then((res)=>{
                    this.levelList=res.data.data;
                })
            },
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },
            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.role.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.role.indexOf(rul);
                    if (index > -1) {
                        this.role.splice(index, 1);
                    }
                }
            },
            selectDep(){
                this.myResult==[];
            },
            increaseUse(){
                this.$http.post(addr+'saveUser',
                    {
                        "real_name":this.real_name,//真实姓名
                        "gender":this. gender,//1男2女
                        "birthday":this.birthday,//生日
                        "mobile":this.mobile,//手机
                        "emergency_call":this.emergency_call,//紧急联系电话
                        "id_num":this.id_num,//身份证号
                        "bank_num":this.bank_num,//银行卡号
                        "id_pic":this.id_pic,//身份证照片id  字符串或数组
                        "department":this.department,//部门
                        "position_id":this.position_id,//职位id
                        "role":this.role,//角色id
                        "level":this.level,//等级
                        "accident_insurance":this.accident_insurance,//意外险 1有2无
                        "five_insurance":this.five_insurance,//五险 1有2无
                        "id_copy":this.id_copy,// 身份证复印件 1有2无
                        "photo":this.photo,
                        "enroll":this.enroll,
                    },
                    {headers:{'Content-Type': 'application/json'}}
                ).then((res)=>{
                    if(res.data.code==90030){
                        this.real_name='';       //真实姓名
                        this.gender='1';          //性别
                        this.birthday='';        //生日
                        this.mobile='';          //手机号
                        this.emergency_call='';  //紧急联系方式
                        this.id_num='';          //身份证
                        this.bank_num='';        //银行卡
                        this.id_pic=[];          //照片
                        this.department='';      //部门
                        this.position_id='';     //职位
                        this.role=[];            //角色
                        this.accident_insurance='';//意外险
                        this.five_insurance='';  //五险
                        this.level='';           //等级
                        this.enroll='';          //入职时间
                        this.id_copy='';        //身份证复印件
                        this.photo='';           //有无照片
                        this.department='';
                        $("#myModalAdd").madal("hide");//关闭模态框
                    }else{
                        alert("新增失败");
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