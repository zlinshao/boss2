<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>
                <router-link to="/organization">业绩生成</router-link>
            </li>
            <li>合租房</li>
        </ol>
        <section class="panel">
            <div class="panel-body clearFix has-js">
                <div v-if="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="params.keyword" placeholder="房屋地址/客户名"
                                   @keyup.enter="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group">
                            <button class="btn btn-success" type="button" @click="resetting">重置</button>
                        </div>
                    </form>
                </div>
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; {{pitch.length}} &nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5>
                                <a @click="distribution">
                                    <i class="fa fa-pencil-square-o"></i>&nbsp;编辑
                                </a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="panel table table-responsive roll has-js">
            <table class="table table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <td style="border-bottom: 2px solid #dddddd;">
                        <label :class="{'label_check':true,'c_on':pitch.length == 12,'c_off':pitch.length != 12}"
                               @click.prevent="all_id($event)">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.length == 12">
                        </label>
                    </td>
                    <th class="text-center width130">地址</th>
                    <th class="text-center width130">房型</th>
                    <th class="text-center width80">参考租金</th>
                    <th class="text-center width100">房屋状态</th>
                    <th class="text-center width80">开单人</th>
                    <th class="text-center width100">所属部门</th>
                </tr>
                </thead>
                <tbody class="text-center">
                <tr v-for="item in blackboardList">
                    <td class="text-center">
                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,'c_off':pitch.indexOf(item.id) == -1}"
                               @click.prevent="pitchId(item.id, $event)">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.indexOf(item.id) > -1">
                        </label>

                    </td>
                    <td>{{item.detailed_address}}</td>
                    <td>
                        {{item.rooms.rooms}}室
                        {{item.rooms.hall}}厅
                        {{item.rooms.toilet}}卫
                    </td>
                    <td>
                        <span @click="able_show(1,item.reference, item.id)"
                              v-if="isActive != item.id" style="cursor: pointer;">
                            {{item.reference}}
                        </span>
                        <span v-if="isActive == item.id">
                            <input type="text" class="form-control" v-model="reference"
                                   style="margin-bottom: 5px;">
                            <a class="btn btn-default btn-sm" @click='able_show(2)'>取消</a>
                            <a class="btn btn-success btn-sm" @click="able_save(item.id)">保存</a>
                        </span>
                    </td>
                    <td>
                        <span v-if="item.status == 1">已出租</span>
                        <span v-if="item.status == 2">未出租</span>
                        <span v-if="item.status == 3">已结束</span>
                    </td>
                    <td>{{item.real_name}}</td>
                    <td>{{item.department}}</td>
                </tr>
                <tr v-if="isShow">
                    <td colspan="14" class="text-center text-muted">
                        <h4>暂无数据....</h4>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>

        <!--部门筛选-->
        <Organization :configure="configure" @Staff="selectDateSend" :msg="msg"></Organization>

        <!--部门归属-->
        <MateDepartment :msg="msg" @mate="search"></MateDepartment>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="params.page"></Page>

        <!--状态提醒-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import DatePicker from '../../common/datePicker.vue'
    import Organization from './organization_choose.vue'
    import MateDepartment from './mate_department.vue'
    import Page from  '../../common/page.vue'
    export default{
        components: {Organization, Page, Status, MateDepartment,DatePicker},
        data(){
            return {
                msg: {
                    period: '',             //周期
                    time: '',               //时间
                    page: '',
                },
                currentDate: [],
                dateConfigure: [                    //日期范围选择
                    {
                        range: true,
                        needHour: true,
                    }
                ],
                pitch: [],
                blackboardList: [],                 //列表
                isActive: '',                       //现实编辑金额
                reference: '',                      //租金
                params: {
                    page: 1,
                    range: '',
                    status: '',
                    department_id: '',              //部门ID
                    keyword: '',                    //关键字
                },
                selected: '',                       //部门名称
                configure: [],                      //部门
                isShow: false,
                paging: '',
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
            this.$http.get('salary/calendar/current').then((res) => {
                this.msg.time = res.data.data.month;
                this.msg.period = res.data.data.rank;
                this.blackboard(1);
            })
        },
        methods: {
//            全选
            all_id (ev){
                this.pitch = [];
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    for (let i = 0; i < this.blackboardList.length; i++) {
                        this.pitch.push(this.blackboardList[i].id);
                    }
                }
            },
//            搜索
            search(val){
                this.blackboard(val);
            },
//            小黑板列表
            blackboard (val){
                this.params.page = val;
                this.msg.page = val;
                this.$http.get('finance/house/dashboard', {
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '90010') {
                        this.blackboardList = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.blackboardList = [];
                        this.paging = '';
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            人资管理
            select(){
                $('.OrganizationChoose:eq(0)').modal({backdrop: 'static',});
                this.configure = {type: 'department', length: 1};
            },
//            人资管理
            selectDateSend(val){
                this.selected = val.department[0].name;
                this.params.department_id = val.department[0].id;
                this.search(1);
            },
//            时间搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },
//            清空部门搜索
            clearSelect(){
                if (this.selected === '') {
                    return;
                }
                this.params.department_id = '';
                this.selected = '';
                this.search(1);
            },
//            部门归属
            distribution (){
                $('#mate_department').modal({backdrop: 'static',});
            },
//            重置
            resetting (){
                this.params.keyword = '';
                this.params.department_id = '';
                this.selected = '';
                this.search(1);
            },
//            编辑金额
            able_show (val, ref, id){
                if (val === 1) {
                    this.reference = ref;
                    this.isActive = id;
                } else if (val === 2) {
                    this.reference = '';
                    this.isActive = '';
                }
            },
//            保存金额编辑
            able_save (id){
                this.$http.post('finance/house/price/' + id, {
                    price: this.reference
                }).then((res) => {
                    if (res.data.code === '90000') {
                        this.search(this.params.page);
                        this.reference = '';
                        this.isActive = '';
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            选中
            pitchId (rul, ev){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(rul);
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
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
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    input, select {
        margin-bottom: 0;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }

    .label {
        display: inline-block;
        width: 80px;
    }

    .selected {
        background: #FFFF6F !important;
    }

    .freeze {
        background-color: #D6D6D6;
        color: #E4393C;
    }

    thead > tr > th.text-center {
        vertical-align: middle;
    }
</style>
