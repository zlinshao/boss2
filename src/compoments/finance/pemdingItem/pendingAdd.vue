<template>
    <div>
        <div class="modal fade full-width-modal-right" id="add" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">新增待处理项</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">事件类型</label>
                                    <div class="col-sm-10">
                                        <select name="type" class="form-control" v-model="pendingAdd.item_type">
                                            <option value="">调房</option>
                                            <option value="1">转租</option>
                                            <option value="1">退房</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="pendingAdd.customer_id" @click="selectPayClient" readonly>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="pendingAdd.house_id" @click="selectHouse" readonly >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">合同编号</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly >
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">差额</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-4 control-label">合同开始和结束时间</label>
                                    <div class="col-sm-8" style="padding-bottom: 18px;">
                                        <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">水费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.water_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">电费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.elec_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">燃气费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.gas_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">物业费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.property_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">网络费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control"  v-model="pendingAdd.net_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转租费用</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.sublet_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">管理费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.manage_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">物业校验</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.check_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">违约金</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingAdd.penalty_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">应退</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">实际扣款</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">实际退款</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">实际退款</label>
                                    <div class="col-sm-10">
                                        <select class="form-control">
                                            <option value="">银行卡</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算账户</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly v-model="pendingAdd.staff_id">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="pendingAdd.department_id" @click="selectDpm" readonly>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly v-model="pendingAdd.operator_id">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算时间</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>

                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default">取消</button>
                            <button type="button" class="btn btn-primary" @click="addPending">保存</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <Client @clientPayAdd = getPayClient></Client>
        <House @House = getHouse></House>
        <Department :configure = 'configure' @Staff = getDpm></Department>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../../common/datePicker.vue'
    import Client from  '../../common/selectPayClient.vue'  //选择客户
    import House from  '../../common/selectHouse.vue'  //选择房屋
    import Department from  '../../common/organization/selectStaff.vue'
    import Status from '../../common/status.vue'
    export default{
        components: {DatePicker , Client , House , Department , Status},
        data(){
            return {
                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                configure : [],
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
                pendingAdd:{
                    collect_rent:'',            //收 租
                    item_type : '',             //1 新租 2 续租 3 转租 4 调租
                    staff_id : '',              //开单人id
                    department_id : '',         //部门id
                    house_id : '',              //房屋id
                    customer_id : '',           //客户id
                    start_date : '',            //开始日期
                    end_date : '',              //结束日期
                    water_fee : '',             //水费
                    elec_fee : '',              //电费
                    gas_fee : '',               //燃气
                    property_fee : '',          //物业费
                    penalty_fee : '',           //违约金
                    check_fee : '',             //物业校验
                    sublet_fee : '',            //转租费用
                    manage_fee : '',            //管理费
                    net_fee : '',               //网络费
                    operator_id : '',           //经手人i
                    status : '',                //状态
                },
            }
        },
        methods: {
            selectClient(){},
            getDate(data){},
            selectPayClient(){      //选择客户
                $('#selectPayClient').modal('show');
            },
            getPayClient(val){
                console.log(val)
            },
            selectHouse(){          //选择房屋
                $('#selectHouse').modal('show');
            },
            getHouse(val){
                console.log(val)
            },
            selectDpm(){            //选择部门
                $('#selectCustom').modal('show');
                this.configure={class:'selectType',type:'department'};
            },
            getDpm(val){
                console.log(val)
            },
            addPending(){
                this.$http.post('core/customer',this.pendingAdd).then((res) =>{

                })
            }
        }
    }
</script>

<style scoped>
    textarea{
        max-width: 100%;
    }
</style>