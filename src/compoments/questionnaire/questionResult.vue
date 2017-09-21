<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/question">问卷调查</router-link>
            </li>
            <li class="active">查看结果</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div class="row select" v-for="(item,index) in questionInfo.question">
                    <div class="col-xs-12">
                        <b v-if="item.question_type === 0">{{index+1}}&nbsp;{{item.question}}(问卷)</b>
                        <b v-if="item.question_type === 1">{{index+1}}&nbsp;{{item.question}}(单选)</b>
                        <b v-if="item.question_type === 2">{{index+1}}&nbsp;{{item.question}}(多选)</b>
                    </div>
                    <div>

                        <div v-if="item.option.length < 1">
                            <label class="option col-xs-12" v-for="(value,key) in item.answer">
                                <span v-if="key<4" style="margin-right: 10px">{{key+1}})</span>
                                <span v-if="key<4">{{value.answer}}</span>
                                <a v-if="key==4" @click="showMore(item.answer)">更多 &gt;&gt;</a>
                            </label>
                            <label class="option col-xs-12" v-if="item.answer.length == 0">
                                <span style="color: #1caadc">暂无数据</span>
                            </label>
                        </div>

                        <div v-if="item.option.length > 0">
                            <label class="option col-xs-12" v-for="(value,key) in item.option" v-if="item.question_type === 1">
                                <span style="margin-right: 10px">{{key+1}})</span>
                                <span v-if="value.content !== null">{{value.content}}</span>
                                <span v-if="value.content === null">
                                    <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                                </span>
                                <a data-v-2f43a2b3="" href="#">
                                    <div class="progress1 progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: value.proportion}">
                                        </div>
                                    </div>
                                    <span class="percent">{{value.vote_nums}}票</span>
                                    <span class="percent" v-if="value.proportion">({{value.proportion}})</span>
                                </a>
                            </label>
                            <label class="option col-xs-12" v-for="(value,key) in item.option" v-if="item.question_type === 2">
                                <span style="margin-right: 10px">{{key+1}})</span>
                                <span v-if="value.content !== null">{{value.content}}</span>
                                <span v-if="value.content === null">
                                    <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                                </span>
                                <a data-v-2f43a2b3="" href="#">
                                    <div class="progress1 progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: value.proportion}">
                                        </div>
                                    </div>
                                    <span class="percent">{{value.vote_nums}}票</span>
                                    <span class="percent" v-if="value.proportion>0">({{value.proportion}})</span>
                                </a>
                            </label>
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
    .percent{
        margin-left: 5px;
    }
    .option{
        margin: 5px;
    }
    .noWrite{
        margin: 0 15px;
        font-size: 16px;
    }
</style>