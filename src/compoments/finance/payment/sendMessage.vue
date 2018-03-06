<template>
    <div>
        <div class="modal fade " id="sendMessage" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">{{statusInfo}}</h4>
                    </div>

                    <div class="modal-body">
                        <div v-if="messageStatus == ''" class="clearfix">
                            <div class="col-xs-4 text-center"><a @click="sendMessage(6)">催缴短信</a></div>
                            <div class="col-xs-4 text-center"><a @click="sendMessage(7)">到期短信</a></div>
                            <div class="col-xs-4 text-center"><a @click="sendMessage(8)" class="text-danger">逾期短信</a>
                            </div>
                        </div>
                        <!--催缴短信-->
                        <div v-if="messageStatus == 6">
                            <span class="vertical">
                                【乐伽公寓】尊敬的@先生/女士：您租住的@小区，下一期房租需要缴纳，请@前及时缴纳，打款账户为收据上方的汇款账号。请您合理安排好缴款时间，及时缴款！如已缴纳，请忽略此条短信！乐伽客户服务热线4008926606。
二、到期短信
【乐伽公寓】尊敬的***先生/女士：您租住的****小区，房租于***日到期，如续签/退租，请致电乐伽客户服务热线400-892-6606，谢谢。
                            </span>
                        </div>
                        <!--到期短信-->
                        <div v-if="messageStatus == 7">
                            <span class="vertical">
                                【乐伽公寓】尊敬的***先生/女士：您租住的****小区，房租于***日到期，如续签/退租，请致电乐伽客户服务热线400-892-6606，或添加公众号“乐伽公寓”，谢谢。
                            </span>
                        </div>
                        <!--逾期短信-->
                        <div v-if="messageStatus == 8">
                            <span class="vertical">【乐伽公寓】尊敬的***先生/女士：您租住的****小区，需要在XXX前缴纳下一期房租，您已经逾期XX天，请今天及时缴纳，如不缴纳，我们将按照合同处理，收回房屋！请您合理安排好缴款时间，及时缴款！如已缴纳，请忽略此条短信，感谢您的配合！如需咨询（如有疑问），请致电乐伽客户服务热线400-892-6606，谢谢。</span>
                            <!--<div style="display: inline-block;">-->
                            <!--<DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"-->
                            <!--:idName="'message'" @sendDate="getDate"></DatePicker>-->
                            <!--</div>-->
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button class="btn btn-primary btn-sm pull-left" @click="sendMessage('')"
                                v-if="messageStatus != ''">上一步
                        </button>
                        <button data-dismiss="modal" class="btn btn-default" type="button">关闭</button>
                        <button class="btn btn-primary" @click="okSendMessage()">确定</button>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../../common/datePicker.vue'
    import Status from '../../common/status.vue';

    export default {
        components: {DatePicker, Status},
        props: ['message', 'page'],
        data() {
            return {
                messageStatus: '',
                dateConfigure: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
                statusInfo: '短信发送',
                currentDate: [],
//                messageDate: '',
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
            sendMessage(val) {
                this.messageStatus = val;
                if (val === 6) {
                    this.statusInfo = '催缴短信';
//                    this.messageDate = '';
                } else if (val === 7) {
                    this.statusInfo = '到期短信';
//                    this.messageDate = '';
                } else if (val === 8) {
                    this.statusInfo = '逾期短信';
                } else {
                    this.statusInfo = '短信发送';
//                    this.messageDate = '';
                }
            },
//            确认发送
            okSendMessage() {
                if (this.messageStatus !== '') {
                    this.$http.post('account/receivable/notify', {
                        type: this.messageStatus,
                        ids: this.message,
//                        due_date: this.messageDate,
                    }).then((res) => {
                        if (res.data.code === '18510') {
                            this.$emit('send', this.page);
                            this.successMsg(res.data.msg);
                            this.close_();
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    })
                }
            },
//            getDate (val){
//                this.messageDate = val;
//            },
            close_() {
                $('#sendMessage').modal('hide');
//                this.messageDate = '';
                this.messageStatus = '';
                this.statusInfo = '短信发送';
            },
            successMsg(msg) {
                //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg) {      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>


<style scoped>
    .modal-body > div > .col-xs-4 {
        font-size: 16px;
    }

    .vertical {
        /*vertical-align: top;*/
        line-height: 39px;
    }

    .text-danger:hover {
        color: #e4393c;
    }
</style>
