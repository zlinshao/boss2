<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>客户管理</li>
            <li>客户管理详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4 class="row">
                        <i class="fa fa-user"></i> &nbsp;客户信息
                        <!--<a data-toggle="modal" class="pull-right fa fa-gear" ></a>-->
                        <div class="btn-group pull-right">
                            <a class="fa fa-gear dropdown-toggle" data-toggle="dropdown"
                                    aria-haspopup="true" aria-expanded="false">
                            </a>
                            <ul class="dropdown-menu dropdown-menu-left">
                                <li>
                                    <button class="btn btn-white btn-block">
                                        编辑
                                    </button>
                                </li>
                                <li>
                                    <button class="btn btn-white btn-block">
                                        删除
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="row">
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>基本信息</h5>
                            <div>
                                <span class="text-primary">客户姓名：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">房屋地址：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">房型：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">备注：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">签约人：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">负责人：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">所属部门：</span>
                                <span></span>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>客户收款人信息</h5>
                            <div>
                                <span class="text-primary">汇款方式：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">收款人姓名：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">开户行：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">账号：</span>
                                <span></span>
                            </div>
                        </div>
                        <div class="col-sm-4 col-xs-12 subregion">
                            <h5>历史账户信息</h5>
                            <div>
                                <span class="text-primary">汇款方式：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">收款人姓名：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">开户行：</span>
                                <span></span>
                            </div>
                            <div>
                                <span class="text-primary">账号：</span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script>

</script>


<style scoped>
    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    h4 > a {
        margin-left: 10px;
    }
    h5{
        font-size: 20px;
    }
    /*.panel-body:not(:last-child) {*/
        /*border-bottom: 1px solid #aaaaaa;*/
    /*}*/
    .client_info > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
    @media (min-width: 768px) {
        .subregion:not(:last-child){
            border-right:1px dotted #aaaaaa;
        }
        .subregion{
            min-height: 400px;
        }
    }
    .btn-white {
        background-color: #fff;
        border-color: #fff;
        color: #666;
    }
    .btn-white:hover{
        border-radius: 0;
        background-color: #dedede;
        border-color: #dedede;
        color: #fff;
    }
    .dropdown-menu{
        padding: 0;
        border-radius: 0px;
        min-width: 112px;
    }
    dropdown-menu li:hover{
        background-color: #dedede;
    }
</style>
