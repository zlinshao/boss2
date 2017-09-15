<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>
                <router-link :to="{path:'/personal'}">个人业绩</router-link>
            </li>
            <li>个人业绩详情</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <header>
                    <div class="revise">
                        <span>2017.9&nbsp;工资详情</span>
                        <!--编辑-->
                        <div class="btn-group pull-right">
                            <a class="btn btn-primary" style="padding: 4px 12px;" @click="personal_rev()">编辑</a>
                        </div>
                    </div>
                </header>
                <div class="panel-body table-responsive">
                    <div class="col-md-12" style="padding: 0;">
                        <section class="panel table table-responsive roll has-js"
                                 style="background-color: transparent;">
                            <header class="col-xs-12">
                                <h4>工资条</h4>
                            </header>
                            <!--工资条-->
                            <table class="table table-advance table-hover" style="margin-bottom: 20px;">
                                <tbody class="text-center">
                                <tr>
                                    <th class="text-center width100">2月工资</th>
                                    <th class="text-center width100">底薪</th>
                                    <th class="text-center width80">补助</th>
                                    <th class="text-center width80">业绩绩效</th>
                                    <th class="text-center width80">业绩提成</th>
                                    <th class="text-center width100">付款方式f</th>
                                    <th class="text-center width100">空置期奖励f</th>
                                    <th class="text-center width80">年限奖励f</th>
                                    <th class="text-center width100">价格差奖励z</th>
                                    <th class="text-center width80">套餐类型</th>
                                    <th class="text-center width80">共计</th>
                                    <th class="text-center width50">备注</th>
                                </tr>
                                <tr class="text-center">
                                    <td>应发工资</td>
                                    <td>900</td>
                                    <td>900</td>
                                    <td>900</td>
                                    <td>30000</td>
                                    <td>10000</td>
                                    <td>10000</td>
                                    <td>900</td>
                                    <td>900</td>
                                    <td>梦想包</td>
                                    <td>7300</td>
                                    <td rowspan="2"><i class="fa fa-book" @click="lookRemark"></i></td>
                                </tr>
                                <tr class="text-center">
                                    <td>实发工资</td>
                                    <td>900</td>
                                    <td>900</td>
                                    <td>900</td>
                                    <td>30000</td>
                                    <td>30000</td>
                                    <td>1000</td>
                                    <td>900</td>
                                    <td>900</td>
                                    <td>梦想包</td>
                                    <td>7300</td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="col-xs-12" style="padding: 0">
                                <header class="col-xs-12">
                                    <h4>扣款明细</h4>
                                </header>
                                <div>
                                    <span class="text-primary">客户姓名：</span>
                                    <span>范德萨范德萨范德萨</span>
                                </div>
                                <div>
                                    <span class="text-primary">尊称：</span>
                                    <span>的发生范德萨范德萨范德萨</span>
                                </div>
                                <div><span class="text-primary">国籍：</span>
                                    <span>范德萨范德萨发撒</span>
                                </div>
                                <div>
                                    <span class="text-primary">手机号：</span>
                                    <span>法大师傅大师傅士大夫士大夫打算</span>
                                </div>
                                <div>
                                    <span class="text-primary">负责人：</span>
                                    <span>和规范化广泛的和规范化广泛的</span>
                                </div>
                            </div>

                            <header class="col-xs-12">
                                <h4>工资明细</h4>
                            </header>
                            <!--工资明细-->
                            <table class="table table-advance table-hover">
                                <tbody class="text-center">
                                <tr>
                                    <th class="text-center width150">房屋地址</th>
                                    <th class="text-center width100">空置期奖励</th>
                                    <th class="text-center width100">价格差奖励</th>
                                    <th class="text-center width100">合同</th>
                                    <th class="text-center width80">资料</th>
                                    <th class="text-center width80">交接</th>
                                    <th class="text-center width80">客诉</th>
                                    <th class="text-center width80">尾款</th>
                                    <th class="text-center width80">中介费</th>
                                    <th class="text-center width80">共计</th>
                                    <th class="text-center width50">备注</th>
                                    <th class="text-center width50">编辑</th>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <div>光明城市9-1103</div>
                                        <div>仔仔</div>
                                    </td>
                                    <td>900</td>
                                    <td>3000</td>
                                    <td>1000</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>7300</td>
                                    <td><i class="fa fa-book" @click="lookRemark"></i></td>
                                    <td><i class="fa fa-pencil" @click="detailRevise"></i></td>
                                </tr>
                                <tr class="text-center">
                                    <td>
                                        <div>光明城市9-1103</div>
                                        <div>仔仔</div>
                                    </td>
                                    <td>900</td>
                                    <td>30000</td>
                                    <td>1000</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>300</td>
                                    <td>7300</td>
                                    <td><i class="fa fa-book" @click="lookRemark"></i></td>
                                    <td><i class="fa fa-pencil" @click="detailRevise"></i></td>
                                </tr>
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
        </section>

        <!--编辑-->
        <personalRevise></personalRevise>

        <!--查看备注-->
        <lookRemark :personal="personalRem" :look="lookRem"></lookRemark>

        <!--合同工资编辑-->
        <DetailRevise></DetailRevise>
    </div>
</template>

<script>
    import lookRemark from './lookRemark.vue'
    import personalRevise from  './personalRevise.vue'      //备注编辑
    import DetailRevise from  './detailRevise.vue'          //合同工资编辑
    export default {
        components: {lookRemark, personalRevise, DetailRevise},
        data (){
            return {
                personal_id: '',        //ID
                personalRem: '',        //备注对象
                lookRem: '',            //备注内容
            }
        },
        mounted (){
            this.personal_id = this.$route.query.nameId;
            this.personal(this.$route.query.nameId);
        },
        methods: {
//            详情
            personal (val){
//                this.$http.get('' + val).then((res) => {
//                })
            },

//            编辑
            personal_rev (){
                $('#personalModel').modal({backdrop: 'static',});
            },

//            查看备注
            lookRemark (){
                $('#lookRemark').modal({backdrop: 'static',});
            },

//            编辑个人工资
            detailRevise (){
                $('#detailRevise').modal({backdrop: 'static',});
            },
        },
    }
</script>


<style scoped>
    .col-xs-12 > div + div {
        margin: 20px 0;
    }

    .col-xs-12 > div span.text-primary:first-child {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    td, table {
        border: 1px solid #DDDDDD;
    }

    h4 {
        padding: 0 10px;
        border-left: 3px solid red;
    }

    .panel > table + table {
        margin-top: 18px;
    }

    .panel-body.table-responsive {
        padding: 0 15px;
    }

    .revise {
        font-size: 20px;
        padding: 10px 20px;
        border-bottom: 1px solid #DDDDDD;
        margin-bottom: 10px;
    }
</style>
