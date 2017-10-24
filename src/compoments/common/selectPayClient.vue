<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectClient " id="selectPayClient">
            <div class="modal-dialog " role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择客户</h4>
                    </div>
                    <div class="modal-body inbox-body panel">
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2">客户名称</label>
                            <div class="col-lg-4">
                                <select class="form-control" v-model="client_staff" @change="search">
                                    <option value="-1">—请选择—</option>
                                    <option value="">全部</option>
                                    <option v-for="(key,index) in identity" :value="index">{{key}}</option>
                                </select>
                            </div>
                            <div class="iconic-input right col-lg-4">
                                <i class="fa fa-search"></i>
                                <input type="text" class="form-control" placeholder="请输入客户名" v-model="keywords"
                                       @keydown.enter.prevent="search">
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-success" @click="search">搜索</a>
                            </div>
                        </div>
                        <div class="table table-responsive roll">
                            <table class="table table-striped table-advance table-hover">
                                <thead>
                                <tr class="lightGray">
                                    <th class="text-center" style="width: 40px"></th>
                                    <th class="text-center">客户名称</th>
                                    <th class="text-center">身份</th>
                                    <th class="text-center">房屋地址</th>
                                    <th class="text-center">账户</th>
                                    <th class="text-center">账号</th>
                                    <th class="text-center">开单人</th>
                                </tr>
                                <!--<tr class="lightGray" v-if="client_staff == '2'">-->
                                <!--<th></th>-->
                                <!--<th>员工姓名</th>-->
                                <!--<th>尊称</th>-->
                                <!--<th>职务</th>-->
                                <!--<th>所属部门</th>-->
                                <!--</tr>-->
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="item in customerList" @click="selectClient($event,item)">
                                    <td style="width: 40px">
                                        <input type="radio" name="radio">
                                    </td>
                                    <td>{{item.name}}</td>
                                    <td>{{dictionary.customer.identity[item.identity]}}</td>
                                    <td>{{item.address}}</td>
                                    <td>{{item.payee}}</td>
                                    <td>{{item.account}}</td>
                                    <td>{{item.real_name}}</td>
                                </tr>
                                <tr v-if="isShow">
                                    <td colspan="7" class="text-center text-muted">
                                        暂无数据...
                                    </td>
                                </tr>
                                </tbody>
                                <!--<tbody v-if="client_staff == '2' && customerList.length > 0">-->
                                <!--<tr v-for="item in customerList" @click="selectClient($event,item)">-->
                                <!--<td>-->
                                <!--<input type="radio" name="radio">-->
                                <!--</td>-->
                                <!--<td>{{item.real_name}}</td>-->
                                <!--<td v-if="item.gender == 1">先生</td>-->
                                <!--<td v-if="item.gender == 2">女士</td>-->
                                <!--<td>{{item.position_id[0].vocation}}</td>-->
                                <!--<td>{{item.department[0].name}}</td>-->
                                <!--</tr>-->
                                <!--<tr v-if="isShow1">-->
                                <!--<td colspan="5" class="text-center text-muted">-->
                                <!--暂无数据...-->
                                <!--</td>-->
                                <!--</tr>-->
                                <!--</tbody>-->
                            </table>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="clientAdd">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from './status.vue'
    export default{
        components: {
            Status
        },
        data(){
            return {
                keywords: '',
                client_staff: '-1',
                customerList: [],
                nationalityList: [],
                person_medium: [],
                selectPayClients: [],
                isShow: true,
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
                dictionary: {},
                identity: {},
            }
        },
//        watch: {
//            'client_staff': {
//                deep: true,
//                handler(val, oldVal){
//                    if (val !== oldVal) {
//                        this.customerList = [];
//                    }
//                }
//            }
//
//        },
        mounted(){
            this.getDictionary();
        },
        methods: {
            getDictionary(){
                this.$http.get('revenue/customer/dict').then((res) => {
                    this.dictionary = res.data;
                    this.identity = res.data.customer.identity;
                })
            },
            search(){
                if (this.client_staff !== '-1') {
                    this.$http.post('finance/customer/search', {
                        keywords: this.keywords,
                        identity: this.client_staff,
                    }).then((res) => {
                        if (res.data.code === '20020') {
                            this.customerList = res.data.data.data;
                            this.isShow = false;
                        } else {
                            this.customerList = [];
                            this.isShow = true;
                            this.errorMsg(res.data.msg);
                        }
                    })
//                else if (this.client_staff === '2') {
//                    this.$http.get('index/profile/searchStaff/keywords/' + this.keywords).then((res) => {
//                        if (res.data.code === '90010') {
//                            this.customerList = res.data.data;
//                            this.isShow = false;
//                            this.successMsg(res.data.msg);
//                        } else {
//                            this.customerList = [];
//                            this.errorMsg(res.data.msg);
//                            this.isShow = true;
//                        }
//                    })
//                }
                }else{
                    this.customerList = [];
                    this.isShow = true;
                }
            },
            selectClient(ev, item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked', 'true');
                this.selectPayClients = [];
                this.selectPayClients = item;
            },
            clientAdd(){
                if (this.selectPayClients.length === 0) {
                    this.info.error = '请先选择客户';
                    this.info.state_error = true;
                } else {
                    this.$emit('clientPayAdd', this.selectPayClients);
                    $('#selectPayClient').modal('hide');
                    this.customerList = [];
                    this.selectPayClients = [];
                    this.keywords = '';
                    this.client_staff = '';
                }
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>
<style scoped>
    .lightGray {
        background-color: #F2F2F2;
    }

    .iconic-input i {
        margin: 8px 25px 8px 10px;
    }

    div.table.table-responsive table tr td:first-child {
        width: 80px;
    }

    label {
        margin-top: 5px;
    }

    .roll {
        max-height: 300px;
        overflow: auto;
    }
</style>