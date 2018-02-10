<template>
    <div>
        <div class="modal fade" id="meetingUpload" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">上传会议记录</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="row">
                                    <label class="col-md-2 control-label">标题：</label>
                                    <div class="col-md-10">
                                        <input type="text" v-model="params.filename" placeholder="标题" class="form-control">
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom: -18px">
                                    <label class="col-md-2 control-label">文件上传：</label>
                                    <div class="col-md-10" >
                                        <Upload @photo="fileId" @delete="picDelete" @complete="complete"
                                                 :result="'file'" :idPhotos="file"></Upload>
                                        <span style="color: #e8403f;display: inline-block;margin-top: -18px">
                                            暂只支持.jpg,.jpeg,.gif,.png,.bmp,.doc,.docx,.xls,.xlsx,.pdf格式
                                     </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-md-2 control-label">可查看人员：</label>
                                    <div class="col-md-10">
                                        <input type="text" v-model="itemArray" readonly placeholder="点击选择" @click="selectItem" class="form-control">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <SelectDepartment :configure='configure' @Staff="getDepartment"></SelectDepartment>
    </div>
</template>

<script>
    import SelectDepartment from '../common/oraganization.vue'
    import Upload from '../common/upload.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'
    export default{
        components : {Status,SelectDepartment,DatePicker,Upload},
        props:['selectId','isUp'],
        data(){
            return{
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
                configure:[],
                params:{
                    id : '',
                    filename:'',
                    conference_file:[],
                    visible_range:{
                        department:[],
                        staff:[],
                    },
                },
                itemArray:[],
                file : {
                    cus_idPhotos : {},    //委托书图片ID
                    cus_idPhoto : [],     //围殴托书照片
                },
                isOk:'ok',
            }
        },
        mounted(){

        },
        watch:{
            isUp(val){
                if(val){
                    this.conferenceRecord();
                    this.params.id = this.selectId;
                }
            }
        },
        methods:{
            conferenceRecord(){
                this.$http.get('oa/conference/conferenceRecordRead/id/' + this.selectId).then((res) => {
                    if(res.data.code === '50060'){
                        let record = res.data.data;
                        this.params.conference_file = record.conference_file;
                        this.params.filename = record.filename;
                        this.file.cus_idPhotos = record.conference_file;
                        for (let i in record.conference_file) {
                            this.file.cus_idPhoto.push(i);
                        }

                        if(record.visible_range.staff.length>0){
                            record.visible_range.staff.forEach((item) =>{
                                this.itemArray.push(item.staff_name);
                                this.params.visible_range.staff.push(item.type_id);
                            })
                        }
                        if(record.visible_range.department.length>0){
                            record.visible_range.department.forEach((item) =>{
                                this.itemArray.push(item.name);
                                this.params.visible_range.department.push(item.type_id);
                            })
                        }
                    }else {

                    }
                })
            },
            selectItem(){
                this.configure = {type:'',length: ''};
                $('.selectCustom').modal('show');
            },
            getDepartment(val){
                console.log(val)
                this.params.visible_range = {
                    department:[],
                    staff:[],
                };
                this.itemArray = [];
                if(val.staff.length>0){
                    val.staff.forEach((item) =>{
                        this.itemArray.push(item.name);
                        this.params.visible_range.staff.push(item.id);
                    })
                }
                if(val.department.length>0){
                    val.department.forEach((item) =>{
                        this.itemArray.push(item.name);
                        this.params.visible_range.department.push(item.id);
                    })
                }
            },
            fileId(val){
                this.params.conference_file =val;
            },
            complete(val){
                this.isOk = val;
            },
            picDelete(val){
                let conference = this.params.conference_file.indexOf(val);
                if (conference > -1) {
                    this.params.conference_file.splice(bank, 1);
                }
            },
            confirmAdd(){
                this.$http.post('oa/conference/conferencerecordsave',this.params).then((res) => {
                    if(res.data.code === '50050'){
                        this.closeModal();
                        this.$emit('success');
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
                $('#meetingUpload').modal('hide');
                this.$emit('close');
                this.params = {
                    id : '',
                    filename:'',
                    conference_file:[],
                    visible_range:[],
                };
                this.itemArray = [];
                this.params.visible_range = {
                    department:[],
                    staff:[],
                };
                this.file = {
                    cus_idPhotos : {},    //委托书图片ID
                    cus_idPhoto : [],     //围殴托书照片
                };
            },
        }
    }
</script>

<style scoped>
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
    .col-md-2{
        padding-left: 0;
        padding-right: 0;
    }
    .star{
        color: #e8403f;
    }
    input[type='checkbox']{
        width: 17px;
        height: 17px;
    }

    .col-md-10 .dropzone > div{
        margin-bottom: 0;
    }
</style>
