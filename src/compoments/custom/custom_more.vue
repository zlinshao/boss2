<template>
    <div>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        客户信息
                        <!--编辑-->
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a data-toggle="modal" href="#customModel">编辑</a></li>
                                <li><a>增加提醒</a></li>
                                <!--<li class="divider"></li>-->
                            </ul>
                        </div>

                        <!--增加提醒-->
                        <a class="text-danger pull-right"><i class="fa fa-bell-o"></i></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div><span class="text-primary">客户姓名：</span><span>诸葛孔明 lorem</span></div>
                            <div><span class="text-primary">尊称：</span><span>先生</span></div>
                            <div><span class="text-primary">生日：</span><span>1990-01-01</span></div>
                            <div><span class="text-primary">手机号：</span><span>15151515151</span></div>
                            <div><span class="text-primary">负责人：</span><span>黑骑，蓝染</span></div>
                        </div>
                        <div class="col-md-8">
                            <div><span class="text-primary">客户身份：</span><span>业主/租客</span></div>
                            <div><span style="vertical-align: top;" class="text-primary">跟进进度：</span>
                                <a data-v-2f43a2b3="" href="#">
                                    <div data-v-2f43a2b3="" class="progress1 progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: progress + '%'}">
                                            <span data-v-2f43a2b3="" class="sr-only">{{progress}}%</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div><span class="text-primary">客户意向：</span><span>高</span></div>
                            <div><span class="text-primary">客户来源：</span><span>客户推荐</span></div>
                        </div>
                    </div>
                    <div v-if="open_on" class="col-md-12">
                        <div class="col-md-4">
                            <div><span class="text-primary">婚姻状况：</span><span>未婚</span></div>
                            <div><span class="text-primary">QQ：</span><span>123456</span></div>
                            <div><span class="text-primary">邮箱：</span><span>123456@qq.com</span></div>
                            <div><span class="text-primary">性格：</span><span>和蔼可亲</span></div>
                            <div><span class="text-primary">备注：</span><span>无</span></div>
                        </div>
                        <div class="col-md-8">
                            <div><span class="text-primary">客户状态：</span><span>跟进中</span></div>
                            <div><span class="text-primary">客户优先级：</span><span>80</span></div>
                            <div><span class="text-primary">个人/中介：</span><span>个人</span></div>
                            <div><span class="text-primary">身份证号：</span><span>320320320320320320</span></div>
                            <div><span class="text-primary">身份张照片：</span><span>320320320320320320</span></div>
                        </div>
                    </div>
                    <div class="text-right">
                        <a class="text-primary" v-if="!open_on" @click="open_close">展示&nbsp;&nbsp;<i
                                class="fa fa-sort-amount-asc"></i></a>
                        <a class="text-primary" v-if="open_on" @click="open_close">收起&nbsp;&nbsp;<i
                                class="fa fa-sort-amount-desc"></i></a></div>
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
                    <!--合同信息-->
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
                                <td class="paddingTop">
                                    <a data-v-2f43a2b3="" href="#">
                                        <div data-v-2f43a2b3="" class="progress progress-striped active">
                                            <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                                 aria-valuenow="45" role="progressbar" class="progress-bar"
                                                 :style="{ width: progress + '%'}">
                                                <span data-v-2f43a2b3="" class="sr-only">45% Complete</span>
                                            </div>
                                        </div>
                                    </a>
                                </td>
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
                                    <label class="col-sm-2 col-sm-2 control-label">跟进方式</label>
                                    <div class="col-sm-10" style="padding-left: 0;">
                                        <div class="col-sm-4">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="form-group">-->
                                <!--<label class="text-right col-sm-3 col-sm-3 control-label">沟通房源</label>-->
                                <!--<div class="col-sm-3">-->
                                <!--<select class="form-control">-->
                                <!--<option value="1">1</option>-->
                                <!--</select>-->
                                <!--</div>-->
                                <!--</div>-->
                                <div class="form-group">
                                    <label class="col-sm-2 col-sm-2 control-label"
                                           style="margin-top: 16px;">增加跟进记录</label>
                                    <div class="col-sm-10" style="margin-bottom: 16px;">
                                        <textarea class="form-control" v-model="follow_up"
                                                  style="margin-bottom: 16px;"></textarea>
                                        <div class="pull-right">
                                            <button class="btn btn-primary" @click="follow_up_take('ok')">确定</button>
                                            <button class="btn btn-default" @click="follow_up_take">取消</button>
                                        </div>
                                    </div>
                                </div>
                                <!--跟进记录-->
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
                            <div id="about" class="tab-pane">
                                <div class="row">
                                    <div class="col-md-12">
                                        <section class="panel table-responsive">
                                            <table class="table table-striped table-advance table-hover">
                                                <thead>
                                                <tr>
                                                    <th class="text-center">房屋地址</th>
                                                    <th class="text-center">房型</th>
                                                    <th class="text-center">状态</th>
                                                    <th class="text-center">负责人</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td class="text-center">
                                                        <router-link :to="{path:'/okCollect',query: {nameId: ''}}">
                                                            积善公寓2-302
                                                        </router-link>
                                                    </td>
                                                    <td class="text-center">三房一室一厅</td>
                                                    <td class="text-center">已成交</td>
                                                    <td class="text-center">负责人</td>
                                                </tr>
                                                <tr v-show="">
                                                    <td colspan="12" class="text-center text-muted">
                                                        <h4>暂无数据....</h4>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <!--客户编辑-->
        <New_add></New_add>
    </div>
</template>

<script>
    import New_add from '../common/new_add.vue'
    export default {
        components: { New_add },
        data (){
            return {
                progress: 30,               //进度
                open_on: false,             //展示收起
                follow_up: ''               //跟进记录
            }
        },
        methods: {
//            展示收起
            open_close (){
                this.open_on = !this.open_on;
            },
//            跟进记录
            follow_up_take (val){
                if (val === 'ok' && this.follow_up.length > 0) {
                    console.log("111");
                } else {
                    this.follow_up = '';
                }

            }
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

    .client_info > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > > div span.text-primary {
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

    .progress.progress-striped.active {
        margin-bottom: 0;
        height: 10px;
    }

    .progress1 {
        display: inline-block;
        width: 24%;
    }

    .paddingTop {
        padding-top: 13px;
    }
</style>
