<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade " id="selectClient">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择客户</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal tasi-form">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >客户名称</label>
                                <div class="col-lg-4">
                                    <select  class="form-control" >
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
                            <table class="table">
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
                                    <td>{{item.gender}}</td>
                                    <td>{{nationalityList[item.nationality]}}</td>
                                    <td>{{item.mobile}}</td>
                                    <td></td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="clientAdd">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                keywords:'',
                clientName:'',
                customerList:[],
                nationalityList:[],
                person_medium:[],
                selectClients:[],
            }
        },
        mounted(){
            this.custom();
        },
        methods : {
            search(){
                if(this.keywords!==''){
                    this.$http.post('core/customer/customerList',{'keywords':this.keywords}).then((res) => {
                        this.customerList=res.data.data.list;
                        this.keywords='';
                    })
                }
            },
            custom(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.nationalityList=res.data.nationality;
                    this.person_medium=res.data.person_medium;
                })
            },
//            selectClient(item){
//                console.log(item)
//                this.selectClients=[];
//                this.selectClients=item;
//            },
            selectClient(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.selectClients=[];
                this.selectClients=item;
            },
            clientAdd(){
                this.$emit('clientAdd',this.selectClients);
                $('#selectClient').modal('hide');
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
</style>