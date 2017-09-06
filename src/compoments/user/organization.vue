<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li class="active">组织架构</li>
        </ol>
        <div class="row">
            <div class="col-md-3">
                <section class="panel">
                    <div class="panel-body">
                        <h5 style="margin-top: 8px;padding-bottom: 11px">
                            <span>组织架构</span>
                        </h5>
                        <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick'
                                   :contextmenu='contextmenuClick' :is-open='true'>
                        </vue-ztree>
                    </div>
                </section>
            </div>
            <div class="col-md-9">
                <section class="panel">
                    <div class="panel-body">
                        <h5 style="text-align: right">
                            <span class="pull-left" style="margin-top: 8px;">岗位管理</span>
                            <button class="btn btn-primary btn-sm" style="visibility: hidden">岗位添加</button>
                        </h5>
                    </div>
                </section>
            </div>
        </div>

        <editDpm :department_name="department_name" :department_id="department_id" @editDdp="changeDpm"></editDpm>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <AddDpm :department_name="department_name" :department_id="department_id" @success='addDpm'></AddDpm>
        <Status :state='info'></Status>
        <Transfer @TransferDepartment="transferCommit"></Transfer>
    </div>
</template>

<script>
    import vueZtree from '../tree/vueTree.vue'
    import editDpm from  './editDpm.vue';
    import Confirm from '../common/confirm.vue'
    import AddDpm from  './addDubordinateDpm.vue'
    import Status from '../common/status.vue';
    import Transfer from './transferDpm.vue'

    export default {
        components: {
            vueZtree,
            editDpm,
            Confirm,
            AddDpm,
            Status,
            Transfer
        },
        data () {
            return {
                ztreeDataSource: [],
                department_id: '',
                department_name: '',
                confirmMsg: [],
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
            }
        },
        created(){
            this.getDepartementList();
        },
        methods: {
            getDepartementList(){
                this.$http.post('manager/department/department_all').then((res) => {
                    this.ztreeDataSource = res.data.data.data;
                })
            },
            // 点击节点
            nodeClick: function (val) {

                switch (val.contentHtml) {
                    case '编辑部门' :
                        this.department_name = val.name;
                        this.department_id = val.id;
                        $('#myModalEditDpm').modal('show');
                        break;
                    case '新建下级部门' :
                        this.department_name = val.name;
                        this.department_id = val.id;
                        $('#myModalAddDpm').modal('show');
                        break;
                    case '启用部门' :
                        this.department_id = val.id;
                        this.confirmMsg = {msg: '您确定启用此部门吗'};
                        $('#confirm').modal('show');
                        this.msgFlag = 'startDepartment';
                        break;
                    case '停用部门' :
                        this.department_id = val.id;
                        this.confirmMsg = {msg: '您确定停用此部门吗'};
                        $('#confirm').modal('show');
                        this.msgFlag = 'stopDepartment';
                        break;
                    case '删除部门' :
                        this.department_id = val.id;
                        this.confirmMsg = {msg: '您确定删除此部门吗'};
                        $('#confirm').modal('show');
                        this.msgFlag = 'delete';
                        break;
                    case '调迁部门' :
                        this.department_id = val.id;
                        $('#myModalTransferDpm').modal('show');
                }

            },
            // 右击事件
            contextmenuClick: function () {
//                console.log("触发了自定义的contextmenuClick事件");
            },
            changeDpm(){
                this.getDepartementList();
            },
            addDpm(){
                this.getDepartementList();
            },
            getConfirm(){
                switch (this.msgFlag) {
                    case 'startDepartment' :
                        this.$http.get('manager/department/disableDpm/id/' + this.department_id).then((res) => {
                            if (res.data.code == 10010) {
                                this.getDepartementList();
                                this.successMsg(res.data.msg);
                            } else {
                                this.errorMsg(res.data.msg);
                            }
                        })
                        break;
                    case 'stopDepartment' :
                        this.$http.get('manager/department/disableDpm/id/' + this.department_id).then((res) => {
                            if (res.data.code == 10010) {
                                this.getDepartementList();
                                this.successMsg(res.data.msg);
                            } else {
                                this.errorMsg(res.data.msg);
                            }
                        })
                        break;
                    case 'delete' :
                        this.$http.get('manager/department/softDelete/id/' + this.department_id).then((res) => {
                            if (res.data.code == 10090) {
                                this.getDepartementList();
                                this.successMsg(res.data.msg);
                            } else {
                                this.errorMsg(res.data.msg);
                            }
                        })

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

            transferCommit(val){
                this.$http.post('manager/department/department_move', {
                    parent_id: val,
                    id: this.department_id
                }).then((res) => {
                    if (res.data.code === '10021') {
                        this.getDepartementList();
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            }
        },

    }
</script>
<style scoped>
    h5 {
        font-size: 18px;
        color: #333333;
    }
    /*.panel {*/
        /*height: 80%;*/
    /*}*/

    .panel-body > h5 {
        border-bottom: 2px solid #dddddd;
        padding: 0 0 8px 6px;
        margin-top: 0;
    }
</style>