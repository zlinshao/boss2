<template>
    <div>
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>发布文章</li>
        </ol>
        <!--<div>
            {{operId}}<br>
            {{pitch}}<br>
            {{status}}<br>
            {{statusId}}
        </div>-->

        <section class="panel">
            <div class="panel-body">
                <div v-if="pitch.length==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" v-model="params.type" @change="search(1)">
                                <option value="">类别</option>
                                <option :value="value" v-for="(key,value) in dict.article_type">{{key}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select class="form-control" v-model="params.status" @change="search(1)">
                                <option value="">状态</option>
                                <option :value="value" v-for="(key,value) in dict.article_status">{{key}}</option>
                            </select>
                        </div>
                        <!--<div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>-->
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="文章标题"
                                   v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right" v-if="simulate.indexOf('StaffSquare/addArticle')>-1||isSuper">
                            <router-link to="/postArticle" class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;文章发布
                            </router-link>
                        </div>
                    </form>
                </div>

                <div class="col-lg-12 remind" v-if="pitch.length>0">
                    <ul>
                        <li><h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5></li>
                        <li v-if="statusId!=2&&pitch.length==1&&(simulate.indexOf('StaffSquare/editArticle')>-1||isSuper)">
                            <h5><router-link :to="{path : '/modifyArticle',query:{articleId : operId}}"><i class="fa fa-pencil"></i>&nbsp;编辑</router-link></h5>
                        </li>
                        <li v-if="statusId==2&&pitch.length==1&&(simulate.indexOf('StaffSquare/offArticle')>-1||isSuper)">
                            <h5 @click="oper(1)"><a><i class="fa fa-cloud-download"></i>&nbsp;下架</a></h5>
                        </li>
                        <li v-if="statusId!=2&&pitch.length==1&&(simulate.indexOf('StaffSquare/publicArticle')>-1||isSuper)">
                            <h5 @click="oper(2)"><a><i class="fa fa-cloud-upload"></i>&nbsp;发布</a></h5>
                        </li>
                        <li v-if="statusId!=2&&(simulate.indexOf('StaffSquare/deleteArticle')>-1||isSuper)">
                            <h5 @click="oper(3)"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">
                                <label for="allCheck"
                                       :class="{'label_check':true,'c_on':myData.length!=0&&pitch.length==myData.length,'c_off':pitch.length!=myData.length}"
                                       @click.prevent="chooseAll($event)">
                                    <input id="allCheck" type="checkbox" :checked="myData.length!=0&&pitch.length==myData.length">
                                </label>
                            </th>
                            <th class="text-center">标题</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">发布人</th>
                            <th class="text-center">发布时间</th>
                            <th class="text-center">评论</th>
                            <th class="text-center">点赞</th>
                            <th class="text-center">状态</th>
                            <th class="text-center" v-if="simulate.indexOf('StaffSquare/showDetails')>-1||isSuper">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex($event,item.id,item.status)">
                                    <input type="checkbox"
                                           :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>{{item.title}}</td>
                            <td>{{dict.article_type[item.type]}}</td>
                            <td>{{dict.staff_id[item.publicer_id]}}</td>
                            <td>{{item.create_time}}</td>
                            <td>{{item.comment_num}}</td>
                            <td>{{item.thumbs}}</td>
                            <td>
                                <label :class="{'label':true,'status':true,
                                'gray':item.status===1,'green':item.status===2,'yellow':item.status===3,}">
                                    {{dict.article_status[item.status]}}
                                </label>
                            </td>
                            <td v-if="simulate.indexOf('StaffSquare/showDetails')>-1||isSuper">
                                <router-link :to="{path : '/articleDetail',query:{articleId : item.id,page:beforePage,myParams:params}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="9" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--<STAFF :configure="configure" @Staff="selectDateSend"></STAFF>-->

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
//    import STAFF from  '../../common/organization/selectStaff.vue'
    import Page from '../../common/page.vue'
    import Confirm from '../../common/confirm.vue'
    import Status from '../../common/status.vue';

    export default{
        props : ['simulate','isSuper'],
        components: {Page,Confirm,Status},
        data(){
            return {
                dict : {},

                paging : 1,
                beforePage :1,
                myData : [],
                isShow : false,
                pitch : [],
                status : [],

                operId : 0,
                statusId : '',

                configure: {},
                selected: [],
                params : {
//                    department_id : [],
//                    staff_id : [],
                    type : '',
                    status : '',
                    search : ''
                },
                confirmMsg: {
                    oper : 0,
                    msg: '',
                },

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
        watch:{
            pitch(val){
                if (val.length == 1) {
                    this.operId = val[0];
                } else {
                    this.operId = 0;
                }
//                console.log(this.operId);
            },
            status(val){
//                console.log(val)
                if (val.length == 1) {
//                    alert(val[0])
                    this.statusId = val[0];
                } else {
                    this.statusId = 0;
                }
//                console.log(this.operId);
            },
        },
        mounted(){
            let params = this.$route.query.myParam;
            let page = this.$route.query.page;
            this.$http.get('code/Staff_Square/dict').then((res)=>{
//                console.log(res.data);
                this.dict = res.data;
                if (page!=undefined){
                    this.page = page;
                    this.beforePage = page;
                    if (params!=undefined&&typeof params!='string'){
//                                this.currentDate = [];
                        this.params = params;
//                                alert(this.beforePage)
                    }
                    this.search(this.beforePage);
                } else {
                    this.getList();
                }
            })
        },
        methods: {
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
            clearSelect(){
                if (this.selected.length == 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

            // 全选
            chooseAll(ev){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch.splice(0, this.pitch.length);
                if (evInput.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.pitch.push(this.myData[i].id);
                    }
                }
                this.status.splice(0, this.status.length);
                if (evInput.checked) {
                    for (let i = 0; i < this.myData.length; i++) {
                        this.status.push(this.myData[i].status);
                    }
                }

//                console.log(this.pitch);
            },
            changeIndex(ev, id, status){
//                console.log("一开始"+this.operId);
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(id);
                    this.status.push(status);
                    this.operId = id;
                    this.statusId = status;
//                    console.log(this.operId);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    let index1 = this.status.indexOf(status);
                    if (index1 > -1) {
                        this.status.splice(index1, 1);
                    }
                    this.operId = 0;
                    this.statusId = 0;
                }
            },
            getList(){
                this.$http.get('code/Staff_Square?page=1').then((res)=>{
//                    console.log(res.data);
                    if (res.data.code == 30010){
                        // 成功
                        this.myData = res.data.data.list;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.myData = [];
                        this.paging = 1;
                        this.isShow = true;
                    }
                })
            },
            search(val){
                this.beforePage = val;
                this.operId = 0;
                this.statusId = '';
                this.pitch = [];
                this.status = [];

                this.$http.get('code/Staff_Square?page='+this.beforePage,{
                    params:this.params
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==30010){
                        // 成功
                        this.myData = res.data.data.list;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        // 失败
                        this.myData = [];
                        this.isShow = true;
                        this.paging = 0;
                        this.beforePage = 1;
                    }
                })
            },

            oper(num){
                this.confirmMsg.oper = num;
                if (num==1){
                    // 下架
                    this.confirmMsg.msg = '确定下架该条新闻吗？';
                } else if (num==2){
                    // 发布
                    this.confirmMsg.msg = '确定发布该条新闻吗？';
                } else if (num==3){
                    // 删除
                    this.confirmMsg.msg = '确定删除该条新闻吗？';
                }
                $('#confirm').modal('show');
            },
            getConfirm(){
                let url = '';
                if (this.confirmMsg.oper==1){
                    // 下架
                    url = 'code/Staff_Square/offArticle';
                    this.$http.get(url+'?id='+this.operId).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==30025){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.success()
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                } else if (this.confirmMsg.oper==2){
                    // 发布
                    url = 'code/Staff_Square/publicArticle';
                    this.$http.post(url+'?id='+this.operId).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==30022){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.success()

                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }

                    })
                } else if (this.confirmMsg.oper==3){
                    // 删除
                    url = 'code/Staff_Square/deleteArticle';
                    this.$http.get(url,{
                        params : {
                            id : this.pitch
                        }
                    }).then((res)=>{
                        console.log(res.data)
                        if (res.data.code==30016){
                            // 成功
                            this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            this.info.state_error = false;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            this.success()

                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }
            },
            success(){
                this.pitch = [];
                this.operId = 0;
                this.search(this.beforePage)
            }
        }
    }
</script>
<style scoped>
    .status.gray{
        background-color: #B5B5B5;
    }
    .status.green{
        background-color: #7CE668;
    }
    .status.yellow{
        background-color: #FEC53B;
    }
    .panel-body .form-inline .input-group {
        margin-bottom: 5px;
    }
    label.label{
        display: inline-block;
        width: 58px;
    }
</style>