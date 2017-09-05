<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right " id="myModalRevise">
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
                                        <label class="col-sm-2 control-label col-lg-2" >性别</label>
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
                                        <label class="col-sm-2 control-label col-lg-2" >籍贯</label>
                                        <div class="col-lg-10">
                                            <input type="text" v-model="origin_addr" class="form-control" placeholder="籍贯">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >家庭住址</label>
                                        <div class="col-lg-10">
                                            <input type="text" v-model="home_addr" class="form-control" placeholder="家庭住址">
                                        </div>
                                    </div>
                                    <div class="row ">
                                        <label class="col-sm-2 control-label col-lg-2" >婚姻状况</label>
                                        <div class="col-lg-4 ">
                                            <select class="form-control" v-model="marital_status">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in dictionary.marital_status">{{value}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >生育状况</label>
                                        <div class="col-lg-4">
                                            <label class="radio-inline" v-for="(value,key) in dictionary.fertility_status">
                                                <input type="radio" :value="key" v-model="fertility_status">{{value}}
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >政治面貌</label>
                                        <div class="col-md-4">
                                            <select class="form-control" v-model="political_status">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in dictionary.political_status">{{value}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >学历</label>
                                        <div class="col-md-4">
                                            <select class="form-control" v-model="education">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in dictionary.education">{{value}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >毕业院校</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="school" placeholder="毕业院校">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >专业</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="major" placeholder="专业">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >薪资</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="salary" placeholder="薪资">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >毕业时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'graduationtime'"
                                                        :currentDate="[graduation_time]"                                                                                                                :placeholder="'毕业时间'"@sendDate="getGraduateDate"></DatePicker>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >转正时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'fulltime'"
                                                        :currentDate="[full_time]"                                                                                                                      :placeholder="'转正时间'"@sendDate="getFullDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >买车时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'car2'" :currentDate="[car]"                                                                             :placeholder="'买车时间'"@sendDate="getCarDate"></DatePicker>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >买房</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'house2'" :currentDate="[house]"                                                                         :placeholder="'买车时间'"@sendDate="getHouseDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >手机号码</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="mobile" placeholder="手机号码">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >生日</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'birthday2'" :currentDate="[birthday]"                                                                   :placeholder="'生日'"@sendDate="getBirthDate"></DatePicker>
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
                                        <label class="col-lg-2 control-label">身份证照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="id_PicId" @delete="picDelete" @complete="complete"
                                                     :result="'id_Pic'" :idPhotos="id_Pic"></up-load>
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
                                                <select class="form-control" v-model="four" @change="getFiveDepart()">
                                                    <option value="">请选择</option>
                                                    <option :value="item" v-for="item in fourDepart">{{item.name}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <label class="col-sm-2 control-label col-lg-2" ></label>
                                            <div class="col-md-4" v-show="fiveDepart.length>0">
                                                <select class="form-control" v-model="five" @change="departmentId()">
                                                    <option value="">请选择</option>
                                                    <option :value="item" v-for="item in fiveDepart">{{item.name}}</option>
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
                                            <label class="checkbox-inline check first" v-for="item in roleList"  v-if="item.module !== 'revenue'">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <!--财务权限-->
                                            <h5 class="financeRole" v-if="isFinance">组长报备</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'CheckinCollect' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <h5 class="financeRole" v-if="isFinance">客户管理</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'Customer' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <h5 class="financeRole" v-if="isFinance">账户管理</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'Account' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <h5 class="financeRole" v-if="isFinance">科目管理</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'AccountSubject' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <h5 class="financeRole" v-if="isFinance">应付款项</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'AccountPayable' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <h5 class="financeRole" v-if="isFinance">应收款项</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'AccountReceivable' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <!--<h5>收支流水</h5>-->
                                            <!--<label class="checkbox-inline check first" v-for="item in roleList"-->
                                                   <!--v-if="item.module === 'revenue' && item.child_module === 'CheckinCollect' ">-->
                                                <!--<input type="checkbox" class="pull-left" :value="item.id"-->
                                                       <!--@click="roles" v-model="checkboxModel"-->
                                                <!--&gt; {{item.role}}-->
                                            <!--</label>-->
                                            <h5 class="financeRole" v-if="isFinance">转账操作记录</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'Transfer' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
                                                       @click="roles" v-model="checkboxModel"
                                                > {{item.role}}
                                            </label>
                                            <h5 class="financeRole" v-if="isFinance">待处理项</h5>
                                            <label class="checkbox-inline check first" v-for="item in roleList"
                                                   v-if="item.module === 'revenue' && item.child_module === 'AccountPending' ">
                                                <input type="checkbox" class="pull-left" :value="item.id"
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
                                            <DatePicker :dateConfigure="dateTopConfigure" :idName="'enroll2'" :currentDate="[enroll]"                                                                       :placeholder="'入职时间'"@sendDate="getEnrollDate"></DatePicker>
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
    import Status from '../common/status.vue';
    import upLoad from '../common/upload.vue'
    import DatePicker from '../common/datePicker.vue'
    export default {
        props:['editDate'],
        components: { Status ,upLoad , DatePicker},
        data(){
            return {
                myAccount:this.account,
                //字典列表
                firstDepart:[],
                secondDepart:[],
                thirdDepart:[],
                fourDepart:[],
                fiveDepart:[],
                roleList:[],
                positionList:[],
                levelList:[],
                //id
                first:[],
                second:[],
                third:[],
                four:[],
                five:[],
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
                origin_addr : '',   //籍贯
                home_addr : '',     //家庭住址
                marital_status : '', //婚姻
                fertility_status : '',//生育
                political_status : '',//政治面貌
                education : '',     //学历
                school : '',        //学校
                major :  '',        //专业
                graduation_time : '',    //毕业时间
                full_time : '',      //转正日期
                car : '',           //买车时间
                house : '',         //买房时间
                salary : '',
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
                },
                id_Pic : {
                    cus_idPhotos : {},    //银行卡照片id
                    cus_idPhoto : [],     //银行卡照片
                },
                complete_ok:'ok',
                isFinance : '', //  财务角色
                module : '',
                dateConfigure : [
                    {
                        range : false,
                        needHour : false,
                    }
                ],
                dateTopConfigure : [
                    {
                        range : false,
                        needHour : false,
                        position : 'top-right'
                    }
                ],
                dictionary : [],
            }
        },
        mounted(){
            this.getFirstDepart(); //请求公司列表
            this.searchRoles();    //请求角色列表
            this.getLevel();       //请求等级字典
            this.getDictionary();
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
                this.id_Pic.cus_idPhotos = val.album.id_pic;
                for (let i in this.id_Pic.cus_idPhotos) {
                    this.id_Pic.cus_idPhoto.push(i);
                }
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
                    this.newBox.push(this.role[i].role_id);
                };
                this.checkboxModel=this.newBox;
                for (let s in this.checkboxModel) {
                    for (let x in this.oldRoleBox) {
                        if (this.checkboxModel[s] === this.oldRoleBox[x].id) {
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


                this.origin_addr  = this.myResult.origin_addr;   //籍贯
                this.home_addr  = this.myResult.home_addr;     //家庭住址
                this.marital_status  = this.myResult.marital_status; //婚姻
                this.fertility_status  = this.myResult.fertility_status;//生育
                this.political_status  = this.myResult.political_status;//政治面貌
                this.education  = this.myResult.education;    //学历
                this.school  = this.myResult.school;        //学校
                this.major  = this.myResult.major;        //专业
                this.graduation_time  = this.myResult.graduation_time;    //毕业时间
                this.full_time  = this.myResult.full_time;      //转正日期
                this.car  = this.myResult.car;          //买车时间
                this.house  = this.myResult.house;         //买房时间
                this.salary   = this.myResult.salary ;         //买房时间
                this.duty  = this.myResult.duty;         //买房时间
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
            getDictionary(){
                this.$http.get('manager/user/dict').then((res)=>{
                    this.dictionary=res.data.user;
                })
            },
            getFirstDepart(){
                this.$http.get('manager/user/departmentWb').then((res)=>{
                    this.firstDepart=res.data.data;
                })
            },
            getSecondDepart(){
                if(this.first.id!==''&&this.first.id!=undefined){
                    this.$http.get('manager/user/departmentWb/id/'+this.first.id).then((res)=>{
                        this.secondDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.first);
                        this.depId=this.department[0].id;
                        this.thirdDepart=[];
                        this.fourDepart=[];
                        this.fiveDepart=[];
                    })
                }else{
                    this.secondDepart=[];
                    this.thirdDepart=[];
                    this.fourDepart=[];
                    this.fiveDepart=[];
                }

            },
            getThirdDepart(){
                if(this.second.id!==''&&this.second.id!=undefined){
                    this.$http.get('manager/user/departmentWb/id/'+this.second.id).then((res)=>{
                        this.thirdDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.second);
                        this.depId=this.department[0].id;
                        this.fourDepart=[];
                        this.fiveDepart=[];
                    });
                    this.$http.get('manager/user/positionWb/id/'+this.second.id).then((res)=>{
                        this.positionList=res.data.data;
                    });
                }else{
                    this.thirdDepart=[];
                    this.fourDepart=[];
                    this.fiveDepart=[];
                }

            },
            getFourDepart(){
                if(this.third.id!==''&& this.third.id!=undefined){
                    this.$http.get('manager/user/departmentWb/id/'+this.third.id).then((res)=>{
                        this.fourDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.third);
                        this.depId=this.department[0].id;
                        this.fiveDepart=[];
                    })
                }else{
                    this.fourDepart=[];
                    this.fiveDepart=[];
                }
            },
            getFiveDepart(){
                if(this.four.id!==''&& this.four.id!=undefined){
                    this.$http.get('manager/user/departmentWb/id/'+this.four.id).then((res)=>{
                        this.fiveDepart=res.data.data;
                        this.department=[];
                        this.department.push(this.four);
                        this.depId=this.department[0].id;

                    })
                }else{
                    this.fiveDepart=[];
                }
            },
            departmentId(){
                if(this.five.id!==''&& this.five.id!=undefined){
                    this.department=[];
                    this.department.push(this.five);
                    this.depId=this.department[0].id;
                }
            },
            //查询角色
            searchRoles(){
                this.$http.get('manager/user/searchRoles').then((res)=>{
                    this.roleList=res.data.data;
                    this.module = this.roleList[0].module;
                    if(this.roleList[0].module === 'human'){
                        this.isFinance = false;

                    }else if(this.roleList[0].module === 'revenue'){
                        this.isFinance = true;
                    }
                    for(let i=0;i<this.roleList.length;i++){
                        this.oldBox.push(this.roleList[i].id);
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
                this.fiveDepart=[];
                this.first=[];
                this.second=[];
                this.third=[];
                this.five=[];
                this.id_Pic.cus_idPhoto=[];
                this.id_Pic.cus_idPhotos={};
                $('.rem_div').remove();
                $("#myModalRevise").modal("hide");//关闭模态框
            },
            //选择职位
            selectPostion(){
                this.position_id=[];
                this.position_id.push(this.position);
                this.positionId=this.position_id[0].id;
            },
            getLevel(){
                this.$http.get('manager/user/level').then((res)=>{
                    this.levelList=res.data.data;
                })
            },
            //增删数组
            roles(){
                this.checkboxModelId=[]
                for (let s in this.checkboxModel) {
                    for (let x in this.oldRoleBox) {
                        if (this.checkboxModel[s] === this.oldRoleBox[x].id) {
                            this.checkboxModelId.push(this.oldRoleBox[x].id);
                        }
                    }
                }
            },
            id_PicId(val){      //获取成功上传身份证 id 数组
                this.id_PicId.cus_idPhoto = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let id = this.id_Pic.cus_idPhoto.indexOf(val);
                if (id > -1) {
                    this.id_Pic.cus_idPhoto.splice(id, 1);
                }
            },
            selectDep(){
                this.reviseDpm==false ? this.reviseDpm=true:this.reviseDpm=false;
                this.myResult==[];
            },
            reviseUse(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0 || res.data.data ===null ) {
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
                                    "id_pic":this.id_Pic.cus_idPhoto,
                                    "module":this.module,
                                    "origin_addr" : this.origin_addr,   //籍贯
                                    "home_addr" : this.home_addr,     //家庭住址
                                    "marital_status" : this.marital_status, //婚姻
                                    "fertility_status" : this.fertility_status,//生育
                                    "political_status" : this.political_status,//政治面貌
                                    "education" : this.education,     //学历
                                    "school" : this.school,        //学校
                                    "major" : this.major,        //专业
                                    "graduation_time" : this.graduation_time,    //毕业时间
                                    "full_time" : this.full_time,      //转正日期
                                    "car" : this.car,           //买车时间
                                    "house" : this.house,         //买房时间
                                    "salary" : this.salary,
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
                                    this.fiveDepart=[];
                                    this.positionList=[];
                                    this.reviseDpm=false;
                                    this.first=[];
                                    this.second=[];
                                    this.third=[];
                                    this.four=[];
                                    this.five=[];
                                    this.id_Pic.cus_idPhoto=[];
                                    this.id_Pic.cus_idPhotos={};

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
                        }
                    });
                }else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },
            // 毕业时间
            getGraduateDate(val){
                this.graduation_time = val;
            },
            getFullDate(val){
                this.full_time = val;
            },
            getCarDate(val){
                this.car = val;
            },
            getHouseDate(val){
                this.house = val;
            },
            getBirthDate(val){
                this.birthday = val;
            },
            getEnrollDate(val){
                this.enroll = val;
            }
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
    .financeRole{
        color:#59ace2;
        font-size: 16px;
    }
    .radio-inline,textarea{
        margin-bottom: 18px;
    }
</style>