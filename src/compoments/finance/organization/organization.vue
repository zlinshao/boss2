<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">业绩生成</li>
        </ol>

        <div class="row">
            <div class="col-md-3">
                <section class="panel">
                    <div class="panel-body">
                        <h5 style="margin-top: 8px;padding: 0" class="clearfix">
                            <div class="col-sm-4" style="margin-right: 6px;padding: 0;height: 39px;">
                                <input @click="remindData" type="text" placeholder="选择日期"
                                       class="form-control" id="form_datetime" v-model="msg.time" readonly>
                                <!--<DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"-->
                                <!--@sendDate="getDate" :idName="'linshao'"></DatePicker>-->
                            </div>
                            <div class="col-sm-4" style="padding: 0;margin-right: 6px;height: 39px;">
                                <select class="form-control" style="padding: 6px 8px;margin-bottom: 0"
                                        v-model="msg.period" @click="getDepartementList">
                                    <option v-for="key in 6" :value="key">第{{key}}周期</option>
                                </select>
                            </div>
                            <div class="pull-right" style="margin-right: 6px;">
                                <button class="btn btn-success" @click="create_generate">生成</button>
                            </div>

                        </h5>
                        <vue-ztree :list.sync='departmentList' :func='departmentClick'
                                   :contextmenu='rightClick' :is-open='true'>
                        </vue-ztree>
                    </div>
                </section>
            </div>
            <div class="col-md-9">
                <AchievementCreate :msg="msg" :scope_time="scope_time"></AchievementCreate>
            </div>
        </div>
        <editDpm :department_name="department_name" :department_id="department_id" @editDdp="changeDpm"></editDpm>

        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

        <AddDpm :department_name="department_name" :parentDpartmentId='parentDpartmentId'
                :msg="msg" @success='changeDpm'></AddDpm>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../../common/status.vue'
    import vueZtree from './vueTree.vue'
    import editDpm from  './editDpm.vue';
    import Confirm from '../../common/confirm.vue'
    import DatePicker from '../../common/datePicker.vue'
    import AddDpm from  './addDubordinateDpm.vue'
    import AchievementCreate from  './achievementCreate.vue'
    export default {
        components: {vueZtree, editDpm, Confirm, AddDpm, DatePicker, AchievementCreate, Status},
        data () {
            return {
                departmentList: [],         //部门数据
                department_id: '',          //部门id
                msg: {
                    period: '',             //周期
                    time: '',               //时间
                    leader_id: '',          //负责人
                },
                scope_time: '',             //获取时间范围
                department_name: '',        //部门名称
                parentDpartmentId: '',      //父部门ID
                confirmMsg: [],             //confirm信息

                currentDate: [],
                dateConfigure: [
                    {
                        range: false,
                        needHour: false,
                    }
                ],
                info: {                     //提示信息
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                noPosition: false,          //有无相应职位
                isShowPic: false,
                oneAsk: '',                 //时间请求
            }
        },
        created(){
            this.$http.get('salary/calendar/current').then((res) => {
                this.msg.time = res.data.data.month;
                this.msg.period = res.data.data.rank;
                this.getDepartementList();
                this.remindData();
            })
        },
        methods: {
//            范围筛选
            range_time (){
                this.$http.get('achv/calendar', {
                    params: {
                        month: this.msg.time,
                        rank: this.msg.period,
                    }
                }).then((res) => {
                    this.scope_time = res.data.data[0] + 'to' + res.data.data[1];
                });
            },
//            生成业绩
            create_generate (){
                this.$http.post('achv/commission/generate', {
                    month: this.msg.time,
                    rank: this.msg.period,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
//            组织架构时间
            remindData (){
                this.oneAsk = true;
                $('#form_datetime').datetimepicker({
                    format: 'yyyy-mm',
                    startView: 3,
                    minView: 3,
                    language: 'zh-CN',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    pickerPosition: 'bottom-right',
                }).on('changeDate', function (ev) {
                    if (this.oneAsk === true) {
                        this.msg.time = ev.target.value;
                        this.getDepartementList();
                        this.oneAsk = false;
                    }
                }.bind(this));
            },
////            时间选择
//            getDate (date){
//                if (this.msg.time !== date.substring(0, 7)) {
//                    this.msg.time = date.substring(0, 7);
//                    this.getDepartementList();
//                }
//            },
//            默认时间/周期
            getDepartementList(){
                this.$http.get('achv/department', {
                    params: {
                        month: this.msg.time,
                        rank: this.msg.period,
                    }
                }).then((res) => {
                    if (res.data.code === '70040') {
                        this.departmentList = res.data.data.data;
                        this.range_time();
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            //****************组织架构**********************
            // 点击节点
            departmentClick(val) {
                this.department_id = val.id;
                this.department_name = val.name;
                this.parentDpartmentId = '';
                switch (val.contentHtml) {
                    case '编辑部门' :
                        $('#myModalEditDpm').modal('show');
                        break;
                    case '新建下级部门' :
                        this.parentDpartmentId = val.id;
                        $('#myModalAddDpm').modal('show');
                        break;
                    case '删除部门' :
                        this.confirmMsg = {msg: '您确定删除此部门吗'};
                        $('#confirm').modal('show');
                        this.msgFlag = 'deleteDepartment';
                        break;
                }

            },
//            删除部门
            getConfirm(){
                this.$http.post('achv/department/delete/' + this.department_id).then((res) => {
                    if (res.data.code === '70000') {
                        this.getDepartementList();
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            // 右击事件
            rightClick() {
                console.log("rightClick");
            },
            changeDpm(){
                this.getDepartementList();
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
        },
    }
</script>
<style scoped>
    h5 {
        font-size: 18px;
        color: #333333;
    }

    @media screen and (min-width: 992px) {
        .panel {
            min-height: 780px;
        }
    }

    .panel-body > h5 {
        border-bottom: 2px solid #dddddd;
        padding: 0 0 8px 6px;
        margin-top: 0;
    }

    .addPosition {
        display: block;
        text-align: center;
        margin-top: 50px;
    }

    .info {
        display: block;
        text-align: center;
        margin-top: 20px;
    }
</style>