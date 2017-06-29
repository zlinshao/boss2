<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="myModalRevise">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clearModal">
                            <span aria-hidden="true" >&times;</span>
                        </button>
                        <h4 class="modal-title" style="text-align: center">编辑用户</h4>
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
                                            <input @click="remindData" type="text"
                                                   class="form-control form_datetime1" v-model="birthday"
                                                   value="" placeholder="生日">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >紧急电话</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="emergency_call" placeholder="紧急联系电话">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >身份证号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="id_num" placeholder="身份证号码">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >身份证照</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" disabled placeholder="开发中，敬请期待...">
                                        </div>
                                    </div>
                                    <hr>

                                    <h3 style="margin-top: -15px">工作信息</h3>
                                    <div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >部门</label>
                                            <div class="col-lg-4">
                                                <input type="text" class="form-control" disabled
                                                       v-for="item in department" :value="item.name">
                                            </div>
                                            <label class="col-sm-2 control-label col-lg-2" >职位</label>
                                            <div class="col-lg-4">
                                                <input type="text" class="form-control" disabled
                                                       v-for="item in position_id" :value="item.vocation">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-lg-10">
                                            <input type="button" class="btn btn-warning form-control"
                                                  id="revise" value="修改部门和职位" @click="selectDep">
                                        </div>
                                    </div>
                                    <hr>
                                    <div v-if="reviseDpm">
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >选择部门</label>
                                            <div class="col-md-4" >
                                                <select class="form-control" v-model="first" @change="getSecondDepart()">
                                                    <option value="" selected>请选择</option>
                                                    <option :value="item" v-for="item in firstDepart" >{{item.name}}</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-2 control-label col-lg-2" ></label>
                                            <div class="col-md-4" v-show="secondDepart.length>0">
                                                <select class="form-control" v-model="second" @change="getThirdDepart()">
                                                    <option value="">请选择</option>
                                                    <option :value="item" v-for="item in secondDepart">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" ></label>
                                            <div class="col-md-4" v-show="thirdDepart.length>0">
                                                <select class="form-control" v-model="third" @change="getFourDepart()">
                                                    <option value="">请选择</option>
                                                    <option :value="item" v-for="item in thirdDepart" >{{item.name}}</option>
                                                </select>
                                            </div>
                                            <label class="col-sm-2 control-label col-lg-2" ></label>
                                            <div class="col-md-4" v-show="fourDepart.length>0">
                                                <select class="form-control" v-model="four" @change="departmentId()">
                                                    <option value="">请选择</option>
                                                    <option :value="item" v-for="item in fourDepart">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" >职务</label>
                                            <div class="col-lg-4">
                                                <select  class="form-control" @change="selectPostion" v-model="position">
                                                    <option value="">请选择</option>
                                                    <option :value="item" v-for="item in positionList">{{item.vocation}}</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">用户组</label>
                                        <div class="col-lg-10">
                                            <label class="checkbox-inline check first" v-for="item in roleList">
                                                <input type="checkbox" class="pull-left" :value="item.role"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >等级</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control" v-model="level">
                                                <option :value="key" v-for="(value,key) in levelList">{{value}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2">入职时间</label>
                                        <div class="col-md-4">
                                            <input @click="enrollDate" type="text"
                                                   class="form-control form_datetime2" v-model="enroll"
                                                   value="" placeholder="入职时间">
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
                                                <input type="checkbox" class="pull-left" value="1" v-model="photo"> 照片
                                            </label>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" aria-label="Close" @click="clearModal">关闭</button>
                        <button type="button" class="btn btn-warning" @click="reviseUse">修改</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    const addr='http://test.v2.api.boss.lejias.cn/manager/user/';
    import Status from '../common/status.vue';
    export default {
        props:['editDate'],
        components: { Status },
        data(){
            return {
                myAccount:this.account,
                //字典列表
                firstDepart:[],
                secondDepart:[],
                thirdDepart:[],
                fourDepart:[],
                roleList:[],
                positionList:[],
                levelList:[],
                //id
                first:[],
                second:[],
                third:[],
                four:[],
                //其余新增用户字段
                accountId:'',
                real_name:'',       //真实姓名
                gender:'',          //性别
                birthday:'',        //生日
                mobile:'',          //手机号
                emergency_call:'',  //紧急联系方式
                id_num:'',          //身份证
                bank_num:'',        //银行卡
                id_pic:[],          //照片
                department:[],      //部门名称
                depId:'',           //部门id
                position_id:[],     //职位
                positionId:'',      //职位id
//                role:[],            //角色
                accident_insurance:'',//意外险
                five_insurance:'',  //五险
                level:'',           //等级
                enroll:'',          //入职时间
                id_copy:'',         //身份证复印件
                photo:'',           //有无照片
                myResult: this.editDate,
                reviseDpm:false,
                //用户组写入
                checkboxModel:[], //选中角色名
                newBox:[],        //请求角色吗名
                oldBox:[],        //角色字典名
                oldRoleBox:[],    //角色字典
                checkboxModelId:[], //增删后角色id
                position:[],
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        mounted(){
            this.getFirstDepart(); //请求公司列表
            this.searchRoles();    //请求角色列表
            this.getLevel();       //请求等级字典
        },
        updated (){
//            时间选择
            this.remindData();
            this.enrollDate();
        },
        watch:{
            editDate(val) {
                this.myAccount = val;
                this.getFirstDepart();
                this.checkboxModel=[];
                this.myResult = val;//②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
                this.accountId=this.myResult.id;
                this.real_name=this.myResult.real_name;
                this.gender=this.myResult.gender;
                this.birthday=this.myResult.birthday;
                this.mobile=this.myResult.mobile;
                this.emergency_call=this.myResult.emergency_call;
                this.id_num=this.myResult.id_num;
                this.bank_num=this.myResult.bank_num;
                this.department=this.myResult.department;
                this.depId=this.department[0].id;
                this.position_id=this.myResult.position_id;
                this.positionId=this.position_id[0].id;
                this.role=this.myResult.role;
                for(let i=0;i<this.role.length;i++){
                    this.newBox.push(this.role[i].title);
                };
                //匹配复选框与请求数据相同项
//                for (let s in this.newBox) {
//                    for (let x in this.oldBox) {
//                        if (this.newBox[s] === this.oldBox[x]) {
//                            this.checkboxModel.push(this.newBox[s]);
//                        }
//                    }
//                };
                this.checkboxModel=this.newBox;
                for (let s in this.checkboxModel) {
                    for (let x in this.oldRoleBox) {
                        if (this.checkboxModel[s] === this.oldRoleBox[x].role) {
                            this.checkboxModelId.push(this.oldRoleBox[x].id);
                        }
                    }
                }
                this.accident_insurance=this.myResult.accident_insurance;
                this.five_insurance=this.myResult.five_insurance;
                this.level=this.myResult.level;
                this.id_copy=this.myResult.id_copy;
                this.photo=this.myResult.photo;
                this.enroll=this.myResult.enroll_time;
            },
            'checkboxModel': {
                handler: function (val, oldVal) {
                    if (this.checkboxModel.length === this.oldBox.length) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                },
                deep: true
            }
        },
        methods:{
            getFirstDepart(){
                this.$http.get(addr+'departmentWb').then((res)=>{
                    this.firstDepart=res.data.data;
                })
            },
            getSecondDepart(){
                if(this.first.id!==''&&this.first.id!=undefined){
                    this.$http.get(addr+'departmentWb/id/'+this.first.id).then((res)=>{
                        this.secondDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.first);
                        this.depId=this.department[0].id;
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
                if(this.second.id!==''&&this.second.id!=undefined){
                    this.$http.get(addr+'departmentWb/id/'+this.second.id).then((res)=>{
                        this.thirdDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.second);
                        this.depId=this.department[0].id;
                        this.fourDepart=[];
                    });
                    this.$http.get(addr+'positionWb/id/'+this.second.id).then((res)=>{
                        this.positionList=res.data.data;
                    });
                }else{
                    this.thirdDepart=[];
                    this.fourDepart=[];
                }

            },
            getFourDepart(){
                if(this.third.id.id!==''&& this.third.id!=undefined){
                    this.$http.get(addr+'departmentWb/id/'+this.third.id).then((res)=>{
                        this.fourDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.third);
                        this.depId=this.department[0].id;

                    })
                }else{
                    this.fourDepart=[];
                }
            },
            departmentId(){
                if(this.four.id!==''&& this.four.id!=undefined){
                    this.department=[];
                    this.department.push(this.four);
                    this.depId=this.department[0].id;
                }
            },
            //查询角色
            searchRoles(){
                this.$http.get(addr+'searchRoles').then((res)=>{
                    this.roleList=res.data.data;
                    for(let i=0;i<this.roleList.length;i++){
                        this.oldBox.push(this.roleList[i].role);
                    }
                    for(let i=0;i<this.roleList.length;i++){
                        this.oldRoleBox.push(this.roleList[i]);
                    }

                })

            },
            clearModal(){
                this.checkboxModel = [],
                this.newBox = [],
                this.position_id=[];     //职位
                this.positionList=[];
                this.reviseDpm=false;
                this.firstDepart=[];
                this.secondDepart=[];
                this.thirdDepart=[];
                this.fourDepart=[];
                this.first=[];
                this.second=[];
                this.third=[];
                this.four=[];
                $("#myModalRevise").modal("hide");//关闭模态框
            },
            //选择职位
            selectPostion(){
                this.position_id=[];
                this.position_id.push(this.position);
                this.positionId=this.position_id[0].id;
            },
            getLevel(){
                this.$http.get(addr+'level').then((res)=>{
                    this.levelList=res.data.data;
                })
            },
            //增删数组
            roles(){
                this.checkboxModelId=[]
                for (let s in this.checkboxModel) {
                    for (let x in this.oldRoleBox) {
                        if (this.checkboxModel[s] === this.oldRoleBox[x].role) {
                            this.checkboxModelId.push(this.oldRoleBox[x].id);
                        }
                    }
                }
            },

            enrollDate(){
                $('.form_datetime2').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    this.enroll = ev.target.value;
                }.bind(this));
            },

            remindData (){
                $('.form_datetime1').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    this.birthday = ev.target.value;
                }.bind(this));
            },
            selectDep(){
                this.reviseDpm==false ? this.reviseDpm=true:this.reviseDpm=false;
                this.myResult==[];
            },
            reviseUse(){
                this.$http.post('manager/user/updateUser/id/'+this.accountId,
                    {
                        "real_name":this.real_name,//真实姓名
                        "gender":this. gender,//1男2女
                        "birthday":this.birthday,//生日
                        "mobile":this.mobile,//手机
                        "emergency_call":this.emergency_call,//紧急联系电话
                        "id_num":this.id_num,//身份证号
                        "bank_num":this.bank_num,//银行卡号
                        "id_pic":this.id_pic,//身份证照片id  字符串或数组
                        "department":this.depId,//部门
                        "position_id":this.positionId,//职位id
                        "role":this.checkboxModelId,//角色id
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
                        //子组件传递数据到父组件
                        this.$emit('reviseAccount',this.myAccount);

                        this.real_name='';       //真实姓名
                        this.gender='1';          //性别
                        this.birthday='';        //生日
                        this.mobile='';          //手机号
                        this.emergency_call='';  //紧急联系方式
                        this.id_num='';          //身份证
                        this.bank_num='';        //银行卡
                        this.id_pic=[];          //照片
                        this.department=[];      //部门
                        this.depId='',
                        this.positionId=''          //职位id
                        this.checkboxModelId=[];            //角色
                        this.accident_insurance='';//意外险
                        this.five_insurance='';  //五险
                        this.level='';           //等级
                        this.enroll='';          //入职时间
                        this.id_copy='';        //身份证复印件
                        this.photo='';           //有无照片
                        this.checkboxModel = [],
                        this.newBox = [],
                        this.position_id=[];     //职位
                        this.position=[];    //职位
                        this.firstDepart=[];
                        this.secondDepart=[];
                        this.thirdDepart=[];
                        this.fourDepart=[];
                        this.positionList=[];
                        this.reviseDpm=false;
                        this.first=[];
                        this.second=[];
                        this.third=[];
                        this.four=[];

                        $("#myModalRevise").modal("hide");//关闭模态框
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }else{
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
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
    #revise{
        color: #fff !important;
    }
</style>