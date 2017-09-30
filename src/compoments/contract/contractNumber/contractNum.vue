<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li>编号记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
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
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group pull-right" data-toggle="modal" data-target="#contractNumAdd">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;新建任务
                            </a>
                        </div>
                    </form>
                </div>

                <div class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 ><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                        <li>
                            <h5 ><a><i class="fa fa-star"></i>&nbsp;标记/取消标记</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel has-js">
            <header class="panel-heading tab-bg-dark-navy-blue">
                <ul class="nav nav-tabs ">
                    <li class="active" @click="nowShow='receive'">
                        <a data-toggle="tab" href="#receive">
                            领取
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#void" @click="nowShow='void'">
                            作废
                        </a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#turnOver"  @click="nowShow='turnOver'">
                            上缴
                        </a>
                    </li>

                </ul>
            </header>
            <div class="panel-body">
                <div class="tab-content tasi-tab has-js">
                    <!--<div id="description" class="tab-pane active">
                        但是开单幅懒得看浪费
                    </div>-->
                    <!--领取-->
                    <div class="tab-pane active" id="receive">
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
                            <tr class="text-center">
                                <td>
                                    <label>
                                        <input type="checkbox">
                                    </label>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <router-link to="/contractNumDetail">详情</router-link>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        <Page :pg="pagingReceive" @pag="search" :beforePage="beforePageR"></Page>
                    </div>
                    <!--作废-->
                    <div class="tab-pane" id="void">
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
                            <tr class="text-center">
                                <td>
                                    <label>
                                        <input type="checkbox">
                                    </label>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        <Page :pg="pagingVoid" @pag="search" :beforePage="beforePageV"></Page>
                    </div>
                     <!--上缴-->
                    <div class="tab-pane" id="turnOver">
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
                                <th class="text-center">所属fadf部门</th>
                                <th class="text-center">详情</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center">
                                <td>
                                    <label>
                                        <input type="checkbox">
                                    </label>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        <Page :pg="pagingTurnOver" @pag="search" :beforePage="beforePageT"></Page>

                    </div>
                </div>

            </div>
        </section>


        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <AddModal></AddModal>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/oraganization.vue'
    import Confirm from '../../common/confirm.vue'
    import AddModal from './contractNumAdd.vue'

    export default{
        components: {Page,Status,DatePicker,STAFF,Confirm,AddModal},
        data(){
            return {
                nowShow:'receive',

                pagingReceive: 2,
                pagingVoid: 3,
                pagingTurnOver: 4,
                beforePageR: 1,
                beforePageV: 1,
                beforePageT: 1,
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
                confirmMsg: {
                    operName : '',
                    msg: '',
                },
                dateConfigure: [
                    {
                        range: true,
                        needHour: false
                    }
                ],
                currentDate: [],

                configure: {type:'department'},
                selected: [],
                params : {
                    department_id : [],
//                    staff_id : [],
                },
            }
        },
        methods: {
            search(val){

            },

            select(){
//                this.configure = {type:'department'};
                $('.selectCustom:eq(0)').modal('show');
            },
            selectDateSend(val){
//                console.log(val);
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                /*for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }*/
                this.search(1);
            },
            clearSelect(){
                if (this.selected.length == 0) {
                    return;
                }
                this.params.department_id = [];
//                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },
            getConfirm(){

            },
            getDate(val){

            }
        }
    }
</script>
<style scoped>

</style>