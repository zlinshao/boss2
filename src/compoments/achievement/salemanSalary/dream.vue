<template>
    <div>
        <ol class="breadcrumb">
            <li>业务员工资</li>
            <li class="active">梦想包</li>
        </ol>

        <div class="panel col-lg-12">
            <form class="form-inline clearFix" role="form">
                <div class="input-group bootstrap-timepicker">
                    <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                </div>
                <div class="form-group datetime">
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime" v-model="params.from">
                    </label>
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime" v-model="params.to">
                    </label>
                </div>
                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" @keydown.enter.prevent="search" v-model="params.search">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                </div>
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
        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">城市</th>
                        <th class="text-center">组别</th>
                        <th class="text-center">组长</th>
                        <th class="text-center">组员</th>
                        <th class="text-center">绩效套餐</th>
                        <th class="text-center">实际业绩</th>
                        <th class="text-center">溢出业绩</th>
                        <th class="text-center">溢出工资</th>
                        <th class="text-center">价格差奖罚</th>
                        <th class="text-center">中介费用</th>
                        <th class="text-center">业绩工资</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>南京</td>
                        <td>仙林一组</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>


        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

    </div>
</template>
<style scoped>
    .tagsinput{
        border:none;
    }
    h4{
        display: inline-block;
        margin: 0;
    }
</style>
<script>
    import STAFF from  '../../common/organization/selectStaff.vue'
    export default{
        components: {STAFF},
        data(){
            return {
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
                selectConfigure : '',
                configure : {},
                params : {
                    department_id : [],
                    staff_id : [],
                    from : '',
                    to : '',
                    search : ''
                }
            }
        },
        methods: {
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder === '开始时间'){
                        this.params.from = ev.target.value;
                    } else if (ev.target.placeholder === '结束时间') {
                        this.params.to = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            search(){

            },
            select(){

                this.selectConfigure = 'all';
                $('#selectCustom').modal({backdrop: 'static',});
                this.configure={type:'all',class:'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(this.configure);
//                console.log(this.selectConfigure)
                console.log(val);
                if (this.selectConfigure=='all'){
                    // all
//                    alert('all');
                    this.receive(val);
                    this.filtrate.departmentList = val.department;
                    this.filtrate.staffList = val.staff;
                } else if (this.selectConfigure=='department'){
                    // 选择的是部门
//                    alert('部门');
                    this.formData.department_id = val.department[0];
//                    console.log(this.formData.department_id)
                } else {
                    // 选择员工
//                    alert('员工');
                    this.formData.staff_id = val.staff[0];
//                    console.log(this.formData.staff_id)
                }

            },
            receive(val){
                for(let j=0;j<val.department.length;j++){
                    if($.inArray(val.department[j].id,this.params.department_id)===-1){
                        this.filtrate.departmentList.push(val.department[j]);
                        this.params.department_id.push(val.department[j].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
                for(let i=0;i<val.staff.length;i++){
                    if($.inArray(val.staff[i].id,this.params.staff_id)===-1){
                        console.log()
                        this.filtrate.staffList.push(val.staff[i]);
                        this.params.staff_id.push(val.staff[i].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
            },
            deleteStaff(item){
                this.filtrate.staffList=this.filtrate.staffList.filter((x)=>x!==item);
                this.params.staff_id=this.params.staff_id.filter((x)=>x!=item.id)
            },
            deleteDepartment(item){
                this.filtrate.departmentList=this.filtrate.departmentList.filter((x)=>x!==item);
                this.params.department_id=this.params.staff_id.filter((x)=>x!=item.id)
            }
        }
    }
</script>