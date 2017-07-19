<template>
    <div>
        <ol class="breadcrumb">
            <li>定位签到</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <!--<div class="input-group bootstrap-timepicker" style="margin: 0 15px 0 0;">
                        <button class="btn btn-primary" type="button" @click="select">筛选员工</button>
                    </div>-->
                    <div class="input-group bootstrap-timepicker" style="margin: 0 15px 0 0;">
                        <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                    </div>
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                    </div>



                    <div class="form-group">
                        <button type="button" class="btn btn-success" @click="search">搜索</button>
                    </div>

                    <!--<div class="form-group pull-right">
                        <a class="btn btn-success" data-toggle="modal" data-target="#myModal">
                            立即签到
                        </a>
                    </div>-->
                </form>
                <div class="tagsinput" v-show="filtrate.departmentList.length!=0">
                    <h4>部门</h4>
                    <span class="tag" v-for="item in filtrate.departmentList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteDepartment(item)"></a>
                    </span>
                </div>
                <div class="tagsinput " v-show="filtrate.staffList.length!=0">
                    <h4>员工</h4>
                    <span class="tag" v-for="item in filtrate.staffList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteStaff(item)"></a>
                    </span>
                </div>
            </div>
        </section>
        <!--提示信息-->
        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>
<style scoped>
    div.padd {
        display: inline-block;
        padding: 0 15px 0 0;
    }
    select{
        margin-bottom: 0;
    }
    .tagsinput {
        border: none;
    }

    .tagsinput h4 {
        display: inline-block;
        margin: 0;
    }
</style>
<script>
    import STAFF from  '../common/organization/selectStaff.vue'
    import DatePicker from '../common/datePicker.vue'
    import Status from '../common/status.vue';
    export default{
        components: {DatePicker,STAFF,Status},
        data(){
            return {
                dateConfigure : [
                    {
                        range : true,
                        needHour : true
                    }
                ],
                configure : {},
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
                params :{
                    department_id : [],
                    staff_id : [],
                    date_range : '',
                    search : ''
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
        methods: {
            search(){
                console.log(this.params);
            },
            getDate(data){
                // 时间
                console.log(data);
                this.params.date_range = data;
            },
            select(){
                this.configure={type:'all',class:'selectType'};
                $('#selectCustom').modal('show');
            },
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for (let j = 0; j < val.department.length; j++) {
                    if ($.inArray(val.department[j].id, this.params.department_id) === -1) {
                        this.filtrate.departmentList.push(val.department[j]);
                        this.params.department_id.push(val.department[j].id)
                    } else {
                        this.info.error = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }

                }
                for (let i = 0; i < val.staff.length; i++) {
                    if ($.inArray(val.staff[i].id, this.params.staff_id) === -1) {
                        this.filtrate.staffList.push(val.staff[i]);
                        this.params.staff_id.push(val.staff[i].id)
                    } else {
                        this.info.error = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }

                }
//                this.filtrate.departmentList = val.department;
//                this.filtrate.staffList = val.staff;

            },
            deleteStaff(item){
                this.filtrate.staffList = this.filtrate.staffList.filter((x) => x !== item);
                this.params.staff_id = this.params.staff_id.filter((x) => x != item.id)
            },
            deleteDepartment(item){
                this.filtrate.departmentList = this.filtrate.departmentList.filter((x) => x !== item);
                this.params.department_id = this.params.department_id.filter((x) => x != item.id)
            },
        }
    }
</script>