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
                        <vue-ztree :list.sync='departmentList' :func='departmentClick'
                                   :contextmenu='rightClick' :is-open='true'>
                        </vue-ztree>
                    </div>
                </section>
            </div>
            <div class="col-md-9">
                <section class="panel">
                    <div class="panel-body">
                        <h5 style="text-align: right">
                            <span class="pull-left" style="margin-top: 8px;">岗位管理</span>
                            <button class="btn btn-primary btn-sm" @click="addPosition">岗位添加</button>
                        </h5>
                        <positionTree :list.sync='positionList' :func='positionClick'
                                   :contextmenu='rightClick' :is-open='true'>
                        </positionTree>
                        <div v-if="noPosition">
                            <i style="color: #1caadc;font-size: 16px">暂无相应岗位,请添加岗位...</i>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <editDpm :department_name="department_name" :department_id="department_id" @editDdp="changeDpm"></editDpm>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <AddDpm :department_name="department_name" :department_id="department_id" @success='addDpm'></AddDpm>
        <Status :state='info'></Status>
        <!--<Transfer @TransferDepartment="transferCommit"></Transfer>-->
        <PositionAdd :position_id="position_id" :position_name="position_name" @success = 'addSuccess'></PositionAdd>
        <PositionEdit :eidtId = 'position_id' @success="editSuccess"></PositionEdit>

    </div>
</template>

<script>
    import vueZtree from '../oraganizeTree/vueTree.vue'
    import positionTree from  '../positionTree/vueTree.vue'
    import editDpm from  './editDpm.vue';
    import Confirm from '../common/confirm.vue'
    import AddDpm from  './addDubordinateDpm.vue'
    import Status from '../common/status.vue';
//    import Transfer from './transferDpm.vue'
    import PositionEdit from './positionEdit.vue'   //职位编辑
    import PositionAdd from  './positionAdd.vue'
    export default {
        components: {
            vueZtree,
            positionTree,
            editDpm,
            Confirm,
            AddDpm,
            Status,
//            Transfer,
            PositionEdit,
            PositionAdd
        },
        data () {
            return {
                departmentList: [], //部门数据
                positionList : [],  //职位数据
                department_id: '',  //部门id
                department_name: '',//部门名称
                confirmMsg: [],     //confirm信息
                info: {             //提示信息
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                noPosition : false,     //有无相应职位
                position_id : '',       //  职位id
                position_name : '',     //  职位名字
            }
        },
        created(){
            this.getDepartementList();
            this.getPositionList(1);
        },
        methods: {
            getDepartementList(){
                this.$http.post('manager/department/department_all').then((res) => {
                    this.departmentList = res.data.data.data;
                    console.log(this.departmentList)
                })
            },
            getPositionList(id){
                this.$http.post('manager/department/positions/id/' + id).then((res) => {
                    if(res.data.code === '10050'){
                        this.positionList = res.data.data.data;
                        this.noPosition = false;
                    }else {
                        this.positionList = [];
                        this.noPosition = true;
                    }

                })
            },
            //****************组织架构**********************
            // 点击节点
            departmentClick(val) {
                this.department_id = val.id;
                this.department_name = val.name;
                this.getPositionList(this.department_id);
                switch (val.contentHtml) {
                    case '编辑部门' :
                        $('#myModalEditDpm').modal('show');
                        break;
                    case '新建下级部门' :
                        $('#myModalAddDpm').modal('show');
                        break;
//                    case '启用部门' :
//                        this.department_id = val.id;
//                        this.confirmMsg = {msg: '您确定启用此部门吗'};
//                        $('#confirm').modal('show');
//                        this.msgFlag = 'startDepartment';
//                        break;
//                    case '停用部门' :
//                        this.department_id = val.id;
//                        this.confirmMsg = {msg: '您确定停用此部门吗'};
//                        $('#confirm').modal('show');
//                        this.msgFlag = 'stopDepartment';
//                        break;
                    case '删除部门' :
                        this.confirmMsg = {msg: '您确定删除此部门吗'};
                        $('#confirm').modal('show');
                        this.msgFlag = 'deleteDepartment';
//                        break;
//                    case '调迁部门' :
//                        this.department_id = val.id;
//                        $('#myModalTransferDpm').modal('show');
                }

            },
            // 右击事件
            rightClick() {
                console.log("rightClick");
            },
            changeDpm(){
                this.getDepartementList();
            },
            addDpm(){
                this.getDepartementList();
            },
            getConfirm(){
                if(this.msgFlag === 'deleteDepartment'){
                    this.$http.get('manager/department/softDelete/id/' + this.department_id).then((res) => {
                        if (res.data.code === '10090') {
                            this.getDepartementList();
                            this.successMsg(res.data.msg);
                        } else {
                            this.errorMsg(res.data.msg);
                        }
                    })
                }else if(this.msgFlag === 'deletePosition'){
                    this.$http.post('manager/user/position_delete/id/' +this.position_id).then((res) =>{
                        if (res.data.code === '90071'){
                            this.getPositionList(this.department_id);
                            this.successMsg(res.data.msg);
                        }else {
                            this.errorMsg(res.data.msg);
                        }
                    })
                }

//                switch (this.msgFlag) {
//                    case 'startDepartment' :
//                        this.$http.get('manager/department/disableDpm/id/' + this.department_id).then((res) => {
//                            if (res.data.code == 10010) {
//                                this.getDepartementList();
//                                this.successMsg(res.data.msg);
//                            } else {
//                                this.errorMsg(res.data.msg);
//                            }
//                        })
//                        break;
//                    case 'stopDepartment' :
//                        this.$http.get('manager/department/disableDpm/id/' + this.department_id).then((res) => {
//                            if (res.data.code == 10010) {
//                                this.getDepartementList();
//                                this.successMsg(res.data.msg);
//                            } else {
//                                this.errorMsg(res.data.msg);
//                            }
//                        })
//                        break;
//                    case 'delete' :
//
//
//                }
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
            },

            //****************职位管理**********************
            positionClick(val){
                console.log(val);
                this.position_name = val.vocation;
                this.position_id = val.id;
                switch (val.contentHtml) {
                    case '编辑岗位' :
                        $('#positionEdit').modal('show');
                        break;
                    case '新建下级岗位' :
                        $('#positionAdd').modal('show');
                        break;
                    case '岗位权限' :
//                        $('#myModalAddDpm').modal('show');
                        break;
                    case '删除岗位' :
                        this.confirmMsg = {msg: '您确定删除此岗位吗'};
                        $('#confirm').modal('show');
                        this.msgFlag = 'deletePosition';
                }
            },
            addPosition(){
                this.position_id = '';
                this.position_name = '';
                $('#positionAdd').modal('show');
            },
            editSuccess(){
                this.getPositionList(this.department_id);
            },
            addSuccess(){
                this.position_id = '';
                this.position_name = '';
                this.getPositionList(this.department_id);
            },

        },

    }
</script>
<style scoped>
    h5 {
        font-size: 18px;
        color: #333333;
    }
    @media screen and (min-width: 992px) {
        .panel {
            min-height: 780px;
        }
    }
    .panel-body > h5 {
        border-bottom: 2px solid #dddddd;
        padding: 0 0 8px 6px;
        margin-top: 0;
    }
</style>