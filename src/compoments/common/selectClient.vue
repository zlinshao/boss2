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
                    <div class="modal-body inbox-body panel table table-responsive roll" v-if="!isNewAdd">
                        <div class="row">
                            <div class="col-lg-4">
                                <select  class="form-control" v-model="media_person">
                                    <option value="">客户名称</option>
                                    <option :value="key" v-model="clientName" v-for="(value,key) in person_medium">{{value}}</option>
                                </select>
                            </div>
                            <div class="iconic-input right col-lg-4">
                                <i class="fa fa-search"></i>
                                <input type="text" class="form-control" placeholder="请输入客户名" v-model="keywords"
                                     @keydown.enter.prevent="search"  >
                            </div>
                            <div class="col-lg-4">
                                <a class="btn btn-success" @click="search">搜索</a>
                                <a class="btn btn-success" @click="newAddClient">新增</a>
                            </div>
                        </div>
                        <table class="table table-striped table-advance table-hover">
                            <thead>
                                <tr class="lightGray">
                                    <td></td>
                                    <td>客户名称</td>
                                    <td>尊称</td>
                                    <td>国籍</td>
                                    <td>手机号</td>
                                    <td>房屋地址</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in customerList"  @click="selectClient($event,item)">
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
                                    <td>{{item.mobile}}</td>
                                    <td>
                                        <span v-if="item.amap_id !== null || undefined">{{item.amap_id.villageAddress}}</span>
                                    </td>
                                </tr>
                                <tr v-if="isShow">
                                    <td colspan="10" class="text-center text-muted">
                                        暂无数据...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-body roll" v-if="isNewAdd">

                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                <div class="col-lg-10 status1">
                                    <label>
                                        <input type="radio" name="status" value="1"
                                               class="pull-left" v-model="cus_status">业主
                                    </label>
                                    <label>
                                        <input type="radio" name="status" value="2"
                                               class="pull-left" v-model="cus_status">租客
                                    </label>
                                    <label>
                                        <input type="radio" name="status" value="3"
                                               class="pull-left" v-model="cus_status">业主(代理人)
                                    </label>
                                </div>
                            </div>
                            <!--客户姓名-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">客户姓名&nbsp;<span
                                        class="text-danger">*</span></label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="cus_name" class="form-control"
                                           placeholder="起输入客户姓名">
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
                                           @keyup="cus_phone = cus_phone.replace(/[^\d]/g,'');" maxlength="11"
                                           placeholder="请输入手机号" style="margin-bottom: 0;">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeModal">关闭</button>
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
        props : ['collectRent'],
        components:{
            Status,
        },
        data(){
            return {
                cus_status_id: '',
                keywords:'',
                media_person:'1',
                clientName:'',
                customerList:[],
                nationalityList:[],
                person_medium:[],
                selectClients:[],
                isShow:true,
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                isNewAdd : false,

                cus_status:'',
                cus_gender :'',
                cus_name: '',
                cus_phone :'',
            }
        },
        mounted(){
            this.custom();
        },
        watch :{
            collectRent(val){
                this.cus_status = val.coll;
                this.cus_status_id = val.staffId;
            }
        },
        methods : {
            search(){
                if(this.keywords!==''){
                    this.$http.get('core/core_common/customerList/person_medium/' +this.media_person +'/keywords/' + this.keywords).then((res) => {
                        if(res.data.code === '20010'){
                            this.customerList=res.data.data;
                            this.isShow = false;
                        }else {
                            this.customerList=[];
                            this.isShow = true;
                        }
                    })
                }
            },
            custom(){
                this.$http.post('index/country/index').then((res) => {
                    this.nationalityList=res.data.data;
                })
                this.$http.get('core/customer/dict').then((res) => {
                    this.person_medium=res.data.person_medium;
                });
            },
            selectClient(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.selectClients=[];
                this.selectClients=item;
            },
            clientSureAdd(){
                if(this.selectClients.length === 0){
                    this.info.error = '请先选择客户';
                    this.info.state_error = true;
                }else {
                    this.$emit('clientAdd',this.selectClients);
                    $('.selectClient').modal('hide');
                    this.customerList=[];
                    this.selectClients=[];
                    this.keywords='';
                    this.media_person = '1';
                    this.isNewAdd = false;
                }

            },
            newAddClient(){
                this.isNewAdd = true;
            },

            clientAdd (){
                if(this.isNewAdd === true){
                    this.$http.post('core/customer/saveCustomer',{
                        identity: this.cus_status,                  //业主/租客
                        name:  this.cus_name,                       //客户姓名
                        gender: this.cus_gender,                    //性别
                        mobile: this.cus_phone,                     //手机号
                        salesman: this.cus_status_id,               //签约人ID
                    }).then((res) => {
                        if (res.data.code === '70010') {
                            this.cus_status = '';
                            this.cus_gender  = '';
                            this.cus_name = '';
                            this.cus_phone  = '';
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
                }else {
                    this.clientSureAdd();
                }

            },
            closeModal(){
                this.isNewAdd = false;
            }
        }
    }
</script>
<style scoped>
    .lightGray{
        background-color: #F2F2F2;
    }
    .iconic-input i {
        margin: 8px 25px 8px 10px;
    }
    div.table.table-responsive table tr td:first-child {
         width: 80px ;
    }
    label{
        margin-top: 5px;
    }
    .modal-body{
        max-height: 400px;
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
</style>