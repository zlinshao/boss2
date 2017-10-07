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
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
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
                                   @keydown.enter.prevent="search(1)" v-model="contract_num">
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
                    <li :class="{'active': params.isActive === 1}" @click="tabs(1)">
                        <a data-toggle="tab" href="#receive">
                            领取
                        </a>
                    </li>
                    <li :class="{'active': params.isActive === 2}" @click="tabs(2)">
                        <a data-toggle="tab" href="#void">
                            作废
                        </a>
                    </li>
                    <li :class="{'active': params.isActive === 3}" @click="tabs(3)">
                        <a data-toggle="tab" href="#turnOver">
                            上缴
                        </a>
                    </li>
                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content tasi-tab has-js">

                    <!--领取-->
                    <div class="tab-pane" id="receive" :class="{'active': params.isActive === 1}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">领取时间</th>
                                <th class="text-center">领取合同数(收)</th>
                                <th class="text-center">领取合同数(租)</th>
                                <th class="text-center">剩余合同数(收)</th>
                                <th class="text-center">剩余合同数(租)</th>
                                <th class="text-center">领取人</th>
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
                                <td>{{item}}1</td>
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
                            <tr class="text-center">
                                <td colspan="9" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--作废-->
                    <div class="tab-pane" id="void" :class="{'active': params.isActive === 2}">
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
                            <tr class="text-center">
                                <td colspan="9" style="font-size: 22px;">暂无数据......</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--上缴-->
                    <div class="tab-pane" id="turnOver" :class="{'active': params.isActive === 3}">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center">上缴时间</th>
                                <th class="text-center">上缴合同数(收)</th>
                                <th class="text-center">上缴合同数(租)</th>
                                <th class="text-center">剩余合同数(收)</th>
                                <th class="text-center">剩余合同数(租)</th>
                                <th class="text-center">上缴人</th>
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
                            <tr class="text-center">
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

        <AddModal :msg="params.isActive"></AddModal>

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
                contract_num: '',                   //关键字搜索
                pitch: [],
                beforePage: 1,                      //当前页
                paging: '3',                        //总页数
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
                    isActive: 1,
                    department_id: [],             //筛选
                    staff_id: [],
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
            this.contract_list(1, 1);
        },
        methods: {
//            搜索
            search(val){
                this.contract_list(this.params.isActive, val);
            },
//            列表
            contract_list (val,page){
                this.$http.post('code/Contract_Number_Record/index', {
                    type: val,
                    start: "2017-09-1 14:35:25",
                    end: "2017-09-30 14:57:25"
                }).then((res) => {

                })
            },
//            标签页切换
            tabs (val){
                this.pitch = [];
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.contract_num = '';
                this.params.isActive = val;
                this.contract_list(val, 1);
            },
//            部门搜索模态框
            select(){
                $('.selectCustom:eq(0)').modal('show');
            },
//            部门搜索
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
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
        }
    }
</script>
<style scoped>

</style>