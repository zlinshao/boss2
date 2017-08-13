<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">公司</li>
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
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                    @sendDate="getDate"></DatePicker>
                    </div>
                </form>
            </div>
        </section>


        <div class="panel tips">
            <ul class="clearFix">
                <li class="col-md-4">
                    本月总业绩(元) <br>
                    <span class="green">{{sum}}</span>
                </li>
                <li class="col-md-4">
                    本月租房套数(套) <br>
                    <span class="green">{{count}}</span>
                </li>
                <li class="col-md-4">
                    本月榜首 <br>
                    <span class="yellow">{{top_name}}&nbsp;|&nbsp;{{top.achievement}}</span>
                </li>
            </ul>
        </div>

        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">部门</th>
                            <th class="text-center">组长</th>
                            <th class="text-center">租房/套</th>
                            <th class="text-center">实际业绩</th>
                        </tr>
                        </thead>
                        <tbody id="rentingId">
                        <tr class="text-center" v-for="item in myData">
                            <td>{{item.department.name}}</td>
                            <td>{{item.marshal}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.achievement}}</td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="4" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--人资-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import STAFF from  '../../common/organization/selectStaff.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page, STAFF, Status, DatePicker},
        data(){
            return {
                beforePage: 1,
                isShow: false,
                params: {
                    department_id: [],
                    range: ''
                },
                top: {},
                top_name: '',       //榜首
                sum: '',            //总业绩
                count: '',          //本月租房套数
                myData: [],
                paging: '',
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
                selected: [],
                configure: {},

                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                        position: 'top-right',
                    }
                ],
                currentDate: [],
            }
        },
        mounted(){
            this.perGroupList(1);
        },
        methods: {
            search(val){
                this.perGroupList(val);
            },
            perGroupList (val){
                this.paging = '';
                this.beforePage = val;
                this.$http.get('periodic/company?page=' + val, {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '18300') {
                        this.myData = res.data.data.achv;
                        this.top_name = res.data.data.top.department.name;
                        this.paging = res.data.data.pages;
                        this.top = res.data.data.top;
                        this.sum = res.data.data.sum;
                        this.count = res.data.data.count;
                        this.isShow = false;
                    } else if (res.data.code === '18310') {
                        this.myData = [];
                        this.top_name = res.data.data.top.department.name;
                        this.paging = res.data.data.pages;
                        this.top = res.data.data.top;
                        this.sum = res.data.data.sum;
                        this.count = res.data.data.count;
                        this.isShow = true;
                    } else{
                        this.myData = [];
                        this.paging = '';
                        this.top = {};
                        this.sum = '';
                        this.count = '';
                        this.isShow = true;
                    }
                });
            },
            select(){
                $('#selectCustom').modal({backdrop: 'static',});
                this.configure = {type: 'department', class: 'selectType'};
            },
            selectDateSend(val){
                console.log(val);
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                this.search(1);
            },
            getDate(data){
                console.log(data);
                this.params.range = data;
                this.search(1);
            },
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.selected = [];
                this.search(1);
            },
        }
    }
</script>

<style scoped>
    .tagsinput {
        border: none;
    }

    .table-striped tbody tr {
        cursor: pointer;
    }

    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }

    .tips {
        line-height: 30px;
        /*padding-left: 12px;*/
        padding-bottom: 5px;
        font-size: 15px;
        /*margin-top: 20px;*/
        /*width: 100%;*/
    }

    .tips ul {
        margin: 0;
        padding: 12px 0;
    }

    .tips ul li {
        /*float: left;*/
        padding: 0 50px;
        box-sizing: border-box;
    }

    .tips ul li + li {
        /*margin-left: 30px;*/
        border-left: 1px solid #ddd;

    }

    .tips ul li span {
        font-size: 18px;
        /*padding-left: 8px;*/
        /*font-weight: bold;*/
    }

    .tips ul li span.green {
        color: #78CD51;
    }

    .tips ul li span.yellow {
        color: #FF9A02;
    }
</style>