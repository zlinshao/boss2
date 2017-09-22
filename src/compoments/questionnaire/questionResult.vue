<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/question">问卷调查</router-link>
            </li>
            <li v-if="type == 'detail'">
                <router-link :to="{path:'/questionnaire',query:{questionId : questionnaireId}}">
                    详情
                </router-link>
            </li>
            <li class="active">查看结果</li>

            <li class="pull-right"  v-if="type != 'detail'">
                <router-link to="/question">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
            <li class="pull-right"  v-if="type == 'detail'">
                <router-link :to="{path:'/questionnaire',query:{questionId : questionnaireId}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步
                </router-link>
            </li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <h4 class="text-center">{{questionInfo.title}}</h4>
                <hr>
                <h5 class="text-center" v-if="questionInfo.update_time == undefined">{{questionInfo.create_time}}</h5>
                <h5 class="text-center" v-if="questionInfo.update_time != undefined">{{questionInfo.update_time}}</h5>
                <div class="row select" v-for="(item,index) in questionInfo.question">
                    <div class="col-xs-12 question">
                        <b v-if="item.question_type === 0">{{index+1}}&nbsp;{{item.question}}(问卷)</b>
                        <b v-if="item.question_type === 1">{{index+1}}&nbsp;{{item.question}}(单选)</b>
                        <b v-if="item.question_type === 2">{{index+1}}&nbsp;{{item.question}}(多选)</b>
                    </div>
                    <div>

                        <div v-if="item.option.length < 1">
                            <label class="option col-xs-12" v-for="(value,key) in item.answer">
                                <span style="margin-left: 15px" v-if="key<4">{{key+1}})</span>
                                <span class="question" v-if="key<4">{{value.answer}}</span>
                                <a style="margin-left: 15px" v-if="key==4" @click="showMore(item.answer)">更多 &gt;&gt;</a>
                            </label>
                            <label class="option col-xs-12" v-if="item.answer.length == 0">
                                <span class="noData">暂无数据</span>
                            </label>
                        </div>

                        <div v-if="item.option.length > 0">
                            <div class="option col-xs-12" v-for="(value,key) in item.option" v-if="item.question_type === 1">
                                <div class="col-sm-3">
                                    <span>{{key+1}})</span>
                                    <span class="question" v-if="value.content !== null">{{value.content}}</span>
                                    <span class="question" v-if="value.content === null">
                                        <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                                    </span>
                                </div>
                                <div class="col-sm-9">
                                    <span data-v-2f43a2b3="">
                                        <div class="progress1 progress progress-striped active">
                                            <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                                 aria-valuenow="45" role="progressbar" class="progress-bar"
                                                 :style="{ width: value.proportion}">
                                            </div>
                                        </div>
                                        <span class="percent">{{value.vote_nums}}票</span>
                                        <span class="percent" v-if="value.proportion">({{value.proportion}})</span>
                                    </span>
                                </div>
                            </div>
                            <div class="option col-xs-12" v-for="(value,key) in item.option" v-if="item.question_type === 2">
                                <div class="col-sm-3">
                                    <span>{{key+1}})</span>
                                    <span class="question" v-if="value.content !== null">{{value.content}}</span>
                                    <span class="question" v-if="value.content === null">
                                        <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                                    </span>
                                </div>
                                <div class="col-sm-9">
                                    <span data-v-2f43a2b3="">
                                    <div class="progress1 progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: value.proportion}">
                                        </div>
                                    </div>
                                    <span class="percent">{{value.vote_nums}}票</span>
                                    <span class="percent" v-if="value.proportion">({{value.proportion}})</span>
                                </span>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
        <ResultMore :moreResult="moreResult"></ResultMore>
    </div>
</template>

<script>
    import ResultMore from './resultMore.vue'
    export default{
        components : {ResultMore},
        data(){
            return {
                questionnaireId :'',
                questionInfo : [],
                moreResult : [],
            }
        },
        created(){
            this.questionnaireId = this.$route.query.questionId;
            this.type = this.$route.query.type;
            this.searchResult();
        },
        methods : {
            searchResult(){
                    this.$http.get('index/Mission/showResult/id/' + this.questionnaireId).then((res)=>{
                    this.questionInfo = res.data.data[0];
                    console.log(this.questionInfo)
                })
            },
            showMore(val){
                this.moreResult = val;
                $('.resultMore').modal('show');

            }
        },
    }
</script>
<style scoped>
    input[type=checkbox],input[type = radio]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
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
        padding: 10px;
    }

    .progress {
        display: inline-block;
        height: 10px;
        margin-bottom: 0;
        margin-left: 10px;
        width: 18%;
    }
    .option{
        margin: 5px;
    }
    .noWrite{
        margin: 0 15px;
        font-size: 16px;
    }
    .question{
        margin-left: 10px;
    }
    .noData{
        color: #1caadc;
        margin-left: 10px;
    }
    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>