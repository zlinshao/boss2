<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li><router-link to="/contractNum">编号记录</router-link></li>
            <li>编号记录详情</li>
        </ol>

        <section class="panel head">
            <div class="panel-body">
                <header>
                    <h4>
                        领取详情
                        <!--编辑-->
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="fa fa-edit"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a href="javascript:;">sdfsdf</a></li>
                            </ul>
                        </div>
                    </h4>
                </header>
            </div>
        </section>

        <section class="panel">
            <div class="panel-body table-responsive client_info">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <div>
                            <span class="text-primary">领取日期：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">领取合同数(收)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">本次领取合同编号(收)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">剩余合同编号(收)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">当前剩余合同编号(收)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">领取合同数(租)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">本次领取合同编号(租)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">剩余合同编号(租)：</span>
                            <span>asdasd</span>
                        </div>
                        <div>
                            <span class="text-primary">当前剩余合同编号(租)：</span>
                            <span>asdasd</span>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div>
                            <span class="text-primary">领取人：</span>
                            <span>sdgfsfdgfsdg</span>
                        </div>
                        <div>
                            <span class="text-primary">所属部门：</span>
                            <span>sdgfsfdgfsdg</span>
                        </div>
                        <div>
                            <span class="text-primary">截图凭证：</span>
                            <span>sdgfsfdgfsdg</span>
                        </div>
                        <div>
                            <span class="text-primary">操作人：</span>
                            <span>sdgfsfdgfsdg</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                msg: 'hello vue'
            }
        },
        methods: {}
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
</style>