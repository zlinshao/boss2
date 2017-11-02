<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/periodicFor">周期表</router-link>
            </li>
            <li>业绩</li>
        </ol>
        <section class="panel">
            <div class="panel-body clearFix">

                <div v-if="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" v-model="params.typical"
                                    @change="search(1)">
                                <option value="">全部</option>
                                <option v-for="(list,index) in dict.typical" :value="index">{{list}}</option>
                            </select>
                        </div>
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
                            <input type="text" class="form-control" placeholder="业务员姓名" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="selectHouse">选择地址搜索</a>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="resetting">重置</a>
                        </div>
                    </form>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5 @click="periodicEdit"><a>编辑</a></h5>
                        </li>
                        <li v-if="simple_status == 1">
                            <h5 @click="periodic_rev"><a>充公选择</a></h5>
                        </li>

                    </ul>
                </div>
            </div>
        </section>
        <div class="col-xs-12" style="padding: 0;margin: 15px 0;">
            <section class="panel">
                <div class="panel-body">
                    <div class="tab-content">
                        <div id="company" class="tab-pane active">
                            <!--公司-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <tbody class="text-center">
                                    <tr class="text-center">
                                        <th></th>
                                        <th class="text-center width100">发喜报日期</th>
                                        <th class="text-center width100">房屋地址</th>
                                        <th class="text-center width80">收房状态</th>
                                        <th class="text-center width80">付款方式</th>
                                        <th class="text-center width80">签约月数</th>
                                        <th class="text-center width80">单价</th>
                                        <th class="text-center width100">总金额</th>
                                        <th class="text-center width80">空置期</th>
                                        <th class="text-center width80">中介费</th>
                                        <th class="text-center width80">实际业绩</th>
                                        <th class="text-center width120">溢出业绩</th>
                                        <th class="text-center width80">名称</th>
                                        <th class="text-center width100">所属部门</th>
                                        <th class="text-center width50">备注</th>
                                    </tr>
                                    <tr class="text-center" v-for="item in detail_list">
                                        <td>
                                            <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                            'c_off':pitch.indexOf(item.id)==-1}"
                                                   @click.prevent="checked_id(item.id, $event, item.simple_confiscation)">
                                                <input type="checkbox" class="pull-left"
                                                       :checked="pitch.indexOf(item.id) > -1">
                                            </label>
                                        </td>
                                        <td>{{item.generate_date}}</td>
                                        <td>
                                            {{item.address}}
                                            <a class="text-danger" @click="confiscate(item.simple_confiscation.id)"
                                               v-if="item.simple_confiscation != null">充公</a>
                                        </td>
                                        <td>{{dict.typical[item.typical]}}</td>
                                        <td>{{item.pay_type}}个月付</td>
                                        <td>{{item.months}}个月</td>
                                        <td>{{item.prices[0]}}</td>
                                        <td>{{item.total_price}}</td>
                                        <td>{{item.vacancy}}</td>
                                        <td>2000</td>
                                        <td>{{item.achv_real}}</td>
                                        <td @mouseenter="enter_overflow(item.id)"
                                            @mouseleave="enter_overflow('')" style="cursor: pointer;">
                                            {{item.achv_overflow}}<br>
                                            <span style="color: #aaaaaa;"
                                                  v-if="item.id == isActive">{{item.achv_overflow_full}}</span>
                                        </td>
                                        <td>{{item.staff_name}}</td>
                                        <td>{{item.district.name}}</td>
                                        <td>
                                            <i class="fa fa-book" v-if="item.remark != ''"
                                               @click="lookRemark(item.remark)"></i>
                                        </td>
                                    </tr>
                                    <tr class="text-center" v-if="isShow">
                                        <td colspan="17" style="font-size: 22px;">暂无数据......</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <div role="dialog" class="modal fade bs-example-modal-sm" id="lookRemark">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">备注信息</h4>
                    </div>
                    <div class="modal-body">
                        <textarea class="form-control" v-model="lookRem" readonly></textarea>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-primary btn-md">确认
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!--分页-->
        <Page @pag="search" :pg="paging" :beforePage="beforePage"></Page>

        <!--人资筛选-->
        <Organization :configure="configure" @Staff="selectDateSend" :msg="msg"></Organization>

        <!--充公选择-->
        <PeriodicRevise :msg="blames" :id="periodic_id" @confiscate="personalList"></PeriodicRevise>

        <!--充公详情-->
        <PeriodicInfo :msg="confiscate_info"></PeriodicInfo>

        <!--房屋地址搜索-->
        <SelectHouse @House="getHouse" :house_status="'1'"></SelectHouse>

        <!--编辑-->
        <PeriodicEdit @confiscate="personalList" :msg="revise_info"></PeriodicEdit>

    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import SelectHouse from '../common/selectPayHouse.vue'
    import PeriodicEdit from './periodicEdit.vue'
    import PeriodicRevise from './periodicRevise.vue'       //充公
    import PeriodicInfo from './periodic_info.vue'          //充公详情
    import Page from '../common/page.vue'
    import Organization from  '../finance/organization/organization_choose.vue'     //部门搜索
    import Confirm from '../common/confirm.vue'
    export default {
        components: {DatePicker, Organization, Page, SelectHouse, PeriodicRevise, PeriodicInfo, PeriodicEdit},
        data (){
            return {
                isActive: '',
                simple_status: '',              //选择充公状态
                revise_info: {},                //编辑
                dict: {},
                periodic_id: '',                //单条业绩ID
                confiscate_info: '',            //充公详情
                blames: {},                     //认责人
                pitch: [],
                isShow: false,
                detail_list: [],                //详情列表
                currentDate: [],                //日期组件参数
                dateConfigure: [
                    {
                        range: true,            //日期组件参数
                        needHour: false
                    }
                ],
                msg: {
                    period: '',                 //周期
                    time: '',                   //时间
                },
                configure: {},                  //部门组件参数
                selected: '',                   //部门搜索
                params: {
                    typical: '',
                    department_id: '',
                    generate_date: '',
                    house_id: '',
                    search: '',
                    page: 1,
                },
                paging: '',                     //总页数
                beforePage: 1,                  //当前页
                lookRem: '',                    //备注内容
                addRemark: '',
            }
        },
        mounted (){
            this.params.department_id = this.$route.query.sear.department_id;
            this.params.generate_date = this.$route.query.sear.generate_date;
            this.selected = this.$route.query.department;
            let time = this.$route.query.sear.generate_date;
            if (time) {
                this.currentDate = [time.split('to')[0], time.split('to')[1]];
            }
            this.params.search = this.$route.query.sear.staff_name;
            this.personalList(1);
        },

        methods: {
//            重置
            resetting (){
                this.params.typical = '';
                this.params.department_id = '';
                this.selected = '';
                this.params.generate_date = '';
//                this.params.house_id = '';
                this.params.search = '';
                this.params.page = 1;
                this.search(1);
            },
            enter_overflow (val){
                this.isActive = val;
            },
//            切换标签页清空
            changing_over (){
                this.pitch = [];
            },
//            充公
            periodic_rev (){
                this.periodic_id = String(this.pitch);
                this.$http.get('achv/commission/blame/' + this.pitch).then((res) => {
                    if (res.data.code === '70010') {
                        this.blames = res.data.data;
                        $('#periodicRevise').modal({backdrop: 'static',});
                    }
                });
            },
//            充公详情
            confiscate (val){
                this.$http.get('achv/confiscation/' + val).then((res) => {
                    this.confiscate_info = res.data.data;
                    $('#periodicInfo').modal({backdrop: 'static'});
                });
            },
//            搜索
            search (val){
                this.personalList(val);
            },

//            列表
            personalList (val){
                this.$http.get('salary/Commission/dict').then((res) => {
                    this.dict = res.data;

                    this.beforePage = val;
                    this.params.page = val;
                    this.paging = '';
                    this.pitch = [];
                    this.detail_list = [];
                    this.$http.get('achv/commission', {
                        params: this.params
                    }).then((res) => {
                        if (res.data.code === '70010') {
                            this.paging = res.data.data.pages;
                            this.isShow = false;
                            this.detail_list = res.data.data.data;
                        } else {
                            this.isShow = true;
                        }
                    })
                });
            },
//            编辑
            periodicEdit (){
                this.$http.get('achv/commission/' + this.pitch).then((res) => {
                    this.revise_info = res.data.data;
                    $('#periodicEdit').modal({backdrop: 'static'})
                });
            },
//            查看备注
            lookRemark (val){
                this.lookRem = val;
                $('#lookRemark').modal({backdrop: 'static',});
            },

//            日期搜索
            getDate(data){
                this.params.generate_date = data;
                this.search(1);
            },

//            部门搜索
            select(){
                this.$http.get('salary/calendar/current').then((res) => {
                    this.msg.time = res.data.data.month;
                    this.msg.period = res.data.data.rank;
                    $('.OrganizationChoose:eq(0)').modal({backdrop: 'static',});
                    this.configure = {type: 'department', length: 1};
                });
            },

//            部门搜索
            selectDateSend(val){
                this.selected = val.department[0].name;
                this.params.department_id = val.department[0].id;
                this.search(1);
            },
//              选择房屋
            selectHouse(){
                $('.selectHouse:eq(0)').modal('show');
            },
//              房屋信息
            getHouse(data){
//                this.params.house_id = data.id;
                this.params.search = data.address;
                this.search(1);
            },
//            清空部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = '';
                this.selected = '';
                this.search(1);
            },
//            选中
            checked_id (rul, ev, simple){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch = [];
                if (simple === null) {
                    this.simple_status = 1;
                } else {
                    this.simple_status = '';
                }
                if (evInput.checked) {
                    this.pitch.push(rul);
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .panel, .table {
        margin-bottom: 0;
    }
</style>
