<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li>编号记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length === 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="合同编号/领取人"
                                   @keydown.enter.prevent="search(1)" v-model="params.keywords">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group pull-right"
                             data-toggle="modal" data-target="#contractNumAdd">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;新建任务
                            </a>
                        </div>

                    </form>
                </div>

                <div class="col-lg-12 remind" v-show="pitch.length === 1">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <!--<li>-->
                        <!--<h5>
                            <a><i class="fa fa-pencil"></i>&nbsp;编辑</a>
                        </h5>-->
                        <!--</li>-->
                        <li>
                            <h5><a @click="delete_num"><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                        <li>
                            <h5>
                                <a><i class="fa fa-star"></i>&nbsp;标记</a>
                                <a><i class="fa fa-star"></i>&nbsp;取消标记</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel has-js">
            <header class="panel-heading tab-bg-dark-navy-blue">
                <ul class="nav nav-tabs ">
                    <li :class="{'active': params.type === 1}" @click="tabs(1)">
                        <a data-toggle="tab" href="#receive">
                            领取
                        </a>
                    </li>
                    <!--<li :class="{'active': params.type === 2}" @click="tabs(2)">
                        <a data-toggle="tab" href="#void">
                            作废
                        </a>
                    </li>-->
                    <li :class="{'active': params.type === 3}" @click="tabs(3)">
                        <a data-toggle="tab" href="#turnOver">
                            上缴
                        </a>
                    </li>
                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content tasi-tab has-js">

                    <!--领取-->
                    <div class="tab-pane" id="receive" :class="{'active': params.type === 1}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">领取时间</th>
                                <th class="text-center">领取合同数(收)</th>
                                <th class="text-center">领取合同数(租)</th>
                                <!--<th class="text-center">剩余合同数(收)</th>-->
                                <!--<th class="text-center">剩余合同数(租)</th>-->
                                <th class="text-center">领取人</th>
                                <th class="text-center">所属部门</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="item in myData">
                                <td>
                                    <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                            'c_off':pitch.indexOf(item.id)==-1}"
                                           @click.prevent="checked_id(item.id, $event)">
                                        <input type="checkbox" class="pull-left"
                                               :checked="pitch.indexOf(item.id) > -1">
                                    </label>
                                </td>
                                <td>{{item.receiver_time}}</td>
                                <td>{{item.sf_numbers}}</td>
                                <td>{{item.zf_numbers}}</td>
                                <!--<td>{{item.zf_numbers}}</td>-->
                                <!--<td>{{item.zf_numbers}}</td>-->
                                <td>{{item.receiver_name}}</td>
                                <td>{{item.department_id[0]}}</td>
                                <td>
                                    <router-link :to="{path : '/contractNumDetail',
                                    query:{request_time:item.request_time,type:item.type,page:beforePage,myParams:params,select:selected}}"
                                    >详情</router-link>
                                </td>
                            </tr>
                            <tr class="text-center" v-show="isShow">
                                <td colspan="9" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--作废-->
                    <div class="tab-pane" id="void" :class="{'active': params.type === 2}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">实到时间</th>
                                <th class="text-center">作废合同数(收)</th>
                                <th class="text-center">作废合同数(租)</th>
                                <th class="text-center">剩余合同数(收)</th>
                                <th class="text-center">剩余合同数(租)</th>
                                <th class="text-center">报备人</th>
                                <th class="text-center">所属部门</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="item in 9">
                                <td>
                                    <label :class="{'label_check':true,'c_on':pitch.indexOf(item) > -1,
                                            'c_off':pitch.indexOf(item)==-1}"
                                           @click.prevent="checked_id(item, $event)">
                                        <input type="checkbox" class="pull-left"
                                               :checked="pitch.indexOf(item) > -1">
                                    </label>
                                </td>
                                <td>{{item}}</td>
                                <td>{{item}}</td>
                                <td>{{item}}</td>
                                <td>{{item}}</td>
                                <td>{{item}}</td>
                                <td>{{item}}</td>
                                <td>{{item}}</td>
                                <td>
                                    <router-link to="/contractNumDetail">详情</router-link>
                                </td>
                            </tr>
                            <tr class="text-center" v-show="isShow">
                                <td colspan="9" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--上缴-->
                    <div class="tab-pane" id="turnOver" :class="{'active': params.type === 3}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">上缴时间</th>
                                <th class="text-center">上缴合同数(收)</th>
                                <th class="text-center">上缴合同数(租)</th>
                                <!--<th class="text-center">剩余合同数(收)</th>-->
                                <!--<th class="text-center">剩余合同数(租)</th>-->
                                <th class="text-center">上缴人</th>
                                <th class="text-center">所属部门</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="item in myData">
                                <td>
                                    <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                            'c_off':pitch.indexOf(item.id)==-1}"
                                           @click.prevent="checked_id(item.id, $event)">
                                        <input type="checkbox" class="pull-left"
                                               :checked="pitch.indexOf(item.id) > -1">
                                    </label>
                                </td>
                                <td>{{item.paid_time}}</td>
                                <td>{{item.zf_numbers}}</td>
                                <td>{{item.sf_numbers}}</td>
                                <td>{{item.paid_name}}</td>
                                <td>{{item.department_id[0]}}</td>
                                <td>
                                    <router-link :to="{path : '/contractNumDetail',
                                    query:{request_time:item.paid_request_time,type:item.type,page:beforePage,myParams:params,select:selected}}">详情</router-link>
                                </td>
                            </tr>
                            <tr class="text-center" v-show="isShow">
                                <td colspan="9" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </section>

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <AddModal :msg="params.type" @success="successAdd"></AddModal>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue'
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/oraganization.vue'
    import Confirm from '../../common/confirm.vue'
    import AddModal from './contractNumAdd.vue'

    export default{
        components: {Page, Status, DatePicker, STAFF, Confirm, AddModal},
        data(){
            return {
                dict : {},

                pitch: [],
                beforePage: 1,                      //当前页
                paging: 1,                        //总页数

                myData : [],
                isShow : false,

                confirmMsg: {                       //删除
                    id: '',
                    msg: ''
                },
                dateConfigure: [                    //时间控件
                    {
                        range: true,
                        needHour: false
                    }
                ],
                currentDate: [],                    //时间控件
                configure: {},                      //组织架构
                selected: [],                       //部门名称
                params: {
                    type: 1,
                    department_id: '',             //筛选
                    start : '',
                    end : '',
                    keywords : ''
                },
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
            }
        },
        mounted (){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            let select = this.$route.query.select;

//            this.$http.get('code/Staff_Square/dict').then((res)=>{
                if (page!=undefined){
                    this.page = page;
                    this.beforePage = page;
                    if (params!=undefined&&typeof params!='string'){
                        this.params = params;
                        if (params.start!=''&&params.end!=''){
                            this.currentDate = [params.start,params.end];
                        }
                    }
                    this.selected = select;
                    this.search(this.beforePage);
                } else {
                    this.search(1);
                }
//            })

//            this.contract_list(1);
        },
        methods: {
//            搜索
            search(val){
                this.contract_list(val);
            },
//            列表
            contract_list (page){
                this.beforePage = page;
                this.params.page = page;
                this.$http.post('code/Contract_Number_Record/index', this.params).then((res) => {
//                    console.log(res.data);
                    if (res.data.code==30010){
                        // 成功
                        this.paging = res.data.data.pages;
//                        console.log(this.paging)

                        this.myData = res.data.data.list;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.paging = 1;
                        this.myData = [];
                        this.isShow = true;
                    }
                })
            },
//            标签页切换
            tabs (val){
                this.pitch = [];
                this.params.department_id = '';
                this.params.start = '';
                this.params.end = '';
                this.params.type = val;
                this.selected = [];
                this.contract_num = '';
                this.currentDate = [];
                this.contract_list(1);
            },
//            部门搜索模态框
            select(){
                this.configure = {type: 'department', length: 1};
                $('.selectCustom:eq(0)').modal('show');
            },
//            部门搜索
            selectDateSend(val){
                this.selected = val.department[0].name;
                this.params.department_id = val.department[0].id;
                /*for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }*/
                /*for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }*/
                this.search(1);
            },
//            清空部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

//            删除提醒
            delete_num(){
                this.confirmMsg.id = this.pitch;
                this.confirmMsg.msg = '确定删除吗？';
                $('#confirm').modal('show');
            },

//            确认删除
            getConfirm (){

            },

//            时间搜索
            getDate(val){
//                console.log(val)
                this.params.start = val.split('to')[0];
                this.params.end = val.split('to')[1];
                this.search(1);
            },

//            选中
            checked_id (rul, ev){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch = [];
                if (evInput.checked) {
                    this.pitch.push(rul);
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },

            // 新增成功
            successAdd(){
                this.contract_list(1);
            }
        }
    }
</script>
<style scoped>
    section.panel.has-js{
        background-color: transparent;
    }
    section.panel.has-js table{
        background-color: white;
    }
</style>