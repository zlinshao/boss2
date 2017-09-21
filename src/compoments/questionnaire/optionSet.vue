<template>
    <div>
        <div class="modal fade optionSet" id="optionSet" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">设置选项</h4>
                    </div>
                    <div class="modal-body inbox-body panel">
                        <div class="row">
                            <label class="col-sm-2 control-label">任务类型</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model="optionList.question_type">
                                    <option value="1">单选</option>
                                    <option value="2">多选</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <label class="col-sm-2 control-label">选项类型</label>
                            <div class="col-sm-10">
                                <select class="form-control" v-model="optionList.is_picture">
                                    <option value="1">图片</option>
                                    <option value="2">文本</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" v-for="key in amount" v-if="optionList.is_picture == 2">
                            <label class="col-sm-2 col-xs-12 control-label">选项{{key}}</label>
                            <div class="col-sm-8 col-xs-8">
                                <input type="text" class="form-control" :value="optionList.option[key-1]" v-model="optionList.option[key-1]">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle" @click="add(key-1)"></i>
                                <i class="fa fa-minus-circle" @click="reduce(key-1)"></i>
                            </div>
                        </div>
                        <div class="row" v-if="optionList.is_picture == 1">
                            <label class="col-sm-2 control-label">上传图片</label>
                            <div class="col-sm-10">
                                <div style="margin: 9px 0">
                                    <up-load @photo="PicId" @delete="picDelete" @complete="complete"
                                             :result="'Pic'" :idPhotos="Pic"></up-load>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue';
    export default {
        components : {upLoad,Status},
        data(){
            return{
                amount : 1,
                optionList :{
                    question_type : '1',
                    is_picture : '2',
                    option : [],
                },
                Pic : {
                    cus_idPhotos : {},    //银行卡照片id
                    cus_idPhoto : [],     //银行卡照片
                },
                complete_ok : 'ok',
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
            }
        },
        methods :{
//            setOption(){
//
//            },
            add(key){
                this.amount ++;
            },
            reduce(key){
                if(this.amount >1){
                    this.amount --;
                    this.optionList.option.splice(key,1);
                }
            },
            confirmAdd(){
                if(this.complete_ok === 'ok'){
                    this.$emit('option',this.optionList);
                    $('.optionSet').modal('hide');
                    this.optionList ={
                        question_type : '1',
                        is_picture : '2',
                        option : [],
                    };
                    this.amount = 1;
                }else {
                    this.info.error = '图片正在上传';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                }

            },
            PicId(val){      //获取成功上传身份证 id 数组
                this.optionList.option = val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let id = this.optionList.option.indexOf(val);
                if (id > -1) {
                    this.optionList.option.splice(id, 1);
                }
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
    .modal{
        z-index: 1051;
    }
</style>
