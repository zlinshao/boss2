<template>
    <div>
        <ol class="breadcrumb">
            <li>功能排期</li>
        </ol>
        <section class="panel">
            <div class="panel-body clearFix">

                <div v-if="pitch.length == 0">
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
                            <input type="text" class="form-control" placeholder="业务员姓名" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="pull-right">
                            <a class="btn btn-success" @click="add_fun">
                                <i class="fa fa-plus-square"></i>&nbsp;新增功能
                            </a>
                        </div>
                    </form>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a @click="revise_fun">编辑</a></h5>
                        </li>
                        <li>
                            <h5><a @click="line_time">排期</a></h5>
                        </li>
                        <li>
                            <h5><a @click="delete_line">删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <div class="col-xs-12" style="padding: 0;margin: 15px 0;">
            <section class="panel">
                <header class="panel-heading tab-bg-dark-navy-blue">
                    <ul class="nav nav-tabs">
                        <li :class="{'active': tabs}">
                            <a data-toggle="tab" href="#company" :aria-expanded="tabs">
                                产品排期
                            </a>
                        </li>
                        <li :class="{'active': !tabs}">
                            <a data-toggle="tab" href="#area" :aria-expanded="!tabs">
                                产品申请
                            </a>
                        </li>
                    </ul>
                </header>
                <div class="panel-body">
                    <div class="tab-content">
                        <div id="company" class="tab-pane" :class="{'active': tabs}">
                            <!--产品排期-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <tbody class="text-center">
                                    <tr class="text-center">
                                        <th></th>
                                        <th class="text-center width100">结束日期</th>
                                        <th class="text-center width100">功能名称</th>
                                        <th class="text-center width100">前端</th>
                                        <th class="text-center width80">后端</th>
                                        <th class="text-center width80">产品</th>
                                        <th class="text-center width100">申请人</th>
                                        <th class="text-center width100">部门</th>
                                    </tr>
                                    <tr class="text-center">
                                        <td colspan="12" style="font-size: 22px;">暂无数据......</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                        <div id="area" class="tab-pane" :class="{'active': !tabs}">
                            <!--产品申请-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <tbody class="text-center">
                                    <tr class="text-center">
                                        <th></th>
                                        <th class="text-center width100">结束日期</th>
                                        <th class="text-center width100">功能名称</th>
                                        <th class="text-center width150">功能需求</th>
                                        <th class="text-center width100">申请人</th>
                                        <th class="text-center width100">部门</th>
                                    </tr>

                                    <tr class="text-center">
                                        <td colspan="6" style="font-size: 22px;">暂无数据......</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!--分页-->
        <Page @pag="search" :pg="paging" :beforePage="beforePage"></Page>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--新增排期-->
        <AddFunction :msg="fun"></AddFunction>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import Page from '../common/page.vue'
    import STAFF from  '../common/oraganization.vue'     //部门搜索
    import Confirm from '../common/confirm.vue'
    import AddFunction from './AddFunction.vue'
    export default {
        components: {DatePicker, STAFF, Page, Confirm, AddFunction},
        data (){
            return {
                tabs: true,                     //标签页状态
                fun: '',                        //新增/编辑排期
                pitch: [],
                dateConfigure: [
                    {
                        range: true,            //日期组件参数
                        needHour: false
                    }
                ],
                currentDate: [],                //日期组件参数

                configure: {},                  //部门组件参数
                selected: [],                   //部门搜索
                params: {
                    department_id: [],
                    staff_id: [],
                    range: '',
                    search: '',
                },
                paging: 3,                      //总页数
                beforePage: 1,                  //当前页
                confirmMsg: {
                    id: '',
                    msg: ''
                },
            }
        },
        mounted (){
            this.fun_line(1);
        },
        methods: {
//            列表
            fun_line (val){
                this.beforePage = val;
                this.pitch = [];
            },
//            新增排期
            add_fun (){
                this.fun = 'add';
                $('#AddFunction').modal({backdrop: 'static'});
            },
//            编辑排期
            revise_fun (){
                this.fun = 'rev';
                $('#AddFunction').modal({backdrop: 'static'});
            },
//            排期
            line_time (){

            },
//            搜索
            search (val){
                this.fun_line(val);
            },

//            日期搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },

//            部门搜索
            select(){
                $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                this.configure = {type: 'department'};
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

//            重置部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
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
            delete_line(){
                this.confirmMsg.id = this.pitch;
                this.confirmMsg.msg = '确定删除吗？';
                $('#confirm').modal('show');
            },
            getConfirm (){
                console.log(111);
            },
        }
    }
</script>

<style scoped>
    .panel, .table {
        margin-bottom: 0;
    }
</style>
