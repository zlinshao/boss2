<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/question">问卷调查</router-link>
            </li>
            <li class="active">详情</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <span>{{questionInfo.title}}</span>&nbsp;
                        <div class="btn-group pull-right">
                            <a data-toggle="dropdown" aria-expanded="false">
                                <i class="glyphicon glyphicon-cog"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><span>编辑</span></li>
                                <li><span>发布</span></li>
                                <li><span>下架</span></li>
                                <li><span>删除</span></li>
                                <li><span>查看结果</span></li>
                            </ul>
                        </div>
                    </h4>
                </header>
                <div style="text-align: center">
                    <b v-if="questionInfo.public_id !==undefined">
                        {{questionInfo.create_time}}&nbsp;&nbsp;&nbsp;{{dictionary.staff_id[questionInfo.public_id]}}
                    </b>
                </div>
                <div class="row select" v-for="(item,index) in questionInfo.question">
                    <div class="col-xs-12">
                        <b>{{index+1}}&nbsp;{{item.question}}</b>
                    </div>
                    <div class="col-sm-12 margin" v-if="item.option.length > 0">
                        <label class="option" v-for="(value,key) in item.option" v-if="item.question_type === 1">
                            <input type="radio" :name="item.id">{{value.content}}
                        </label>
                        <label class="option" v-for="(value,key) in item.option" v-if="item.question_type === 2">
                            <input type="checkbox">{{value.content}}
                        </label>
                    </div>
                    <div class="col-sm-6 margin" v-if="item.option.length === 0">
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
    </div>
</template>

<script>
    import Confirm from '../common/confirm.vue'
    export default {
        components : {Confirm},
        data(){
            return{
                questionId : '',    //问卷 id
                dictionary : [],    //字典
                questionInfo : [],  //问卷信息
                confirmMsg :[],     //确认信息
            }
        },
        created(){
            this.questionId = this.$route.query.questionId;
            this.getDictionary();
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
            getConfirm(){},
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
</style>
