<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <router-link to="/collectContract" tag="li" style="cursor: pointer"
                         v-if="searchRequirement.type === 'collect'" class="bread">收房合同</router-link>
            <router-link to="/rentingContract" tag="li" style="cursor: pointer"
                         v-if="searchRequirement.type === 'rent'" class="bread">租房合同</router-link>
            <li class="active">备忘录</li>
        </ol>

        <section class="panel">
            <div class="panel-body" v-if="contractSeleted === 0">
                <div class="form-inline clearFix">
                    <div class="form-group datetime">
                        <label>
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </label>
                    </div>
                    <div class="input-group bootstrap-timepicker" style="margin-bottom: 0;">
                        <input type="text" class="form-control" id="search_info" placeholder="请点击选择所属部门" readonly
                               v-model="user_name"  @click="selete">
                        <span class="input-group-btn">
                            <button class="btn btn-warning " id="search" type="button" @click="reset">
                                清空
                            </button>
                        </span>
                    </div>
                    <div class="input-group bootstrap-timepicker" style="margin: 0 15px;">
                        <input type="text" class="form-control"  placeholder="地址/客户/备忘录内容"
                               v-model="searchRequirement.keywords"  @keyup="search">
                        <span class="input-group-btn">
                            <button class="btn btn-success "  type="button" @click="search">
                                <i class="fa fa-search"></i>
                            </button>
                        </span>
                    </div>
                    <!--<div class="input-group reset" >-->
                        <!--<button class="btn btn-success" type="button" @click="reset">重置</button>-->
                    <!--</div>-->
                </div>
            </div>
            <!--选中-->
            <div class="panel-body" v-if="contractSeleted > 0" style="padding: 0;">
                <ul>
                    <li>已选中&nbsp; 1 &nbsp;项</li>
                    <li  class="operate" @click="editMember">
                        <i class="fa fa-pencil-square-o"> 编辑</i>&nbsp;
                    </li>
                    <!--<li  class="operate">-->
                        <!--<i class="fa fa-star"> 标记</i>-->
                    <!--</li>-->
                    <!--<li  class="operate" @click="deleteContract">-->
                        <!--<i class="fa fa-times-circle"> 删除</i>-->
                    <!--</li>-->
                    <!--<li  class="operate">-->
                        <!--<i class="fa fa-arrow-up"> 置顶</i>-->
                    <!--</li>-->
                </ul>
            </div>
        </section>

        <!--表格-->
        <div>
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">合同编号 </th>
                            <th class="text-center">上传时间</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">业主姓名</th>
                            <th class="text-center">地址</th>
                            <!--<th class="text-center">手机号码</th>-->
                            <th class="text-center">资料补齐时间</th>
                            <th class="text-center">过期情况</th>
                            <!--<th class="text-center">回访情况</th>-->
                            <th class="text-center">备忘</th>
                            <th class="text-center">创建人</th>
                            <th class="text-center">审核状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in searchList">
                            <td>
                                <label :class="{'label_check':true,'c_on':contractSeleted===item.id,
                                            'c_off':contractSeleted!==item.id}"
                                       @click.prevent="picked(item, $event)">
                                    <input type="checkbox" @click="picked(item,$event)"
                                           :value="item.id" :checked="contractSeleted===item.id">
                                </label>

                            </td>
                            <td class="text-center">{{item.contract_num}}</td>
                            <td class="text-center">{{item.create_time}}</td>
                            <td class="text-center">{{item.staff_id.name}}</td>
                            <td class="text-center">{{item.name}}</td>
                            <td class="text-center">{{item.detailed_address}}</td>
                            <!--<td class="text-center">{{item.mobile}}</td>-->
                            <td class="text-center">{{item.complete_date[0]}}</td>
                            <td class="text-center">{{item.complete_date[2]}}</td>
                            <!--<td class="text-center">{{dictionary.reviewed[item.reviewed]}}</td>-->
                            <td class="text-center">{{item.content}}</td>
                            <td class="text-center">
                                <span v-if="item.manager !== null && item.manager !==undefined">
                                    {{item.manager.name}}
                                </span>
                            </td>
                            <td class="text-center">
                                <span class="label label-success" v-if="item.passed > 4">已完成</span>
                                <span class="label label-primary" v-if="item.passed === 1">
                                    {{dictionary.passed[item.passed]}}
                                </span>
                                    <span class="label label-default" v-if="item.passed === 2">
                                    {{dictionary.passed[item.passed]}}
                                </span>
                                    <span class="label label-warning" v-if="item.passed === 3">
                                    {{dictionary.passed[item.passed]}}
                                </span>
                                    <span class="label label-warning" v-if="item.passed === 4">
                                    {{dictionary.passed[item.passed]}}
                                </span>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="11" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <!--分页-->
        <Page :pg="pages" @pag="getPage" :beforePage="currentPage"></Page>
        <Staff :configure='configure' @Staff="staffSeleted"></Staff>
        <Status :state='info'></Status>
        <!--<Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>-->

        <EditMember :contractId="contractSeleted" :type="searchRequirement.type" @MemoUpdate = 'alreadyUpdate'></EditMember>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import Page from '../common/page.vue'
    import Staff from '../common/oraganization.vue'
    import Status from '../common/status.vue';                          //提示信息
