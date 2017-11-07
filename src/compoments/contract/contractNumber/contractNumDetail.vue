<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li><router-link to="/contractNum">编号记录</router-link></li>
            <li>编号记录详情</li>
            <li class="pull-right" v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/contractNum',query: {myParam:params,page:page,select:select}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>
        <section class="panel head">
            <div class="panel-body">
                <div>
                    <span v-if="type==1">领取合同</span>
                    <span v-if="type==2">作废合同</span>
                    <span v-if="type==3">上缴合同</span>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span v-if="type==1">领取详情</span>
                        <span v-if="type==2">作废详情</span>
                        <span v-if="type==3">上缴详情</span>
                        <!--编辑-->
                        <div class="btn-group pull-right" data-toggle="modal" data-target="#contractNumEdit"
                             v-if="simulate.indexOf('ContractNumberRecord/edit')>-1||isSuper">
                            <a>
                                <i class="fa fa-edit"></i>
                            </a>
                        </div>
                    </h4>
                </header>
                <section class="panel" v-if="public!=''">
                    <div class="panel-body table-responsive client_info">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary" v-if="type==1">领取日期：</div>
                                    <div class="text-primary" v-if="type==2">作废日期：</div>
                                    <div class="text-primary" v-if="type==3">上缴日期：</div>
                                    <div v-if="type==1">{{public.receiver_time}}</div>
                                    <div v-if="type==2">{{public.report_time}}</div>
                                    <div v-if="type==3">{{public.paid_time}}</div>
                                </div>
                                <div v-if="type==2">
                                    <div class="text-primary">实到日期：</div>
                                    <div>{{public.actual_time}}</div>
                                </div>
                                <div v-if="type==3">
                                    <div class="text-primary">合同类型：</div>
                                    <div>{{public.contract_way==0?'公司合同':'中介合同'}}</div>
                                </div>
                                <div v-if="!(type==3&&public.contract_way==1)">
                                    <div class="text-primary">城市：</div>
                                    <div>{{dict.area[public.area]}}</div>
                                </div>
                                <div>
                                    <div class="text-primary" v-if="type==1">领取合同数(收)：</div>
                                    <div class="text-primary" v-if="type==2">作废合同数(收)：</div>
                                    <div class="text-primary" v-if="type==3">上缴合同数(收)：</div>
                                    <div>{{msg.num[0].sf_numbers}}</div>
                                </div>
                                <div>
                                    <div class="text-primary" v-if="type==1">本次领取合同编号(收)：</div>
                                    <div class="text-primary" v-if="type==2">本次作废合同编号(收)：</div>
                                    <div class="text-primary" v-if="type==3">本次上缴合同编号(收)：</div>
                                    <div v-if="type==1">
                                        <!--<span v-for="item in msg.sf">{{item.contract_number}}&emsp;</span>-->
                                        <span v-for="item in sf_contract_now">{{item}}&emsp;</span>
                                    </div>
                                    <div v-if="type==2">
                                        <!--<span v-for="item in msg.sf">{{item.contract_number}}&emsp;</span>-->
                                        <span v-for="item in sf_contract_now">{{item}}&emsp;</span>
                                    </div>
                                    <div v-if="type==3">
                                        <div v-for="item in msg.sf">
                                            <p>{{item.contract_number}}&emsp;房屋地址：{{item.address==''?'未填写':item.address}}</p>
                                            <p>(
                                                <span v-if="item.delivery_receitp==1">交接单</span>
                                                <span v-if="item.receipt==1">收条</span>
                                                <span v-if="item.house_key==1">钥匙</span>
                                                <!--<span v-if="item.idcard_copy==1">身份证</span>-->
                                                <!--<span v-if="item.house_property==1">房产证复印件</span>-->
                                                <!--<span v-if="item.receipt==0&&item.delivery_receitp==0&&
                                                item.idcard_copy==0&&item.house_property==0">无</span>-->
                                                <span v-if="item.receipt==0&&item.delivery_receitp==0&&
                                                item.house_key==0">无</span>
                                                )</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">剩余合同数(收)：</div>
                                    <div>{{msg.num[0].rest_sf_number}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">当前剩余合同编号(收)：</div>
                                    <div>
                                        <span v-for="item in msg.num[0].rest_sf_contract">{{item}}&emsp;</span>
                                        <!--<span>
                                            {{msg.num[0].sf_contract_number.split(',')}}
                                        </span>-->
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary" v-if="type==1">领取合同数(租)：</div>
                                    <div class="text-primary" v-if="type==2">作废合同数(租)：</div>
                                    <div class="text-primary" v-if="type==3">上缴合同数(租)：</div>
                                    <div>{{msg.num[0].zf_numbers}}</div>
                                </div>
                                <div>
                                    <div class="text-primary" v-if="type==1">本次领取合同编号(租)：</div>
                                    <div class="text-primary" v-if="type==2">本次作废合同编号(租)：</div>
                                    <div class="text-primary" v-if="type==3">本次上缴合同编号(租)：</div>
                                    <div v-if="type==1">
                                        <!--<span v-for="item in msg.zf">{{item.contract_number}}&emsp;</span>-->
                                        <span v-for="item in zf_contract_now">{{item}}&emsp;</span>
                                    </div>
                                    <div v-if="type==2">
                                        <!--<span v-for="item in msg.zf">{{item.contract_number}}&emsp;</span>-->
                                        <span v-for="item in zf_contract_now">{{item}}&emsp;</span>
                                    </div>
                                    <div v-if="type==3">
                                        <div v-for="item in msg.zf">
                                            <p>{{item.contract_number}}&emsp;房屋地址：{{item.address==''?'未填写':item.address}}</p>
                                            <p>(
                                                <span v-if="item.delivery_receitp==1">交接单</span>
                                                <span v-if="item.receipt==1">收条</span>
                                                <span v-if="item.house_key==1">钥匙</span>
                                                <span v-if="item.receipt==0&&item.delivery_receitp">无</span>
                                                <span v-if="item.receipt==0&&item.delivery_receitp&&item.house_key==0">无</span>
                                                )</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">剩余合同数(租)：</div>
                                    <div>{{msg.num[0].rest_zf_number}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">当前剩余合同编号(租)：</div>
                                    <div>
                                        <span v-for="item in msg.num[0].rest_zf_contract">{{item}}&emsp;</span>
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary" v-if="type==1">领取人：</div>
                                    <div class="text-primary" v-if="type==2">报备人：</div>
                                    <div class="text-primary" v-if="type==3">上缴人：</div>
                                    <div>{{public.receiver_name}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">所属部门：</div>
                                    <div>{{public.department_id.name}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">截图凭证：</div>
                                    <div v-if="type==1">
                                        <img :src="img.small" @click="showLargePic(index)"
                                             v-for="(img,index) in public.album.pz_pic">
                                    </div>
                                    <div v-if="type==2">
                                        <img :src="img.small" @click="showLargePic(index)"
                                             v-for="(img,index) in public.album.scrap_pic">
                                    </div>
                                    <div v-if="type==3">
                                        <img :src="img.small" @click="showLargePic(index)"
                                             v-for="(img,index) in public.album.paid_pic">
                                    </div>
                                </div>
                                <div>
                                    <div class="text-primary">备注：</div>
                                    <div>{{public.remark}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">操作人：</div>
                                    <div>{{public.operator.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
        <PicModal :largePic="largePic"></PicModal>
        <ContractNumEdit :type="type" :request_time="request_time" @success="getDetail" :simulate="simulate" :isSuper="isSuper"></ContractNumEdit>
    </div>
</template>

<script>
    import PicModal from  '../../common/largePic.vue'
    import ContractNumEdit from './contractNumEdit.vue'
    export default{
        props:['simulate','isSuper'],
        components: {PicModal,ContractNumEdit},
        data(){
            return {
                dict : {},

                params : {},
                page : '',
                select : '',
                request_time : '',
                type : '',
                msg : {},
                public : '',
                srcs : {},
                largePic : [],

                sf_contract_now : [],
                zf_contract_now : [],

            }
        },
        mounted () {
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.select = this.$route.query.select;

            this.request_time = this.$route.query.request_time;
            this.type = this.$route.query.type;
//            console.log(this.request_time);
//            console.log(this.type);
            this.$http.get('code/Contract_Number_Record/dict').then((res)=>{
//                console.log(res.data.area);
                this.dict = res.data;
                this.getDetail();
            });

        },
        methods: {
            showLargePic(index){
                this.srcs = this.public.album.pz_pic;
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('.largePic:eq(0)').modal('show');
            },
            getDetail(){
                this.$http.post('code/Contract_Number_Record/showDetail',{
                    request_time : this.request_time,
                    type : this.type
                }).then((res)=>{
//                console.log(res.data)
                    if (res.data.code==30070){
                        this.msg = res.data.data;
                        if (this.msg.sf.length>0){
                            this.public = this.msg.sf[0];
                        } else {
                            this.public = this.msg.zf[0];
                        }
                        if (this.msg.num[0].sf_contract_number!=null){
                            this.sf_contract_now = this.msg.num[0].sf_contract_number.split(',');
                        }else {
                            this.sf_contract_now = [];
                        }
                        if (this.msg.num[0].zf_contract_number!=null){
                            this.zf_contract_now = this.msg.num[0].zf_contract_number.split(',');
                        }else {
                            this.zf_contract_now = [];
                        }
                    } else {
                        this.$router.push({path: '/contractNum',query:{myParam:this.params,page:this.page,select:this.select}});
                    }
//                console.log(this.public)
                })
            }
        }
    }
</script>
<style scoped>
    .head .panel-body > div span {
        /*display: inline-block;*/
        font-size: 16px;
        margin-left: 30px;
        font-weight: bold;
    }

    .head .panel-body > div span + span {
        margin-left: 12px;
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
    .client_info img+img{
        margin-left: 8px;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>