<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>客户管理</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div  v-if="clientSelected === 0">
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px">
                        <div class="input-group">
                            <input type="text" readonly class="form-control" @click="selectDpm"
                                   v-model="departmentName" placeholder="点击选择部门">
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="reset">清空</button>
                        </span>
                        </div>

                    </div>
                    <!--<div class="pro-sort">-->
                        <!--<label>-->
                            <!--<DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>-->
                        <!--</label>-->
                    <!--</div>-->
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="房屋地址/客户名"
                                  v-model="searchInformation.keywords" @keyup="search">
                            <span class="input-group-btn">
                                    <button class="btn btn-success" type="button">搜索</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort pull-right">
                        <button class="btn btn-success" type="button" @click="addClient">
                            <i class="fa fa fa-plus-square"></i>
                            新增客户
                        </button>
                    </div>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="clientSelected>0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li @click="deleteClient">
                            <h5><a><i class="fa fa-times-circle"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="panel table table-responsive">
            <table class="table table-striped table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th class="text-center">
                        <!--<input type="checkbox">-->
                    </th>
                    <th class="text-center">房屋地址</th>
                    <th class="text-center">客户姓名</th>
                    <th class="text-center">身份</th>
                    <th class="text-center">汇款方式</th>
                    <th class="text-center">收款人姓名</th>
                    <th class="text-center">开户行</th>
                    <th class="text-center">账号</th>
                    <th class="text-center">客户生成时间</th>
                    <th class="text-center">签约人</th>
                    <th class="text-center">所属部门</th>
                    <th class="text-center">负责人</th>
                    <th class="text-center">详情</th>
                </tr>
                </thead>
                <tbody class="text-center">
                    <tr class="text-center" v-for="item in clientList">
                        <td><input type="checkbox" @click="picked(item.id,$event)"
                                   :value="item.id" :checked="clientSelected===item.id"></td>
                        <td class="text-center">{{item.address}}</td>
                        <td class="text-center">{{item.name}}</td>
                        <td class="text-center">{{dictionary.customer.identity[item.identity]}}</td>
                        <td class="text-center">{{dictionary.customer.pay_method[item.pay_method]}}</td>
                        <td class="text-center">{{item.payee}}</td>
                        <td class="text-center">{{dictionary.bank[item.bank]}}</td>
                        <td class="text-center">{{item.account}}</td>
                        <td class="text-center">{{item.create_time}}</td>
                        <td class="text-center">{{item.real_name}}</td>
                        <td class="text-center">{{item.department_name}}</td>
                        <td class="text-center">{{item.head_name}}</td>
                        <td class="text-center">
                            <router-link :to="{path:'/ClientManageDetail',
                            query:{clientId :item.id,searchInformation:searchInformation,departmentName:departmentName}}">
                                详情
                            </router-link>
                        </td>
                    </tr>
                    <tr v-if="isShow">
                        <td colspan="12" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <Department  :configure='configure' @Staff="dpmSelected"></Department>
        <ClientAdd @AddSuccess = 'AddSuccess'></ClientAdd>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <Page :pg="pages" @pag="pageSearch" :beforePage="searchInformation.pages"></Page>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import Confirm from '../../common/confirm.vue'
//    import DatePicker from '../../common/datePicker.vue'
    import Department from '../../common/organization/selectStaff.vue'
    import ClientAdd from  './clientAdd.vue'
    import Page from  '../../common/page.vue'
    export default{
        components:{ Department , ClientAdd , Confirm , Page , Status},
        data(){
          return{
              dateConfigure : [{
                  range : true, // 是否选择范围
                  needHour : false // 是否需要选择小时
              }],
              clientSelected : 0,
              configure : [],
              clientList :[],
              confirmMsg : '',
              searchInformation : {
                  department_id : '',
                  keywords :'',
                  pages : '',
              },
              pages : '',
              isShow :false,
              departmentName : '',
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
              keepStatus : false
          }
        },
        mounted(){
            this.getDictionary();
        },
        methods:{
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) =>{
                    this.dictionary = res.data;
                    if(this.$route.query.Params !== undefined && this.$route.query.Params.keywords !== undefined){
                        this.searchInformation = this.$route.query.Params;
                        this.departmentName = this.$route.query.departmentName;
                        this.keepStatus = true;
                    }else {
                        this.keepStatus = false;
                    }
                    this.getClientList();
                })
            },
            search(){
                this.searchInformation.pages = 1;
                this.getClientList();
            },
            getClientList(){
                this.$http.post('revenue/customer/index',this.searchInformation).then((res) =>{
                    if(res.data.code === '20000'){
                        this.clientList = res.data.data.data;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                    }else {
                        this.clientList = [];
                        this.pages = 1;
                        this.isShow = true;
                    }
                })
            },
            picked(id,e){
                if(e.target.checked === true){
                    this.clientSelected = id;
                }else {
                    this.clientSelected = 0;
                }
            },
            selectDpm(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure={length:1,class:'department',id:[]};
            },
            dpmSelected(val){
               this.searchInformation.department_id = val.department[0].id;
               this.departmentName = val.department[0].name;
               this.search();
            },

            addClient(){
                $('#clientAdd').modal('show');
            },
            deleteClient(){
                this.confirmMsg = {msg:'您确定删除吗'};
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('revenue/customer/delete/id/' + this.clientSelected).then((res) =>{
                    if(res.data.code === '20013'){
                        this.clientSelected = 0;
                        this.search();
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
            pageSearch(val){
                this.searchInformation.pages=val;
                this.getClientList();
            },
            reset(){    //清空
                this.searchInformation.department_id = '';
                this.departmentName = '';
                this.search();
            },
            AddSuccess(val){
                if(val = 'yes'){
                    this.search();
                }
            }
        }
    }
</script>

<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }
    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    input, select {
        margin-bottom: 0px;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
</style>
