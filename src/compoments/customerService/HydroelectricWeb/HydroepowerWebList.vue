<template>
    <div>
        <ol class="breadcrumb">
            <li>客服中心</li>
            <li>申请记录</li>
            <li>水电燃物业公摊费申报</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div class="has-js">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" @change="search(1)" v-model="params.status">
                                <option value="">审批状态</option>
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
                            <input type="text" class="form-control" placeholder="提交人/地址/手机号"
                                   @keydown.enter.prevent="search(1)" v-model="params.keyword">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                    </form>
                </div>
            </div>
        </section>

        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">申请时间</th>
                            <th class="text-center">客户姓名</th>
                            <th class="text-center">联系电话</th>
                            <th class="text-center">客户身份</th>
                            <th class="text-center">房屋地址</th>
                            <!--<th class="text-center">总报销金额</th>-->
                            <th class="text-center">合同编号</th>
                            <th class="text-center">报销类型</th>
                            <th class="text-center">审批状态</th>
                            <th class="text-center">审批结果</th>
                            <th class="text-center">完成时间</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>{{item.create_time}}</td>
                            <td>
                                <span v-for="list in item.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                    <span v-for="msg in list.value[0].rowValue" v-if="msg.label=='姓名'">
                                        {{msg.value}}
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span v-for="list in item.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                    <span v-for="msg in list.value[0].rowValue" v-if="msg.label=='电话'">
                                        {{msg.value}}
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span v-for="list in item.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                    <span v-for="msg in list.value[0].rowValue" v-if="msg.label=='客户身份'">
                                        {{msg.value}}
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span v-for="list in item.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                    <span v-for="msg in list.value[0].rowValue" v-if="msg.label=='房屋地址'">
                                        {{msg.value}}
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span v-for="list in item.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                    <span v-for="msg in list.value[0].rowValue" v-if="msg.label=='合同编号'">
                                        {{msg.value}}
                                    </span>
                                </span>
                            </td>
                            <td>
                                <span v-for="list in item.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                    <span v-for="msg in list.value[0]" v-if="msg.label=='报销类别'">
                                        {{msg.value}}
                                    </span>
                                </span>
                            </td>
                            <td>{{dict.status[item.status]}}</td>
                            <td>{{dict.process_instance_result[item.process_instance_result]}}</td>
                            <td>{{item.finish_time}}</td>
                            <td>
                                <router-link :to="{path:'/hydroepowerWebDetail',
                                query:{id:item.process_instance_id,page:beforePage,myParams:params,select:selected}}">详情</router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="11" class="text-center text-muted">
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
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue'
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/oraganization.vue'
    export default {
        props : ['simulate','isSuper'],
        components: {Page, Status, DatePicker, STAFF},
        data() {
            return {
                dict : {},

                beforePage: 1,                      //当前页
                paging: 1,                        //总页数

                myData : [],
                isShow : false,

                params : {
                    status : '',
                    department_id : '',
                    time : '',
                    keyword : '',
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
        mounted(){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            let select = this.$route.query.select;

            this.$http.get('core/approvals/dict').then((res)=>{
                this.dict = res.data.approvals;
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
                    this.getList(1);
                }
            })
        },
        methods: {
//            搜索
            search(val){
                this.getList(val);
            },
//            获取列表
            getList(val){
                this.params.page = val;
                this.params.code = 'PROC-3KYJ23FV-5IRQIFPYNNCI4Y6I6CCM1-PNW77ZAJ-3';
                this.$http.get('core/approvals/approval_list',{
                    params : this.params
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10010){
                        // success
                        this.myData = [];
                        this.paging = res.data.data.page;
                        this.myData = res.data.data.data;
                        this.isShow = false;
                    } else {
                        // fail
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
                this.params.time = val;

                this.search(1);
            },

        }
    }
</script>
<style scoped>

</style>