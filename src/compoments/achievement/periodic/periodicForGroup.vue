<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">小组</li>
        </ol>

        <div class="panel col-lg-12">
            <form class="form-inline clearFix" role="form">


                <div class="input-group bootstrap-timepicker">
                    <button class="btn btn-primary" type="button" @click="select">筛选部门</button>
                </div>
                <div class="form-group datetime">
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                    </label>
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                    </label>
                </div>

                <div class="input-group" style="margin-bottom: 18px;" @click="search">
                    <button type="button" class="btn btn-success">搜索</button>
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
                        <th class="text-center">小组</th>
                        <th class="text-center">组长</th>
                        <th class="text-center">实际业绩</th>
                        <th class="text-center">待定业绩</th>
                        <th class="text-center">差额</th>
                        <th class="text-center">收房/套</th>
                        <th class="text-center">租房/套</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr class="text-center">
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                        <td>啊啊啊</td>
                    </tr>


                    </tbody>
                </table>
            </section>
        </div>
        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>
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
    import Page from '../../common/page.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'

    export default{
        components: {Page,STAFF},
        data(){
            return {
                params : {
                    city : 1,
                    startDataTime : '',
                    finishDataTime : ''
                },
                myData : [],
                paging : '',

                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
                selectConfigure : '',
                configure : {},
            }
        },
        created (){
            this.perGroupList();
        },
        updated (){
//            时间选择
            this.remindData();
        },
        methods : {
            perGroupList (){
                this.$http.get('json/periodicGroup.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.myData = res.data.data.group;
                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })
            },
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
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getData(data){
                // 页数
                console.log(data);
            },
            search(){
                console.log(this.params);
            },
            select(){

                this.selectConfigure = 'all';
                $('#selectCustom').modal({backdrop: 'static',});
                this.configure={type:'department',class:'selectType'};
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
            },
        }
    }
</script>