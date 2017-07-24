<template>
    <div>
        <ol class="breadcrumb">
            <li>客户管理</li>
            <li>客户详情</li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-user"></i>&nbsp;客户信息
                        <!--编辑-->
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a href="#customModel" @click="customers_rev('rev')">编辑</a></li>
                                <li><a>增加提醒</a></li>
                                <!--<li class="divider"></li>-->
                            </ul>
                        </div>

                        <!--增加提醒-->
                        <a class="text-danger pull-right"><i class="fa fa-bell-o"></i></a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info" v-for="info in cus_info">
                    <div class="col-md-12">
                        <div class="col-md-4" style="padding: 0">
                            <div><span class="text-primary">客户姓名：</span><span>{{info.name}}</span></div>
                            <div><span class="text-primary">尊称：</span>
                                <span>{{select_list.gender[info.gender]}}</span>
                            </div>
                            <div><span class="text-primary">手机号：</span><span>{{info.mobile}}</span></div>
                            <div><span class="text-primary">负责人：</span><span>{{info.staff_id}}</span></div>
                        </div>
                        <div class="col-md-8">
                            <div><span
                                    class="text-primary">客户身份：</span><span>{{select_list.identity[info.identity]}}</span>
                            </div>
                            <div><span style="vertical-align: top;" class="text-primary">跟进进度：</span>
                                <a data-v-2f43a2b3="" href="#">
                                    <div data-v-2f43a2b3="" class="progress1 progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: cus_progress + '%'}">
                                            <span data-v-2f43a2b3="" class="sr-only">{{cus_progress}}%</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div><span
                                    class="text-primary">客户意向：</span><span>{{select_list.customer_will[info.customer_will]}}</span>
                            </div>
                            <div><span
                                    class="text-primary">客户来源：</span><span>{{select_list.source[info.source]}}</span>
                            </div>
                        </div>
                    </div>
                    <div v-if="open_on" class="col-md-12">
                        <div class="col-md-4" style="padding: 0">
                            <div><span
                                    class="text-primary">婚姻状况：</span><span>{{select_list.marriage_status[info.marriage_status]}}</span>
                            </div>
                            <div><span class="text-primary">QQ：</span><span>{{info.qq}}</span></div>
                            <div><span class="text-primary">邮箱：</span><span>{{info.e_mail}}</span></div>
                            <div><span
                                    class="text-primary">性格：</span><span>{{select_list.character[info.character]}}</span>
                            </div>
                            <div><span class="text-primary">备注：</span><span>{{info.remarks}}</span></div>
                        </div>
                        <div class="col-md-8">
                            <div><span
                                    class="text-primary">客户状态：</span><span>{{select_list.customer_status[info.customer_status]}}</span>
                            </div>
                            <div><span
                                    class="text-primary">个人/中介：</span><span>{{select_list.person_medium[info.person_medium]}}</span>
                            </div>
                            <div><span class="text-primary">证件号：</span><span>{{info.id_num}}</span></div>
                            <div><span class="text-primary">证件照片：</span>
                                <a href="#largePic" v-for="(pic,index) in photos"
                                   style="margin: 10px 10px 0 0;display: inline-block;" @click="showLargePic(index)">
                                    <img :src="pic.small">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <a class="text-primary" v-if="!open_on" @click="open_close">展示&nbsp;&nbsp;<i
                                class="fa fa-sort-amount-asc"></i></a>
                        <a class="text-primary" v-if="open_on" @click="open_close">收起&nbsp;&nbsp;<i
                                class="fa fa-sort-amount-desc"></i></a>
                    </div>
                </div>
            </div>
        </section>
        <!--内容区-->
        <div class="row">
            <!--合同信息-->
            <div class="col-md-3">
                <section class="panel roll" style="height: 500px;overflow: auto;">
                    <header class="panel-heading">
                        <i class="fa fa-file-text"></i>&nbsp;合同信息
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
                <section class="panel roll" style="height: 500px;overflow: auto;">
                    <header class="panel-heading tab-bg-dark-navy-blue ">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#home" aria-expanded="true"><i class="fa fa-pencil-square-o"></i>&nbsp;沟通日志</a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#about" aria-expanded="false"><i class="fa fa-home"></i>&nbsp;房屋信息</a>
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
                                            <select class="form-control" v-model="follow_w">
                                                <option v-for="(way,index) in select_list.follow_way" :value="index">{{way}}</option>
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
                                            <button class="btn btn-default" @click="follow_up_take('resetting')">取消
                                            </button>
                                            <button class="btn btn-primary" @click="follow_up_take('ok')">确定</button>
                                        </div>
                                    </div>
                                </div>
                                <!--跟进记录-->
                                <section class="panel" v-for="daily in daily_record"
                                         style="margin-bottom: 0;padding-bottom: 0;">
                                    <div class="panel-body">
                                        <div class="panel-body table-responsive cheek cheek1">
                                            <div><span>{{daily.create_time}}</span></div>
                                            <div>
                                                <span class="text-primary">跟进方式：</span>
                                                <span>{{select_list.follow_way[daily.follow_way]}}</span>
                                            </div>
                                            <div><span class="text-primary">跟进人：</span><span>{{daily.staff_id}}</span>
                                            </div>
                                            <div><span class="text-primary">跟进记录：</span><span>{{daily.remarks}}</span>
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
                                                        <router-link :to="{path:'/okCollect',query: {houseId: ''}}">
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
        <New_add @cus_list="succ" :msg="revise_state" :revise="revise_info" :selects="select_list"></New_add>

        <!--查看大图-->
        <PicModal :largePic="largePic"></PicModal>

        <!--提醒-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import New_add from './new_add.vue'
    import Status from '../common/status.vue';
    import PicModal from '../common/largePic.vue'       //查看大图
    export default {
        components: {New_add, PicModal, Status},
        data (){
            return {
                revise_state: '',           //修改
                cus_progress: '',           //进度
                progress: '20',             //进度
                open_on: false,             //展示收起
                follow_up: '',              //跟进记录
                cus_Id: '',                 //客户ID
                cus_info: [],               //客户信息
                revise_info: {},            //修改专用
                select_list: {},            //字典
                photos: {},                 //图片
                card: [],                   //大图
                largePic: [],               //点击放大图片
                follow_w: '1',              //跟进方式
                daily_record: [],           //沟通日志
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        mounted (){
            this.cus_Id = this.$route.query.nameId;
            this.detailed_info(this.cus_Id);
        },
        methods: {
            detailed_info (val){
                this.card = [];
                this.cus_info = [];
//                字典
                this.$http.get('core/customer/dict').then((res) => {
                    this.select_list = res.data;
//                    客户信息
                    this.$http.get('core/customer/readCustomer/id/' + val).then((res) => {
                        this.revise_info = res.data.data;
                        this.cus_info.push(res.data.data);
                        this.cus_progress = res.data.data.follow;
                        this.photos = res.data.data.album.id_pic;
                        for (let i in this.photos) {
                            this.card.push(this.photos[i].big);
                        }
                    });
//                   获取沟通日志
                    this.$http.get('core/customer_talk_log/talklist/id/' + val).then((res) => {
                        if (res.data.data) {
                            this.daily_record = res.data.data;
                        }
                    });
                });
            },
            succ (){
                $('.rem_div').remove();
                this.detailed_info(this.cus_Id);
            },
            customers_rev (val){
                this.revise_state = val;
                $('#customModel').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
            showLargePic(num){
                this.largePic = [{
                    src: this.photos,
                    i: num
                }];
                $('#largePic').modal('show');
            },
//            展示收起
            open_close (){
                this.open_on = !this.open_on;
            },
//            跟进记录
            follow_up_take (val){
                if (val === 'ok' && this.follow_up.length > 0) {
//                新增跟进记录
                    this.$http.post('core/customer_talk_log/savetalklog', {
                        follow_way: this.follow_w,
                        remarks: this.follow_up,
                        customer_id: this.cus_Id,
                    }).then((res) => {
                        if (res.data.code === '70090') {
                            this.$http.get('core/customer_talk_log/talklist/id/' + this.cus_Id).then((res) => {
                                if (res.data.data) {
                                    this.daily_record = res.data.data;
                                }
                            });
                            //成功信息 ***
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;

                            this.follow_up = '';
                            this.follow_w = '1';
                        } else {
                            //关闭成功信息(可选)
                            this.info.state_success = false;
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    });
                } else if (val === 'resetting') {
                    this.follow_up = '';
                    this.follow_w = '1';
                } else {
                    this.follow_up = '';
                    this.follow_w = '1';
                    this.info.state_success = false;
                    //失败信息 ***
                    this.info.error = '跟进记录不能为空';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },
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

    .client_info > div > div > div span.text-primary, .cheek1 > div > span:first-child {
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
