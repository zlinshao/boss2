<template>
    <div>
        <ol class="breadcrumb">
            <li>客服中心</li>
            <li>申请记录</li>
            <li>
                <router-link to="/hydroepowerWebList">水电燃报销（官网）</router-link>
            </li>
            <li>水电燃报销详情（官网）</li>
            <li class="pull-right" v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/hydroepowerWebList',query: {myParam:params,page:page,select:select}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div>
                    <span>申请时间</span>
                    <span v-if="msg!=''">{{msg.create_time}}</span>
                </div>
            </div>
        </section>


        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span>报销详情</span>
                    </h4>
                </header>
                <section class="panel" v-if="msg!=''">
                    <div class="panel-body table-responsive client_info">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary">客户姓名：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='姓名'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">联系电话：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='电话'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">客户身份：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='客户身份'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">房屋地址：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='房屋地址'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">合同编号：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='合同编号'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">报销类别：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='报销类别'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">备注：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='备注'">
                                            {{list.value}}
                                        </span>
                                    </div>
                                </div>

                            </div>
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary">开户行：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='开户行'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">收款人姓名：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='收款人姓名'">
                                                {{a.value}}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">银行卡账号：</div>
                                    <div>
                                        <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='报销明细'">
                                            <span v-for="a in list.value[0].rowValue" v-if="a.label=='银行卡账号'">
                                                {{a.value}}
                                            </span>
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
                                <div>
                                    <div class="text-primary">历史审批人姓名：</div>
                                    <div>{{msg.approver_userid_list}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">完成时间：</div>
                                    <div>{{msg.finish_time}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">图片：</div>
                                    <span v-for="list in msg.form_component_values.form_component_value_vo" v-if="list.name=='图片'">
                                        <span v-if="list.value.length>0" v-for="(img,index) in list.value"
                                              style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index,list.value)">
                                            <img :src="img" alt="" style="width: 40px;height: 40px">
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <!--查看大图-->
        <PicModal :largePic="largePic"></PicModal>

    </div>
</template>
<script>
    import PicModal from '../../common/largePic_baoxiao.vue'               //查看大图
    export default {
        components: {PicModal},
        data() {
            return {
                dict : {},
                id: '',
                msg : '',
                params : {},
                page : '',
                select : '',
                largePic: [],               //点击放大图片
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
            },
            // 查看大图
            showLargePic(num,photos){
                console.log(photos[num])
                this.largePic = [{
                    src: photos,
                    i: num
                }];
                $('#largePic').modal('show');
            },
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
        width: 140px;
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