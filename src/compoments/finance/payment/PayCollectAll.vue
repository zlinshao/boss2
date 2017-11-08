<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>应付款项</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-if="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="input-group">
                            <select class="form-control" v-model="params.status" @change="search(1)">
                                <option value="">全部</option>
                                <option :value="value" v-for="(key,value) in dict.account_should_status">{{key}}
                                </option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <SelectSubject @choose="houseSubject" :current="params.subject_id"
                                           :msg="'科目搜索'"></SelectSubject>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" id="Subject" type="button"
                                        @click="search_empty()">清空</button>
                            </span>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="签收人/房屋地址/价格" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="selectHouse">选择地址搜索</a>
                        </div>
                    </form>
                </div>

                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <!--应收-->
                    <ul v-if="status_top == 'collect'">
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li v-show="status != 3 && status != 4 && pitch.length == 1">
                            <h5 @click="addCollect"><a><i class="fa fa-pencil"></i>&nbsp;应收入账</a></h5>
                        </li>
                        <li v-show="pitch.length == 1 && rollbacks !== null">
                            <h5 @click="Rollback_show"><a><i class="fa fa-undo"></i>&nbsp;回滚</a></h5>
                        </li>
                        <li v-show="pitch.length == 1">
                            <h5 @click="cutOut('account/receivable/delete/')"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a>
                            </h5>
                        </li>
                        <li v-show="pitch.length == 1">
                            <h5 @click="remark_show('', 1)">
                                <a><i class="fa fa-book"></i>&nbsp;新增备注</a>
                            </h5>
                        </li>
                    </ul>

                    <!--应付-->
                    <ul v-if="status_top == 'pay'">
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li v-show="pitch.length == 1">
                            <h5 @click="payables"><a><i class="fa fa-pencil"></i>&nbsp;应付入账</a></h5>
                        </li>
                        <li v-show="pitch.length == 1 && rollbacks !== null">
                            <h5 @click="Rollback_show"><a><i class="fa fa-undo"></i>&nbsp;回滚</a></h5>
                        </li>
                        <li v-show="pitch.length == 1">
                            <h5 @click="cutOut('account/payable/delete/')"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a>
                            </h5>
                        </li>
                        <li v-show="pitch.length == 1">
                            <h5 @click="remark_show('', 1)">
                                <a><i class="fa fa-book"></i>&nbsp;新增备注</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--回滚-->
        <div role="dialog" class="modal fade bs-example-modal-sm has-js" id="Rollback">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h5 v-for="(key, index) in rollbacks">
                            <label :class="{'label_check':true,'c_on':rollback_id.indexOf(index) > -1,
                                    'c_off':rollback_id.indexOf(index) == -1}"
                                   @click.prevent="change_index($event, index)">
                                <input type="checkbox"
                                       :checked="rollback_id.indexOf(index) > -1" class="rollbacks"><span>{{key}}</span>
                            </label>
                        </h5>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-dafault btn-md">取消</button>
                        <button v-if="status_top == 'collect'" class="btn btn-danger btn-md"
                                @click="rollback('account/receivable/revert/')">确认
                        </button>
                        <button v-if="status_top == 'pay'" class="btn btn-danger btn-md"
                                @click="rollback('account/payable/revert/')">确认
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--增加/查看 备注-->
        <div class="modal fade " id="addRemarks" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title" v-if="remarks_status == 1">新增备注</h4>
                        <h4 class="modal-title" v-if="remarks_status == 2">查看备注</h4>
                    </div>

                    <div class="modal-body" v-if="remarks_status == 1">
                        <form class="form-horizontal" role="form">
                            <div class="form-group" style="margin-bottom: 16px;">
                                <div class="col-lg-12">
                                    <textarea class="form-control" v-model="addRemark"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-body" v-if="remarks_status == 2">
                        {{addRemark}}
                    </div>

                    <div class="modal-footer" v-if="remarks_status == 1">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>

                        <!--房东备注-->
                        <button v-if="status_top == 'collect'" class="btn btn-success"
                                type="button" @click="addRem('account/receivable/tag/')">确定
                        </button>

                        <!--租客备注-->
                        <button v-if="status_top == 'pay'" class="btn btn-success"
                                type="button" @click="addRem('account/payable/tag/')">确定
                        </button>
                    </div>
                    <div class="modal-footer" v-if="remarks_status == 2">
                        <button data-dismiss="modal" class="btn btn-success" type="button">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--表格-->
        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="width50 text-danger">应收</th>
                            <th class="text-center width100">收款时间</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width80">收入科目</th>
                            <th class="text-center width110">应收金额</th>
                            <th class="text-center width100">实收金额</th>
                            <th class="text-center width100">剩余款项</th>
                            <th class="text-center width100">补齐时间</th>
                            <th class="text-center phone" style="min-width: 360px;">详细信息</th>
                            <th class="text-center width80">状态</th>
                            <th class="text-center width50">备注</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in receivable"
                            :class="{'pendable': item.pendable == 2,'reds': item.aproach == 1}">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex(
                                           $event,
                                           item.id,
                                           item.status,
                                           item.running_account_record,
                                           'collect')">
                                    <input type="checkbox" :value="item.id" :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>{{item.pay_date}}</td>
                            <td>{{item.customer == null ? '' : item.customer.address}}
                                <span style="line-height: 9px;" v-if="item.identity === 1"
                                      class="btn btn-danger btn-xs">F</span>
                                <span style="line-height: 9px;" v-if="item.identity === 2"
                                      class="btn btn-danger btn-xs">Z</span><br>
                                <span v-if="item.customer != null">
                                     <span style="line-height: 9px;"
                                           v-if="item.identity == 2 && item.customer.is_shared == 1">
                                         (&nbsp;{{dict.shared_part[item.customer.shared_part]}}&nbsp;)
                                     </span>
                                </span>
                            </td>
                            <td>{{dict.account_subject[item.subject_id]}}</td>
                            <td>{{item.amount_receivable}}</td>
                            <td>{{item.amount_received}}</td>
                            <td>{{item.balance}}</td>
                            <td>{{item.complete_date}}</td>
                            <td>{{item.description}}</td>
                            <td>
                                <label class="label" :class="{'yellow':item.status == 1,
                                'red':item.status == 2,'green':item.status == 3,'redjd':item.status == 4}">
                                    {{dict.account_should_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <span v-if="item.tag === ''"></span>
                                <span v-if="item.tag !== ''" @click="remark_show(item.tag, 2)"
                                      class="fa fa-book"></span>
                            </td>
                            <td>
                                <router-link
                                        :to="{path:'/collectPaymentDetail',query: {collectId: item.id, myParams:params, selected:selected, cus: 2}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="collect_isShow">
                            <td colspan="13" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                <Page :pg="paging1" @pag="receive_search" :beforePage="params.receivable_page"></Page>

                <section class="panel table table-responsive roll">
                    <table class="table table-advance table-hover">
                        <thead>
                        <tr class="text-center">
                            <th class="width50 text-danger">应付</th>
                            <th class="text-center width100">付款时间</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width80">支出科目</th>
                            <th class="text-center width110">应付金额</th>
                            <th class="text-center width110">实付金额</th>
                            <th class="text-center width100">剩余款项</th>
                            <th class="text-center width100">补齐时间</th>
                            <th class="text-center phone" style="min-width: 360px;">详细信息</th>
                            <th class="text-center width80">状态</th>
                            <th class="text-center width80">备注</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in payable"
                            :class="{'pendable': item.pendable === 2,'reds': item.aproach === 1}">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex(
                                       $event,
                                       item.id,
                                       item.status,
                                       item.running_account_record,
                                       'pay')">
                                    <input type="checkbox" :value="item.id" :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>{{item.pay_date}}</td>
                            <td>
                                {{item.customer == null ? '' : item.customer.address}}
                                <span v-if="item.identity === 1" class="btn btn-danger btn-xs"
                                      style="line-height: 9px;">F</span>
                                <span v-if="item.identity === 2" class="btn btn-danger btn-xs"
                                      style="line-height: 9px;">Z</span><br>
                                <span v-if="item.customer != null">
                                     <span style="line-height: 9px;"
                                           v-if="item.identity == 2 && item.customer.is_shared == 1">
                                         (&nbsp;{{dict.shared_part[item.customer.shared_part]}}&nbsp;)
                                     </span>
                                </span>
                            </td>
                            <td>{{dict.account_subject[item.subject_id]}}</td>
                            <td>{{item.amount_payable}}</td>
                            <td>{{item.amount_paid}}</td>
                            <td>{{item.balance}}</td>
                            <td>{{item.complete_date}}</td>
                            <td>{{item.description}}</td>
                            <td>
                                <label class="label" :class="{'yellow':item.status == 1,
                                'red':item.status == 2,'green':item.status == 3,'redjd':item.status == 4}">
                                    {{dict.account_should_status[item.status]}}
                                </label>
                            </td>
                            <td>
                                <span v-if="item.tag === ''"></span>
                                <span v-if="item.tag !== ''" @click="remark_show(item.tag, 2)"
                                      class="fa fa-book"></span>
                            </td>
                            <td>
                                <router-link
                                        :to="{path:'/payPaymentDetail',query: {payId: item.id, myParams:params, selected:selected, cus: 2}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="pay_isShow">
                            <td colspan="13" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging2" @pag="pay_search" :beforePage="params.payable_page"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--删除-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <!--应收入账-->
        <ShouldCollect :id="shouldCollectId" @success="search"></ShouldCollect>

        <!--应付入账-->
        <ShouldPay @pay_succ="search" :details="details_info"></ShouldPay>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--房屋地址搜索组件-->
        <SelectHouse @House="getHouse" :house_status="'1'"></SelectHouse>
    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    import Confirm from '../../common/confirm.vue';
    import ShouldCollect from './paymentShouldCollect.vue'
    import ShouldPay from './paymentShouldPay.vue'
    import STAFF from  '../../common/oraganization.vue'     //部门搜索
    import DatePicker from '../../common/datePicker.vue'
    import SelectHouse from '../../common/selectPayHouse.vue'
    import SelectSubject from '../../common/selectSubject.vue'  //科目搜索
    import Page from  '../../common/page.vue'
    export default{
        components: {Status, Confirm, ShouldCollect, ShouldPay, STAFF, SelectHouse, SelectSubject, DatePicker, Page},
        data(){
            return {
                paging1: '',                    //应 收 总页数
                paging2: '',                    //应 付 总页数
                dict: {},                       //字典
                receivable: [],                 //应收
                payable: [],                    //应付
                pitch: [],                      //选中id
                status: [],                     //选中状态
                beforePage: 1,                  //当前页数
                addRemark: '',                  //新增/查看 备注内容
                remarks_status: '',             //备注状态
                status_top: '',                 //头部收/付显示
                collect_isShow: false,          //应 收 无数据
                pay_isShow: false,              //应 付 无数据
                shouldCollectId: -1,            //应 收 入账编辑
                details_info: [],               //应 付
                rollback_id: [],                //回滚ID
                rollbacks: {},                  //回滚
                confirmMsg: {
                    id: '',                     //删除
                    msg: '',
                    addr: ''
                },
                configure: {},                  //部门组件参数
                selected: [],                   //部门搜索
                dateConfigure: [
                    {
                        range: true,            //日期组件参数
                        needHour: false
                    }
                ],
                currentDate: [],                //日期组件参数
                params: {
                    receivable_page: 1,         //应收分页
                    payable_page: 1,           //应付分页
                    department_id: [],
                    staff_id: [],
                    status: '',
                    range: '',
                    search: '',
                    subject_id: '',             //科目款项
                },
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
        mounted (){
            if (this.$route.query.sear === 1) {
                this.params = this.$route.query.myParam;
                this.selected = this.$route.query.selected;
                this.payCollect();
            } else {
                this.payCollect();
            }
        },
        methods: {
//            搜索
            search (){
                this.params.receivable_page = 1;
                this.params.payable_page = 1;
                this.payCollect();
            },
//            应收搜索
            receive_search (val){
                this.params.receivable_page = val;
                this.payCollect();
            },
//            应付搜索
            pay_search (val){
                this.params.payable_page = val;
                this.payCollect();
            },
//            列表
            payCollect (){
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.dict = res.data;

                    this.receivable = [];
                    this.payable = [];
                    this.pitch = [];
                    this.paging1 = '';
                    this.paging2 = '';
                    this.$http.get('revenue/account_xable', {
                        params: this.params
                    }).then((res) => {
                        if (res.data.code === '18610') {
//                            应收
                            if (res.data.data.receivable.length !== 0) {
                                this.receivable = res.data.data.receivable;
                                this.paging1 = res.data.data.receivable_pages;
                                this.collect_isShow = false;
                            } else {
                                this.collect_isShow = true;
                            }
//                            应付
                            if (res.data.data.payable.length !== 0) {
                                this.payable = res.data.data.payable;
                                this.paging2 = res.data.data.payable_pages;
                                this.pay_isShow = false;
                            } else {
                                this.pay_isShow = true;
                            }
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            this.info.state_error = false;
                        }
                    })
                })
            },
//            部门搜索
            select(){
                $('.selectCustom:eq(0)').modal('show');
            },
//            部门搜索
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
//            重置部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },
//            房屋地址搜索
            selectHouse(){
                $('.selectHouse:eq(0)').modal('show');
            },
//            房屋信息
            getHouse(data){
                this.params.search = data.address;
                this.search(1);
            },
//            日期搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },
//            科目搜索
            houseSubject(val){
                this.params.subject_id = val;
                this.search(1);
            },
//            清空科目
            search_empty (){
                this.params.subject_id = '';
                this.search(1);
            },
//            input多选
            changeIndex(ev, id, status, index, str){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.rollbacks = index;
                this.pitch = [];
                this.status = [];
                this.status_top = str;
                if (evInput.checked) {
                    this.pitch.push(id);
                    this.status.push(status);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    let index1 = this.status.indexOf(status);
                    if (index1 > -1) {
                        this.status.splice(index1, 1);
                    }
                }
            },
//            新增备注
            remark_show (val, num){
                this.remarks_status = num;
                this.addRemark = val;
                $('#addRemarks').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },

//            应收入账
            addCollect(){
                this.shouldCollectId = this.pitch;
                $('#collectFor').modal('show');
            },

//            应付入账
            payables (){
                $('#payFor').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
                this.$http.get('revenue/glee_collect/dict').then((res) => {
                    this.select_info = res.data;

                    this.$http.get('account/payable/' + this.pitch).then((res) => {
                        this.details_info = [];
                        this.details_info.push(res.data.data);
                    });
                });
            },
//            新增备注
            addRem (addr){
                this.$http.post(addr + this.pitch, {
                    content: this.addRemark,
                }).then((res) => {
                    if (res.data.code === '18510' || res.data.code === '18410') {
                        this.pitch = [];
                        $('#addRemarks').modal('hide');
                        this.search(this.beforePage);
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
//            回滚显示
            Rollback_show(){
                this.rollback_id = [];
                $('#Rollback').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });
            },
//            回滚选择
            change_index (ev, val){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.rollback_id.push(val);
                } else {
                    let index = this.rollback_id.indexOf(val);
                    if (index > -1) {
                        this.rollback_id.splice(index, 1);
                    }
                }
            },
//            回滚
            rollback (url){
                this.$http.put(url + this.pitch, {
                    ra_id: this.rollback_id
                }).then((res) => {
                    if (res.data.code === '18510' || res.data.code === '18410') {
                        $('#Rollback').modal('hide');
                        this.search(this.beforePage);
                        this.pitch = [];
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
//           删除
            cutOut(url){
                if (url === 'account/receivable/delete/') {
                    this.confirmMsg.msg = '确定删除该条应收款项吗？';
                }
                if (url === 'account/payable/delete/') {
                    this.confirmMsg.msg = '确定删除该条应付款项吗？';
                }
                this.confirmMsg.id = this.pitch;
                this.confirmMsg.addr = url;
                $('#confirm').modal('show');
            },

//            删除回调
            getConfirm(){
                this.$http.post(this.confirmMsg.addr + this.pitch).then((res) => {
                    if (res.data.code === '18510' || res.data.code === '18410') {
                        this.pitch = [];
                        // 成功
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_success = false;
                        this.search(this.beforePage);
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        this.info.state_error = false;
                    }
                })
            },
        }
    }
</script>

<style scoped>

    .form-group, .input-group {
        margin-bottom: 0;
        height: 39px;
    }

    .input-group-btn {
        vertical-align: top;
    }

    tbody > tr.reds {
        background-color: #FFCECE;
    }

    tr.pendable {
        background-color: #D6D6D6;
    }

    .yellow {
        background-color: #FFCC00;
    }

    .red {
        background-color: #FF9999;
    }

    .green {
        background-color: #78CD51;
    }

    .redjd {
        background-color: #e4393c;
    }
</style>