<template>
    <div>
        <div class="modal fade full-width-modal-right" id="periodicEdit" tabindex="-1" role="dialog"
             data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close">
                                <span aria-hidden="true" data-dismiss="modal">&times;</span></button>
                            <h4 class="modal-title">编辑</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">
                                <div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">签约人<sup class="required">*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" placeholder="选择负责人"
                                                   v-model="msg.staff_name" @click='select' readonly>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">所属部门</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="department" class="form-control" disabled>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">发喜报日期</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" :value="msg.generate_date" disabled>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" :value="msg.address" class="form-control" disabled>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">收租状态</label>
                                        <div class="col-sm-10">
                                            <select class="form-control" v-model="typical">
                                                <option value="">请选择</option>
                                                <option v-for="(list,index) in dict.typical" :value="index">{{list}}
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">付款方式</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="pay_type" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">签约月数</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="months" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">月单价</label>
                                        <div class="col-sm-10" :class="{'padding0':prices.length > 1}">
                                            <div v-if="prices.length == 1" v-for="(key,index) in prices">
                                                <input type="text" class="form-control" v-model="prices[index]">
                                            </div>

                                            <div v-if="prices.length > 1" v-for="(key,index) in prices" class="col-sm-6">
                                                <input type="text" class="form-control" v-model="prices[index]">
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">总金额</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="total_price" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">空置期</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="vacancy" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">中介费</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="medi_cost" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">实际业绩</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="achv_real" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">溢出业绩</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="achv_overflow" class="form-control">
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">备注</label>
                                        <div class="col-sm-10">
                                            <textarea v-model="remark" class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div>
                                <button type="button" data-dismiss="modal" class="btn btn-default">取消</button>
                                <button type="button" class="btn btn-primary" @click="revise_edit">修改</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <Status :state="info"></Status>

        <Department :configure="configure" @Staff="selectDateSend"></Department>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    import Department from '../common/oraganization.vue'
    export default{
        components: {Status,Department},
        props: ['msg'],
        data(){
            return {
                dict: {},
                department: '',                 //所属部门
                typical: '',                    //收租状态
                pay_type: '',                   //付款方式
                months: '',                     //签约月数
                prices: [],                     //月单价
                total_price: '',                //总金额
                vacancy: '',                    //空置期
                medi_cost: '',                  //中介费
                achv_real: '',                  //实际业绩
                achv_overflow: '',              //溢出业绩
                remark: '',                     //备注
                configure: {},
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
            msg (val){
                this.department = val.district.name;
                this.typical = val.typical;
                this.pay_type = val.pay_type;
                this.months = val.months;
                this.prices = val.prices;
                this.total_price = val.total_price;
                this.vacancy = val.vacancy;
                this.medi_cost = val.medi_cost;
                this.achv_real = val.achv_real;
                this.achv_overflow = val.achv_overflow;
                this.remark = val.remark;
            }
        },
        mounted (){
            this.$http.get('salary/Commission/dict').then((res) => {
                this.dict = res.data;
            });
        },
        methods: {
//            选择签约人
            select(){
                $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                this.configure = {type: 'staff', length: 1};
            },
            selectDateSend (val){
                if (val.staff.length > 0) {
                    this.msg.staff_name = val.staff[0].name;
                    this.msg.staff_id = val.staff[0].id;
                }
            },
//            修改
            revise_edit (){
                this.$http.put('achv/commission/' + this.msg.id, {
                    typical: this.typical,
                    pay_type: this.pay_type,
                    months: this.months,
                    prices: this.prices,
                    total_price: this.total_price,
                    vacancy: this.vacancy,
                    medi_cost: this.medi_cost,
                    achv_real: this.achv_real,
                    achv_overflow: this.achv_overflow,
                    remark: this.remark,
                    staff_id: this.msg.staff_id,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        $('#periodicEdit').modal('hide');          //成功关闭模态框
                        this.$emit('confiscate');
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .padding0{
        padding: 0;
    }
</style>