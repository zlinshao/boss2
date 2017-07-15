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
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="选择月份" class="form-control form_datetime">
                    </label>
                </div>

                <div class="dropdown form-group">
                    <select name="" class="form-control" v-model="params.periodic">
                        <option :value="value" v-for="(key,value) in dict">{{key}}</option>
                    </select>
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
                        <th class="text-center">部门</th>
                        <th class="text-center">组长</th>
                        <th class="text-center">实际业绩</th>
                        <th class="text-center">溢出业绩</th>
                        <!--<th class="text-center">差额</th>-->
                        <th class="text-center">收房/套</th>
                        <th class="text-center">租房/套</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr v-show="myData.length!=0" class="text-center" v-for="item in myData" @click="showGroupDetail(item.department_id,item.city,item.department_name)">
                        <td>{{item.city}}</td>
                        <td>{{item.department_name}}</td>
                        <td>{{item.marshal}}</td>
                        <td>{{item.real_achv}}</td>
                        <td>{{item.overflow_achv}}</td>
                        <!--<td>差额</td>-->
                        <td>{{item.collect}}</td>
                        <td>{{item.rent}}</td>
                    </tr>
                    <tr v-show="isShow" class="text-center">
                        <td colspan="7">暂无数据...</td>
                    </tr>


                    </tbody>
                </table>
            </section>
        </div>

        <!--modal-->
        <div class="modal fade bs-example-modal-lg" id="showDetail" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{city}}&emsp;{{department_name}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="col-lg-12">
                            <section class="panel table table-responsive">
                                <table class="table table-striped table-hover table-advance">
                                    <thead>
                                    <tr>
                                        <th class="text-center">组员</th>
                                        <th class="text-center">实际业绩</th>
                                        <th class="text-center">溢出业绩</th>
                                        <th class="text-center">收房/套</th>
                                        <th class="text-center">租房/套</th>
                                        <th class="text-center">绩效套餐</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center" v-show="detailCode==18300" v-for="item in staffs">
                                        <td>{{item.real_name}}</td>
                                        <td>{{item.real_achv}}</td>
                                        <td>{{item.overflow_achv}}</td>
                                        <td>{{item.collect}}</td>
                                        <td>{{item.rent}}</td>
                                        <td></td>
                                    </tr>
                                    <tr class="text-center" v-show="detailCode!=18300 || staffs.length==0">
                                        <td colspan="6">当前小组无成员...</td>
                                    </tr>

                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
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
    .table-striped tbody tr{
        cursor: pointer;
    }
</style>
<script>
    import Page from '../../common/page.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import Status from '../../common/status.vue';

    export default{
        components: {Page,STAFF,Status},
        data(){
            return {
                isShow : false,
                dict : '',
                params : {
                    department_id : [],
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

                city : '',
                department_name : '',
                detailCode : '',

                staffs : []
            }
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
        mounted (){
//            alert(1)
            this.$http.get('periodic/range')
                .then(
                    (res) => {
                        this.dict = res.data.data;
                        this.perGroupList();
                    }

                );

        },
        updated (){


//            时间选择
            this.remindData();
        },
        methods : {
            perGroupList (){

                this.$http.get('periodic').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res);
                    if (res.data.code == 18300){
                        this.myData = res.data.data.data;
//                    console.log(res);
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                    }

                });
                this.$http.get('periodic/now')
                    .then(
                        (res) => {
                            this.params.periodic = res.data.data;
//                        alert(this.params.periodic)
                        }
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
                    this.params.month = ev.target.value;
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getData(data){
                // 页数
                console.log(data);
                this.page = data;
            },
            search(){
//                console.log(this.params);
                this.$http.get('periodic?page='+this.page,{
                    params : this.params
                }).then(
                    (res) => {
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

//                this.selectConfigure = 'department';
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
/*
                    // all
//                    alert('all');
                    this.receive(val);
                    console.log(val)
                    this.filtrate.departmentList = val.department;

                    // 选择的是部门
//                    alert('部门');
                    this.params.department_id.push(val.department);*/
                this.filtrate.departmentList = val.department;

                for(let j=0;j<val.department.length;j++){
                    if($.inArray(val.department[j].id,this.params.department_id)===-1){
                        this.params.department_id.push(val.department[j].id)
                    }else {
                        this.info.error = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        },2000);
                    }

                }
//

            },
            deleteDepartment(item){
                console.log(item)
                this.filtrate.departmentList=this.filtrate.departmentList.filter((x)=>x!==item);
//                console.log(this.params.department_id)
                this.params.department_id=this.params.department_id.filter((x)=>x!=item.id);
            },
            showGroupDetail(id,city,department){
                console.log(id);
                this.city = city;
                this.department_name = department;
                let that = this;
                this.$http.get('periodic/group',{
                    params : {
                        department_id : id,
                        month : that.params.month,
                        periodic : that.params.periodic
                    }
                })
                    .then(
                        (res) => {
                            console.log(res);
                            that.detailCode = res.data.code;
                            if (res.data.code == "18300"){
                                that.staffs = res.data.data.staffs;
                            } else {
                                return;
                            }

                        }
                    );
//                this.$http.get('periodic')
                $('#showDetail').modal('show');
            }
        }
    }
</script>