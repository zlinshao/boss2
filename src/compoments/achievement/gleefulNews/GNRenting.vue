<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>喜报录入</li>
            <li>租房</li>
        </ol>
        <section class="panel clearFix">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>
                        <!--<div class="form-group datetime">
                            <label>
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                            </label>
                            <label>
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                            </label>
                        </div>-->
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group clearFix">
                            <input type="text" class="form-control" placeholder="签收人/房屋地址/价格" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
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
                            <th class="text-center">租房类型</th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">门牌号</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">租房价格</th>
                            <th class="text-center">已收科目</th>
                            <th class="text-center">已收款项</th>
                            <th class="text-center">补齐时间</th>
                            <th class="text-center">租客来源</th>

                        </tr>
                        </thead>
                        <tbody id="rentingId">
                        <tr v-show="cont.myData.length!==0" class="text-center" :key="item.id" v-for="item in cont.myData">
                            <td>{{item.create_time}}</td>
                            <td>{{dict.rent_type[item.rent_type]}}</td>
                            <td>{{item.real_name}}</td>
                            <td>{{dict.department_id[item.department_id]}}</td>
                            <td>{{item.village_name}}</td>
                            <td>{{item.building}}-{{item.house_number}}</td>
                            <td>{{item.rooms.rooms}}室{{item.rooms.halls}}厅{{item.rooms.toilets}}卫</td>
                            <td>押{{item.bet}}付{{item.pay}}</td>
                            <td>{{item.price}}</td>
                            <td>{{dict.subject[item.received_type]}}</td>
                            <td>{{item.price_received}}</td>
                            <td>{{item.complete_date}}</td>
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



        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>


    </div>
</template>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import STAFF from  '../../common/organization/selectStaff.vue'
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page, Status, STAFF, DatePicker},
        data(){
            return {
                beforePage : 1,
                isShow: false,
//                rentingtList : [],
                paging: 1,
                page: 1,
                dict: {},

                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },

                params: {
                    department_id: [],
                    staff_id: [],
                    date_range : '',
                    search: ''
                },

                selected : [],
                filtrate: {
                    departmentList: [],
                    staffList: []
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
                configure: [],
                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
            }
        },
        created (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
                    (res) => {
                        this.dict = res.data;
//                        console.log(this.dict);
//                        alert(1);
                        this.gnRentingList();
                    }
                );

        },
        methods: {
            gnRentingList (){
                this.$http.get('glee/rent').then((res) => {
//                    console.log(res);
                    if (res.data.code == 18110) {
                        this.cont.myData = res.data.data.data;
                        this.paging = res.data.data.page;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.paging = 1;
                    }

                })
            },

            search(val){
                this.filter(val);

            },

            filter(val){
                this.beforePage = val;
                this.$http.get('glee/rent?page=' + val, {
                    params: this.params
                })
                    .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                        console.log(res)
                        if (res.data.code == 18110) {
                            this.isShow = false;
//                            console.log(res.data);
                            this.cont.myData = res.data.data.data;
                            this.paging = 1;
                        } else {
                            this.cont.myData = [];
                            this.isShow = true;
                            this.paging = 1;
                        }
                    });
            },
            getData(data){
                // 页数
//                console.log(data);
                this.page = data;
                this.filter();
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

    .tagsinput:nth-child(1){
        margin-top: 10px;
    }
    h4 {
        display: inline-block;
        margin: 0;
    }

    label {
        line-height: 34px;
        /*vertical-align: middle;*/
    }

    .collect, .renting {
        padding: 15px 0;
    }

    .collect {
        /*border-top: 1px dashed #ddd;*/
        /*padding-top: 20px;*/
        background-color: #F2F2F2;
    }

    tbody tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }

    td button {
        user-select: none;
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

    span.collectInfo {
        width: 100%;
        display: inline-block;
        border-bottom: 1px solid #ddd;
        line-height: 34px;
        padding-left: 12px;
        margin-bottom: 10px;
        height: 34px;
        box-sizing: border-box;
    }

    .modal .modal_form_datetime {
        margin-bottom: 32px;
    }

    .status {
        padding: 3px 8px;
        border-radius: 5px;
    }

    .collect .msg {
        font-size: 20px;
        text-align: center;
    }

    .collectInfo .price {
        /*content: '';*/
        display: inline-block;
        margin: 0 0 5px;
    }

    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }

    .table-responsive {
        overflow-y: inherit;
    }

    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
</style>