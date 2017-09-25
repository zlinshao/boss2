<template>
    <div>
        <ol class="breadcrumb">
            <li class="active">问卷调查</li>
        </ol>

        <section class="panel">
            <div class="panel-body">

                <div class="form-inline" v-if="selectId === ''">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.status" @change="search">
                                <option value="">状态选择</option>
                                <option :value="key" v-for="(value,key) in dictionary.mission_status">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" v-model="params.type"  @change="search">
                                <option value="">类型选择</option>
                                <option :value="key" v-for="(value,key) in dictionary.mission_type">{{value}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="请输入标题" v-model="params.keywords" @keyup="search">
                            <span class="input-group-btn">
                               <button class="btn btn-success" type="button" @click="search">搜索</button>
                           </span>
                        </div>
                    </div>
                    <div class="pro-sort pull-right">
                        <div class="input-group">
                            <button class="btn btn-primary" @click="createQuestion">创建任务</button>
                        </div>
                    </div>
                </div>


                <div class="col-lg-12 remind" v-if="selectId > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li @click="editQuestion" v-if="status == 1">
                            <h5><a><i class="fa fa-pencil-square-o"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li @click="publicQuestion">
                            <h5><a><i class="fa fa-arrow-up"></i>&nbsp;发布</a></h5>
                        </li>
                        <li @click="undercarriage">
                            <h5><a><i class="fa fa-arrow-down"></i>&nbsp;下架</a></h5>
                        </li>

                        <li @click="deleteQuestion">
                            <h5><a><i class="fa fa-times-circle"></i>&nbsp;删除</a></h5>
                        </li>
                        <li @click="noWrite">
                            <h5><a><i class="fa fa-user"></i>&nbsp;未填写员工</a></h5>
                        </li>
                        <li>
                            <h5>
                                <router-link :to="{path:'/questionResult',query:{questionId : selectId}}">
                                    <i class="fa fa-eye"></i>&nbsp;查看结果
                                </router-link>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--问卷调查表-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>
                                <!--<label for="allCheck">-->
                                    <!--<input id="allCheck" type="checkbox">-->
                                <!--</label>-->
                            </th>
                            <th class="text-center">标题</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">发布人</th>
                            <th class="text-center">发布时间</th>
                            <th class="text-center">回复量</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in questionList">
                            <td>
                                <label @click.prevent="pick(item,$event)" :class="{'label_check':true,
                                    'c_on':selectId===item.id,'c_off':selectId!==item.id}">
                                    <input type="checkbox" class="pull-left" :checked="item.id === selectId">
                                </label>
                            </td>
                            <td class="text-center">{{item.title}}</td>
                            <td class="text-center">{{dictionary.mission_type[item.type]}}</td>
                            <td class="text-center">{{dictionary.staff_id[item.public_id]}}</td>
                            <td class="text-center" v-if="item.update_time == undefined">{{item.create_time}}</td>
                            <td class="text-center" v-if="item.update_time != undefined">{{item.update_time}}</td>
                            <td class="text-center">{{item.comment_nums}}</td>
                            <td class="text-center">
                                <label class="label label-default" v-if="item.status === 1">
                                    {{dictionary.mission_status[item.status]}}
                                </label>
                                <label class="label label-success" v-if="item.status === 2">
                                    {{dictionary.mission_status[item.status]}}
                                </label>
                                <label class="label label-warning" v-if="item.status === 3">
                                    {{dictionary.mission_status[item.status]}}
                                </label>
                            </td>
                            <td class="text-center">
                                <router-link :to="{path:'/questionnaire',query:{questionId : item.id}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="8" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <Add @Add="successAdd"></Add>
        <Page :pg="pages" @pag="getPage" :beforePage="params.page"></Page>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <Status :state='info'></Status>
        <Edit :questionId="selectId" :startEdit="startEdit" @Edit="successEdit"></Edit>
        <NoWrite :selectId="selectId"></NoWrite>

        <Loading v-if='Waiting'></Loading>
    </div>
</template>

<script>
    import Add from './questionAdd.vue'
    import Page from '../common/page.vue'
    import Confirm from '../common/confirm.vue'
    import Status from '../common/status.vue';
    import Edit from './questionEdit.vue'
    import NoWrite from './noWrite.vue'
    import Loading from '../loading/Loading.vue'
    export default {
        components :{Add,Page,Confirm,Status,Edit,NoWrite,Loading},
        data(){
            return{
                isShow : false,
                questionList : [],
                dictionary : [],
                pages : '',
                params : {
                    page : '',
                    type : '',
                    status : '',
                    keywords : '',
                },
                selectId : '',
                confirmMsg : [],
                msgFlag :'',
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
                status : '',
                Waiting : true,
                startEdit : false,
            }
        },
        created(){
            this.getDictionary();
        },
        methods :{
            getDictionary(){
                this.$http.get('index/Mission/dict').then((res) => {
                    this.dictionary = res.data;
                    this.getQuestionList();
                })
            },
            search(){
                this.params.page=1;
                this.selectId = '';
                this.getQuestionList();
            },
            getQuestionList(){
                this.$http.post('index/Mission/index',this.params).then((res) => {
                    if(res.data.code === '30010'){
                        this.questionList = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                        this.Waiting =false;
                    }else {
                        this.questionList = [];
                        this.isShow = true;
                        this.pages = 1;
                        this.Waiting =false;
                    }

                })
            },
            createQuestion(){   //创建问卷
                $('.questionAdd').modal('show');
            },
            editQuestion(){
                this.startEdit =true;
                $('.questionEdit').modal('show');
            },
            getPage(val){
                this.params.page = val;
                this.getQuestionList();
            },
            pick(item, e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
//                e.target.checked = !e.target.checked;
                if(evInput.checked){
                    this.selectId = item.id;
                    this.status = item.status;
                }else {
//                    this.questionSelect=this.questionSelect.filter((x) => x!==id)
                    this.selectId = '';
                    this.status = '';
                }
            },
            successAdd(){
                this.search();
            },
            successEdit(){
                if(typeof (val) === 'string'){
                    this.search();
                }
                this.startEdit = false;
            },
            deleteQuestion(){       //删除
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'delete';
            },
            undercarriage(){
                this.confirmMsg = {msg: '您确定下架吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'undercarriage';
            },
            publicQuestion(){
                this.confirmMsg = {msg: '您确定发布吗'};
                $('#confirm').modal('show');
                this.msgFlag = 'publicQuestion';
            },
            noWrite(){
                $('.noWrite').modal('show');
            },
            getConfirm(){
                switch (this.msgFlag){
                    case 'delete' :
                        this.$http.get('index/Mission/Delete/id/' + this.selectId).then((res) => {
                            if(res.data.code === '30031'){
                                this.selectId = '';
                                this.search();
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            }else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                        break;
                    case 'undercarriage' :
                        this.$http.get('index/Mission/offMission/id/' + this.selectId).then((res) => {
                            if(res.data.code === '30034'){
                                this.selectId = '';
                                this.search();
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            }else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                        break;
                    case 'publicQuestion' :
                        this.$http.get('index/Mission/publicMission/id/' + this.selectId).then((res) => {
                            if(res.data.code === '30022'){
                                this.selectId = '';
                                this.search();
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            }else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                        break;
                }
            },

        }
    }
</script>


<style scoped>
    input, select {
        margin-bottom: 0;
    }

    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }
</style>
