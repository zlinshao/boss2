<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li class="active">职位管理</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body">
                <div>
                    <div class="pull-right" style="margin-bottom: 12px;margin-right: 12px">
                        <button class="btn btn-primary" @click="addPositon">
                            <i class="fa fa-plus-square"></i>&nbsp;新增职位
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <!--表格-->
        <div>
            <section class="panel table table-responsive roll">
                <table class="table table-striped table-advance table-hover">
                    <thead class="text-center">
                    <tr>
                        <th>职位</th>
                        <th>创建时间</th>
                        <th>部门</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in positionManage">
                        <td>{{item.vocation}}</td>
                        <td>{{item.create_time}}</td>
                        <td>{{item.name}}</td>
                        <td class="dropdown ">
                            <a href="#"
                               class="dropdown-toggle fa fa-gear"
                               data-toggle="dropdown" role="button" aria-haspopup="true"
                               aria-expanded="false">
                            </a>
                            <ul class="dropdown-menu dropdown-menu-right" style="padding: 0;margin:0">

                                <li @click="edit(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block">
                                        修改职位
                                    </button>
                                </li>
                                <li role="separator" class="divider" style="margin: 0"></li>
                                <li @click="deletePositon(item.id)">
                                    <button type="button" class="btn btn-default btn-lg btn-block">
                                        删除职位
                                    </button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                    <tr v-if="isShow">
                        <td colspan="4" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>
        <Page :pg="pages" @pag="getPage" :beforePage="page"></Page>
        <Status :state='info'></Status>
        <PositionAdd @success = 'addSuccess'></PositionAdd>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <PositionEdit :eidtId = 'operateId' @success="editSuccess"></PositionEdit>

    </div>
</template>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import PositionAdd from  './positionAdd.vue'
    import Confirm from '../common/confirm.vue'
    import PositionEdit from './positionEdit.vue'
    export default{
    components: { Page , Status , PositionAdd ,Confirm,PositionEdit},
        props: ['simulate'],
        data(){
            return {
                dictionary: [], // 字典
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
                pages: '',      // 总页数
                isShow: false,  //无数据
                Waiting: false,  //loading
                page : '',
                positionManage : [],
                confirmMsg : [],
                operateId : '',
            }
        },
        created(){
            this.searchUser();
        },
        methods: {
            search(){
                this.page = '';
                this.searchUser();
            },
            searchUser(){
                this.$http.post('manager/user/position_index/pages/' +this.page).then((res) =>{
                    if(res.data.code === '90040'){
                        this.positionManage = res.data.data.data;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                        this.Waiting = false;
                    }else {
                        this.positionManage = [];
                        this.pages = '';
                        this.isShow = true;
                        this.Waiting = true;
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                    }
                })
            },
            getPage(val){
                this.page = val;
                this.searchUser();
            },
            addPositon(){
                $('#positionAdd').modal('show')
            },
            addSuccess(){
                this.search();
            },
            edit(id){
                this.operateId = id;
                $('#positionEdit').modal('show')
            },
            editSuccess(){
                this.operateId = '';
                this.searchUser();
            },
            deletePositon(id){
                this.operateId = id;
                this.confirmMsg = {msg: '您确定删除此职位吗'};
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.post('manager/user/position_delete/id/' +this.operateId).then((res) =>{
                    if (res.data.code === '90071'){
                        this.info.success = res.data.msg;
                        this.info.state_success = true;
                        this.search();
                    }else {
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                    }
                })
            },

        }
    }
</script>

<style scoped>
    .panel-body {
        padding: 8px 8px 0 15px;
    }


    .panel-body ul {
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
    }

    .panel-body ul li {
        float: left;
    }

    .panel-body ul li + li:before {
        content: '|';
        margin: 0 10px;
    }

    div.pull-right {
        margin-top: 5px;
    }

    /*下拉框样式*/
    .btn-default {
        background-color: #fff;
        border-color: #fff;
        color: #666;
    }

    .btn-default:hover {
        background-color: #dedede;
        border-color: #dedede;
        color: #fff;
    }
    .dropdown-menu {
        padding: 0;
    }

    dropdown-menu li:hover {
        background-color: #dedede;

    }

    .btn-lg {
        border-radius: 0;
        font-size: 12px;
    }
    ul.dropdown-menu li button {
        line-height: 33px;
        width: 100%;
        padding: 0;
        border-radius: 0;
    }
    .table-responsive {
        overflow: visible;
    }
</style>