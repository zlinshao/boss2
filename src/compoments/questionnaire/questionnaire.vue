<template>
    <div>
        <div class="modal fade questionnaire bs-example-modal-lg" id="questionnaire" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">问卷调查</h4>
                    </div>
                    <div class="modal-body inbox-body panel roll">
                        <div class="panel-body">
                            <h4 class="text-center">{{questionInfo.title}}</h4>
                            <hr>
                            <h5 class="text-center">{{questionInfo.create_time}}</h5>
                            <div class="row select" v-for="(item,index) in questionInfo.question">
                                <div class="col-xs-12">
                                    <b>{{index+1}}&nbsp;{{item.question}}</b>
                                </div>
                                <div class="col-sm-12 margin" v-if="item.option.length > 0">
                                    <label class="option" v-for="(value,key) in item.option" v-if="item.question_type === 1">
                                        <input type="radio" :name="item.id" :value="value.id"
                                               @click="singleSelect(item.id,value.id,$event)">
                                        <span v-if="value.content !== null">{{value.content}}</span>
                                        <span v-if="value.content === null">
                                            <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                                         </span>
                                    </label>
                                    <label class="option" v-for="(value,key) in item.option" v-if="item.question_type === 2">
                                        <input type="checkbox" :value ="value.id" v-model="params.checkbox_id">
                                        <span v-if="value.content !== null">{{value.content}}</span>
                                        <span v-if="value.content === null">
                                            <img :src="img.small" v-for="(img,index) in value.album.option_pic">
                                        </span>
                                    </label>
                                </div>
                                <div class="col-sm-6 margin" v-if="item.option.length === 0">
                                    <textarea class="form-control" rows="5" @blur="questionContent(item.id,index)"
                                              v-model="content[index]"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="vote">确定</button>
                    </div>
                </div>
            </div>
            <Status :state='info'></Status>
        </div>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default {
        components : {Status},
        props : ['questionId'],
        data(){
            return{
                dictionary : [],
                questionInfo : [],
                pid : [],
                params : {
                    id : '',
                    radio_id : [],
                    checkbox_id : [],
                    question : [],
                },
                content: [],
                confirmMsg :[],
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
        watch :{
            questionId(val){
                this.params.id = val;
                this.getDictionary();
            }
        },
        methods : {
            getDictionary(){
                this.$http.get('index/Mission/dict').then((res) => {
                    this.dictionary = res.data;
                    this.getQuestionInfo();
                })
            },
            getQuestionInfo(){
                if(this.questionId !== ''){
                    this.$http.get('index/Mission/showDetail/id/' + this.questionId).then((res) => {
                        this.questionInfo = res.data.data[0];
                        this.getQuestionId(this.questionInfo);
                    })
                }
            },
            singleSelect(pid,id,e){
                if(this.pid.indexOf(pid) === -1){
                    this.pid.push(pid);
                    this.params.radio_id.push(id);
                }else {
                    for(let i=0;i<this.pid.length;i++){
                        if(this.pid[i] === pid){
                            this.params.radio_id.splice(i,1,id);
                        }
                    }
                }
            },

            getQuestionId(val){
                for(let i=0;i<val.question.length;i++){
                    if(val.question[i].question_type == 0){
                        let question = {};
                        question.id =val.question[i].id;
                        question.content = '';
                        this.params.question.push(question);
                    }
                }
            },
            questionContent(id,index){
//                let question = {};
//                let idExist = false;
//                question.id =id;

                let content = this.content[index];
                for(let i=0; i<this.params.question.length;i++){
                    if(this.params.question[i].id == id){
                        this.params.question[i].content = content;
                    }
                }
//                if(!idExist){
//                    this.params.question.push(question);
//                }
            },
            vote(){
                this.$http.post('index/Mission/Vote',this.params).then((res) => {
                    if(res.data.code === '30025'){
                        $('.questionnaire').modal('hide');
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
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
    .select{
        padding: 10px 0;
    }
    .option{
        margin: 0 10px;
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
    .inbox-body{
        max-height: 500px;
    }
</style>

