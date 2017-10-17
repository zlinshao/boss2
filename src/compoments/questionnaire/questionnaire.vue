<template>
    <div>
        <div class="modal fade questionnaire bs-example-modal-lg" id="questionnaire" data-backdrop="static">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">问卷调查</h4>
                    </div>
                    <div class="modal-body inbox-body panel roll">
                        <div class="panel-body">
                            <h4 class="text-center">{{questionInfo.title}}</h4>
                            <hr>
                            <h5 class="text-center">{{questionInfo.update_time}}</h5>
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
                                    <textarea class="form-control" rows="5" @blur="questionContent($event,item.id,index)"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="close">关闭</button>
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
                this.$http.get('code/Mission/dict').then((res) => {
                    this.dictionary = res.data;
                    this.getQuestionInfo();
                })
            },
            getQuestionInfo(){
                if(this.questionId !== ''){
                    this.$http.get('code/Mission/showDetail/id/' + this.questionId).then((res) => {
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
            questionContent(e,id,index){
                let content = e.target.value;
                for(let i=0; i<this.params.question.length;i++){
                    if(this.params.question[i].id == id){
                        this.params.question[i].content = content;
                    }
                }
            },
            vote(){
                this.$http.post('code/Mission/Vote',this.params).then((res) => {
                    if(res.data.code === '30025'){
                        this.$emit('success',res.data.msg)
                        this.close();
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            close(){
                this.params.radio_id = [];
                this.params.checkbox_id = [];
                this.params.question = [];
                $('#questionnaire textarea').val('');
                $('#questionnaire input[type=radio]').prop('checked',false);
                $('#questionnaire input[type=checkbox]').prop('checked',false);
                $('.questionnaire').modal('hide');
                console.log(this.params)
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
        max-height: 700px;
        overflow: auto;
    }
</style>

