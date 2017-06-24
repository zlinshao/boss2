<template>
    <div>

        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        客户信息
                        <a class="pull-right"><i class="glyphicon glyphicon-cog"></i></a>
                        <a class="text-danger pull-right">
                            <i class="fa fa-bell-o"></i>
                        </a>

                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="col-md-4">
                        <div><span class="text-primary">客户姓名：</span><span>诸葛孔明 lorem</span></div>
                        <div><span class="text-primary">尊称：</span><span>先生</span></div>
                        <div><span class="text-primary">生日：</span><span>1990-01-01</span></div>
                        <div><span class="text-primary">手机号：</span><span>15151515151</span></div>
                        <div><span class="text-primary">负责人：</span><span>黑骑，蓝染</span></div>
                    </div>
                    <div class="col-md-4">
                        <div><span class="text-primary">客户身份：</span><span>业主/租客</span></div>
                        <div><span class="text-primary">跟进进度：</span><span>40</span></div>
                        <div><span class="text-primary">客户意向：</span><span>高</span></div>
                        <div><span class="text-primary">客户来源：</span><span>客户推荐</span></div>
                    </div>
                </div>
            </div>
        </section>

        <!--内容区-->
        <div class="row">
            <!--合同信息-->
            <div class="col-md-3">
                <section class="panel roll">
                    <header class="panel-heading">
                        合同信息
                    </header>
                    <div class="panel-body table-responsive">
                        <table class="table contract_info">
                            <tbody>
                            <tr>
                                <td><a><i class="fa fa-bookmark"></i></a></td>
                                <td>2017-07-20</td>
                                <td>14:00</td>
                            </tr>
                            <tr>
                                <td><a><i class="fa fa-bookmark-o"></i></a></td>
                                <td>合同编号</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>房屋地址</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>负责人</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合同时间</td>
                                <td>合同编号</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table contract_info">
                            <tbody>
                            <tr>
                                <td><a><i class="fa fa-bookmark"></i></a></td>
                                <td>2017-07-20</td>
                                <td>14:00</td>
                            </tr>
                            <tr>
                                <td><a><i class="fa fa-bookmark-o"></i></a></td>
                                <td>合同编号</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>房屋地址</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>负责人</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合同时间</td>
                                <td>合同编号</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table contract_info">
                            <tbody>
                            <tr>
                                <td><a><i class="fa fa-bookmark"></i></a></td>
                                <td>2017-07-20</td>
                                <td>14:00</td>
                            </tr>
                            <tr>
                                <td><a><i class="fa fa-bookmark-o"></i></a></td>
                                <td>合同编号</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>房屋地址</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>负责人</td>
                                <td>合同编号</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>合同时间</td>
                                <td>合同编号</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            <!--沟通日志/房屋信息-->
            <div class="col-md-9">
                <section class="panel roll">
                    <header class="panel-heading tab-bg-dark-navy-blue ">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#home" aria-expanded="true">沟通日志</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#about" aria-expanded="false">房屋信息</a>
                            </li>

                        </ul>
                    </header>
                    <div class="panel-body">
                        <div class="tab-content">

                            <!--沟通日志-->
                            <div id="home" class="tab-pane active">
                                <div class="form-group">
                                    <label class="text-right col-sm-2 col-sm-2 control-label">跟进方式</label>
                                    <div class="col-sm-3">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="text-right col-sm-3 col-sm-3 control-label">沟通房源</label>
                                    <div class="col-sm-3">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="text-right col-sm-2 col-sm-2 control-label">增加跟进记录</label>
                                    <div class="col-sm-10">
                                        <input class="form-control" id="focusedInput" type="text" placeholder="请输入跟进记录">
                                    </div>
                                </div>
                                <section class="panel">
                                    <div class="panel-body">
                                        <div class="panel-body table-responsive cheek">
                                            <div><span>2017-07-20</span>&nbsp;&nbsp;<span>14:00</span></div>
                                            <div><span class="text-primary">跟进方式：</span><span>电话</span></div>
                                            <div><span class="text-primary">沟通房源：</span><span>积善公寓2-302</span></div>
                                            <div><span class="text-primary">跟进记录：</span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, cupiditate et itaque ratione reiciendis tempora. Ad animi doloremque earum odio possimus, quam voluptatum? Expedita quam tempora totam unde veniam voluptatum?</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="panel">
                                    <div class="panel-body">
                                        <div class="panel-body table-responsive cheek">
                                            <div><span>2017-07-20</span>&nbsp;&nbsp;<span>14:00</span></div>
                                            <div><span class="text-primary">跟进方式：</span><span>电话</span></div>
                                            <div><span class="text-primary">沟通房源：</span><span>积善公寓2-302</span></div>
                                            <div><span class="text-primary">跟进记录：</span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, cupiditate et itaque ratione reiciendis tempora. Ad animi doloremque earum odio possimus, quam voluptatum? Expedita quam tempora totam unde veniam voluptatum?</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section class="panel">
                                    <div class="panel-body">
                                        <div class="panel-body table-responsive cheek">
                                            <div><span>2017-07-20</span>&nbsp;&nbsp;<span>14:00</span></div>
                                            <div><span class="text-primary">跟进方式：</span><span>电话</span></div>
                                            <div><span class="text-primary">沟通房源：</span><span>积善公寓2-302</span></div>
                                            <div><span class="text-primary">跟进记录：</span><span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, cupiditate et itaque ratione reiciendis tempora. Ad animi doloremque earum odio possimus, quam voluptatum? Expedita quam tempora totam unde veniam voluptatum?</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <!--房屋信息-->
                            <div id="about" class="tab-pane">About</div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data (){
            return {}
        }
    }
</script>


<style scoped>
    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    .contract_info td {
        border-top: 0;
    }

    .panel-body:not(:last-child) {
        border-bottom: 1px solid #aaaaaa;
    }

    .contract_info {
        text-align: center;
    }

    label {
        margin-top: 8px;
    }

    .cheek {
        border: 1px solid #AAAAAA;
        border-radius: 6px;
    }

    .cheek > div {
        margin-bottom: 10px;
    }

    .client_info > div > div {
        margin-bottom: 20px;
    }
    .client_info > div > div > span.text-primary{
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }
    .text-danger {
        margin-right: 10px;
    }

    .text-danger:hover {
        color: #FF6C60;
    }

    .roll {
        height: 500px;
        overflow: auto;
    }
</style>
