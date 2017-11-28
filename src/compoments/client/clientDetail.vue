<template>
    <div>
        <ol class="breadcrumb">
            <li>客户管理</li>
            <li v-show="this.from === 'client'">
                <router-link to='/client'>客户</router-link>
            </li>
            <li v-show="this.from === 'clientPool'">
                <router-link to="/clientPool">客户池</router-link>
            </li>
            <li>客户详情</li>
            <li v-show="this.from === 'client'&& typeof (searchInfo) === 'object'" class="pull-right">
                <router-link :to="{path:'/client',query: { searchInfo: searchInfo}}"><i
                        class="fa fa-angle-double-left"></i>&nbsp;返回上一步
                </router-link>
            </li>
            <li v-show="this.from === 'clientPool' && typeof (searchInfo) === 'object'" class="pull-right">
                <router-link :to="{path:'/clientPool',query: { searchInfo: searchInfo }}"><i
                        class="fa fa-angle-double-left"></i>&nbsp;返回上一步
                </router-link>
            </li>
        </ol>
        <!--头部-->
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-user"></i>&nbsp;客户信息
                        <span style="color: #e8403f;font-size: 14px" v-if="clientDetail.status === 1">
                            部分内容您无权查看(无权修改)
                        </span>
                        <!--编辑-->
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul role="menu" class="dropdown-menu">
                                <li @click="editClient"
                                    v-show="simulate.indexOf('Customer/updateCustomer')>-1">
                                    <a>编辑</a>
                                </li>
                                <!--<li @click="sharing">-->
                                    <!--<a>共享客户</a>-->
                                <!--</li>-->
                                <li @click="addRemind">
                                    <a>添加提醒</a>
                                </li>
                            </ul>
                        </div>

                        <!--增加提醒-->
                        <!--<a class="text-danger pull-right"><i class="fa fa-bell-o"></i></a>-->
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="col-md-12">
                        <div class="col-md-5" style="padding: 0">
                            <div>
                                <span class="text-primary">客户姓名：</span>
                                <span>{{clientDetail.name}}</span>
                            </div>
                            <div>
                                <span class="text-primary">尊称：</span>
                                <span v-if="dictionary.gender!==undefined">
                                    {{dictionary.gender[clientDetail.gender]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">国籍：</span>
                                <span>{{country}}</span>
                            </div>
                            <div>
                                <span class="text-primary">手机号：</span>
                                <span>{{clientDetail.mobiles}}</span>
                            </div>
                            <div>
                                <span class="text-primary">负责人：</span>
                                <span>{{clientDetail.manager_name}}</span>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div>
                                <span class="text-primary">客户身份：</span>
                                <span>
                                    {{clientDetail.identity}}
                                </span>
                            </div>
                            <div>
                                <span style="vertical-align: top;" class="text-primary">跟进进度：</span>
                                <a href="#">
                                    <div class="progress1 progress progress-striped active">
                                        <div aria-valuemax="100" aria-valuemin="0" :title="clientDetail.follow+'%'"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: clientDetail.follow + '%'}">
                                            <span class="sr-only">{{clientDetail.follow}}%</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div>
                                <span class="text-primary">客户意向：</span>
                                <span v-if="dictionary.customer_will!==undefined">
                                    {{dictionary.customer_will[clientDetail.customer_will]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">客户来源：</span>
                                <span v-if="dictionary.source!==undefined">
                                    {{dictionary.source[clientDetail.source]}}
                                </span>
                            </div>
                            <div><span class="text-primary">小区地址：</span>
                                <span>
                                    {{clientDetail.villageAddress}}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12" v-if="isOpen">
                        <div class="col-md-5" style="padding: 0">
                            <div>
                                <span class="text-primary">婚姻状况：</span>
                                <span v-if="dictionary.marriage_status!==undefined">
                                    {{dictionary.marriage_status[clientDetail.marriage_status]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">QQ：</span>
                                <span>{{clientDetail.qq}}</span>
                            </div>
                            <div>
                                <span class="text-primary">邮箱：</span>
                                <span>{{clientDetail.e_mail}}</span>
                            </div>
                            <div>
                                <span class="text-primary">性格：</span>
                                <span v-if="dictionary.character!==undefined">
                                    {{dictionary.character[clientDetail.character]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">备注：</span>
                                <span>{{clientDetail.remarks}}</span>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div>
                                <span class="text-primary">客户状态：</span>
                                <span v-if="dictionary.customer_status!==undefined">
                                    {{dictionary.customer_status[clientDetail.customer_status]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">个人/中介：</span>
                                <span v-if="dictionary.marriage_status!==undefined">
                                    {{dictionary.person_medium[clientDetail.person_medium]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">证件类型：</span>
                                <span v-if="dictionary.credentials!==undefined">
                                    {{dictionary.credentials[clientDetail.id_type]}}
                                </span>
                            </div>
                            <div>
                                <span class="text-primary">证件号：</span>
                                <span>{{clientDetail.id_num}}</span>
                            </div>
                            <div v-if="clientDetail.status !== 1">
                                <span class="text-primary">证件照片：</span>
                                <a v-for="(item,index) in clientDetail.albums.id_pic"
                                   style="margin: 10px 10px 0 0;display: inline-block;"
                                   @click="showLargePic(index,clientDetail.albums.id_pic)">
                                    <img :src="item.small" style="width: 40px">
                                </a>
                            </div>
                            <div v-if="clientDetail.status === 1">
                                <span class="text-primary">证件照片：</span>
                                <a v-if="clientDetail!==[]" v-for="item in clientDetail.albums"
                                   style="margin: 10px 10px 0 0;display: inline-block;">
                                    <img src="../../assets/img/id_pic.jpg" style="width: 40px;height:40px">
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="text-right" @click="open_close">
                        <a class="text-primary" v-if="!isOpen">展示&nbsp;&nbsp;
                            <i class="fa fa-level-down"></i>
                        </a>
                        <a class="text-primary" v-if="isOpen">收起&nbsp;&nbsp;
                            <i class="fa fa-level-up"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!--内容区-->
        <div class="row">
            <!--合同信息-->
            <div class="col-lg-3">
                <section class="panel roll" style="height: 500px;overflow: auto;">
                    <header class="panel-heading tab-bg-dark-navy-blue ">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#collect" aria-expanded="true">
                                    <i class="fa fa-file-text"></i>&nbsp;收房合同
                                </a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#rent" aria-expanded="false">
                                    <i class="fa fa-file-text"></i>&nbsp;租房合同
                                </a>
                            </li>
                        </ul>
                    </header>
                    <!--合同信息-->
                    <div class="panel-body roll" >
                        <div class="tab-content">
                            <!--收房合同-->
                            <div id="collect" class="tab-pane active">
                                <div v-if="collect_rent.collect !== undefined">
                                    <div v-if="collect_rent.collect.length >0">
                                        <table class="table contract_info">
                                            <tbody  v-for="item in collect_rent.collect">
                                                <tr>
                                                    <td><a><i class="fa fa-bookmark"></i></a></td>
                                                    <td colspan="2" style="min-width: 200px;">
                                                        {{item.start_date}}&nbsp;至&nbsp;{{item.end_date}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <a></a>
                                                    </td>
                                                    <td>收房合同</td>
                                                    <td>
                                                        {{item.contract_num}}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>房屋地址</td>
                                                    <td>{{item.detailed_address}}</td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>负责人</td>
                                                    <td>{{item.staff_name}}</td>
                                                </tr>
                                                <tr>
                                                <td></td>
                                                <td>合同时间</td>
                                                <td class="paddingTop">
                                                    <a data-v-2f43a2b3="" v-if="item.status<1">
                                                        <div class="progress progress-striped active">
                                                            <div aria-valuemax="100" aria-valuemin="0" :title="Math.round(item.status*100)+'%'"
                                                                 aria-valuenow="45" role="progressbar" class="progress-bar"
                                                                 :style="{ width: Math.round(item.status*100) + '%'}"
                                                                 :class="{'progress-bar-danger' : item.day<30}">
                                                                <span class="sr-only">Math.round(item.status*100)% Complete</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <span v-if="item.status === 1">
                                                        已结束
                                                    </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div v-if="collect_rent.collect.length <1">
                                        <h5>暂无收房合同信息...</h5>
                                    </div>
                                </div>
                                <div v-if="collect_rent.collect===undefined">
                                    <h5>暂无收房合同信息...</h5>
                                </div>
                            </div>
                            <!--租房合同-->
                            <div id="rent" class="tab-pane">
                                <div v-if="collect_rent.rent!==undefined">
                                    <div v-if="collect_rent.rent.length >0">
                                        <table class="table contract_info">
                                            <tbody v-for="item in collect_rent.rent">
                                            <tr>
                                                <td><a><i class="fa fa-bookmark"></i></a></td>
                                                <td colspan="2" style="min-width: 200px;">
                                                    {{item.start_date}}&nbsp;至&nbsp;{{item.end_date}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a></a>
                                                </td>
                                                <td>租房合同</td>
                                                <td>
                                                    {{item.contract_num}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>房屋地址</td>
                                                <td>{{item.detailed_address}}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>负责人</td>
                                                <td>{{item.staff_name}}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>合同时间</td>
                                                <td class="paddingTop">
                                                    <a data-v-2f43a2b3="" v-if="item.status<1">
                                                        <div class="progress progress-striped active">
                                                            <div aria-valuemax="100" aria-valuemin="0" :title="Math.round(item.status*100)+'%'"
                                                                 aria-valuenow="45" role="progressbar" class="progress-bar"
                                                                 :style="{ width: Math.round(item.status*100) + '%'}"
                                                                 :class="{'progress-bar-danger' : item.day<30}">
                                                                <span class="sr-only">Math.round(item.status*100)% Complete</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <span v-if="item.status === 1">
                                                        已结束
                                                    </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div v-if="collect_rent.rent.length <1">
                                        <h5>暂无租房合同信息...</h5>
                                    </div>
                                </div>
                                <div v-if="collect_rent.rent===undefined">
                                    <h5>暂无租房合同信息...</h5>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
            <!--沟通日志/房屋信息-->
            <div class="col-lg-9">
                <section class="panel" style="height: 500px;overflow: auto;">
                    <header class="panel-heading tab-bg-dark-navy-blue ">
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a data-toggle="tab" href="#record" aria-expanded="true">
                                    <i class="fa fa-pencil-square-o"></i>&nbsp;沟通日志
                                </a>
                            </li>
                            <li class="">
                                <a data-toggle="tab" href="#house" aria-expanded="false">
                                    <i class="fa fa-home"></i>&nbsp;房屋信息
                                </a>
                            </li>
                        </ul>
                    </header>
                    <div class="panel-body roll" >
                        <div class="tab-content">

                            <!--沟通日志-->
                            <div id="record" class="tab-pane active">
                                <div class="form-group clearFix">
                                    <label class="col-sm-2 col-sm-2 control-label">跟进方式</label>
                                    <div class="col-sm-10" style="padding-left: 0;">
                                        <div class="col-sm-4">
                                            <select class="form-control" v-model="followRecord.follow_way">
                                                <option value="">跟进方式</option>
                                                <option v-if="dictionary.follow_way!==undefined" :value="key"
                                                        v-for="(val,key) in dictionary.follow_way">{{val}}
                                                </option>
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
                                <div class="form-group clearFix" style="margin-bottom: 0;">
                                    <label class="col-sm-2 col-sm-2 control-label"
                                           style="margin-top: 16px;">增加跟进记录</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" style="margin-bottom: 16px;" v-model="followRecord.remarks">

                                        </textarea>
                                        <div style="text-align: right">
                                            <button class="btn btn-default" @click="cancel">取消</button>
                                            <button class="btn btn-primary" @click="confirmAdd">确定</button>
                                        </div>
                                    </div>
                                </div>
                                <!--跟进记录-->
                                <section class="panel col-md-6" v-for="item in daily_record"
                                         style="margin-bottom: 0;padding: 0;">
                                    <div class="panel-body">
                                        <div class="panel-body table-responsive cheek cheek1">
                                            <div>
                                                <span class="text-primary">跟进时间：</span>
                                                <span>{{item.create_time}}</span>
                                            </div>
                                            <div>
                                                <span class="text-primary">跟进方式：</span>
                                                <span>{{dictionary.follow_way[item.follow_way]}}</span>
                                            </div>
                                            <div><span class="text-primary">跟进人：</span><span>{{item.staff_id}}</span>
                                            </div>
                                            <div><span class="text-primary">跟进记录：</span><span>{{item.remarks}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <!--房屋信息-->
                            <div id="house" class="tab-pane">
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
                                                    <tr v-for="item in houseRelated">
                                                        <td class="text-center">
                                                            <router-link :to="{path:'/collectDetail',
                                                            query:{CollectId: item.id,flag:'client'}}">
                                                                {{item.detailed_address}}
                                                            </router-link>
                                                        </td>
                                                        <td class="text-center">
                                                            {{item.rooms.hall}}厅{{item.rooms.rooms}}室{{item.rooms.hall}}厅
                                                        </td>
                                                        <td class="text-center">
                                                            <span v-if="dictionary.villa_status!==undefined">
                                                                {{dictionary.villa_status[item.status]}}
                                                            </span>
                                                        </td>
                                                        <td class="text-center">
                                                            {{item.staff_id}}
                                                        </td>

                                                    </tr>
                                                    <tr v-if="houseRelated.length<1">
                                                        <td colspan="4" class="text-center text-muted">
                                                           暂无数据....
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
        <!--查看大图-->
        <PicModal :largePic="largePic"></PicModal>
        <!--共享客户-->
        <!--<Sharing :msg="clientId"></Sharing>-->
        <!--加载-->
        <Loading v-if="isWaiting"></Loading>
        <AddRemind :remindId="clientId" @cus_seccess="successRemind"></AddRemind>
        <ClientEdit :editId="clientId" :startEdit="startEdit" :allCountry="allCountry" @close="closeModal" @success="success"></ClientEdit>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import PicModal from '../common/largePic.vue'               //查看大图
//    import Sharing from './sharing.vue'                         //共享客户
    import Loading from '../loading/Loading.vue'                //Loading
    import AddRemind from './addRemind.vue'
    import ClientEdit from './clientEdit.vue'
    import Status from '../common/status.vue'

    export default{
        components:{PicModal,Loading,ClientEdit,AddRemind,Status},
        props:['simulate','isSuper'],
        data(){
            return{
                clientId : '',
                from : '',
                searchInfo :[],
                isOpen : false,         //是否展开
                dictionary :[],         //字典
                clientDetail : [],      //详情数据
                allCountry :[],         //所有国家
                country : '',           //国家
                collect_rent:[],        //收租房合同
                followRecord:{
                    follow_way: '',
                    remarks: '',
                    customer_id: '',
                },
                daily_record :[],       //沟通日志
                houseRelated : [],
                largePic: [],               //点击放大图片
                isWaiting : true,
                startEdit : false,
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

            }
        },
        created(){
            this.clientId = this.$route.query.clientId;
            this.from = this.$route.query.from;
            this.searchInfo = this.$route.query.searchInfo;
            this.getDictionary();
        },
        methods:{
            open_close(){   //是否展开
                this.isOpen = !this.isOpen;
            },
            getDictionary(){    //获取字典
                this.$http.post('index/country/index').then((res) => {
                    this.allCountry = res.data.data;
                });
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary = res.data;
                    this.getClientDetail();
                    this.getContract();
                    this.getRecord();
                    this.getHouse();
                })
            },
            getClientDetail(){  //获取详情数据
                this.$http.get('core/customer/readCustomer/id/' + this.clientId).then((res) => {
                    if(res.data.code === '70020'){
                        this.clientDetail = res.data.data;
                        this.isWaiting = false;
                        this.allCountry.forEach((val) => {
                            if(val.id === this.clientDetail.nationality){
                                this.country = val.zh_name;
                            }
                        })
                    }else {
                        this.isWaiting = false;
                    }
                })
            },
            getContract(){
                this.$http.get('core/customer/collect_rent/id/'+this.clientId).then((res) => {
                    if(res.data.code === '700100'){
                        this.collect_rent = res.data.data;
                    }else {
                        this.collect_rent = [];
                    }
                })
            },
            getRecord(){
                // 获取沟通日志
                this.$http.get('core/customer_talk_log/talklist/id/' + this.clientId).then((res) => {
                    if(res.data.code === '70090'){
                        this.daily_record = res.data.data;
                    }else {
                        this.daily_record = [];
                    }
                });
            },
            //增加跟进记录
            confirmAdd(){
                this.followRecord.customer_id = this.clientId;
                this.$http.post('core/customer_talk_log/savetalklog',this.followRecord).then((res) => {
                    if(res.data.code === '70090'){
                        this.cancel();
                        this.getRecord();
                    }else {
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                    }
                })
            },
            //取消跟进记录
            cancel(){
                this.followRecord ={
                    follow_way: '',
                    remarks: '',
                    customer_id: '',
                }
            },
            //获取相关房屋信息
            getHouse(){
                this.$http.get('core/customer/villa_info/id/'+this.clientId).then((res) => {
                    if(res.data.code === '700110'){
                        console.log(res.data.data)
                        this.houseRelated = res.data.data;
                    }else {
                        this.houseRelated = [];
                    }
                })
            },
            // 查看大图
            showLargePic(num,photos){
                this.largePic = [{
                    src: photos,
                    i: num
                }];
                $('#largePic').modal('show');
            },
            // 共享客户
//            sharing (){
//                $('#sharing').modal({
//                    backdrop: 'static',       //空白处模态框不消失
//                });
//            },
            editClient(){
                this.startEdit = true;
                $('.rem_div').remove();
                $('#clientEdit').modal('show');
            },
            closeModal(){
                this.startEdit = false;
            },
            success(){
                this.getClientDetail();
            },
            //添加提醒
            addRemind(){
                $('#addRemind1').modal('show');
            },
            successRemind(){
                this.pickedId = [];
                this.getClientDetail();
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

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }

    .breadcrumb > li:nth-child(5):before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
    .dropdown-menu{
        padding: 0;
        border-radius: 0;
        min-width : 120px;
        left: -80px;
    }
    .dropdown-menu li{
        text-align: center;
    }
    .table tbody  tr{
        padding-right: 20px ;
    }
    .table tbody  tr  td{
        padding: 8px 20px 8px 0;
        line-height: 12px;
    }
</style>
