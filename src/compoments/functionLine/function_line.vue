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
                            <input type="text" class="form-control" placeholder="任务名称/申请人" v-model="keySearch"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="pull-right">
                            <a class="btn btn-success" @click="add_fun">
                                <i class="fa fa-plus-square"></i>&nbsp;新增排期
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
                        <li v-if="fun.tabs === 2">
                            <h5><a @click="revise_fun">编辑</a></h5>
                        </li>
                        <li v-if="fun.tabs === 1">
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
                        <li :class="{'active': fun.tabs === 2}" @click="empty_tab(2)">
                            <a data-toggle="tab" href="#company" :aria-expanded="fun.tabs === 2">
                                产品排期
                            </a>
                        </li>
                        <li :class="{'active': fun.tabs === 1}" @click="empty_tab(1)">
                            <a data-toggle="tab" href="#area" :aria-expanded="fun.tabs === 1">
                                产品申请
                            </a>
                        </li>
                    </ul>
                </header>
                <div class="panel-body">
                    <div class="tab-content">
                        <div id="company" class="tab-pane" :class="{'active': fun.tabs === 2}">
                            <!--产品排期-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center width100">结束日期</th>
                                        <th class="text-center width100">功能名称</th>
                                        <th class="text-center width100">前端</th>
                                        <th class="text-center width80">后端</th>
                                        <th class="text-center width80">产品</th>
                                        <th class="text-center width100">申请人</th>
                                        <th class="text-center width100">部门</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center" v-for="key in line_list">
                                        <td>
                                            <label :class="{'label_check':true,'c_on':pitch.indexOf(key.id) > -1,
                                            'c_off':pitch.indexOf(key.id)==-1}"
                                                   @click.prevent="checked_id(key.id, $event)">
                                                <input type="checkbox" class="pull-left"
                                                       :checked="pitch.indexOf(key.id) > -1">
                                            </label>
                                        </td>
                                        <td>{{key.finish_time}}</td>
                                        <td>{{key.function_name}}</td>
                                        <td>{{key.front}}</td>
                                        <td>{{key.back}}</td>
                                        <td>{{key.product}}</td>
                                        <td>{{key.applicant_name}}</td>
                                        <td>
                                            <!--<span v-for="list in key.applicant_id">
                                                <span v-for="item in list.department">
                                                    {{item.name}}
                                                </span>
                                            </span>-->
                                            {{key.department_name}}
                                        </td>
                                    </tr>
                                    <tr class="text-center" v-if="isShow">
                                        <td colspan="12" style="font-size: 22px;">暂无数据......</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                        <div id="area" class="tab-pane" :class="{'active': fun.tabs === 1}">
                            <!--产品申请-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th class="text-center width100">创建日期</th>
                                        <th class="text-center width100">期望完成日期</th>
                                        <th class="text-center width100">功能名称</th>
                                        <th class="text-center width150">功能需求</th>
                                        <th class="text-center width100">申请人</th>
                                        <th class="text-center width100">部门</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center" v-for="">
                                    <tr class="text-center" v-for="key in line_list">
                                        <td>
                                            <label :class="{'label_check':true,'c_on':pitch.indexOf(key.id) > -1,
                                            'c_off':pitch.indexOf(key.id)==-1}"
                                                   @click.prevent="checked_id(key.id, $event)">
                                                <input type="checkbox" class="pull-left"
                                                       :checked="pitch.indexOf(key.id) > -1">
                                            </label>
                                        </td>
                                        <td>{{key.create_time}}</td>
                                        <td>{{key.expected_finish_time}}</td>
                                        <td>{{key.function_name}}</td>
                                        <td>{{key.requirement_description}}</td>
                                        <td>{{key.applicant_name}}</td>
                                        <td>
                                            <!--<span v-for="list in key.applicant_id">
                                                <span v-for="item in list.department">
                                                    {{item.name}}
                                                </span>
                                            </span>-->
                                            {{key.department_name}}
                                        </td>
                                    </tr>
                                    <tr class="text-center" v-if="isShow">
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
        <div role="dialog" class="modal fade bs-example-modal-sm" id="line">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h5>转为排期</h5>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-primary btn-md">取消</button>
                        <button data-dismiss="modal" class="btn btn-danger btn-md" @click="line_ok">确认</button>
                    </div>
                </div>
            </div>
        </div>

        <!--分页-->
        <Page @pag="search" :pg="paging" :beforePage="beforePage"></Page>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--新增排期-->
        <AddFunction @fun_success="search" :msg="fun" :detail="fun_detail"></AddFunction>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import Page from '../common/page.vue'
    import STAFF from  '../common/oraganization.vue'     //部门搜索
    import Confirm from '../common/confirm.vue'
    import AddFunction from './AddFunction.vue'
    import Status from '../common/status.vue';              //提示信息
    export default {
        components: {DatePicker, STAFF, Page, Confirm, AddFunction, Status},
        data (){
            return {
                isShow: false,
                line_list: [],
                fun_detail: {},                 //排期编辑
                fun: {
                    tabs: 2,                     //标签页状态
                    add_rev: ''
                },
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
                department_id: [],              //部门ID
                start_time: '',                 //开始时间
                end_time: '',                   //结束时间
                keySearch: '',                  //关键字搜索
                paging: '',                     //总页数
                beforePage: 1,                  //当前页
                confirmMsg: {
                    id: '',
                    msg: ''
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
            this.fun_line(1);
        },
        methods: {
            empty_tab (val){
                this.keySearch = '';
                this.selected = [];
                this.department_id = [];
                this.currentDate = [];
                this.fun.tabs = val;
                this.fun_line(1);
            },
//            列表
            fun_line (page){
                if (page!=undefined){
                    this.beforePage = page;
                }
                this.paging = '';
                this.pitch = [];

                this.$http.post('code/Functional_Schedule/index', {
                    status: this.fun.tabs,
                    start: this.start_time,
                    end: this.end_time,
                    department_id: this.department_id,
                    keywords: this.keySearch,
                    page: this.beforePage
                }).then((res) => {
                    if (res.data.code === '30010') {
                        this.line_list = res.data.data.list;
//                        console.log(this.line_list)
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.line_list = [];
                        this.paging = 1;
                        this.beforePage = 1;
                        this.isShow = true;
                    }
                });

                /*if (val === 2) {
                    this.$http.post('code/Functional_Schedule/index', {
                        status: val,
                        start: this.start_time,
                        end: this.end_time,
                        department_id: this.department_id,
                        keywords: this.keySearch,
                    }).then((res) => {
                        if (res.data.code === '30010') {
                            this.line_list = res.data.data.list;
                            this.paging = res.data.data.pages;
                            this.isShow2 = false;
                            this.isShow1 = false;
                        } else {
                            this.isShow2 = true;
                            this.isShow1 = true;
                        }
                    });
                }
                if (val === 1) {
                    this.$http.post('code/Functional_Schedule/index', {
                        status: val,
                        start: this.start_time,
                        end: this.end_time,
                        department_id: this.department_id,
                        keywords: this.keySearch,
                    }).then((res) => {
                        this.line_list = res.data.data.list
                    });
                }*/
            },
//            新增排期
            add_fun (){
                this.fun.add_rev = 'add';
                $('#AddFunction').modal({backdrop: 'static'});
            },
//            编辑排期
            revise_fun (){
                this.fun.add_rev = 'rev';
                this.$http.post('code/Functional_Schedule/showDetail', {
                    id: String(this.pitch),
                }).then((res) => {
                    this.fun_detail = res.data.data;
                    console.log(res.data.data)
                });
                $('#AddFunction').modal({backdrop: 'static'});
            },
//            转为排期
            line_time (){
                $('#line').modal('show');
            },
//            确定转为排期
            line_ok (){
                this.$http.post('code/Functional_Schedule/schedule', {
                    id: this.pitch
                }).then((res) => {
                    if (res.data.code === '30023') {
                        this.fun_line(1);
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        this.info.state_success = true;
                    } else {
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                        this.info.state_success = false;
                    }
                })
            },
//            搜索
            search (val){
                this.fun_line(val)
            },
            line_search (){

            },

//            日期搜索
            getDate(data){
                if (data !== '') {
                    this.start_time = data.split('to')[0];
                    this.end_time = data.split('to')[1];
                } else {
                    this.start_time = '';
                    this.end_time = '';
                }
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
                    this.department_id.push(val.department[i].id);
                }
                this.search(1);
            },

//            重置部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.department_id = [];
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
                this.$http.post('code/Functional_Schedule/delete', {
                    id: this.pitch
                }).then((res) => {
                    if (res.data.code === '30090') {
                        this.fun_line(1);
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        this.info.state_success = true;
                    } else {
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                        this.info.state_success = false;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .panel, .table {
        margin-bottom: 0;
    }   
</style>
