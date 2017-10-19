<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="repairLog">维修记录</router-link></li>
            <li>维修记录详情</li>
            <li class="pull-right" v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/repairLog',query: {myParam:params,page:page,select:select}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div>
                    <span>录入时间</span>
                    <span>2017.08.06 10:05</span>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span>维修详情</span>
                        <!--编辑-->
                        <div class="btn-group pull-right" data-toggle="modal" data-target="#repairLogEdit">
                            <a>
                                <i class="fa fa-edit"></i>
                            </a>
                        </div>
                    </h4>
                </header>
                <section class="panel">
                    <div class="panel-body table-responsive client_info">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary">合同编号：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">客户姓名：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">联系电话：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">房屋地址：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">约定维修时间：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">维修内容：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">维修师傅：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">维修结果：</div>
                                    <div>asdasdasd</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary">维修金额：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">维修状态：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">认责人：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">备注：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">操作人：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">签约人：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">负责人：</div>
                                    <div>asdasdasd</div>
                                </div>
                                <div>
                                    <div class="text-primary">所属部门：</div>
                                    <div>asdasdasd</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <!--编辑-->
        <EditRepair :isAdd="false" :repairId="repairId"></EditRepair>
    </div>
</template>
<script>
    import EditRepair from './repaireLogEdit.vue'
    export default {
        components: {EditRepair},
        data() {
            return {
                repairId: '',
                params : {},
                page : '',
                select : '',
            }
        },
        mounted(){
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.select = this.$route.query.select;
        },
        methods: {}
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

    .client_info .col-md-6>div span a {
        margin-left: 12px;
        font-size: 8px;
    }
    .client_info img{
        width: 120px;
        height: 120px;
        cursor: pointer;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>