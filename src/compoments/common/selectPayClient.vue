<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectClient" id="selectPayClient">
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
                                <select  class="form-control" v-model="clien_staff">
                                    <option value="1">客户</option>
                                    <option value="2">员工</option>
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
                                <tr class="lightGray"  v-if="clien_staff === '1'">
                                    <th></th>
                                    <th>客户名称</th>
                                    <th>尊称</th>
                                    <th>房屋地址</th>
                                    <th>合同编号</th>
                                    <th>签约人</th>
                                </tr>
                                <tr class="lightGray"  v-if="clien_staff === '2'">
                                    <th></th>
                                    <th>员工姓名</th>
                                    <th>尊称</th>
                                    <th>职务</th>
                                    <th>所属部门</th>
                                </tr>
                            </thead>
                            <tbody  v-if="clien_staff === '1'">
                                <tr v-for="item in customerList"  @click="selectClient($event,item)">
                                    <td>
                                        <input type="radio" name="radio">
                                    </td>
                                    <td>{{item.name}}</td>
                                    <td v-if="item.sex === 1">先生</td>
                                    <td v-if="item.sex === 2">女士</td>
                                    <td v-if="item.type !== 2 && item.address_s !== null ||undefined || '' ">
                                        {{item.address_s}}
                                    </td>
                                    <td v-if="item.type !== 2 && item.address_s === null ||undefined || '' ">
                                        {{item.address_z}}
                                    </td>
                                    <td v-if="item.type === 2 && item.address_z !== null ||undefined || '' ">
                                        {{item.address_z}}
                                    </td>
                                    <td v-if="item.type === 2 && item.address_z === null ||undefined || '' ">
                                        {{item.address_s}}
                                    </td>
                                    <td v-if="item.type !== 2 && item.address_s !== null ||undefined || '' ">
                                        {{item.contract_num_s}}
                                    </td>
                                    <td v-if="item.type !== 2 && item.address_s === null ||undefined || '' ">
                                        {{item.contract_num_z}}
                                    </td>
                                    <td v-if="item.type === 2 && item.address_z !== null ||undefined || '' ">
                                        {{item.contract_num_z}}
                                    </td>
                                    <td v-if="item.type === 2 && item.address_z === null ||undefined || '' ">
                                        {{item.contract_num_s}}
                                    </td>
                                    <td v-if="item.type !== 2 && item.address_s !== null ||undefined || '' ">
                                        {{item.staff_s}}
                                    </td>
                                    <td v-if="item.type !== 2 && item.address_s === null ||undefined || '' ">
                                        {{item.staff_z}}
                                    </td>
                                    <td v-if="item.type === 2 && item.address_z !== null ||undefined || '' ">
                                        {{item.staff_z}}
                                    </td>
                                    <td v-if="item.type === 2 && item.address_z === null ||undefined || '' ">
                                        {{item.staff_s}}
                                    </td>
                                </tr>
                                <tr v-if="isShow">
                                    <td colspan="10" class="text-center text-muted">
                                        暂无数据...
                                    </td>
                                </tr>
                            </tbody>
                            <tbody  v-if="clien_staff === '2' && customerList.length > 0">
                            <tr v-for="item in customerList"  @click="selectClient($event,item)">
                                <td>
                                    <input type="radio" name="radio">
                                </td>
                                <td>{{item.real_name}}</td>
                                <td v-if="item.gender === 1">先生</td>
                                <td v-if="item.gender === 2">女士</td>
                                <td>{{item.position_id[0].vocation}}</td>
                                <td>{{item.department[0].name}}</td>
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
                clien_staff: '1',
                customerList:[],
                nationalityList:[],
                person_medium:[],
                selectPayClients:[],
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
        watch : {
           'clien_staff' :{
               deep:true,
               handler(val,oldVal){
                   if(val !== oldVal){
                       this.customerList = [];
                   }
               }
            }

        },
        methods : {
            search(){
                console.log()
                if(this.clien_staff === '1'){
                    this.$http.post('index/customerInfo/index  ',
                            {name:this.keywords,
                            }
                        ).then((res) => {
                        if(res.data.code === '60010'){
                            this.customerList=res.data.data;
                            this.isShow = false;
                        }else {
                            this.customerList=[];
                            this.isShow = true;
                        }
                    })
                }else if(this.clien_staff === '2'){
                    this.$http.get('index/profile/searchStaff/keywords/' + this.keywords).then((res) => {
                        if (res.data.code === '90010'){
                            this.customerList=res.data.data;
                            this.isShow = false;
                        }else {
                            this.customerList=[];
                            this.isShow = true;
                        }
                    })
                }
            },
            selectClient(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.selectPayClients=[];
                this.selectPayClients=item;
            },
            clientAdd(){
                if(this.selectPayClients.length === 0){
                    this.info.error = '请先选择客户';
                    this.info.state_error = true;
                }else {
                    this.$emit('clientPayAdd',this.selectPayClients);
                    $('#selectPayClient').modal('hide');
                    this.customerList=[];
                    this.selectPayClients=[];
                    this.keywords='';
                    this.clien_staff = '1';
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