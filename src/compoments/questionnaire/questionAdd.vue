<template>
    <div>
        <div class="modal fade questionAdd" id="questionAdd" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closeModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">创建任务</h4>
                    </div>
                    <div class="modal-body inbox-body panel">
                        <div class="row">
                            <label class="col-sm-2 control-label">任务类型</label>
                            <div class="col-sm-10">
                                <select  class="form-control" v-model="questionList.type">
                                    <!--<option value="">请选择</option>-->
                                    <option value="1">投票</option>
                                    <option value="2">问卷</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">有效时间</label>
                            <div class="col-sm-10">
                                <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" :idName="'effective'"
                                            @sendDate="getDate"></DatePicker>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">任务对象</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="点击选择部门"
                                       v-model="department" @click='select' readonly>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">标题</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="questionList.title" placeholder="请输入标题">
                            </div>
                        </div>
                        <div class="row" v-for="key in amount">
                            <label class="col-sm-2 col-xs-12 control-label">问题{{key}}</label>
                            <div class="col-sm-8 col-xs-8">
                                <input type="text" class="form-control" v-model="arr[key-1].question">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle" @click="add(key-1)"></i>
                                <i class="fa fa-minus-circle" @click="reduce(key-1)"></i>
                            </div>
                            <div class="col-sm-10 col-xs-8 text-right">
                                <a @click="setOption(key-1)" v-if="selectOption.indexOf(key-1) === -1">设置选项</a>
                                <a @click="setOption(key-1)" v-if="selectOption.indexOf(key-1) > -1" style="color: #e8403f">重新设置</a>
                                <i @click="copy(key-1)" class="fa fa-copy icon-copy"></i>
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
        <SetOption @option="getOption"></SetOption>
        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>

<script>
    import SetOption from './optionSet.vue'
    import Status from '../common/status.vue';
    import STAFF from  '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    export default {
        components : {SetOption,Status,STAFF,DatePicker},
        data(){
            return{
                amount : 1,
                arr:[{
                    is_picture:'',
                    option:[],
                    question:'',
                    question_type : ''
                }],
                order : '',
                question : {},
                questionList : {
                    effective_time : '',
                    mission_object : '',
                    title : '',
                    type : '1',
                    question : []
                },
                selectOption : [],
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
        methods :{
            setOption(key){
                this.order = key;
                $('.optionSet').modal('show');
            },
            add(key){
                if(this.arr.length == this.amount){
                    this.amount ++;
//                    this.arr.push('');
                    this.arr.push({
                        is_picture:'',
                        option:[],
                        question:'',
                        question_type : ''
                    })
                }else {
                    this.info.error = '请先编辑已有问题';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                }
            },
            reduce(key){
                if(this.amount >1){
                    this.amount --;
                    this.arr.splice(key,1);
                }
            },
            getOption(val){
                console.log(val)
                this.selectOption.push (this.order);
                this.arr[this.order].is_picture = val.is_picture;
                this.arr[this.order].option = val.option;
                this.arr[this.order].question_type = val.question_type;
                /*val.question = this.arr[this.order];
                this.questionList.question.splice(this.order,1,val);*/
            },
            confirmAdd(){
                /*let arr = $.extend(true,[],this.arr);
                let question = [];
                for(let i=0;i<this.questionList.question.length;i++){
                    question.push(this.questionList.question[i].question);
                }
                for(let i=0; i < arr.length;i++){
                    for(let j=0;j<question.length;j++){
                        if(arr[i] === question[j]){
                            arr.splice(i,1,this.questionList.question[j])
                        }
                    }
                }
                for(let i=0;i<arr.length;i++){
                    if(arr[i].question === undefined){
                        let c = {question : arr[i]}
                        arr.splice(i,1,c)
                    }
                }
                this.questionList.question = [];*/
                this.questionList.question = this.arr;
                console.log(this.questionList.question)

                this.$http.post('code/Mission/addMission',this.questionList).then((res) => {
                    if(res.data.code==='30020'){
                        this.$emit('Add');
                       this.closeModal();
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
            closeModal(){
                this.questionList = {
                    title : '',
                    type : '1',
                    question : []
                };
                this.amount = '1';
                this.arr=[{
                    is_picture:'',
                    option:[],
                    question:'',
                    question_type : ''
                }];
                this.order = '';
                this.question = {};
                this.selectOption = [];
                $('.questionAdd').modal('hide');
            },

            copy(key){
//                console.log(key)
//                console.log(this.arr[key])
                this.amount ++;
//                console.log(this.questionList.question[key])
                let data = {
                    is_picture:this.arr[key].is_picture,
                    option:this.arr[key].option,
                    question:this.arr[key].question,
                    question_type : this.arr[key].question_type
                }
                /*this.arr[this.order].is_picture = val.is_picture;
                this.arr[this.order].option = val.option;
                this.arr[this.order].question_type = val.question_type;*/
                this.arr.push(data);
//                this.questionList.question.push(this.questionList.question[key]);
//                this.arr.splice(key+1,0,this.questionList.question[key].question);
//                console.log(this.arr)
            },

            getDate(val){
                this.questionList.effective_time = val;
            },
            select(){
                this.configure = {type: 'department', length: 1};
                $('.selectCustom:eq(1)').modal('show');
            },
            selectDateSend(val){
                this.department = val.department[0].name;
                this.questionList.mission_object = val.department[0].id;
            }
        }
    }
</script>
<style scoped>
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

    input, select{
        margin: 9px 0;
    }
    label{
        margin-top: 18px;
    }
    @media (max-width: 767px) {
        .modal{
            width: 100%;
        }
    }
    a{
        color :#1caadc;
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
