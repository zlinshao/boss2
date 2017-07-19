<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">个人</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <!--<div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">全部</option>
                            <option value="1">鸡腿</option>
                            <option value="2">梦想</option>
                        </select>
                    </div>-->
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                    </div>


                    <div class="dropdown form-group">
                        <select name="" class="form-control" v-model="params.periodic" style="margin: 0 15px 0 0;">
                            <option :value="value" v-for="(key,value) in dict">{{key}}</option>
                        </select>
                    </div>
                    <div class="input-group" @click="search">
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
        </section>
        <!--<div class="panel col-lg-12">-->
            <!--<form class="form-inline clearFix" role="form">-->
                <!--&lt;!&ndash;<div class="dropdown form-group">-->
                    <!--<select name="" class="form-control">-->
                        <!--<option value="">全部</option>-->
                        <!--<option value="1">鸡腿</option>-->
                        <!--<option value="2">梦想</option>-->
                    <!--</select>-->
                <!--</div>&ndash;&gt;-->
                <!--<div class="padd">-->
                    <!--<DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>-->
                <!--</div>-->
               <!---->

                <!--<div class="dropdown form-group">-->
                    <!--<select name="" class="form-control" v-model="params.periodic">-->
                        <!--<option :value="value" v-for="(key,value) in dict">{{key}}</option>-->
                    <!--</select>-->
                <!--</div>-->
                <!--<div class="input-group" style="margin-bottom: 18px;" @click="search">-->
                    <!--<button type="button" class="btn btn-success">搜索</button>-->
                <!--</div>-->
            <!--</form>-->
            <!--<div class="tagsinput" v-show="filtrate.departmentList.length!=0">-->
                <!--<h4>部门</h4>-->
                <!--<span class="tag" v-for="item in filtrate.departmentList">-->
                        <!--<span >{{item.name}}&nbsp;&nbsp;</span>-->
                        <!--<a class="tagsinput-remove-link" @click="deleteDepartment(item)"></a>-->
                    <!--</span>-->
            <!--</div>-->
            <!--<div class="tagsinput " v-show="filtrate.staffList.length!=0">-->
                <!--<h4>员工</h4>-->
                <!--<span class="tag" v-for="item in filtrate.staffList">-->
                        <!--<span >{{item.name}}&nbsp;&nbsp;</span>-->
                        <!--<a class="tagsinput-remove-link" @click="deleteStaff(item)"></a>-->
                    <!--</span>-->
            <!--</div>-->

        <!--</div>-->

        <!--表格-->

        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive">
                    <table class="table table-striped table-advance">
                        <thead>
                        <tr>
                            <!--<th class="text-center">城市</th>-->
                            <!--<th class="text-center">部门</th>-->
                            <!--<th class="text-center">组长</th>-->
                            <th class="text-center">组员</th>
                            <th class="text-center">实际业绩</th>
                            <th class="text-center">溢出业绩</th>
                            <th class="text-center">收房/套</th>
                            <th class="text-center">租房/套</th>
                            <th class="text-center">绩效套餐</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData" v-show="myData.length!=0">
                            <td>{{item.real_name}}</td>
                            <td>{{item.real_achv_sum}}</td>
                            <td>{{item.overflow_achv_sum}}</td>
                            <td>{{item.collect}}</td>
                            <td>{{item.rent}}</td>
                            <td></td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="6">暂无数据...</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
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
    div.padd {
        display: inline-block;
        padding: 0 15px 0 0;
    }
</style>
<script>
    import Page from '../../common/page.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page,STAFF,Status,DatePicker},
        data(){
            return {
                isShow : false,
                dict : '',
                params : {
//                    department_id : [],
//                    staff_id : [],
                    month : '',
                    periodic : 1
                },
                myData : [],
                paging : '',
                page : '',

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
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
//                selectConfigure : '',
                configure : {},
                dateConfigure : [
                    {
                        range : true,
                        needHour : true
                    }
                ]
            }
        },
        mounted (){
            this.$http.get('periodic/range')
                .then(
                    (res) => {
                        this.dict = res.data.data;
                        this.perPersonList();
                    }
                );

        },
        updated (){

//            时间选择
            this.remindData();
        },
        watch : {
            'params.month':{
                handler(val,oldVal){
                    console.log(val);
                    let that = this;
                    this.$http.get('periodic/range?month='+val)
                        .then(
                            (res) => {
//                                console.log(that.params.month)
                                that.dict = res.data.data;
                                that.params.periodic = 1
//                                console.log(that.dict)
//                                console.log(res.data.data)
                            }
                        )
//                    console.log(oldVal)
                }
            }
        },
        methods : {
            perPersonList (){
                this.$http.get('revenue/periodic/ranking')
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code == 18300){
                                this.paging = res.data.data.pages;
                                this.myData = res.data.data.data;
                                this.isShow = false;
                            } else {
                                this.isShow = true;
                            }

                        }
                    );
                this.$http.get('periodic/now')
                    .then(
                        (res) => this.params.periodic = res.data.data
                    );
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm',
                    todayBtn: 1,
                    autoclose: 1,
                    clearBtn: true,                     //清除按钮
                    endDate: new Date(),
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    this.params.month = ev.target.value;
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getData(data){
                // 页数
//                console.log(data);
                this.page = data;
                this.search();
            },
            search(){
                console.log(this.params);
                this.$http.get('revenue/periodic/ranking?page='+this.page,{
                    params : this.params
                })
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code == 18300){
                                this.paging = res.data.data.pages;
                                this.myData = res.data.data.data;
                                this.isShow = false;
                            } else {
                                this.myData = [];
                                this.isShow = true;
                                this.paging = '';
                            }

                        }
                    )
            },
            select(){

//                this.selectConfigure = 'all';
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

                    // all
//                    alert('all');
                this.filtrate.departmentList = val.department;
                this.filtrate.staffList = val.staff;
                console.log(this.filtrate.departmentList);
                console.log(this.params.department_id);
                for(let j=0;j<val.department.length;j++){
                    if($.inArray(val.department[j].id,this.params.department_id)===-1){
                        this.params.department_id.push(val.department[j].id);
                        console.log(this.filtrate.departmentList);
                        console.log(this.params.department_id);
                    }else {
                        this.info.error = '成员已经存在';
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        },2000);
                    }
                }
                for(let i=0;i<val.staff.length;i++){
                    if($.inArray(val.staff[i].id,this.params.staff_id)===-1){
                        this.params.staff_id.push(val.staff[i].id);
                    }else {
                        this.info.error = '成员已经存在';
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
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
                this.params.department_id=this.params.department_id.filter((x)=>x!=item.id)
            },
            getDate(data){
                console.log(data)
            }
        }
    }
</script>