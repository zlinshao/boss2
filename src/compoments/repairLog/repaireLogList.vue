<template>
    <div>
        <ol class="breadcrumb">
            <li>维修记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div class="has-js">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" @change="search" v-model="params.status">
                                <option value="">维修状态</option>
                            </select>
                        </div>
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
                        <div class="input-group">
                            <label style="padding-right: 25px;margin-left: 10px;"
                                   :class="{'label_check':true,'c_on':params.become_due,'c_off':!params.become_due}"
                                   @click.prevent="trid($event)">
                                <input type="checkbox" v-model="params.become_due">
                                一周内维修完成
                            </label>
                        </div>

                        <div class="form-group pull-right"
                             data-toggle="modal" data-target="#contractNumAdd">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;新建任务
                            </a>
                        </div>

                    </form>
                </div>

                <div class="col-lg-12 remind">
                    <ul class="clearFix">
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                        <li>
                            <h5>
                                <a><i class="fa fa-star"></i>&nbsp;标记</a>
                                <!--<a><i class="fa fa-star"></i>&nbsp;取消标记</a>-->
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">
                                <label for="allCheck"
                                       :class="{'label_check':true,'c_on':myData.length!=0&&pitch.length==myData.length,'c_off':pitch.length!=myData.length}"
                                       @click.prevent="chooseAll($event)">
                                    <input id="allCheck" type="checkbox" :checked="myData.length!=0&&pitch.length==myData.length">
                                </label>
                            </th>
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in 10">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item) > -1,'c_off':pitch.indexOf(item) == -1}"
                                       @click.prevent="changeIndex($event,item)">
                                    <input type="checkbox"
                                           :checked="pitch.indexOf(item) > -1">
                                </label>
                            </td>
                            <td>{{item}}</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>



        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue'
    import DatePicker from '../common/datePicker.vue'
    import STAFF from  '../common/oraganization.vue'
    export default {
        components: {Page, Status, DatePicker, STAFF},
        data() {
            return {
                pitch: [],
                beforePage: 1,                      //当前页
                paging: 1,                        //总页数

                myData : [],
                isShow : false,

                params: {
                    status : '',
                    department_id : '',
                    keywords : '',
                    become_due : false
                },
                selected : [],
                dateConfigure: [                    //时间控件
                    {
                        range: true,
                        needHour: false
                    }
                ],
                currentDate: [],                    //时间控件
                configure: {},                      //组织架构
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
        methods: {
            trid(ev){
                let valInput = ev.target.getElementsByTagName('input')[0];
                valInput.checked = !valInput.checked;
                this.params.become_due = valInput.checked;
                this.search(1);
            },

            //            搜索
            search(val){
//                this.contract_list(val);
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
            //            时间搜索
            getDate(val){
                console.log(val)
                /*if (val!=''){
                    this.params.start = val.split('to')[0];
                    this.params.end = val.split('to')[1];
                } else {
                    this.params.start = '';
                    this.params.end = '';
                }*/

                this.search(1);
            },

            // 全选
            chooseAll(ev){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch.splice(0, this.pitch.length);
                if (evInput.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.pitch.push(this.myData[i].id);
                    }
                }
            },
            // 选择
            changeIndex(ev,id){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(id);
                    this.operId = id;
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    this.operId = 0;
                }
            }
        }
    }
</script>
<style scoped>

</style>