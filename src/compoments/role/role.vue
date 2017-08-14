<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li class="active">角色管理</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <!--新增权限管理-->
                <div class="form-group text-right" style="margin-bottom: 0;">
                    <button class="btn btn-success" data-toggle="modal" href="#new_add" @click="add_btn">
                        <i class="fa fa-plus-square"></i>&nbsp;&nbsp;新增角色
                    </button>
                </div>
            </div>
        </section>

        <!--新增/修改 模态框-->
        <div class="modal fade full-width-modal-right" id="new_add" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 v-if="status1" class="modal-title">角色新增</h4>
                            <h4 v-if="status2" class="modal-title">角色修改</h4>
                        </div>
                        <div class="modal-body">
                            <form role="form">
                                <div class="form-group">
                                    <label for="title1">描述</label>

                                    <!--title-->
                                    <input type="text" id="title1" class="form-control" placeholder="描述" v-model="title">
                                </div>
                                <div v-for="role in myData" class="check">
                                    <label><!--多选框-->
                                    <input @click="rules(role.id, $event)" type='checkbox' class="pull-left"
                                           v-model='checkboxModel'
                                           :value='role.id'>{{role.title}}</label>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <div class="form-group pull-left">
                                <button v-if="status1" class="btn btn-primary" @click="add_power">
                                    添加
                                </button>

                                <button v-if="status2" class="btn btn-primary"
                                        @click="revise_power">修改
                                </button>
                            </div>
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
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
                            <th>描述</th>
                            <th>修改</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in role_info">
                            <td>{{item.id}}</td>
                            <td>{{item.title}}</td>
                            <td>
                                <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" href="#new_add"
                                        @click="revise_btn(item.id, item.title)">修改
                                </button>
                            </td>
                        </tr>

                        <tr v-show="role_info.length == 0">
                            <td colspan="4" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提醒-->
        <Status :state="info"></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue'
    export default {
        components: {
            Status
        },
        data (){
            return {
                myData: [],          //权限列表
                role_info: [],       //角色列表
                data_id: [],            //权限ID
                role_id: [],            //角色rules
                checkboxModel: [],      //选中ID
                title: "",              //Title
                revise_id: '',          //修改ID
                status1: true,          //增加
                status2: false,         //修改
                info: {
                    state_success: false,   //成功状态
                    state_error: false,     //错误状态
                    error: '',              //成功信息
                    success: '',            //错误信息
                },
            }
        },
        created (){
            this.list_role();
        },
        watch: {//深度 watcher
            'checkboxModel': {
                handler: function (val, oldVal) {
                    if  (this.checkboxModel.length === this.myData.length) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                },
                deep: true
            }
        },
        methods: {
//            数组查询
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },

            list_role (){
                this.$http.get('manager/Role/rolesList').then(res => {
                    if(res.data.code === '40010'){
                        this.role_info = res.data.data;
                    }else {
                        this.role_info = [];
                    }

                });

                this.$http.get('manager/Auth/authList/page/1').then(res => {
                    if(res.data.code === '30010'){
                        this.myData = res.data.data;
                    }else {
                        this.myData = [];
                    }

                });
            },

//            修改按钮
            revise_btn (rol, title){
                this.revise_id = rol;
                this.role_id = [];
                this.data_id = [];
                this.checkboxModel = [];
                this.title = title;
                this.$http.get('manager/Role/readRole/id/' + rol).then(res => {
                    for (let i = 0; i < res.data.data.rules.length; i++) {
                        this.role_id.push((parseInt(res.data.data.rules[i])));
                    }
                    //                权限ID
                    for (let i = 0; i < this.myData.length; i++) {
                        this.data_id.push(this.myData[i].id);
                    }
//                角色ID/权限ID 公共值
                    for (let s in this.data_id) {
                        for (let x in this.role_id) {
                            if (this.data_id[s] === this.role_id[x]) {
                                this.checkboxModel.push(this.data_id[s]);
                            }
                        }
                    }
                });
                this.status1 = false;
                this.status2 = true;
            },

//             确认修改
            revise_power (){
                this.$http.post('manager/Role/updateRole', {
                        id: String(this.revise_id),
                        title: String(this.title),
                        rules: String(this.checkboxModel)
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(res => {
                    if(res.data.code === '40030'){
//                        成功关闭模态框
                        $('#new_add').modal('hide');
//                        成功信息
                        this.info.success = res.data.msg;
//                        显示成功信息
                        this.info.state_error = false;
                        this.info.state_success = true;
//                        一秒自动关闭成功信息
                        setTimeout(() => {
                            this.info.state_success = false
                        }, 1000);
                    }else{
//                        关闭成功弹窗
                        this.info.state_success = false;
//                        错误信息
                        this.info.error = res.data.msg;
//                        显示错误弹窗
                        this.info.state_error = true;
                    }
                });
            },

//             新增按钮
            add_btn (){
                this.role_id = [];
                this.data_id = [];
                this.checkboxModel = [];
                this.title = '';
                this.status1 = true;
                this.status2 = false;
            },

//             确认新增
            add_power () {
                this.$http.post('manager/Role/saveRole',
                    {
                        title: this.title,
                        rules: this.checkboxModel.join(",")
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                ).then(res => {
                    if(res.data.code === '40020'){
//                        成功关闭模态框
                        $('#new_add').modal('hide');
//                        成功信息
                        this.info.success = res.data.msg;
//                        显示成功信息
                        this.info.state_error = false;
                        this.info.state_success = true;
                        this.role_info.push({
                            id: res.data.data.id,
                            title: res.data.data.title
                        });
                    }else{
//                        关闭成功弹窗
                        this.info.state_success = false;
//                        错误信息
                        this.info.error = res.data.msg;
//                        显示错误弹窗
                        this.info.state_error = true;
                    }
                });
            },

//            多选生成数组/删除数组对应值
            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.checkboxModel.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.checkboxModel.indexOf(rul);
                    if (index > -1) {
                        this.checkboxModel.splice(index, 1);
                    }
                }
            }
        }
    };
</script>

<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 2px;
        width: 17px;
        height: 17px;
    }
    .modal-content{
        overflow: auto;
    }
    .check {
        width: 50%;
        display: inline-block;
        padding: 5px 0;
        font-size: 14px;
    }
</style>
