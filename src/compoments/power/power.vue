<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li class="active">权限管理</li>
        </ol>


        <!--新增权限管理-->
        <section class="panel">
            <div class="panel-body">
                <div class="form-group text-right" style="margin-bottom: 0;">
                    <a class="btn btn-success" data-toggle="modal" href="#new_add" @click="add_btn">
                        <i class="fa fa-plus-square"></i>&nbsp;&nbsp;新增权限
                    </a>
                </div>
            </div>
        </section>

        <!--新增模态框-->
        <div class="modal fade full-width-modal-right" id="new_add" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增权限</h4>
                        </div>
                        <div class="modal-body">
                            <form role="form">
                                <div class="form-group">
                                    <label for="username">规则名</label>
                                    <input type="text" id="username" class="form-control" placeholder="规则名"
                                           v-model="username">
                                </div>
                                <div class="form-group">
                                    <label for="title">描述</label>
                                    <input type="text" id="title" class="form-control" placeholder="描述"
                                           v-model="title">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button type="button" class="btn btn-primary" @click="add_power ()">添加</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>规则名</th>
                            <th>描述</th>
                            <th>删除</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in myData">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.title}}</td>
                            <td>
                                <button type="button" class="btn btn-danger btn-sm" @click="dele(item.id)">
                                    删除
                                </button>
                            </td>
                        </tr>
                        <tr v-show="myData.length == 0">
                            <td colspan="4" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <Status :state="info"></Status>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>
<script>
    import Status from '../common/status.vue'
    import Confirm from '../common/confirm.vue'
    export default {
        components: {
            Status,Confirm
        },
        data (){
            return {
                myData: [],          //列表数据
                username: '',           //Name
                title: '',              //Title
                page: 1,
                info: {
                    state_success: false,   //成功状态
                    state_error: false,     //错误状态
                    error: '',              //成功信息
                    success: '',            //错误信息
                },
                confirmMsg: {
                    oper : '',
                    msg: '',
                },
            }
        },
        created (){
            this.list_power(this.page);
        },
            methods: {

//            权限列表
            list_power (v){

                this.$http.get('manager/Auth/authList/page/' + v).then(res => {
                    if(res.data.code === '30010'){
                        this.myData = res.data.data;
                    }else {
                        this.myData = [];
                    }
                });
            },
            dele(id){
                this.confirmMsg.oper = id;
                this.confirmMsg.msg = '确定删除吗？';
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.get('manager/Role/deleteRole/id/'+this.confirmMsg.oper).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==40040){
                        // success
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.list_power(1);
                    } else {
                        // fail
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },

//            新增按钮
            add_btn (){
                this.username = '';
                this.title = ''
            },
//             确认新增
            add_power () {
                this.$http.post('manager/Auth/saveAuth',
                    {
                        name: this.username,
                        title: this.title
                    }
//                        ,{headers: {
//                            'Content-Type': 'application/x-www-form-urlencoded',
//                        }}
                ).then(res => {
                    if (res.data.code === '30020') {
//                        成功关闭模态框
                        $('#new_add').modal('hide');
//                        成功信息
                        this.info.success = res.data.msg;
//                        显示成功信息
                        this.info.state_error = false;
                        this.info.state_success = true;
//                        一秒自动关闭成功信息
                        setTimeout(() => {
                            this.info.state_success = false;
                        }, 1000);
//                        信息填充
                        this.myData.push({
                            id: res.data.data.id,
                            name: res.data.data.name,
                            title: res.data.data.title,
                        });
                        this.list_power(1);
                    }
                    else {
                        this.info.state_success = false;
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                    }
                });
            },
        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>