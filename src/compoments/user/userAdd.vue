<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade full-width-modal-right" id="myModalAdd">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  aria-label="Close" @click="closeModal">
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
                                        <label class="col-sm-2 control-label col-lg-2" >薪资</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="salary" placeholder="薪资">
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
                                        <label class="col-sm-2 control-label col-lg-2" >毕业时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'graduation_time'"
                                                        :currentDate="[graduation_time]"                                                                                                                :placeholder="'毕业时间'"@sendDate="getGraduateDate"></DatePicker>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >转正时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'full_time'"
                                                        :currentDate="[full_time]"                                                                                                                      :placeholder="'转正时间'"@sendDate="getFullDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >买车时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'car'" :currentDate="[car]"                                                                             :placeholder="'买车时间'"@sendDate="getCarDate"></DatePicker>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >买房</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'house'" :currentDate="[house]"                                                                            :placeholder="'买房时间'"@sendDate="getHouseDate"></DatePicker>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >手机号码</label>
                                        <div class="col-lg-4">
                                            <input type="text" class="form-control" v-model="mobile" placeholder="手机号码" maxlength="11">
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" >生日</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateConfigure" :idName="'birthday'" :currentDate="[birthday]"                                                                   :placeholder="'生日'"@sendDate="getBirthDate"></DatePicker>
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
                                        <label class="col-sm-2 control-label col-lg-2" >银行卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="bank_num" placeholder="银行卡号">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-lg-2 control-label">身份证照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="idPicId" @delete="picDelete" @complete="complete"
                                                     :result="'idPic'" :idPhotos="idPic"></up-load>
                                        </div>
                                    </div>
                                    <hr>

                                    <h3 style="margin-top: -15px">工作信息</h3>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >选择部门</label>
                                        <div class="col-md-4" >
                                            <select class="form-control" v-model="firstId" @change="getSecondDepart()">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="item in firstDepart" >{{item.name}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4" v-show="secondDepart.length>0">
                                            <select class="form-control" v-model="secondId" @change="getThirdDepart()">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="item in secondDepart">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4" v-show="thirdDepart.length>0">
                                            <select class="form-control" v-model="thirdId" @change="getFourDepart()">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="item in thirdDepart" >{{item.name}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4" v-show="fourDepart.length>0">
                                            <select class="form-control" v-model="fourId" @change="getFiveDepart()">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="item in fourDepart">{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" ></label>
                                        <div class="col-md-4" v-show="fiveDepart.length>0">
                                            <select class="form-control" v-model="fiveId" @change="departmentId()">
                                                <option value="">请选择</option>
                                                <option :value="item.id" v-for="item in fiveDepart" >{{item.name}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >职务</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control" v-model="position_id">
                                                <option value="">请选择</option>
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
                                    <hr>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >账号状态</label>
                                        <div class="col-lg-4">
                                            <select  class="form-control" v-model="status">
                                                <option :value="key" v-for="(value,key) in dictionary.status">{{value}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2" >等级</label>
                                        <div class="col-lg-10">
                                            <select  class="form-control" v-model="level">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in levelList">{{value}}</option>
                                            </select>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <label class="col-sm-2 control-label col-lg-2">入职时间</label>
                                        <div class="col-md-4">
                                            <DatePicker :dateConfigure="dateTopConfigure" :idName="'enroll'" :currentDate="[enroll]"                                                                       :placeholder="'入职时间'"@sendDate="getEnrollDate"></DatePicker>
                                        </div>
                                        <label class="col-sm-2 control-label col-lg-2" v-if="status == 3">离职时间</label>
                                        <div class="col-md-4" v-if="status == 3">
                                            <DatePicker :dateConfigure="dateTopConfigure" :idName="'dismiss_time'" :currentDate="[dismiss_time]"                                                           :placeholder="'离职时间'"@sendDate="getDismissDate"></DatePicker>
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
                                                <input type="checkbox" class="pull-left" value="1" v-model="id_copy"> 身份证复印件
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
                        <button type="button" class="btn btn-default" @click="closeModal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="increaseUse">新增</button>
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
        components: { Status ,upLoad,DatePicker},
        data(){
            return {
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
                firstId:'',
                secondId:'',
                thirdId:'',
                fourId:'',
                fiveId:'',
                //其余新增用户字段
                real_name:'',       //真实姓名
                gender:'',          //性别
                birthday:'',        //生日
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
                status : '1',
                salary : '',
                dismiss_time : '',  //离职时间
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
                idPic : {
                    cus_idPhotos : {},    //银行卡照片id
                    cus_idPhoto : [],     //银行卡照片
                },
                complete_ok:'ok',

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
        created(){
            this.getFirstDepart(); //请求公司列表
            this.searchRoles();    //请求角色列表
            this.getLevel();       //请求等级字典
            this.getDictionary();
        },
        watch:{
            editDate(val){
                this.idPic.cus_idPhotos={};
            },

        },
        methods:{
            getDictionary(){
                this.$http.get('manager/user/dict').then((res)=>{
                    this.dictionary=res.data.user;
                    console.log(this.dictionary)
                })
            },
            getFirstDepart(){
                this.$http.get('manager/user/departmentWb').then((res)=>{
                    this.firstDepart=res.data.data;
                })
            },
            getSecondDepart(){
                if(this.firstId!==''){
                    this.$http.get('manager/user/departmentWb/id/'+this.firstId).then((res)=>{
                        this.secondDepart=res.data.data;
                        this.department=this.firstId;
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
                if(this.secondId!==''){
                    this.$http.get('manager/user/departmentWb/id/'+this.secondId).then((res)=>{
                        this.thirdDepart=res.data.data;
                        this.department=this.secondId;
                        this.fourDepart=[];
                        this.fiveDepart=[];
                    });
                    this.$http.get('manager/user/positionWb/id/'+this.secondId).then((res)=>{
                        this.positionList=res.data.data;
                    });
                }else{
                    this.thirdDepart=[];
                    this.fourDepart=[];
                    this.fiveDepart=[];
                }

            },
            getFourDepart(){
                if(this.thirdId!==''){
                    this.$http.get('manager/user/departmentWb/id/'+this.thirdId).then((res)=>{
                        this.fourDepart=res.data.data;
                        this.department=this.thirdId;
                        this.fiveDepart=[];
                    })
                }else{
                    this.fourDepart=[];
                    this.fiveDepart=[];
                }
            },
            getFiveDepart(){
                if(this.fourId!==''){
                    this.$http.get('manager/user/departmentWb/id/'+this.fourId).then((res)=>{
                        this.fiveDepart=res.data.data;
                        this.department=this.fourId;
                    })
                }else{
                    this.this.fiveDepart=[];
                }
            },
            departmentId(){
                if(this.fiveId!==''){
                    this.department=this.fiveId;
                }
            },
            searchRoles(){
                this.$http.get('manager/user/searchRoles').then((res)=>{
                    this.roleList=res.data.data;
                })
            },
            getLevel(){
                this.$http.get('manager/user/level').then((res)=>{
                    this.levelList=res.data.data;
                })
            },
            idPicId(val){      //获取成功上传身份证 id 数组
                this.idPic.cus_idPhoto = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let id = this.idPic.cus_idPhoto.indexOf(val);
                if (id > -1) {
                    this.idPic.cus_idPhoto.splice(id, 1);
                }
            },
            //            增删数组
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
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0 || res.data.data ===null ) {
                            this.$http.post('manager/user/saveUser',
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
                                    "id_pic":this.idPic.cus_idPhoto,
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
                                    "status" : this.status,
                                    "dismiss_time" : this.dismiss_time,
                                },
                                {headers:{'Content-Type': 'application/json'}}
                            ).then((res)=>{
                                if(res.data.code=='90030'){
                                    this.closeModal();
                                    this.info.success = res.data.msg;
                                    this.info.state_success = true;
                                }else{
                                    this.info.error = res.data.msg;
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

            closeModal(){
                this.real_name='';       //真实姓名
                this.gender='';          //性别
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
                this.origin_addr  = '';   //籍贯
                this.home_addr  = '';     //家庭住址
                this.marital_status  = ''; //婚姻
                this.fertility_status  = '';//生育
                this.political_status  = '';//政治面貌
                this.education  = '';     //学历
                this.school  = '';        //学校
                this.major  = '';        //专业
                this.graduation_time  = '';    //毕业时间
                this.full_time  = '';      //转正日期
                this.car  = '';           //买车时间
                this.house  = '';         //买房时间
                this.status  = '1';
                this.salary  = '';
                this.dismiss_time = '';
                this.department='';
                this.firstDepart=[];
                this.secondDepart=[];
                this.thirdDepart=[];
                this.fourDepart=[];
                this.fiveDepart=[];
                this.roleList=[];
                this.positionList=[];
                this.levelList=[];
                this.firstId='';
                this.secondId='';
                this.thirdId='';
                this.fourId='';
                this.fiveId='';
                this.idPic.cus_idPhoto=[];
                this.idPic.cus_idPhotos={};
                this.getFirstDepart(); //请求公司列表
                this.searchRoles();    //请求角色列表
                this.getLevel();       //请求等级字典
                $("#myModalAdd").modal("hide");//关闭模态框
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
            },
            getDismissDate(val){
                this.dismiss_time = val;
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
    .radio-inline,textarea{
        margin-bottom: 18px;
    }
</style>