//    import Confirm from '../common/confirm.vue'
    import EditMember from  './memorandumEdit.vue'

    export default{
        components: {Page,Staff,Status,DatePicker,EditMember},
        data(){
            return {
                pages: 1,     //总页数
                page : 1,      // 当前页数
                searchRequirement : {
                    start_date : '',
                    end_date : '',
                    department_id : '',
                    page:1,
                    keywords: '',
                    type:''
                },
                configure:[],
                searchList:[],
                dictionary:[],
                user_name:'',
                currentPage:1,
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
                isShow:false,
                dateConfigure : [{
                    range : true, // 是否选择范围
                    needHour : false // 是否需要选择小时
                }],
                contractSeleted:0,
                confirmMsg:[],
            }
        },
        mounted(){
            this.searchRequirement.type = this.$route.query.flag;
            this.getDictionary();
        },
        watch:{
          
        },
        methods: {
            getDictionary(){
              this.$http.get('core/customer/dict').then((res)=>{
                  this.dictionary=res.data;
                  this.search();
              })
            },
            search(){
                this.searchRequirement.page = 1
                this.getList();
            },
            getList(){
                this.currentPage=this.searchRequirement.page;
                this.$http.post('core/memo/memolist',this.searchRequirement).then((res)=>{
                    if(res.data.code==='30030'){
                        this.searchList=res.data.data.list;
                        this.pages=res.data.data.pages;
                        this.isShow = false;
//                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
//                        this.info.state_success = true;
                    }else {
                        this.searchList=[];
                        this.pages=1;
                        this.isShow = true;
//                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
//                        this.info.state_error = true;
                    }

                })
            },
            getDate(val){
                this.searchRequirement.start_date=val.split( 'to')[0]
                this.searchRequirement.end_date=val.split( 'to')[1]
                this.search();
            },
            selete(){
                $('#selectCustom').modal('show');
                this.configure = {type:'department',length: 1};
            },
            getPage(data){
                this.searchRequirement.page = data;
                this.getList();
            },
            staffSeleted(val){
                if(val.department.length){
                    this.searchRequirement.department_id=val.department[0].id;
                    this.user_name=val.department[0].name;
                    this.search();
                }

            },
            picked (item,e){  //复选框单选并保存选中的id
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if(evInput){
                    this.contractSeleted = item.id;
                }else {
                    this.contractSeleted = 0;
                }
            },
            reset(){
                this.user_name='';
                this.searchRequirement.department_id='';
                this.searchRequirement.page=1;
                this.search();
            },
//            deleteContract(){
//                this.confirmMsg = {msg:'您确定删除吗'};
//                $('#confirm').modal('show');
//            },
//            getConfirm(){   //confirm 返回操作
//
//            },
            editMember(){
                $('#memorandumEdit').modal('show');
            },
            alreadyUpdate(val){
                if(val === 'yes'){
                    this.search();
                    this.contractSeleted = 0;
                }
            }
        }
    }
</script>

<style scoped>
    @media (min-width : 1024px) {
        tbody>tr>td:last-child{
            max-width: 340px;
        }
    }
    @media (min-width : 768px) {
        .reset{
            margin-left: 15px;
        }
    }
    .clearFix input, .clearFix select  {
        margin-bottom: 0;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
    }
    .panel-body ul{
        margin: 0;
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
    .operate{
        cursor: pointer;
    }
    .operate:hover{
        color: #0E90D2;
    }
    .label{
        width: 78px;
        display: inline-block;
    }
    .bread:hover{
        color: #59ace2;
    }
</style>