<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li><router-link to="/reportedOther">其余款项报备</router-link></li>
            <li>其余款项报备详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <div>
                    <span>录入时间</span>
                    <span>asdsdsd</span>
                    <span :class="{'status':true,'btn':true,'yellow':true}">待提交</span>
                    <div class="pull-right">
                        <button class="btn btn-primary">收房报备</button>
                        <button class="btn btn-primary">提交</button>
                        <button class="btn btn-primary">驳回</button>
                        <button class="btn btn-primary">通过</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-home"></i>&nbsp;报备详情
                        <a class="pull-right fa fa-pencil-square-o" data-toggle="modal" data-target="#edit"></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="col-md-8 details">
                        <h5>报备信息</h5>
                        <div class="col-md-6">
                            <div><span class="text-primary">客户姓名：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">房屋地址：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">房型：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">空置期：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">年限：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">付款方式：</span><span>sbajsb<a @click="showChange(1)">变化</a></span></div>
                            <div><span class="text-primary">月单价：</span><span>sbajsb<a @click="showChange(2)">变化</a></span></div>
                        </div>
                        <div class="col-md-6">
                            <div><span class="text-primary">款项名称：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">款项金额：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">备注：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">签约人：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">负责人：</span><span>sbajsb</span></div>
                            <div><span class="text-primary">所属部门：</span><span>sbajsb</span></div>
                        </div>
                    </div>
                    <div class="col-md-4 reported">
                        <h5>客户收款人信息</h5>
                        <div><span class="text-primary">汇款方式：</span><span>sbajsb</span></div>
                        <div><span class="text-primary">收款人姓名：</span><span>sbajsb</span></div>
                        <div><span class="text-primary">开户行：</span><span>sbajsb</span></div>
                        <div><span class="text-primary">账号：</span><span>sbajsb</span></div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal fade bs-example-modal-sm" id="change" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">{{changeModal.title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="col-sm-12 clearFix">
                            <span class="col-sm-5">第1年</span>
                            <span class="col-sm-7">发地方</span>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                changeModal : {
                    title : '',
                    data : []
                }
            }
        },
        methods: {
            showChange(num){
                if (num == 1){
                    // 付款方式
                    this.changeModal.title = '付款方式';
                    this.changeModal.data = [];
                    /*for (let i = 0;i<this.msg.pay_type.length;i++){
                        this.changeModal.data.push(this.dict.pay_type[this.msg.pay_type[i]]);
                    }*/
//                    console.log(this.msg.pay_type)
//                    console.log(this.changeModal.data)
//                    this.changeModal.data = this.msg.pay_type;

                } else {
                    // 价格
                    this.changeModal.title = '月单价';
//                    this.changeModal.data = this.msg.price;
                }
                $('#change').modal('show');
            }
        }
    }
</script>

<style scoped>
    .head .panel-body>div span{
        /*display: inline-block;*/
        font-weight: bold;
    }
    .head .panel-body>div span+span{
        margin-left: 12px;
    }
    .head .panel-body>div span.status{
        color: white;
        font-weight: normal;
        font-size: 12px;
    }

    header h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    header h4 > a {
        margin-left: 10px;
    }

    .client_info > div > div > div,.reported>div {
        margin-bottom: 20px;
    }
    .client_info h5{
        font-size: 16px;
        /*font-weight: 400;*/
        margin-bottom: 20px;
    }
    .details{
        border-right: 1px dashed #ddd;
    }

    .client_info div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

    .client_info > div > div > div span a{
        margin-left: 12px;
        font-size: 8px;
    }
</style>