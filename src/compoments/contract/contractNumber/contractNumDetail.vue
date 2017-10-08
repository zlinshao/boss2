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
                    <span v-show="public.type===1">领取合同</span>
                    <span v-show="public.type===2">作废合同</span>
                    <span v-show="public.type===3">上缴合同</span>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span v-show="public.type===1">领取详情</span>
                        <span v-show="public.type===2">作废详情</span>
                        <span v-show="public.type===3">上缴详情</span>
                        <!--编辑-->
                        <!--<div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-edit"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a href="javascript:;">sdfsdf</a></li>
                            </ul>
                        </div>-->
                    </h4>
                </header>
                <section class="panel" v-if="public!=''">
                    <div class="panel-body table-responsive client_info">
                        <div class="col-md-12">
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary" v-if="public.type===1">领取日期：</div>
                                    <div class="text-primary" v-if="public.type===2">作废日期：</div>
                                    <div class="text-primary" v-if="public.type===3">上缴日期：</div>
                                    <div v-if="public.type===1">{{public.receiver_time}}</div>
                                    <div v-if="public.type===3">{{public.paid_time}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">领取合同数(收)：</div>
                                    <div>{{msg.num[0].sf_numbers}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">本次领取合同编号(收)：</div>
                                    <div>
                                        <span v-for="item in msg.sf">{{item.contract_number}}&emsp;</span>
                                    </div>
                                </div>
                                <!--<div>
                                    <span class="text-primary">剩余合同编号(收)：</span>
                                    <span>asdasd</span>
                                </div>-->
                                <!--<div>
                                    <span class="text-primary">当前剩余合同编号(收)：</span>
                                    <span>asdasd</span>
                                </div>-->
                                <div>
                                    <div class="text-primary">领取合同数(租)：</div>
                                    <div>{{msg.num[0].zf_numbers}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">本次领取合同编号(租)：</div>
                                    <div>
                                        <span v-for="item in msg.zf">{{item.contract_number}}&emsp;</span>
                                    </div>
                                </div>
                                <!--<div>
                                    <span class="text-primary">剩余合同编号(租)：</span>
                                    <span>asdasd</span>
                                </div>-->
                                <!--<div>
                                    <span class="text-primary">当前剩余合同编号(租)：</span>
                                    <span>asdasd</span>
                                </div>-->
                            </div>
                            <div class="col-md-6">
                                <div>
                                    <div class="text-primary">领取人：</div>
                                    <div>{{public.receiver_name}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">所属部门：</div>
                                    <div>{{public.department_id[0]}}</div>
                                </div>
                                <div>
                                    <div class="text-primary">截图凭证：</div>
                                    <div>
                                        <img :src="img.small" @click="showLargePic(index)"
                                             v-for="(img,index) in public.album.pz_pic">
                                    </div>
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
    </div>
</template>

<script>
    import PicModal from  '../../common/largePic.vue'
    export default{
        components: {PicModal},
        data(){
            return {
                params : {},
                page : '',
                select : '',
                request_time : '',
                type : '',
                msg : {},
                public : '',
                srcs : {},
                largePic : [],
            }
        },
        mounted () {
            this.params = this.$route.query.myParams;
            this.page = this.$route.query.page;
            this.select = this.$route.query.select;

            this.request_time = this.$route.query.request_time;
            this.type = this.$route.query.type;
//            console.log(this.request_time);
            this.$http.post('code/Contract_Number_Record/showDetail',{
                request_time : this.request_time,
                type : this.type
            }).then((res)=>{
                console.log(res.data)
                if (res.data.code==30070){
                    this.msg = res.data.data;
                    if (this.msg.sf.length>0){
                        this.public = this.msg.sf[0];
                    } else {
                        this.public = this.msg.zf[0];
                    }
                }
                console.log(this.public)
            })
        },
        methods: {
            showLargePic(index){
                this.srcs = this.public.album.pz_pic;
                this.largePic = [{
                    src: this.srcs,
                    i: index
                }];
                $('.largePic:eq(0)').modal('show');
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