<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectClient" id="selectClient" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" @click="closeModal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择客户</h4>
                    </div>
                    <div class="modal-body inbox-body panel" v-if="!isNewAdd">
                        <div class="pro-sort">
                            <label>
                                <select class="form-control" v-model="media_person">
                                    <option value="0">客户名称</option>
                                    <option :value="key" v-model="clientName" v-for="(value,key) in person_medium">{{value}}</option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort col-lg-6">
                            <div class="input-group">
                                <div class="input-group-btn">
                                    <button type="button" class="btn btn-primary dropdown-toggle" style="background: #fff;color: #666"
                                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {{searchType}} <span class="caret"></span>
                                    </button>
                                    <ul class="dropdown-menu" @click="selectType($event)">
                                        <!--<li><a>全部</a></li>-->
                                        <li><a>客户名</a></li>
                                        <li><a>负责人</a></li>
                                        <li><a>手机号</a></li>
                                        <li><a>证件号</a></li>
                                    </ul>
                                </div><!-- /btn-group -->
                                <!--<i class="fa fa-search"></i>-->
                                <input type="text" class="form-control" placeholder="请输入搜索内容" v-model="keywords"
                                       @keydown.enter.prevent="search">
                            </div>
                        </div>

                        <a class="btn btn-success" @click="search">搜索</a>
                        <a class="btn btn-success" @click="newAddClient">新增</a>


                        <div class="table table-responsive roll">
                            <table class="table table-striped table-advance table-hover">
                                <thead>
                                <tr class="lightGray text-center">
                                    <td></td>
                                    <td class="width80">客户名称</td>
                                    <td class="width50">尊称</td>
                                    <td class="width50">国籍</td>
                                    <td class="width80">手机号</td>
                                    <td class="width130">证件号</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="text-center" v-for="item in customerList" @click="selectClient($event,item)">
                                    <td>
                                        <input type="radio" name="radio">
                                    </td>
                                    <td>{{item.name}}</td>
                                    <td v-if="item.gender === 1">先生</td>
                                    <td v-if="item.gender === 2">女士</td>
                                    <td>
                                        <span v-for="nation in nationalityList" v-if="nation.id === item.nationality">
                                            {{nation.zh_name}}
                                        </span>

                                    </td>
                                    <td>
                                        {{item.mobiles}}
                                    </td>
                                    <td>
                                        {{item.id_num}}
                                    </td>
                                    <!--<td>-->
                                        <!--<span v-if="item.amap_id !== null && item.amap_id !==undefined">{{item.amap_id.villageAddress}}</span>-->
                                    <!--</td>-->
                                </tr>
                                <tr v-if="isShow">
                                    <td colspan="10" class="text-center text-muted">
                                        暂无数据...
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div class="modal-body roll has-js" v-if="isNewAdd">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                <div class="col-sm-10 status1">
                                    <label class="label_check" v-for="item in identity"
                                           @click.prevent="selectIdentity(item,$event)"
                                           :class="{'c_on':cus_status.indexOf(item.value) > -1,
                                               'c_off':cus_status.indexOf(item.value) == -1}">
                                        <input type="checkbox" :value="item.value" class="pull-left"
                                               :checked="cus_status.indexOf(item.value) > -1">
                                        {{item.name}}
                                    </label>
                                </div>
                            </div>
                            <!--客户姓名-->
                            <div class="form-group" style=" margin-bottom: 10px;">
                                <label class="col-lg-2 col-sm-2 control-label">客户姓名&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="cus_name" class="form-control"
                                           placeholder="客户名" style="margin-bottom: 0;">
                                </div>
                            </div>
                            <!--尊称-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">尊称&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10 status1">
                                    <label>
                                        <input type="radio" name="gender" value="1"
                                               class="pull-left" v-model="cus_gender">先生
                                    </label>
                                    <label>
                                        <input type="radio" name="gender" value="2"
                                               class="pull-left" v-model="cus_gender">女士
                                    </label>
                                </div>
                            </div>
                            <!--手机号-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">手机号&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" v-model="cus_phone"
                                           @blur="reg_phone(cus_phone)" maxlength="11" :class="{'error': phone_status}"
                                           placeholder="请输入手机号" style="margin-bottom: 0;">
                                    <div>
                                        <span v-show="phone_status" style="color: #E4393C">手机格号式不正确</span>&nbsp;
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeModal">关闭
                        </button>
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
        props: ['collectRent', 'staffId'],
        components: {
            Status,
        },
        data(){
            return {
                keywords: '',
                media_person: '1',
                clientName: '',
                customerList: [],
                nationalityList: [],
                person_medium: [],
                selectClients: [],
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
                isNewAdd: false,

                cus_status: [],
                cus_gender: '',
                cus_name: '',
                cus_phone: '',
                phone_status: '',                   //手机号验证
                salesman: '',
                searchType : '请选择',
                type:'',
                identity:[
                    {value : 1,name:'业主'},
                    {value : 2,name:'租客'},
                    {value : 3,name:'代理人'},
                ],
            }
        },
        mounted(){
            this.custom();
        },
        watch: {
//            collectRent(val){
//                this.cus_status = val;
//            },
            staffId(val){
                this.salesman = val;
            },
        },
        methods: {
//            手机正则
            reg_phone (){
                let reg = /^1[3|4|5|7|8|9][0-9]{9}$/;
                let flag = reg.test(this.cus_phone);
                if (flag === false) {
                    this.phone_status = !flag;
                } else if (flag === true) {
                    this.phone_status = !flag;
                }
                if (this.cus_phone === '') {
                    this.phone_status = false;
                }
            },
            search(){
                if (this.keywords !== '') {
                    this.$http.get('core/core_common/customerList/person_medium/' + this.media_person + '/keywords/' +
                        this.keywords+'/type/'+this.type).then((res) => {
                        if (res.data.code === '20010') {
                            this.customerList = res.data.data;
                            this.isShow = false;
                        } else {
                            this.customerList = [];
                            this.isShow = true;
                            this.info.error = res.data.msg;
                            this.info.state_error = true;
                        }
                    })
                }
            },
            custom(){
                this.$http.post('index/country/index').then((res) => {
                    this.nationalityList = res.data.data;
                });
                this.$http.get('core/customer/dict').then((res) => {
                    this.person_medium = res.data.person_medium;
                });
            },
            selectClient(ev, item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked', 'true');
                this.selectClients = [];
                this.selectClients = item;
            },
            clientSureAdd(){
                if (this.selectClients.length === 0) {
                    this.info.error = '请先选择客户';
                    this.info.state_error = true;
                } else {
                    this.$emit('clientAdd', this.selectClients);
                    $('.selectClient').modal('hide');
                    this.customerList = [];
                    this.selectClients = [];
                    this.keywords = '';
                    this.media_person = '1';
                    this.isNewAdd = false;
                }
            },
            newAddClient(){
                this.isNewAdd = true;
            },
            clientAdd (){
                 if (!this.isNewAdd) {
                    this.clientSureAdd();
                } else if (this.phone_status) {
                    this.info.error = '手机格式不正确';
                    this.info.state_error = true;
                }else {
                    this.$http.post('core/customer/saveCustomer', {
                        identity: this.cus_status,                  //业主/租客
                        name: this.cus_name,                        //客户姓名
                        gender: this.cus_gender,                    //性别
                        mobile: this.cus_phone,                     //手机号
                        salesman: this.salesman,                    //签约人ID
                    }).then((res) => {
                        if (res.data.code === '70010') {
                            this.closeModal();
                            this.cus_status = '';
                            this.selectClients = res.data.data;
                            this.clientSureAdd();
                            //成功信息 ***
                            this.info.success = res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                        } else {
                            //失败信息 ***
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                        }
                    });
                }
            },
            closeModal(){
                this.cus_gender = '';
                this.cus_name = '';
                this.cus_phone = '';
                this.phone_status = false;
                this.isNewAdd = false;
            },


            selectType(e){
                this.searchType = e.target.text;
                switch (e.target.text){
                    case  '客户名' :
                        this.type = 'name';
                        break;
                    case  '负责人' :
                        this.type = 'manager_id';
                        break;
                    case  '手机号' :
                        this.type = 'mobile';
                        break;
                    case  '证件号' :
                        this.type = 'id_num';
                        break;
                }
            },
            
            //选择客户身份
            selectIdentity(item,e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.cus_status.push(item.value);
                } else {
                    this.cus_status = this.cus_status.filter(function (x) {
                        return x !== item.value;
                    })
                }
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

    .roll {
        max-height: 300px;
        overflow: auto;
    }

    input[type=checkbox], input[type=radio] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    .status1 {
        padding-top: 7px;
    }

    .status1 label {
        margin-right: 20px;
    }

    .error {
        border-color: #E4393C;
    }

    .pro-sort {
        padding-right: 6px;
        height: 39px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
    .dropdown-menu {
        min-width: 84px;
        margin: 0;
    }
</style>