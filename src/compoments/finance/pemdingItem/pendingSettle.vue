<template>
    <div>
        <div class="modal fade full-width-modal-right pendingSettle" id="pendingSettle" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-md" role="document">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">生成款项</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">事件类型</label>
                                    <div class="col-sm-10">
                                        <select name="type" class="form-control" v-model="pendingSellter.item_type">
                                            <option value="0">事件类型</option>
                                            <option :value="key" v-for="(value,key) in myDictionary.item_type">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">收退款类型</label>
                                    <div class="col-sm-10">
                                        <select name="type" class="form-control" v-model="pendingSellter.receive_pay">
                                            <option value="0">请选择</option>
                                            <option value="1">收款</option>
                                            <option value="2">退款</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="customer_name" disabled>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="house_name" disabled >
                                    </div>
                                </div>

                                <!--<div class="form-group">-->
                                    <!--<label class="col-sm-2 control-label">合同编号</label>-->
                                    <!--<div class="col-sm-10">-->
                                        <!--<input type="text" class="form-control" readonly >-->
                                    <!--</div>-->
                                <!--</div>-->
                                <div class="form-group">
                                    <label class="col-sm-4 control-label">合同开始和结束时间</label>
                                    <div class="col-sm-8" style="padding-bottom: 18px;">
                                        <DatePicker :dateConfigure="dateConfigure"
                                                   :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">水费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.water_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">差额</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.diff_fee">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">电费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.elec_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">燃气费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.gas_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">物业费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.property_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">网络费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control"  v-model="pendingSellter.net_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">转租费用</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.sublet_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">管理费</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.manage_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">物业校验</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.check_fee">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">违约金</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.penalty_fee">
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">应退</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" v-model="pendingSellter.refund_should">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">实际扣款</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" disabled v-model="refund_diff">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">实际退款</label>
                                    <div class="col-sm-10">
                                        <input type="number" class="form-control" disabled v-model="refund_real">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算方式</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="pendingSellter.account_type">
                                            <option value="">结算方式</option>
                                            <option :value="key" v-for="(value,key) in myDictionary.payment">{{value}}</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算账户</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="pendingSellter.account_num">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="staff_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="department_name" disabled>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="operator_name">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">结算时间</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="settle_date">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">科目 <sup>*</sup></label>
                                    <div class="col-sm-10">
                                        <SelectSubject @choose="getSubject" :current="pendingSellter.subject_id"></SelectSubject>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="pendingSellter.remark"></textarea>
                                    </div>
                                </div>



                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal" aria-label="Close">取消</button>
                            <button type="button" class="btn btn-primary" @click="receivables">结算</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        <!--<Client @clientPayAdd = getPayClient></Client>-->
        <!--<House @House = getHouse></House>-->
        <!--<Department :configure = 'configure' @Staff = getDpm></Department>-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import DatePicker from '../../common/datePicker.vue'
    import Client from  '../../common/selectPayClient.vue'  //选择客户
    import House from  '../../common/selectHouse.vue'  //选择房屋
    import Department from  '../../common/organization/selectStaff.vue'
    import Status from '../../common/status.vue'

    import SelectSubject from '../../common/selectSubject.vue'
    export default{
        props:['settleId' , "dictionary" , 'collect_rent'],
        components: {DatePicker , Client , House , Department , Status,SelectSubject},
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
                pendingSellter:{
                    collect_rent:'',            //收 租
                    item_type : '',             //1 新租 2 续租 3 转租 4 调租
                    staff_id : '',              //开单人id
                    department_id : '',         //部门id
                    house_id : '',              //房屋id
                    customer_id : '',           //客户id
                    start_date : '',            //开始日期
                    end_date : '',              //结束日期
                    diff_fee : '',              //差额
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
                    remark : '',
                    refund_should:'',           //应退
//                    refund_diff: '',            //实际扣款
//                    refund_real :"",            //实际退款
                    account_type : '',          //结算方式
                    account_num : '',           //结算账户
                    subject_id : '',               // 科目
                    receive_pay : '',            //收退款
                },
                staff_name : '',            //员工
                myDictionary: [],           //字典
                mySettleId : '',            //id
                pendingSettleList : [],     //待处理数据
                customer_name : '',         //客户姓名
                department_name : '',       //部门名称
                house_name:'',              //房屋名称
                operator_name : '',         //结算人
                settle_date : '',           //结算时间
                currentDate : [],           //合同开始和结束时间
            }
        },
        created (){
            this.Info();
        },
        watch:{
            settleId(val){
                this.mySettleId =val;
                this.getSettleList ();
            },
            dictionary(val){
                this.myDictionary = val;
            },
            collect_rent(val){
                this.pendingSellter.collect_rent = val;
            }
        },
        computed: {
            refund_diff: function () {
                return Number(this.pendingSellter.diff_fee)
                    +  Number(this.pendingSellter.water_fee)
                    +  Number(this.pendingSellter.elec_fee)
                    +  Number(this.pendingSellter.gas_fee)
                    +  Number(this.pendingSellter.property_fee)
                    +  Number(this.pendingSellter.penalty_fee)
                    +  Number(this.pendingSellter.check_fee)
                    +  Number(this.pendingSellter.sublet_fee)
                    +  Number(this.pendingSellter.manage_fee)
                    +  Number(this.pendingSellter.net_fee)
            },
            refund_real : function () {
                if(this.pendingSellter.refund_should !== ''){
                    return Number(this.pendingSellter.refund_should) - this.refund_diff
                }
            }
        },
        methods: {
            Info(){
                this.$http.get('staff/info').then((res)=>{
                    this.operator_name=res.data.name;
                })
            },
            getSettleList(){
                this.$http.get('account/pending/' + this.mySettleId).then((res) =>{
                    if(res.data.code === '18800'){
//                        this.pendingSettleList = [];
//                        this.pendingSettleList .push(res.data.data);
//                        console.log(res.data.data)
                        //****赋值
                        this.pendingSellter.item_type =res.data.data.item_type;
                        this.pendingSellter.customer_id =res.data.data.customer_id;
                        if(res.data.data.identity === 2){
                            this.customer_name =res.data.data.customer_name_rent;
                        }else if(res.data.data.identity === 1){
                            this.customer_name =res.data.data.customer_name_collect;
                        }
                        this.pendingSellter.house_id =res.data.data.house_id;
                        this.house_name =res.data.data.detailed_address;
                        this.pendingSellter.department_id =res.data.data.department_id;
                        this.department_name =res.data.data.department_name;
                        this.pendingSellter.start_date =res.data.data.start_date;
                        this.pendingSellter.end_date =res.data.data.end_date;
                        this.pendingSellter.operator_id =res.data.data.operator_id;
                        this.pendingSellter.status =res.data.data.status;
                        this.pendingSellter.account_type =res.data.data.account_type;
                        this.pendingSellter.account_num =res.data.data.account_num;
                        this.pendingSellter.refund_should =res.data.data.refund_should;
                        this.refund_diff =res.data.data.refund_diff;
                        this.refund_real =res.data.data.refund_real;
                        this.staff_name =res.data.data.staff_name;
                        this.pendingSellter.staff_id=res.data.data.staff_id;
                        this.currentDate.push(res.data.data.start_date);
                        this.currentDate.push(res.data.data.end_date);
                        this.pendingSellter.diff_fee  = res.data.data.diff_fee                  //差额
                        this.pendingSellter.water_fee  = res.data.data.water_fee                //水费
                        this.pendingSellter.elec_fee  = res.data.data.elec_fee                  //电费
                        this.pendingSellter.gas_fee  = res.data.data.gas_fee                    //燃气
                        this.pendingSellter.property_fee  = res.data.data.property_fee          //物业费
                        this.pendingSellter.penalty_fee  = res.data.data.penalty_fee            //违约金
                        this.pendingSellter.check_fee  = res.data.data.check_fee                //物业校验
                        this.pendingSellter.sublet_fee  = res.data.data.sublet_fee              //转租费用
                        this.pendingSellter.manage_fee  = res.data.data.manage_fee              //管理费
                        this.pendingSellter.net_fee  = res.data.data.net_fee                    //网络费
                        this.settle_date  = new Date().toLocaleString();                         //结算时间
                        this.pendingSellter.remark  = res.data.data.remark                      //备注
                        this.pendingSellter.receive_pay  = res.data.data.receive_pay            //收退款
                    }else {

                    }

                })
            },
            getDate(val){
//                console.log(val)
                if (val==''){
                    this.currentDate.splice(0,this.currentDate.length);
                    this.pendingSellter.start_date = '';
                    this.pendingSellter.end_date = '';
                } else {
                    this.pendingSellter.start_date = val.split('to')[0];
                    this.pendingSellter.end_date = val.split('to')[1];
                }
//                console.log(this.currentDate)

            },
//            selectPayClient(){      //选择客户
//                $('.selectClient:eq(0)').modal('show');
//            },
//            getPayClient(val){
//                console.log(val)
//            },
//            selectHouse(){          //选择房屋
//                $('.selectHouse:eq(0)').modal('show');
//            },
//            getHouse(val){
//                console.log(val)
//            },
//            selectDpm(){            //选择部门
//                $('.selectCustom:eq(0)').modal('show');
//                this.configure={class:'selectType',type:'department'};
//            },
//            getDpm(val){
//                console.log(val)
//            },
            receivables(){
                this.$http.post('account/pending/settle/' + this.mySettleId,this.pendingSellter).then((res) =>{
                    if(res.data.code === '18810'){
                        this.$emit('Settle','yes');
                        $('#pendingSettle').modal('hide');
                        this.info.success =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.info.error =res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },


            getSubject(val){
                this.pendingSellter.subject_id = val;
            }
        }
    }
</script>

<style scoped>
    textarea{
        max-width: 100%;
    }
    sup{
        color: #e8403f;
    }
</style>