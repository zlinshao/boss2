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
            </div>
        </section>

        <section class="panel" v-if="public!=''">
            <div class="panel-body table-responsive client_info">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <div>
                            <span class="text-primary">领取日期：</span>
                            <span>{{public.receiver_time}}</span>
                        </div>
                        <div>
                            <span class="text-primary">领取合同数(收)：</span>
                            <span>{{msg.num[0].sf_numbers}}</span>
                        </div>
                        <div>
                            <span class="text-primary">本次领取合同编号(收)：</span>
                            <span v-for="item in msg.sf">{{item.contract_number}}&emsp;</span>
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
                            <span class="text-primary">领取合同数(租)：</span>
                            <span>{{msg.num[0].zf_numbers}}</span>
                        </div>
                        <div>
                            <span class="text-primary">本次领取合同编号(租)：</span>
                            <span v-for="item in msg.zf">{{item.contract_number}}&emsp;</span>
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
                            <span class="text-primary">领取人：</span>
                            <span>{{public.receiver_name}}</span>
                        </div>
                        <div>
                            <span class="text-primary">所属部门：</span>
                            <span>{{public.department_id[0]}}</span>
                        </div>
                        <div>
                            <span class="text-primary">截图凭证：</span>
                            <span>
                                <img :src="img.small" @click="showLargePic(index)"
                                     v-for="(img,index) in public.album.pz_pic">
                            </span>
                        </div>
                        <div>
                            <span class="text-primary">操作人：</span>
                            <span>sdgfsfdgfsdg</span>
                        </div>
                    </div>
                </div>
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
//            console.log(this.request_time);
            this.$http.post('code/Contract_Number_Record/showDetail',{
                request_time : this.request_time
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
    .panel-body header h4 {
        /*text-align: center;*/
        font-weight: bold;
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }
    .client_info .col-md-6>div {
        margin-bottom: 20px;
    }

    .client_info .col-md-6>div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 180px;
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