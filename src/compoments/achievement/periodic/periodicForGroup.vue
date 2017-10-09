<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">小组</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="点击选择部门"
                               v-model="selected" @click='select' readonly>
                        <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                    </div>

                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                    </div>

                    <!--<div class="dropdown form-group">
                        <select name="" class="form-control" v-model="params.periodic" style="margin: 0 15px 0 0;">
                            <option :value="value" v-for="(key,value) in dict">{{key}}</option>
                        </select>
                    </div>-->

                    <!--<div class="input-group" @click="search(1)">
                        <button type="button" class="btn btn-success">搜索</button>
                    </div>-->
                </form>
            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
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
                        <tr v-show="myData.length!=0" class="text-center" v-for="item in myData" @click="showGroupDetail(item.department_id,item.city,item.department_name,item.marshal)">
                            <td>{{item.city}}</td>
                            <td>{{item.department_name}}</td>
                            <td>{{item.marshal}}</td>
                            <td>{{item.real_achv}}</td>
                            <td>{{item.overflow_achv}}</td>
                            <!--<td>差额</td>-->
                            <td>{{item.collect}}</td>
                            <td>{{item.rent}}</td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="7" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>


        <!--modal-->
        <!--<div class="modal fade bs-example-modal-lg" id="showDetail" tabindex="-1"  role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{city}}&emsp;{{department_name}}&emsp;组长:{{marshal_name}}</h4>
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
        </div>-->

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

    </div>
</template>
<style scoped>
    .tagsinput{
        border:none;
    }
    .table-striped tbody tr{
        cursor: pointer;
    }
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }
</style>
<script>
    import Page from '../../common/page.vue'
    import STAFF from  '../../common/oraganization.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page,STAFF,Status,DatePicker},
        data(){
            return {
                beforePage : 1,
                isShow : false,
                dict : '',
                params : {
                    department_id : [],
//                    staff_id : [],
                    date_range : ''
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

                selected : [],
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
//                selectConfigure : '',
                configure : {},

                city : '',
                department_name : '',
                marshal_name : '',
                detailCode : '',

                staffs : [],
                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                currentDate : [],
            }
        },
        mounted(){
            this.perGroupList();
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
                /*this.$http.get('periodic/now')
                    .then(
                        (res) => {
                            this.params.periodic = res.data.data;
//                        alert(this.params.periodic)
                        }
                    );*/
            },

            search(val){
                console.log(this.params);
                this.filter(val);
            },

            filter(val){
                this.beforePage = val;
                this.$http.get('periodic?page='+val,{
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
                $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                this.configure={type:'department'};
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
                console.log(val);

                for(let i=0;i<val.department.length;i++){
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                this.search(1);
//

            },
            showGroupDetail(id,city,department,marshal){
                console.log(id);
                this.city = city;
                this.department_name = department;
                this.marshal_name = marshal;
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
            },
            getDate(data){
                console.log(data);
                this.params.date_range = data;
                this.search(1);
            },
            clearSelect(){
                if (this.selected.length==0){
                    return;
                }
                this.params.department_id = [];
                this.selected = [];
                this.search(1);
            },
        }
    }
</script>