<template>
    <div>
        <div class="modal fade optionEdit" id="optionEdit" data-backdrop="static">
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
                        <div class="row" v-for="(item,index) in optionList.option" v-if="optionList.is_picture == 2">
                            <label class="col-sm-2 col-xs-12 control-label">选项{{index+1}}</label>
                            <div class="col-sm-8 col-xs-8">
                                <input type="text" class="form-control" v-model="optionList.option[index]">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle" @click="addOption(index)"></i>
                                <i class="fa fa-minus-circle" @click="reduce(index)"></i>
                            </div>
                        </div>
                        <div class="row" v-if="optionList.is_picture == 2 && optionList.option.length < 1">
                            <label class="col-sm-2 col-xs-12 control-label">选项1</label>
                            <div class="col-sm-8 col-xs-8">
                                <input type="text" class="form-control" v-model="optionList.option[0]">
                            </div>
                            <div class="col-sm-2 col-xs-4 flexBox">
                                <i class="fa fa-plus-circle" @click="addOption(0)"></i>
                                <i class="fa fa-minus-circle" @click="reduce(0)"></i>
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
    </div>
</template>

<script>
    import upLoad from '../common/upload.vue'
    export default {
        props : ['optionInfo'],
        components : {upLoad},
        data(){
            return{
                optionList :{
                    question :'',
                    question_type : '',
                    is_picture : '',
                    option : [],
                },
                Pic : {
                    cus_idPhotos : {},
                    cus_idPhoto : [],
                },
                complete_ok : 'ok',
            }
        },
        watch :{
            optionInfo(val){
                console.log(val)
                this.Pic = {
                    cus_idPhotos : {},
                    cus_idPhoto : [],
                };
                this.optionList ={
                    question :'',
                    question_type : '',
                    is_picture : '',
                    option : [],
                };
                this.optionList.question_type = val.question_type;
                this.optionList.question = val.question;
                this.optionList.is_picture =val.is_picture;
                if(val.is_picture == 1){
                    for (let i in val.option) {
                        console.log(val.option[i])
                        for(let key in val.option[i]){
                            this.optionList.option.push(key);
                            this.Pic.cus_idPhoto.push(key);
                            this.Pic.cus_idPhotos[key] = this.optionInfo.option[i][key]
                        }
                    }
                }else {
                    this.optionList.option = val.option;
                }
            }
        },
        methods :{
            addOption(index){
                this.optionList.option.push('');
            },
            reduce(index){
                if(this.optionList.option.length > 1){
                    this.optionList.option.splice(index,1);
                }
            },
            confirmAdd(){
                this.$emit('option',this.optionList);
                this.optionList ={
                    question :'',
                    question_type : '',
                    is_picture : '',
                    option : [],
                };
                this.Pic = {
                    cus_idPhotos : {},
                    cus_idPhoto : [],
                };
                $('.optionEdit').modal('hide');
            },
            PicId(val){      //获取成功上传身份证 id 数组
                this.optionList.option=val;
            },
            //图片上传完成
            complete(val){          //监控上传进度
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let picture = this.optionList.option.indexOf(val);
                if (picture > -1) {
                    this.optionList.option.splice(picture, 1);
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
