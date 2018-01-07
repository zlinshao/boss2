<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <router-link to="/rentContract"
                         tag="li" style="cursor: pointer" class="bread">租房合同
            </router-link>
            <li class="active">老系统租房合同详情</li>


            <li class="pull-right" v-show="typeof (myParams) === 'object'">
                <router-link :to="{path:'/rentingContract',query: {Params:myParams,departmentName:departmentName}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>

        <div class="title clearFix">
            <div class="contractNum" style="margin-bottom: 10px">
                <h4 style="margin-right: 15px" v-if="detailInfo.contract_num!=undefined">
                    合同编号&emsp;{{detailInfo.contract_num}}
                </h4>
            </div>
        </div>

        <!--内容区-->

        <section class="panel">
            <h4>基本信息</h4>
            <div class="panel-body row">
                <div class="col-sm-6">
                    <div class="infoList">
                        <span>房东姓名：</span>
                        <span>{{detailInfo.name}}</span>
                    </div>
                    <div class="infoList">
                        <span>电话：</span>
                        <span>{{detailInfo.phone}}</span>
                    </div>
                    <div class="infoList">
                        <span>身份证：</span>
                        <span>{{detailInfo.idcardnum}}</span>
                    </div>
                    <div class="infoList">
                        <span>房东账号：</span>
                        <span>{{detailInfo.banknum}}</span>
                    </div>
                    <div class="infoList">
                        <span>地址：</span>
                        <span>{{detailInfo.address}}</span>
                    </div>
                    <div class="infoList">
                        <span>水费卡号：</span>
                        <span>{{detailInfo.watercard}}</span>
                    </div>
                    <div class="infoList">
                        <span>电卡号码：</span>
                        <span>{{detailInfo.electric}}</span>
                    </div>
                    <div class="infoList">
                        <span>燃气卡号：</span>
                        <span>{{detailInfo.gascard}}</span>
                    </div>
                    <div class="infoList">
                        <span>付款年限：</span>
                        <span>{{detailInfo.pay_year}}</span>
                    </div>
                    <div class="infoList">
                        <span>付款方式：</span>
                        <span>{{detailInfo.pay_mode}}</span>
                    </div>
                    <div class="infoList">
                        <span>价钱：</span>
                        <span>{{detailInfo.price}}</span>
                    </div>
                </div>
                <div class="col-sm-6">

                    <div class="infoList">
                        <span>合同状态：</span>
                        <span v-if="detailInfo.state==1">已通过</span>
                        <span v-if="detailInfo.state==0">未通过</span>
                    </div>
                    <div class="infoList">
                        <span>审核状态：</span>
                        <span v-if="detailInfo.check==1">已审核</span>
                        <span v-if="detailInfo.check==0">未审核</span>
                    </div>
                    <div class="infoList">
                        <span>开单人：</span>
                        <span>{{detailInfo.admin_name}}</span>
                    </div>
                    <div class="infoList">
                        <span>所属部门：</span>
                        <span>{{detailInfo.admin_group_id}}</span>
                    </div>
                    <div class="infoList">
                        <span>备注：</span>
                        <span>{{detailInfo.remark}}</span>
                    </div>

                    <div class="infoList">
                        <span>空置期：</span>
                        <span>{{detailInfo.vacancy}}天</span>
                    </div>
                    <div class="infoList">
                        <span>开始日期：</span>
                        <span>{{detailInfo.startdate}}</span>
                    </div>
                    <div class="infoList">
                        <span>结束日期：</span>
                        <span>{{detailInfo.endtime}}</span>
                    </div>
                    <div class="infoList">
                        <span>是否中介：</span>
                        <span v-if="detailInfo.intermediary == 0">无中介</span>
                        <span v-if="detailInfo.intermediary == 1">有中介</span>
                    </div>
                    <div class="infoList">
                        <span>中介价格：</span>
                        <span>{{detailInfo.intmoney}}</span>
                    </div>

                </div>
            </div>
            <h4>照片</h4>
            <div class="panel-body">
                <div class="infoList">
                    <span>合同照片：</span>
                    <a v-for="item in contractArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>水卡照片：</span>
                    <a v-for="item in waterArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>电卡照片：</span>
                    <a v-for="item in eleArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>燃气卡照片：</span>
                    <a v-for="item in gasArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>交接单照片：</span>
                    <a v-for="item in receiptArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>身份证照片：</span>
                    <a v-for="item in idArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>产权证照片：</span>
                    <a v-for="item in propArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
                <div class="infoList">
                    <span>委托书照片：</span>
                    <a v-for="item in proxyArray" :href="item" target="_blank">
                        <img :src="item" alt="">
                    </a>
                </div>
            </div>
        </section>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from '../common/status.vue';                          //提示信息
    export default{
        components:{Status},
        data(){

            return{
                contractId : '',
                detailInfo : [],
                contractArray:[],
                waterArray:[],
                eleArray:[],
                gasArray:[],
                receiptArray:[],
                idArray:[],
                propArray:[],
                proxyArray:[],
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
                myParams: [],
                departmentName: '',
                type: '',
            }
        },
        mounted(){
            this.contractId = this.$route.query.ContractId;
            this.myParams = this.$route.query.params;
            this.departmentName = this.$route.query.departmentName;
            this.getContractDetail();
        },
        methods:{
            getContractDetail(){
                this.$http.get('old/rent/' + this.contractId).then((res) =>{
                    if(res.data.code === '80010'){
                        this.detailInfo = res.data.data;
                        for(let i in this.detailInfo){
                            if(typeof (this.detailInfo[i]) === 'string'){
                                if(this.detailInfo[i].toLowerCase().indexOf('jpg')>-1 || this.detailInfo[i].toLowerCase().indexOf('jpeg')>-1){

                                    if(i.indexOf('contract')>-1){
                                        this.contractArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('water')>-1){
                                        this.waterArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('ele')>-1){
                                        this.eleArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('gas')>-1){
                                        this.gasArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('receipt')>-1){
                                        this.receiptArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('id')>-1){
                                        this.idArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('prop')>-1){
                                        this.propArray.push(this.detailInfo[i])
                                    }else if(i.indexOf('proxy')>-1){
                                        this.proxyArray.push(this.detailInfo[i])
                                    }
                                }
                            }
                        }
                    }else {
                        this.detailInfo = [];
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            }
        }
    }
</script>
<style scoped>
    .title {
        background-color: white;
        border-radius: 5px;
        padding: 15px 12px;
    }

    .title > div {
        display: inline-block;
    }

    .contractNum {
    }

    .contractNum h4 {
        display: inline-block;
        font-weight: 600;
        vertical-align: middle;
        /*padding-left: 12px;*/
        /*line-height: 60px;*/
    }
    .infoList{
        padding: 8px 0;
    }

    .infoList>span:first-child{
        color: #1caadc;
        display: inline-block;
        min-width: 150px;
    }
    img{
        width: 120px;
        height: 120px;
        margin: 5px;
    }
    h4{
        padding: 10px 0 0 10px;
        font-size: 22px;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>