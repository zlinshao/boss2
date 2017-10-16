<template>
    <div>
        <div class="modal fade full-width-modal-right questionEdit" id="questionEdit" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑任务</h4>
                    </div>
                    <div class="modal-body inbox-body panel">
                        <div class="row">
                            <label class="col-sm-3 control-label">任务类型</label>
                            <div class="col-sm-9">
                                <select  class="form-control" v-model="questionInfo.type">
                                    <!--<option value="">请选择</option>-->
                                    <option value="1">投票</option>
                                    <option value="2">问卷</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 control-label">有效时间</label>
                            <div class="col-sm-9" style="padding-top: 9px">
                                <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" :idName="'effectiveEdit'"
                                            @sendDate="getDate"></DatePicker>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 control-label">任务对象</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" placeholder="点击选择部门"
                                       v-model="department" @click='select' readonly>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-3 control-label">标题</label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control" v-model="questionInfo.title">
                            </div>
                        </div>
                        <div class="row" v-for="(item,index) in questionInfo.question">
                            <label class="col-sm-3 col-xs-12 control-label">
                                问题{{index+1}}
                                <span v-if="item.question_type == 1">(单选题)</span>
                                <span v-if="item.question_type == 2">(多选题)</span>
                            </label>
                            <div class="col-sm-7 col-xs-8">
                                <input type="text" class="form-control" v-model="questionInfo.question[index].question">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle" @click="addQuestion(index)"></i>
                                <i class="fa fa-minus-circle" @click="reduce(index)"></i>
                            </div>
                            <div class="col-sm-10 col-xs-8 text-right">
                                <!--<a v-if="item.option !== undefined && hasEdit.indexOf(index) == -1"
                                   @click="editOption(item,index)">修改选项</a>-->
                                <a @click="editOption(item,index)">修改选项</a>
                                <i @click="copy(index)" class="fa fa-copy icon-copy"></i>
                                <!--<span v-if="item.option !== undefined && hasEdit.indexOf(index) > -1"  style="color: #e8403f">
                                    已修改
                                </span>-->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <OptionEdit :optionInfo="optionInfo" @option="getOption"></OptionEdit>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    import OptionEdit from './optionEdit.vue'
    import STAFF from  '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    export default {
        components : {Status,OptionEdit,STAFF,DatePicker},
        props :['questionId','startEdit'],
        data(){
            return{
                questionInfo :{
                    id : '',
                    title : '',
                    type : '',
                    question : [],
                    effective_time : '',
                    mission_object : '',

                },
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                optionInfo : [],
                order : '',
                hasEdit :[],
                department : '',
                configure : {},
                dateConfigure: [                    //时间控件
                    {
                        range: false,
                        needHour: false
                    }
                ],
                currentDate: [],                    //时间控件
            }
        },
        watch :{
            startEdit(val){
                if(val){
                    this.getQuestionnaire();
                }
            }
        },
        methods :{
            addQuestion(index){
                let question = {
                    is_picture : '',
                    question : '',
                    question_type : '',
                    option : [],
                };
                question.is_picture = 2;
                question.question = '';
                question.question_type = 1;
                this.questionInfo.question.push(question);
            },
            reduce(index){
                if(this.questionInfo.question.length>1){
                    this.questionInfo.question.splice(index,1)
                }
            },
            getQuestionnaire(){
                this.questionInfo = {
                    effective_time : '',
                    mission_object : '',
                    id : '',
                    title : '',
                    type : '',
                    question : []
                };
                this.currentDate = [];
                this.$http.get('code/Mission/showDetail/id/' + this.questionId).then((res) => {
                    let val = res.data.data[0];
                    this.questionInfo.effective_time = val.effective_time;
                    this.questionInfo.mission_object = val.mission_object.id;
                    this.department = val.mission_object.name;
                    this.currentDate.push(val.effective_time)

                    this.questionInfo.title = val.title;
                    this.questionInfo.id = val.id;
                    this.questionInfo.type = val.type;
                    for (let i=0; i<val.question.length;i++){
                        if(val.question[i].option.length > 0){
                            let question = {
                                is_picture : '',
                                question : '',
                                question_type : '',
                                option : [],
                            };
                            question.is_picture = val.question[i].is_picture;
                            question.question = val.question[i].question;
                            question.question_type = val.question[i].question_type;
                            for(let j=0;j<val.question[i].option.length;j++){
                                if(val.question[i].option[j].content !=null){
                                    question.option.push(val.question[i].option[j].content);
                                }else {
                                    question.option.push(val.question[i].option[j].album.option_pic);
                                }
                            }
                            this.questionInfo.question.push(question);
                        }else {
                            let onlyQuestion = {};
                            onlyQuestion.question = val.question[i].question;
                            this.questionInfo.question.push(onlyQuestion);
                        }
                    }
                })
            },
            editOption(val,index){
                this.order = index;
                this.optionInfo = $.extend(true,{},val);
                $('.rem_div').remove();
                $('.optionEdit').modal('show');

            },

            getOption(value){
                this.hasEdit.push (this.order);
                this.questionInfo.question.splice(this.order,1,value);
            },
            copy(key){
                let data = {
                    is_picture:this.questionInfo.question[key].is_picture,
                    option:this.questionInfo.question[key].option,
                    question:this.questionInfo.question[key].question,
                    question_type : this.questionInfo.question[key].question_type
                }
                this.questionInfo.question.push(data);
            },
            confirmAdd(){
                for (let i=0; i<this.questionInfo.question.length;i++){
                    if(this.questionInfo.question[i].is_picture == 1){
                        for(let j=0; j<this.questionInfo.question[i].option.length;j++){
                            if(typeof(this.questionInfo.question[i].option[j]) == 'object'){
                                for(let key in this.questionInfo.question[i].option[j]){
                                    this.questionInfo.question[i].option.splice(j,1,key);
                                }
                            }
                        }
                    }
                }
                this.$http.post('code/Mission/updateMission',this.questionInfo).then((res) => {
                    if(res.data.code==='30020'){
                        this.closeModal(res.data.code);
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            closeModal(val){
                this.$emit('Edit',val);
                this.hasEdit = [];
                let question = {
                    is_picture : '',
                    question : '',
                    question_type : '',
                    option : [],
                };
                this.optionInfo = [];
                this.order = '';
                $('.questionEdit').modal('hide');
            },
            getDate(val){
                this.questionInfo.effective_time = val;
            },
            select(){
                this.configure = {type: 'department', length: 1};
                $('.selectCustom:eq(0)').modal('show');
            },
            selectDateSend(val){
                this.department = val.department[0].name;
                this.questionInfo.mission_object = val.department[0].id;
            }
        }
    }
</script>


<style scoped>
    input, select{
        margin: 9px 0;
    }
    label{
        margin-top: 18px;
    }
    .flexBox{
        margin:9px 0;
    }
    .flexBox i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        cursor: pointer;
    }
    .flexBox i+i{
        margin-left: 5px;
    }
    .flexBox i:hover{
        color: #999;
    }
    i.icon-copy{
        margin-left: 10px;
        cursor: pointer;
        color: #aaa;
    }
    i.icon-copy:hover{
        color: #0f0f0f;
    }
</style>
