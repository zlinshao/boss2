<template>
    <div>
        <!--增加/编辑排期-->
        <div class="modal fade full-width-modal-right" id="AddFunction" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content roll">
                        <!--新增客户-->
                        <div class="modal-header">
                            <button type="button" class="close" @click="close_" aria-hidden="true">×</button>
                            <h4 class="modal-title" v-if="msg.add_rev === 'add'">新增排期</h4>
                            <h4 class="modal-title" v-if="msg.add_rev === 'rev'">编辑排期</h4>
                        </div>

                        <div class="modal-body has-js">
                            <form class="form-horizontal" role="form">

                                <!--功能名称-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">功能名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="fun_name" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--结束时间-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">结束时间</label>
                                    <div class="col-lg-10">
                                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                    :idName="'hello'"
                                                    @sendDate="getDate"></DatePicker>
                                    </div>
                                </div>

                                <!--前端-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">前端</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="fore_end" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--后端-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">后端</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="after_end" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--产品-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">产品</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="produce" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--申请人-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">申请人</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="proposer" @click="select" class="form-control"
                                               placeholder="选择申请人"
                                               readonly>
                                    </div>
                                </div>

                                <!--申请部门-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">申请部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="department" class="form-control" placeholder=""
                                               readonly>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" type="button" @click="close_">取消</button>
                            <button class="btn btn-primary" v-if="msg.add_rev === 'add'" type="button"
                                    @click="function_add('code/Functional_Schedule/edit')">确定
                            </button>
                            <button class="btn btn-warning" v-if="msg.add_rev === 'rev'" type="button"
                                    @click="function_add('code/Functional_Schedule/edit')">修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import STAFF from  '../common/oraganization.vue'     //部门搜索
    import Status from '../common/status.vue';              //提示信息
    export default {
        components: {DatePicker, STAFF, Status},
        props: ['msg', 'detail'],
        data (){
            return {
                line_id: '',
                fun_name: '',                   //功能名称
                end_time: '',                   //结束时间
                fore_end: '',                   //前端
                after_end: '',                  //后端
                produce: '',                    //产品
                proposer: '',                   //申请人
                proposer_id: '',                //申请人
                department: '',                 //申请部门
                department_id: '',              //申请部门ID

                configure: {},                  //部门组件参数

                dateConfigure: [
                    {
                        range: false,            //日期组件参数
                        needHour: false
                    }
                ],
                currentDate: [],                //日期组件参数
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
        watch: {
            msg (val) {
                this.fun = val;
                if (val === 'add') {
                    this.line_id = '';
                    this.clear_content();
                }
            },
            detail (val){
                console.log(val);
                this.line_id = val.id;
                this.fun_name = val.function_name;                              //功能名称
                this.end_time = val.finish_time;                                //结束时间
                this.currentDate.push(val.finish_time);                         //结束时间
                this.fore_end = val.front;                                      //前端
                this.after_end = val.back;                                      //后端
                this.produce = val.product;                                     //产品
                this.proposer = val.applicant_id[0].name;                             //申请人
                this.proposer_id = val.applicant_id;                            //申请人ID
                this.department = val.applicant_id[0].department[0].name;       //申请部门
                this.department_id = val.applicant_id[0].department[0].id;      //申请部门ID
            }
        },
        methods: {
//            确定新增功能
            function_add (addr){
                this.$http.post(addr, {
                    id: this.line_id,
                    is_index: 2,
                    function_name: this.fun_name,               //功能名称
                    finish_time: this.end_time,                 //结束时间
                    front: this.fore_end,                       //前端
                    back: this.after_end,                       //后端
                    product: this.produce,                      //产品
                    applicant_id: this.proposer_id,             //申请人
                    department_id: this.department_id,          //申请部门
                }).then((res) => {
                    if (res.data.code === '30008' || res.data.code === '30019') {
                        this.$emit('fun_success');
                        this.close_();
                        this.info.success = res.data.msg;
                        this.info.state_error = false;
                        this.info.state_success = true;
                    } else {
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                        this.info.state_success = false;
                    }
                })
            },

//            关闭模态框
            close_ (){
                this.clear_content();
                $('#AddFunction').modal('hide');    //成功关闭模态框
            },

//            清空内容
            clear_content (){
                this.line_id = '';
                this.fun_name = '';                 //功能名称
                this.end_time = '';                 //结束时间
                this.fore_end = '';                 //前端
                this.after_end = '';                //后端
                this.produce = '';                  //产品
                this.proposer = '';                 //申请人
                this.proposer_id = '';              //申请人ID
                this.department = '';               //申请部门
                this.department_id = '';            //申请部门ID
                this.currentDate = [];              // 结束时间
            },

//            日期搜索
            getDate(data){
                this.end_time = data;
            },
//            申请人
            select(){
                $('.selectCustom:eq(1)').modal({backdrop: 'static',});
                this.configure = {length: 1, type: 'staff'};
            },

//            部门搜索
            selectDateSend(val){
//                console.log(val.staff.length)
                if (val.staff.length!=0){
                    this.proposer = val.staff[0].name;
                    this.proposer_id = val.staff[0].id;
                    this.$http.get('finance/staff_info/' + val.staff[0].id).then((res) => {
                        this.department = res.data.data.departmnet_name;
                        this.department_id = res.data.data.department_id;
                    })
                }


            },
        }
    }
</script>


<style scoped>
    .col-lg-10.iconic-input.right div {
        margin-top: 6px;
        color: #AFAFAF;
    }

    .form-group {
        margin-bottom: 0;
    }

    i.fa.fa-check-square, i.fa.fa-square-o {
        right: 28px;
        color: #000;
        font-size: 20px
    }
</style>
