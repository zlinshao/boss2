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
                        <h4 class="modal-title">选择房屋</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal tasi-form">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                                <div class="iconic-input right col-lg-4">
                                    <i class="fa fa-search"></i>
                                    <input type="text" class="form-control" placeholder="搜索房屋" v-model="keywords"
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
                                    <td>房屋地址</td>
                                    <td>房型</td>
                                    <td>面积</td>
                                    <td>装修</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in customerList" >
                                    <td>
                                        <input type="radio" name="radio" @click="selectClient(item)">
                                    </td>
                                    <td>{{}}</td>
                                    <td>{{}}</td>
                                    <td>{{}}</td>
                                    <td>{{}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
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
                houseList:[],
            }
        },
        mounted(){
        },
        methods : {
            search(){
//                if(this.keywords!==''){
//                    this.$http.post('core/customer/customerList',{'keywords':this.keywords}).then((res) => {
//                        this.houseList=res.data.data.list;
//                        this.keywords='';
//                    })
//                }
            },
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