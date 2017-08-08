<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li>其余款项报备</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId === ''">
                    <form class="form-inline clearFix" role="form">
                        <!--<div class="dropdown form-group">
                            <select name="" class="form-control">
                                <option value="">全部</option>
                                <option value="1">鸡腿</option>
                                <option value="2">梦想</option>
                            </select>
                        </div>-->
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>


                        <div class="input-group clearFix">
                            <input type="text" class="form-control" placeholder="搜索房屋地址"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                    </form>
                </div>

                <div v-show="operId !== ''" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-send-o"></i>&nbsp;提交</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-mail-reply"></i>&nbsp;退还</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times-circle-o"></i> 删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">房屋状态</th>
                            <th class="text-center">款项名称</th>
                            <th class="text-center">款项金额</th>
                            <th class="text-center">汇款方式</th>
                            <th class="text-center">收款人姓名</th>
                            <th class="text-center">开户行</th>
                            <th class="text-center">账号</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="(a, index) in 10">
                            <td>
                                <input type="checkbox" :checked="operId === index" @click="check(index, $event)">
                            </td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>
                                <label class="label label-default">未提交</label>
                                <label class="label label-warning">待审核</label>
                                <label class="label label-success">已通过</label>
                            </td>
                            <td>
                                <router-link :to="{path:'/reportedOtherDetail',query: {collectId: 1}}">详情</router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--生成款项-->

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    export default{
        components: {DatePicker, STAFF, Page, Status},
        data(){
            return {
                operId: '',
                beforePage: 1,

                dict: {},
                paging: '',
                myData: [],

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

                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                        position: 'top-right',
                    }
                ],

                params: {
                    department_id: [],
                    staff_id: [],
                    range: '',
                    search: ''
                },

                configure: {},
                filtrate: {
                    departmentList: [],
                    staffList: []
                },
                selected: [],
            }
        },
        methods: {
//            选中
            check (val, e){
                if(e.target.checked === true){
                    this.operId = val;
                }else{
                    this.operId = '';
                }

            },
//            搜索
            search(val){
                this.filter(val);
            },
//            日期搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },

            filter(val){
                this.beforePage = val;
                // 筛选
                /*this.$http.get('checkin/collect?page='+val,{
                 params : this.params
                 }).then(
                 (res) => {
                 //                        console.log(res.data)
                 if (res.data.code == 18200){
                 // 成功
                 this.paging = res.data.data.pages;
                 this.myData = res.data.data.data;
                 this.isShow = false;
                 } else {
                 this.isShow = true;
                 this.myData = [];
                 this.paging = 0;
                 this.page = 1;
                 }
                 }
                 )*/
            },
//            人资
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
            clearSelect(){
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },
        }
    }
</script>
<style scoped>
    input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    .label {
        font-weight: normal;
    }
</style>