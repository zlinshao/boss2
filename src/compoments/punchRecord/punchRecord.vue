<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <div>
                    <!--<div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px;">-->
                    <!--<div class="input-group">-->
                    <!--<input type="text" @click="dis_staff"-->
                    <!--class="form-control" v-model="staff_man"-->
                    <!--placeholder="请选择员工" readonly>-->
                    <!--<span class="input-group-btn">-->
                    <!--<button class="btn btn-warning" type="button">清空</button>-->
                    <!--</span>-->
                    <!--</div>-->
                    <!--</div>-->
                    <div class="pro-sort" v-show="false">
                        <input type="text" @click="dis_staff"
                               class="form-control" v-model="staff_man"
                               placeholder="请选择员工" readonly>
                    </div>
                    <div class="pro-sort" v-show="false">
                        <input type="text" @click="dis_branch"
                               class="form-control" v-model="department_branch"
                               placeholder="请选择部门" readonly>
                    </div>
                    <div class="pro-sort">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                    @sendDate="getDate"></DatePicker>
                    </div>
                </div>
            </div>
        </section>
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>员工姓名</th>
                            <th class="text-center">性别</th>
                            <th class="text-center">部门</th>
                            <th class="text-center">打卡时间</th>
                            <th class="text-center">打卡情况</th>
                            <th class="text-center">打卡地点</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in punch_list">
                            <td class="width100">
                                <img :src="list.avatar" class="head" v-if="list.avatar !== ''">
                                <img src="../../assets/img/head.png" class="head" v-if="list.avatar === ''">
                                {{list.real_name}}
                            </td>
                            <td class="text-center width50">
                                <span v-if="list.gender === 1">男</span>
                                <span v-if="list.gender === 2">女</span>
                            </td>
                            <td class="text-center width180">{{list.name}}</td>
                            <td class="text-center width155">{{list.userCheckTime}}</td>
                            <td class="text-center width80">
                                <label v-if="select_info.timeResult[list.timeResult] === '正常'">
                                    {{select_info.timeResult[list.timeResult]}}
                                </label>
                                <label v-if="select_info.timeResult[list.timeResult] !== '正常'"
                                       class="label label-warning">{{select_info.timeResult[list.timeResult]}}
                                </label>
                            </td>
                            <td class="text-center width80">
                                <label v-if="select_info.locationResult[list.locationResult] === '范围内'">
                                    {{select_info.locationResult[list.locationResult]}}
                                </label>
                                <label v-if="select_info.locationResult[list.locationResult] !== '范围内'"
                                       class="label label-warning">
                                    {{select_info.locationResult[list.locationResult]}}
                                </label>

                            </td>
                        </tr>
                        <tr v-show="isShow">
                            <td colspan="6" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Status :state="info"></Status>

        <!--分页-->
        <Page @pag="punch_record" :pg="paging" :beforePage="beforePage"></Page>

        <!--人资管理-->
        <SelectStaff @Staff="selectDateSend" :configure="configure"></SelectStaff>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'                   //时间
    import Status from '../common/status.vue'                           //提示信息
    import SelectStaff from '../common/organization/selectStaff.vue'    //人资管理
    import Page from '../common/page.vue'                               //分页
    export default {
        components: {Page, SelectStaff, DatePicker, Status},
        data (){
            return {
                dateConfigure: [{
                    range: true, // 是否选择范围
                    needHour: false // 是否需要选择小时
                }],
                currentDate: [],
                time: '',
                isActive: '',                   //详情
                isShow: '',                     //暂无数据
                beforePage: 1,                  //当前页数
                select_info: {},                //字典
                punch_list: [],                 //打卡记录列表
                paging: '',                     //总页数
                configure: [],
                staff_man: [],                  //员工姓名
                staff_id: [],                   //员工ID
                department_branch: [],          //部门
                department_id: [],              //部门ID
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        mounted (){
            this.punch_record(1);
        },
        updated (){
            this.remindTimes();
        },
        watch: {
            'startTimes': {
                deep: true,
                handler(val, oldVal){
                    this.punch_record(1);
                }
            },
            'endTime': {
                deep: true,
                handler(val, oldVal){
                    this.punch_record(1);
                }
            },
        },
        methods: {
//            时间
            getDate(data){
                this.time = data;
                this.punch_record(1);
            },

//            组织架构员工
            dis_staff (){
                $('#selectCustom').modal('show');
                this.configure = {
                    length: 1,
                    class: 'amount'
                };
            },
//            组织架构部门
            dis_branch (){
                $('#selectCustom').modal('show');
                this.configure = {
                    class: 'selectType',
                    type: 'department'
                };
            },

//            获得派发对象
            selectDateSend (val){
                if (val.department.length === 0) {
                    this.empty_staff();
                    this.staff_man.push(val.staff[0].name);
                    this.staff_id.push(val.staff[0].id);
                    this.punch_record(1);
                } else if (val.staff.length === 0) {
                    this.empty_branch();
                    this.department_branch.push(val.department[0].name);
                    this.department_id.push(val.department[0].id);
                    this.punch_record(1);
                }

            },

//            清空员工ID
            empty_staff (){
                this.staff_man = [];
                this.staff_id = [];
            },
//            清空部门ID
            empty_branch (){
                this.department_branch = [];
                this.department_id = [];
            },

//            详细内容
            more_content (val){
                this.isActive = val;
            },

//            打卡记录
            punch_record (val, pun){
                if (pun === 'resetting') {
                    this.staff_man = [];
                    this.staff_id = [];
                    this.department_branch = [];
                    this.department_id = [];
                }
                this.beforePage = val;
                this.$http.get('clock/index/dict').then((res) => {
                    this.select_info = res.data.dict;

                    this.$http.post('clock/index/index/pages/' + val, {
                        staff_id: String(this.staff_id),
                        department_id: String(this.department_id),
                        time: this.time
                    }).then((res) => {
                        this.paging = '';
                        if (res.data.code === '30000') {
                            this.punch_list = res.data.data.data;
                            this.paging = res.data.data.pages;
                            this.isShow = false;
                        } else {
                            this.punch_list = [];
                            this.isShow = true;
                        }
                    })
                });
            }
        }
    }
</script>


<style scoped>
    .width100 {
        min-width: 100px;
    }

    .width180 {
        min-width: 180px;
    }

    .width155 {
        min-width: 155px;
    }

    .width80 {
        min-width: 80px;
    }

    .width50 {
        min-width: 50px;
    }

    .pro-sort {
        padding-left: 10px;
        display: inline-block;
        height: 39px;
    }

    .head {
        width: 33px;
        height: 33px;
        border-radius: 50%;
    }

    input {
        margin-bottom: 0;
    }

    .label {
        display: inline-block;
        width: 70px;
    }

</style>
