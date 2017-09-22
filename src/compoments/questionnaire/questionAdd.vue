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
                            <label class="col-sm-2 control-label">标题</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" v-model="questionList.title" placeholder="请输入标题">
                            </div>
                        </div>
                        <div class="row" v-for="key in amount">
                            <label class="col-sm-2 col-xs-12 control-label">问题{{key}}</label>
                            <div class="col-sm-8 col-xs-8">
                                <input type="text" class="form-control" :value="arr[key-1]" v-model="arr[key-1]">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle" @click="add(key-1)"></i>
                                <i class="fa fa-minus-circle" @click="reduce(key-1)"></i>
                            </div>
                            <div class="col-sm-10 col-xs-8 text-right">
                                <a @click="setOption(key-1)" v-if="selectOption.indexOf(key-1) === -1">设置选项</a>
                                <a @click="setOption(key-1)" v-if="selectOption.indexOf(key-1) > -1" style="color: #e8403f">重新设置</a>
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
    </div>
</template>

<script>
    import SetOption from './optionSet.vue'
    import Status from '../common/status.vue';
    export default {
        components : {SetOption,Status},
        data(){
            return{
                amount : 1,
                arr:[],
                order : '',
                question : {},
                questionList : {
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
            }
        },
        methods :{
            setOption(key){
                this.order = key;
                $('.optionSet').modal('show');
            },
            add(key){
                this.amount ++;
            },
            reduce(key){
                if(this.amount >1){
                    this.amount --;
                    this.arr.splice(key,1);
                }
            },
            getOption(val){
                this.selectOption.push (this.order);
                val.question = this.arr[this.order];
                this.questionList.question.splice(this.order,1,val);
            },
            confirmAdd(){
                let arr = $.extend(true,[],this.arr);
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
                this.questionList.question = [];
                this.questionList.question = arr;

                this.$http.post('index/Mission/addMission',this.questionList).then((res) => {
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
                this.arr=[];
                this.order = '';
                this.question = {};
                this.selectOption = [];
                $('.questionAdd').modal('hide');
            },
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

</style>
