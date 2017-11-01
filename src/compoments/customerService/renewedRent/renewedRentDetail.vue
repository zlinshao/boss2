<template>
    <div>
        <ol class="breadcrumb">
            <li>客服中心</li>
            <li>申请记录</li>
            <li>
                <router-link to="/renewedRentList">客服部续租申请</router-link>
            </li>
            <li>客服部续租申请详情</li>
            <li class="pull-right" v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/renewedRentList',query: {myParam:params,page:page,select:select}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div>
                    <span>录入时间</span>
                    <span v-if="msg!=''">{{msg.create_time}}</span>
                </div>
            </div>
        </section>


        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span>维修详情</span>
                    </h4>
                </header>
                <section class="panel" v-if="msg!=''">
                    <div class="panel-body table-responsive client_info">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary">房屋地址：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='房屋地址'">
                                            {{list.value}}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">联系电话：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='租客电话'">
                                            {{list.value}}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">申请内容：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='申请内容'">
                                            {{list.value}}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">用途：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='用途'">
                                            {{list.value}}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">审批状态：</div>
                                    <div>{{dict.status[msg.status]}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">审批结果：</div>
                                    <div>{{dict.process_instance_result[msg.process_instance_result]}}</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <!--<div>
                                    <div class="text-primary">备注：</div>
                                    <div>奥术大师大所多</div>
                                </div>
                                <div>
                                    <div class="text-primary">审批记录：</div>
                                    <div>奥术大师大所多</div>
                                </div>-->
                                <div>
                                    <div class="text-primary">历史审批人姓名：</div>
                                    <div>{{msg.approver_userid_list}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">提交人：</div>
                                    <div>{{msg.real_name}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">部门：</div>
                                    <div>{{msg.name}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">完成时间：</div>
                                    <div>{{msg.finish_time}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                dict : {},
                id: '',
                msg : '',
                params : {},
                page : '',
                select : '',
            }
        },
        mounted(){
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.select = this.$route.query.select;

            this.id = this.$route.query.id;
//            console.log(this.id)
            this.$http.get('core/approvals/dict').then((res)=>{
                this.dict = res.data.approvals;
                this.getDetail();
            })

        },
        methods: {
            getDetail(){
                this.$http.get('core/approvals/approval_read/process_instance_id/'+this.id).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10020){
                        // success
                        this.msg = res.data.data;
                    } else {
                        // fail
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .head .panel-body{
        font-weight: bold;
    }
    .head .panel-body > div span+span {
        margin-left: 25px;

    }
    .panel-body header h4 {
        /*text-align: center;*/
        font-weight: bold;
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }
    .client_info .col-md-6>div {
        margin-bottom: 20px;
    }
    .client_info .col-md-6>div>div{
        display: inline-block;
        vertical-align: top;
    }
    .client_info .col-md-6>div .text-primary {
        /*display: inline-block;*/
        padding-right: 20px;
        /*text-align: right;*/
        width: 100px;
    }
    .client_info .col-md-6>div .text-primary+div{
        max-width: 425px;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>