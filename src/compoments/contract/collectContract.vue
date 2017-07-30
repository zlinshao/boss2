<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li class="active">收房合同</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div v-if="contractSeleted === 0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @change="search" v-model="contractSearchInfo.passed">
                                <option value="">合同状态</option>
                                <option v-for="(value,key) in dictionary.passed" :value="key">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </label>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 5px">
                        <div class="input-group">
                            <input type="text" readonly class="form-control" placeholder="点击选择部门"
                                 @click="selectDpm" v-model="departmentName">
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="reset">清空</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 " style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" @keyup="search" placeholder="手机号/开单人/业主/地址"
                                   v-model="contractSearchInfo.keywords">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search">搜索</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort" style="margin-left: 10px;margin-top: 15px">
                        <label>
                            <input type="checkbox" v-model="contractSearchInfo.become_due" @click="search">
                            30天内快到期
                        </label>
                    </div>
                    <div class="pro-sort"  style="margin-left: 10px;margin-top: 15px">
                        <span>排序方式：</span>
                        <label>
                            <input type="radio" name="sort" @click="isNewest(0)">默认排序
                        </label>
                        <label>
                            <input type="radio" name="sort" @click="isNewest(1)">最新发布
                        </label>
                    </div>
                    <div class="pull-right pro-sort" style="margin: 8px">
                        <router-link :to="{path:'/memorandum',query: {flag: 'collect'}}" class="btn btn-primary">
                           &nbsp;查看备忘录
                        </router-link>
                    </div>
                </div>
                <!--选中-->
                <div class="panel-body" v-if="contractSeleted > 0" style="padding: 0;">
                    <ul>
                        <li>已选中&nbsp; 1 &nbsp;项</li>
                        <li  class="operate">
                            <i class="fa fa-star"  v-if="mark == 1" @click="marked"> 标记</i>
                            <i class="fa fa-star"  v-if="mark == 2" @click="marked"> 取消标记</i>
                        </li>
                        <li  class="operate">
                            <i class="fa fa-times-circle" @click="deleteContract"> 删除</i>
                        </li>
                        <li  class="operate">
                            <i class="fa fa-arrow-up"  v-if="top == 1" @click="stick"> 置顶</i>
                            <i class="fa fa-times-circle"  v-if="top == 2" @click="stick"> 取消置顶</i>&nbsp;
                        </li>
                        <li  class="operate"  v-if="status !== 1" >
                            <i class="fa fa-unlock" @click="deblocking"> 解锁</i>&nbsp;
                        </li>
                        <li  class="operate">
                            <!--<i class="fa fa-eye"> 查看回访记录</i>&nbsp;-->
                            <router-link tag="i" class="fa fa-eye" :to="{path:'/contractDetail',
                                query: {ContractId: contractSeleted,flag:'review'}}">查看回访记录</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--表格-->
        <div>
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead class="text-center">
                    <tr>
                        <th class="text-center">
                            <!--<input type="checkbox">-->
                        </th>
                        <th class="text-center">合同编号</th>
                        <th class="text-center">上传时间</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">业主姓名</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">手机号码</th>
                        <th class="text-center">合同到期时间</th>
                        <th class="text-center">资料补齐时间</th>
                        <th class="text-center">过期情况</th>
                        <th class="text-center">回访情况</th>
                        <th class="text-center">审核状态</th>
                        <th class="text-center">标记</th>
                        <th class="text-center">锁定状态</th>
                        <th class="text-center">置顶</th>
                        <th class="text-center">详情</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr class="text-center" v-for="item in contractSearchList">
                        <td><input type="checkbox" @click="picked(item,$event)"
                                   :value="item.id" :checked="contractSeleted===item.id"></td>
                        <td>{{item.contract_num}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.drawer}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.detailed_address}}</td>
                        <td>{{item.mobile}}</td>
                        <td>{{item.end_date}}</td>
                        <td>{{item.complete_date[0]}}</td>
                        <td>{{item.complete_date[2]}}</td>
                        <td>{{dictionary.reviewed[item.reviewed]}}</td>
                        <td>
                            <span class="label label-success" v-if="item.passed === 5">
                                {{dictionary.passed[item.passed]}}
                            </span>
                            <span class="label label-warning" v-if="item.passed !== 5">{{dictionary.passed[item.passed]}}</span>
                        </td>
                        <td class=" myIcon">
                            <i class="fa fa-star" v-if="item.mark === 1"></i>
                        </td>
                        <td class=" myIcon">
                            <i class="fa fa-lock" v-if="item.status !== 1" ></i>
                            <i class="fa fa-unlock" v-if="item.status === 1" ></i>
                        </td>
                        <td class=" myIcon">
                            <i class="fa fa-thumb-tack" v-if="item.top === 1"></i>
                        </td>
                        <td>
                            <router-link :to="{path:'/contractDetail',query: {ContractId: item.id,flag:'detail'}}">
                                详情
                            </router-link>
                        </td>

                    </tr>
                    <tr v-if="isShow">
                        <td colspan="16" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <!--//组件-->
        <Page :pg="pages" @pag="getPage" :beforePage="contractSearchInfo.page"></Page>
        <Status :state='info'></Status>
        <Staff :configure='configure' @Staff="dpmSeleted"></Staff>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>
