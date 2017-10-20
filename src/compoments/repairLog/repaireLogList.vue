<template>
    <div>
        <ol class="breadcrumb">
            <li>维修记录</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div class="has-js" v-if="pitch.length==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" @change="search(1)" v-model="params.status">
                                <option value="">维修状态</option>
                                <option :value="value" v-for="(key,value) in dict.status">{{key}}</option>
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
                            <input type="text" class="form-control" placeholder="合同号/客户姓名/手机号"
                                   @keydown.enter.prevent="search(1)" v-model="params.keyword">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="input-group">
                            <label style="padding-right: 25px;margin-left: 10px;"
                                   :class="{'label_check':true,'c_on':params.week,'c_off':!params.week}"
                                   @click.prevent="trid($event)">
                                <input type="checkbox" v-model="params.week">
                                一周内维修完成
                            </label>
                        </div>

                        <!--<div class="form-group pull-right"
                             data-toggle="modal" data-target="#contractNumAdd">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;新建任务
                            </a>
                        </div>-->

                    </form>
                </div>

                <div class="col-lg-12 remind" v-else="">
                    <ul class="clearFix">
                        <li><h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5></li>
                        <li v-if="pitch.length==1">
                            <h5 @click="edit"><a><i class="fa fa-edit"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 @click="dele"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                        <!--<li>
                            <h5>
                                <a><i class="fa fa-star"></i>&nbsp;标记</a>
                                &lt;!&ndash;<a><i class="fa fa-star"></i>&nbsp;取消标记</a>&ndash;&gt;
                            </h5>
                        </li>-->
                        <li v-if="pitch.length==1">
                            <h5>
                                <a v-show="!stick[0]" @click="stickUp"><i class="fa fa-arrow-up"></i>&nbsp;置顶</a>
                                <a v-show="stick[0]" @click="unstick(pitch[0])"><i class="fa fa-arrow-up"></i>&nbsp;取消置顶</a>
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
                            <th class="text-center">录入时间</th>
                            <th class="text-center">合同类型</th>
                            <th class="text-center">合同号</th>
                            <th class="text-center">客户姓名</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">联系电话</th>
                            <th class="text-center">约定维修时间</th>
                            <th class="text-center">认责人</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">部门</th>
                            <th class="text-center">置顶</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex($event,item.id,item.top!=null)">
                                    <input type="checkbox"
                                           :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>{{item.create_time}}</td>
                            <td>{{dict.contract_type[item.contract_type]}}</td>
                            <td>{{item.contract_num}}</td>
                            <td>{{item.customer_name}}</td>
                            <td>{{item.detailed_address}}</td>
                            <td>{{item.customer_mobile}}</td>
                            <td>{{item.repair_time}}</td>
                            <td>{{dict.person_liable[item.person_liable]}}</td>
                            <td>{{dict.status[item.status]}}</td>
                            <td>{{item.real_name}}</td>
                            <td>{{item.department_name}}</td>
                            <td>
                                <a @click="unstick(item.id)" v-show="item.top!=null"><i class="fa fa-thumb-tack"></i></a>
                            </td>
                            <td>
                                <router-link :to="{path:'repairLogDetail',query:{repairId:item.id,page:beforePage,myParams:params,select:selected}}">详情</router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="12" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Status :state='info'></Status>
        <!--编辑-->
        <EditRepair :isAdd="false" :repairId="repairId" @editSuccess="search"></EditRepair>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue'
    import DatePicker from '../common/datePicker.vue'
    import STAFF from  '../common/oraganization.vue'
    import EditRepair from './repaireLogEdit.vue'
    import Confirm from '../common/confirm.vue'
    export default {
        components: {Page, Status, DatePicker, STAFF,EditRepair,Confirm},
        data() {
            return {
                dict : {},

                pitch: [],
                stick : [],
                beforePage: 1,                      //当前页
                paging: 1,                        //总页数

                myData : [],
                isShow : false,

                params: {
                    time : '',
                    status : '',
                    department_id : '',
                    keyword : '',
                    week : false
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
                confirmMsg: {
                    name : '',
                    msg: ''
                },
                repairId : '',
            }
        },
        mounted(){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            let select = this.$route.query.select;

            this.$http.get('maint/record/dict').then((res)=>{
//                console.log(res.data);
                this.dict = res.data.Repair;
                if (page!=undefined){
                    this.page = page;
                    this.beforePage = page;
                    if (params!=undefined&&typeof params!='string'){
                        this.params = params;
                        if (params.start!=''&&params.end!=''){
                            this.currentDate = params.time.split('to');
                        }
                    }
                    this.selected = select;
                    this.search(this.beforePage);
                } else {
                    this.search(1);
                }
            })

        },
        methods: {
            trid(ev){
                let valInput = ev.target.getElementsByTagName('input')[0];
                valInput.checked = !valInput.checked;
                this.params.week = valInput.checked;
                this.search(1);
            },

//            搜索
            search(val){
                this.getList(val);
            },
//            获取列表
            getList(val){
                if (val!=undefined){
                    this.params.page = val;
                }
                this.pitch = [];
                this.$http.get('maint/record/listRepair',{
                    params : this.params
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10010){
                        // 成功
                        this.paging = res.data.data.page;
                        this.myData = res.data.data.data;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.paging = 1;
                        this.myData = [];
                        this.isShow = true;
                    }
                })
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
                /*if (this.selected.length === 0) {
                    return;
                }*/
                this.params.department_id = '';
                this.selected = [];
                this.search(1);
            },
            //            时间搜索
            getDate(val){
                console.log(val);
                this.params.time = val;

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
            changeIndex(ev,id,isTop){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(id);
                    this.operId = id;
                    this.stick.push(isTop);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                        this.stick.splice(index, 1);
                    }
                    this.operId = 0;
                }
            },
//            编辑
            edit(){
                this.repairId = this.pitch[0];
                $('#repairLogEdit').modal('show');
            },
//            删除
            dele(){
                this.confirmMsg.msg = '确定删除吗？';
                $('#confirm').modal('show');
            },
            getConfirm(){
                // delete
                this.$http.get('maint/record/deleteRepair',{
                    params : {
                        id : this.pitch
                    }
                }).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10040){
                        // success
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.getList(1)
                    } else {
                        // fail
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
//            置顶
            stickUp(){
                this.$http.post('core/core_common/stick',{
                    category : 'repair',
                    table_id : this.pitch[0]
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==20020){
                        // success
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.getList(1)
                    } else {
                        // fail
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
//            取消置顶
            unstick(id){
                this.$http.post('core/core_common/unstick',{
                    category : 'repair',
                    table_id : id
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==20020){
                        // success
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.getList(1)
                    } else {
                        // fail
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
        }
    }
</script>
<style scoped>

</style>