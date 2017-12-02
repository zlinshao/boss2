<template>
    <div>
        <div class="modal fade full-width-modal-right" id="editDate" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">付款时间编辑</h4>
                    </div>
                    <div class="modal-body clearfix">
                        <div v-for="item in date" class="col-xs-12">
                            <h5 class="pull-left" v-show="isActive != item.id">
                                {{item.pay_date}}
                            </h5>
                            <h5 v-show="isActive != item.id" class="pull-left"
                                @click="reviseDate(item.id, item.pay_date)"
                                style="margin-left: 12px;cursor: pointer;color: #59ace2;">
                                编辑
                            </h5>
                            <div v-show="isActive == item.id" class="pull-left">
                                <DatePicker :dateConfigure="dateConfigure" :idName="'EditDates'+item.id"
                                            :currentDate="[payDate]" @sendDate="getDate">
                                </DatePicker>
                            </div>
                            <div v-show="isActive == item.id" class="pull-left" style="margin-left: 12px">
                                <button class="btn btn-primary btn-sm" @click="confirm">确定</button>
                                <button class="btn btn-default btn-sm" @click="close_">取消</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <!--<button data-dismiss="modal" class="btn btn-default btn-md">取消</button>-->
                        <button data-dismiss="modal" class="btn btn-primary btn-md">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <!--状态-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../../common/datePicker.vue'
    import Status from '../../common/status.vue'
    export default {
        props: ['date'],
        components: {DatePicker, Status},
        data(){
            return {
                isActive: '',
                payDate: '',
                dateConfigure: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
                currentDate: [],
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
        methods: {
            reviseDate (id, val){
                this.isActive = id;
                this.payDate = val;
            },

            getDate (val){
                this.payDate = val;
            },

            confirm (){
                this.$http.post('account/payable/scheduler/' + this.isActive, {
                    pay_date: this.payDate
                }).then((res) => {
                    if (res.data.code === '18410') {
                        this.close_();
                        this.successMsg(res.data.msg);
                        this.$emit('reviseDate');
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },

            close_ (){
                this.isActive = '';
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>


<style scoped>

</style>