<script>
    import Confirm from '../common/confirm.vue'
    import Page from '../common/page.vue'
    import Staff from '../common/organization/selectStaff.vue'
    import Status from '../common/status.vue';                          //提示信息
    import DatePicker from '../common/datePicker.vue'
    export default{
        components: {DatePicker , Page , Staff, Status,Confirm},
        data(){
            return {
                start_time:"",
                end_time:'',
                dateConfigure : [{
                    range : true, // 是否选择范围
                    needHour : false // 是否需要选择小时
                }],
                departmentName:'',
                contractSearchList:[],
                contractSearchInfo:{
                    passed : '',
                    page : '',
                    department_id : '',
                    start : '',
                    end:'',
                    keywords : '',
                    //快到期合同
                    become_due:false,
                    //最新发布
                    newest : false,
                },
                dictionary:[],
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                configure:[],
                pages:'',
                isShow :false,
                contractSeleted:0,
                houseId:'',
                top:'',
                mark:'',
                status:'',
                confirmMsg:[],
                msgFlag :'',
            }
        },
        updated (){

        },
        mounted(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;
                    this.search();
                });
            },
            search(){
                this.contractSearchInfo.page = 1;
                this.searchContract();
            },
            searchContract(){
              this.$http.post('core/collect/contractlist ',this.contractSearchInfo).then((res) =>{
                  if(res.data.code === '70010'){
                      this.contractSearchList = res.data.data.list;
                      this.pages = res.data.data.pages;
                      this.isShow = false;
                  }else {
                      this.contractSearchList = [];
                      this.pages = 1;
                      this.isShow = true;
                  }
              })
            },
            selectDpm(){ //选择部门
                $('#selectCustom').modal('show');
                this.configure={length:1,class:'department',id:[9],name:'市场部'};
            },
            dpmSeleted(val){
                if(val.department.length){
                    this.departmentName=val.department[0].name;
                    this.contractSearchInfo.department_id=val.department[0].id;
                    this.search();
                }
            },
            getDate(val){
                this.contractSearchInfo.start=val.split( 'to')[0]
                this.contractSearchInfo.end=val.split( 'to')[1]
                this.search();
            },
            getPage(val){
                this.contractSearchInfo.page = val;
                this.searchContract();
            },
            isNewest(val){
                if(val){
                    this.contractSearchInfo.newest = true;
                }else {
                    this.contractSearchInfo.newest = false;
                }
                this.searchContract();
            },
            reset(){    //清空
                this.contractSearchInfo.department_id = '';
                this.departmentName = '';
                this.searchContract();
            },
            picked (item,e){  //复选框单选并保存选中的id
                if(e.target.checked===true){
                    this.contractSeleted = item.id;
                    this.houseId = item.house_id;
                    item.top === 2? this.top = 1:this.top = 2;
                    item.mark === 2? this.mark = 1:this.mark = 2;
                    item.status !==1? this.status = 2:this.status = 1;
                }else {
                    this.contractSeleted = 0;
                    this.houseId = '';
                }
            },
            stick(){  //top
                this.$http.get('core/collect/stick/id/' + this.contractSeleted +'/top/' +this.top).then((res) => {
                    if(res.data.code === '70090'){
                        this.search();
                        this.contractSeleted = 0;
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            marked(){
                this.$http.get('core/collect/mark/id/' + this.contractSeleted +'/mark/' +this.mark).then((res) => {
                    if(res.data.code === '70090'){
                        this.search();
                        this.contractSeleted = 0;
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            deleteContract(){
                this.confirmMsg = {msg:'您确定删除吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'delete';

            },
            deblocking(){  //解锁
                this.confirmMsg = {msg:'您确定解锁吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'lock';

            },
            getConfirm(){
                if(this.msgFlag === 'delete'){
                    this.$http.get('core/collect/delete/id/' + this.contractSeleted).then((res) => {
                        if(res.data.code === '70030'){
                            this.search();
                            this.contractSeleted = 0;
                            this.info.success =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        }else {
                            this.info.error =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }else if(this.msgFlag === 'lock'){
                    this.$http.get('core/collect/unVillalock/house_id/' + this.houseId).then((res) => {
                        if(res.data.code === '70010'){
                            this.search();
                            this.contractSeleted = 0;
                            this.houseId = '';
                            this.info.success =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        }else {
                            this.info.error =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>
    .panel-body{
        padding: 8px;
        padding-bottom: 0;
    }

    input[type=checkbox],input[type=radio]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
    }
    input[type=radio]{
        margin-left: 5px;
    }
    .pro-sort{
        margin-top: 10px;
    }
    .panel-body ul{
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
    }
    .panel-body ul li{
        float: left;
    }
    .panel-body ul li+li:before{
        content: '|';
        margin: 0 10px;
    }
    div.pull-right{
        margin-top: 5px;
    }
    .icon i{
        font-size: 16px;
        cursor: pointer;
    }
    .icon i:nth-of-type(1){
        color: #ccc;
    }
    .icon i+i{
        margin-left: 8px;
    }
    .operate{
        cursor: pointer;
    }
    .operate:hover{
        color: #0E90D2;
    }
    .label{
        display: inline-block;
        width: 78px;
    }
    .myIcon{
        padding: 0;
    }
</style>