<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/question">问卷调查</router-link>
            </li>
            <li class="active">详情</li>

            <li class="pull-right">
                <router-link to="/question">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span>标题：{{questionInfo.title}}</span>&nbsp;
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li @click="editQuestion" v-if="questionInfo.status == 1"><span>编辑</span></li>
                                <li @click="publicQuestion"><span>发布</span></li>
                                <li @click="undercarriage"><span>下架</span></li>
                                <!--<li @click="deleteQuestion"><span>删除</span></li>-->
                                <li @click="noWrite">
                                    <span>未填写员工</span>
                                </li>
                                <router-link tag="li" :to="{path:'/questionResult',query:{questionId : editId,type : 'detail'}}">
                                    <span>查看结果</span>
                                </router-link>
                            </ul>
                        </div>
                    </h4>
                </header>
                <div style="text-align: center">
                    <b v-if="questionInfo.public_id !==undefined">
                        <span v-if="questionInfo.update_time == undefined">{{questionInfo.create_time}}&nbsp;&nbsp;&nbsp;</span>
                        <span v-if="questionInfo.update_time != undefined">{{questionInfo.update_time}}&nbsp;&nbsp;&nbsp;</span>
                        {{dictionary.staff_id[questionInfo.public_id]}}
                    </b>
                </div>
                <div class="row select" v-for="(item,index) in questionInfo.question">
                    <div class="col-xs-12">
                        <b>{{index+1}}&nbsp;{{item.question}}</b>
                    </div>
                    <div class="col-sm-12 margin" v-if="item.option.length > 0">
                        <label class="option" v-for="(value,key) in item.option" v-if="item.question_type === 1">
                            <input type="radio" :name="item.id">
                            <span v-if="value.content !== null">{{value.content}}</span>
                            <span v-if="value.content === null">
                                 <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                            </span>
                        </label>
                        <label class="option" v-for="(value,key) in item.option" v-if="item.question_type === 2">
                            <input type="checkbox">
                            <span v-if="value.content !== null">{{value.content}}</span>
                            <span v-if="value.content === null">
                                 <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                            </span>
                        </label>
                    </div>
                    <div class="col-sm-5 margin" v-if="item.option.length === 0">
                        <textarea class="form-control" rows="5"></textarea>
                    </div>
                </div>

                <!--<div style="border-top: 1px solid #aaaaaa">-->
                    <!--<div style="padding: 10px">-->
                        <!--<b style="font-size: 16px">未填写</b>-->
                    <!--</div>-->
                    <!--<div class="row">-->
                        <!--<div class="col-md-1 col-sm-2 col-xs-4" v-for="(item,index) in questionInfo.hasNotWrite">-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>
        </section>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <Edit :questionId="editId" :startEdit="startEdit" @Edit="successEdit"></Edit>
        <NoWrite :selectId="editId"></NoWrite>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Confirm from '../common/confirm.vue'
    import Edit from './questionEdit.vue'
    import NoWrite from './noWrite.vue'
    import Status from '../common/status.vue';
    export default {
        components : {Confirm,Edit,NoWrite,Status},
        data(){
            return{
                questionId : '',    //问卷 id
                dictionary : [],    //字典
                questionInfo : [],  //问卷信息

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
                editId : '',
                startEdit : false,
            }
        },
        created(){
            this.questionId = this.$route.query.questionId;
            this.getDictionary();
        },
        watch :{
            questionId(val){
                this.editId = val;
            }
        },
        methods : {
            getDictionary(){        //ask for dictionary
                this.$http.get('index/Mission/dict').then((res) => {
                    this.dictionary = res.data;
                    this.getQuestionInfo();
                })
            },
            getQuestionInfo(){      //ask for question information
                this.$http.get('index/Mission/showDetail/id/' + this.questionId).then((res) => {
                    this.questionInfo = res.data.data[0];
                })
            },

            editQuestion(){
                this.startEdit = true;
                $('.questionEdit').modal('show');
            },
            successEdit(){
                this.getQuestionInfo();
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

            getConfirm(){
                switch (this.msgFlag) {
                    case 'delete' :
                        this.$http.get('index/Mission/Delete/id/' + this.editId).then((res) => {
                            if (res.data.code === '30031') {
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            } else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                        break;
                    case 'undercarriage' :
                        this.$http.get('index/Mission/offMission/id/' + this.editId).then((res) => {
                            if (res.data.code === '30034') {
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            } else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                        break;
                    case 'publicQuestion' :
                        this.$http.get('index/Mission/publicMission/id/' + this.editId).then((res) => {
                            if (res.data.code === '30022') {
                                this.info.success = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_success = true;
                            } else {
                                this.info.error = res.data.msg;
                                //显示成功弹窗 ***
                                this.info.state_error = true;
                            }
                        });
                        break;
                }
            },

            noWrite(){
                $('.noWrite').modal('show');
            },
        }
    }
</script>


<style scoped>
    input[type=checkbox],input[type = radio]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
    }
    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 10px 8px;
    }
    .panel-body:not(:last-child) {
        border-bottom: 1px solid #aaaaaa;
    }
    @media screen and (min-width: 768px) {
        .panel{
            min-height : 800px;
        }
    }
    @media screen and (max-width: 767px) {
        .panel{
            min-height : 600px;
        }
    }
    .select{
        padding: 10px 0;
    }
    .option{
        margin: 0 10px;
    }
    .dropdown-menu{
        padding: 0;
        border-radius: 0;
        text-align: center;
    }
    .dropdown-menu li:hover{
        background: #ddd;
    }
    .dropdown-menu li{
        padding: 10px 0;
        cursor: pointer;
    }
    .margin{
        margin: 10px 0;
    }
    b{
        font-size: 14px;
    }
    textarea{
        resize: none;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>
