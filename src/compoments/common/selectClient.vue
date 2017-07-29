<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectClient" id="selectClient">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择客户</h4>
                    </div>
                    <div class="modal-body inbox-body panel table table-responsive">
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >客户名称</label>
                            <div class="col-lg-4">
                                <select  class="form-control" v-model="media_person">
                                    <option :value="key" v-model="clientName" v-for="(value,key) in person_medium">{{value}}</option>
                                </select>
                            </div>
                            <div class="iconic-input right col-lg-4">
                                <i class="fa fa-search"></i>
                                <input type="text" class="form-control" placeholder="请输入客户名" v-model="keywords"
                                     @keydown.enter.prevent="search"  >
                            </div>
                            <div class="col-lg-2">
                                <a class="btn btn-success" @click="search">搜索</a>
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
                                    <td>{{nationalityList[item.nationality]}}</td>
                                    <td>{{item.mobile}}</td>
                                    <td></td>
                                </tr>
                                <tr v-if="isShow">
                                    <td colspan="10" class="text-center text-muted">
                                        暂无数据...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
        components:{
            Status
        },
        data(){
            return {
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
            }
        },
        mounted(){
            this.custom();
        },
        methods : {
            search(){
                if(this.keywords!==''){
                    this.$http.post('core/customer/customerList',
                            {
                                keywords:this.keywords,
                                person_medium:this.media_person
                            }
                        ).then((res) => {
                        if(res.data.code === '70030'){
                            this.customerList=res.data.data.list;
                            this.isShow = false;
                        }else {
                            this.customerList=[];
                            this.isShow = true;
                        }
                    })
                }
            },
            custom(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.nationalityList=res.data.nationality;
                    this.person_medium=res.data.person_medium;
                })
            },
            selectClient(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.selectClients=[];
                this.selectClients=item;
            },
            clientAdd(){
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
                }

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
</style>