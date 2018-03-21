<template>
    <div>
        <div class="modal fade " id="callRemark" tabindex="-1" role="dialog" aria-labelledby="callRemark"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="close_">×</button>
                        <h4 class="modal-title">{{remark.address_remark}}</h4>
                    </div>

                    <div class="modal-body roll" style="max-height: 500px;overflow: auto;">
                        <div class="row has-js">
                            <div class="col-lg-12">
                                <section class="panel table table-responsive roll" style="margin-bottom: 0;">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th class="text-center width100">备注时间</th>
                                            <th class="text-center width50">类型</th>
                                            <th class="text-center">备注内容</th>
                                            <th class="text-center width80">备注人</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td colspan="4" v-if="remarks_status == 1">
                                                <div class="form-group">
                                                    <label class="col-sm-2 control-label" style="padding-top: 8px;">催缴类型<sup class="required">*</sup></label>
                                                    <div class="col-sm-10">
                                                        <select class="form-control" v-model="status">
                                                            <option value="">全部</option>
                                                            <option :value="index"
                                                                    v-for="(key,index) in dict.tag_category">{{key}}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <div class="col-lg-12">
                                                        <textarea class="form-control" v-model="addRemark" placeholder="请填写备注"></textarea>
                                                    </div>
                                                    <div class="col-lg-12" style="margin-top: 10px;">
                                                        <button class="btn btn-primary btn-sm pull-right"
                                                                style="margin-left: 8px;"
                                                                v-if="remarks_status == 1" @click="addRem">确定
                                                        </button>
                                                        <button class="btn btn-default btn-sm pull-right"
                                                                @click="remark_hide"
                                                                v-if="remarks_status == 1">取消
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr class="text-center" v-for="item in remark.look_remark">
                                            <td>{{item.create_time}}</td>
                                            <td>{{dict.tag_category[item.category]}}</td>
                                            <td>{{item.content}}</td>
                                            <td>{{item.staff_name}}</td>
                                        </tr>
                                        <tr v-show="remark.look_remark.length == 0" class="text-center">
                                            <td colspan="4" style="font-size: 16px;">暂无备注...</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary btn-sm pull-left" @click="remark_show"
                                v-if="remarks_status == 2">新增备注
                        </button>
                        <button data-dismiss="modal" class="btn btn-primary" type="button" @click="close_">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state="info"></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue';

    export default {
        name: "add-remark",
        props: ['remark','dict'],
        components: {Status},
        data() {
            return {
                status: '',
                address_remark: '',
                remarks_status: 2,
                addRemark: '',
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
        mounted() {
        },
        watch: {},
        methods: {
//            新增备注
            remark_show() {
                this.remarks_status = 1;
                this.addRemark = '';
                this.status = '';
            },
//            取消备注
            remark_hide() {
                this.remarks_status = 2;
            },
            // 关闭
            close_(){
                this.remark_hide();
                this.addRemark = '';
            },
//            新增备注
            addRem() {
                if (this.addRemark !== '') {
                    this.$http.post(this.remark.urls + this.remark.remark_id, {
                        content: this.addRemark,
                        category: this.status,
                    }).then((res) => {
                        if (res.data.code === '18510'||res.data.code === '18410') {
                            this.remark.look_remark.unshift(res.data.data);
                            this.remark_hide();
                            this.successMsg(res.data.msg);
                            this.$emit('add');
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    })
                } else {
                    this.errorMsg('备注内容不能为空');
                }
            },
            successMsg(msg) {    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg) {      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        },
    }
</script>

<style scoped>

</style>