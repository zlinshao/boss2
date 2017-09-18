<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/question">问卷调查</router-link>
            </li>
            <li>
                <router-link to="/questionnaire">详情</router-link>
            </li>
            <li class="active">查看结果</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div class="row select" v-for="(item,index) in questionInfo.question">
                    <div class="col-xs-12">
                        <b v-if="item.question_type === 0">{{index+1}}&nbsp;{{item.question}}</b>
                        <b v-if="item.question_type === 1">{{index+1}}&nbsp;{{item.question}}(单选)</b>
                        <b v-if="item.question_type === 2">{{index+1}}&nbsp;{{item.question}}(多选)</b>
                    </div>
                    <div>
                        <label class="option col-xs-12" v-for="(value,key) in item.answer" v-if="item.question_type === 0">
                            <span style="margin-right: 10px">{{key+1}})</span>
                            <span v-if="key<2">{{value.answer}}</span>
                            <a v-if="key>1" style="margin-left: 10px" @click="showMore(item.answer)">更多 &gt;&gt;</a>
                        </label>
                        <label class="option col-xs-12" v-for="(value,key) in item.option" v-if="item.question_type === 1">
                            <span style="margin-right: 10px">{{key+1}})</span>
                            <span>{{value.content}}</span>
                            <a data-v-2f43a2b3="" href="#">
                                <div class="progress1 progress progress-striped active">
                                    <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="45" role="progressbar" class="progress-bar"
                                         :style="{ width: 50 + '%'}">
                                    </div>
                                </div>
                                <span>50%</span>
                            </a>
                        </label>
                        <label class="option col-xs-12" v-for="(value,key) in item.option" v-if="item.question_type === 2">
                            <span style="margin-right: 10px">{{key+1}})</span>
                            <span>{{value.content}}</span>
                            <a data-v-2f43a2b3="" href="#">
                                <div class="progress1 progress progress-striped active">
                                    <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                         aria-valuenow="45" role="progressbar" class="progress-bar"
                                         :style="{ width: 50 + '%'}">
                                    </div>
                                </div>
                                <span>50%</span>
                            </a>
                        </label>
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
</style>