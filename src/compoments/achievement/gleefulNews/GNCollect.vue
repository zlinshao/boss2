<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>喜报录入</li>
            <li class="active">收房</li>
        </ol>

        <section class="panel clearFix">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <!--<Cascade @change="getCascadeData"></Cascade>-->
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
                            <input type="text" class="form-control" placeholder="签收人/房屋地址/价格"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                    </form>
                </div>

            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">喜报日期</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">门牌号</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">收房价格</th>
                            <th class="text-center">收房年限</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">空置期</th>
                            <th class="text-center">房屋来源</th>
                        </tr>
                        </thead>
                        <tbody id="rentingId">
                        <tr v-show="cont.myData.length!==0" class="text-center" :key="item.id" v-for="item in cont.myData">
                            <td>{{item.create_time}}</td>
                            <td>{{item.real_name}}</td>
                            <td>{{dict.department_id[item.department_id]}}</td>
                            <td>{{item.village_name}}</td>
                            <td>{{item.building}}-{{item.house_number}}</td>
                            <td>{{item.rooms.rooms}}室{{item.rooms.halls}}厅{{item.rooms.toilets}}卫</td>
                            <td class="dropdown">
                                <button class="btn btn-sm  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">{{item.price[0]}}
                                </button>
                                <ul class="dropdown-menu dropdown-menu-center">
                                    <li v-for="price in item.price">{{price}}</li>
                                </ul>
                            </td>
                            <td>{{item.years}}</td>
                            <td>{{dict.pay_type[item.pay_type]}}</td>
                            <td>{{item.vac_sum_days}}</td>
                            <td>{{item.is_medi==1?'中介':'个人'}}</td>

                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="20" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>


                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>


        <!--选择小区控件-->
        <!--<ChooseAddress @getChildData="getAddress"></ChooseAddress>-->

        <!--提示信息-->
        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--<Select :configure="configure" @Staff="receive"></Select>-->
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    //    import ChooseAddress from '../../common/chooseAddress.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'

    //    import Select from '../../common/organization/selectStaff.vue'

    export default{
        components: {Page, Status , STAFF, DatePicker},
        data(){
            return {
                beforePage : 1,
                isShow: false,

                paging: '',                 //总页数
                page: 1,                  // 当前页数

                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },
                dict: {},          // 字典

                params: {
                    department_id: [],
                    staff_id: [],
                    date_range : '',
                    search: ''
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
                datas: [],

                selected : [],
                filtrate: {
                    departmentList: [],
                    staffList: []
                },
                configure: [],

                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
//                idArray:{departmentId:[],staffId:[]},
            }
        },
        created (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
                    (res) => {
                        this.dict = res.data;
//                        console.log(this.dict);
//                        alert(1);
                        this.gnCollectList();

                    }
                );

        },
        methods: {
            gnCollectList (){
                this.$http.get('glee/collect').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res.data);
//                    alert(2);
                    if (res.data.code == 18210) {
                        this.cont.myData = res.data.data.data;
                        this.paging = res.data.data.page;
                        this.isShow = false
                    } else {
                        this.isShow = true;
                    }

//                    console.log(this.paging)
                })
            },
            search(val){

                this.filter(val);
            },
            filter(val){
                this.beforePage = val;
                this.$http.get('glee/collect?page=' + val, {
                    params: this.params
                })
                    .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                        console.log(res);
                        if (res.data.code == 18210) {

                            this.isShow = false;
                            this.cont.myData = res.data.data.data;
                            this.paging = res.data.data.page;
                        } else {
                            this.cont.myData = [];
                            this.isShow = true;
                            this.paging = 1;
                        }
                    });
            },
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for(let i=0;i<val.department.length;i++){
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for(let j=0;j<val.staff.length;j++){
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

            getDate(data){
                // 获取时间
                console.log(data);
                this.params.date_range = data;
                this.search(1);
            }

        }
    }
</script>

<style scoped>
    .tagsinput {
        border: none;
    }

    .tagsinput h4 {
        display: inline-block;
        margin: 0;
    }

    #myModal {
        z-index: 1042;
    }

    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }

    label {
        line-height: 34px;
    }

    ul.dropdown-menu {
        text-align: center;
        /*font-size: 12px;*/
    }

    ul.dropdown-menu li {
        padding: 6px 0;
    }

    ul.dropdown-menu li:hover {
        cursor: pointer;
        background-color: #f2f2f2;
    }

    tbody tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    td button {
        background-color: white;
        user-select: none;

    }

    .table-responsive {
        overflow-y: inherit;
    }

    .yellow {
        background-color: #F9E175;
    }

    .orange {
        background-color: #FCB322;
    }

    .green {
        background-color: #83E96D;
    }

    .gray {
        background-color: #CCCCCC;
    }

    .status {
        padding: 3px 8px;
        border-radius: 5px;
    }

    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }

    /*.panel span{
        display: inline-block;
        width: 30px;
        height: 30px;
        margin-left: 5px;
        background-color: #00a6b2;
        border-radius: 50%;
        border: 1px solid #ddd;
    }*/
</style>