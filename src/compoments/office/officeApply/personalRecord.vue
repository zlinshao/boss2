<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品申领</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control" @change="search(1)">
                                <option value="">办公用品库</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select class="form-control" @change="search(1)">
                                <option value="">类别</option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="办公用品名称"
                                   @keydown.enter.prevent="search(1)" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right" data-toggle="modal" data-target="#applySupply">
                            <a class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;申领办公用品
                            </a>
                        </div>
                    </form>
                </div>

                <div class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <!--<li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>-->
                        <li>
                            <h5><a><i class="fa fa-times-circle-o"></i>&nbsp;归还</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">
                                <label><input type="checkbox">全选</label>
                            </th>
                            <th class="text-center">办公用品名称</th>
                            <th class="text-center">登记类型</th>
                            <th class="text-center">申请数量</th>
                            <th class="text-center">操作日期</th>
                            <th class="text-center">审批人</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">
                            <td>
                                <input type="checkbox">
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>

        <!--申领-->
        <ApplySupply></ApplySupply>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'
    import ApplySupply from '../applySupply.vue'
    export default{
        components: {Page,Status,DatePicker,ApplySupply},
        data(){
            return {
                paging: 1,
                beforePage: 1,

                myData: [],      //列表数据
                isShow: false,

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
                params : {
                    range : '',
                    search : '',
                },
                dateConfigure : [
                    {
                        range : true,
                    }
                ],
                currentDate :[],
            }
        },
        methods: {
            search(val){

            },
            getDate(val){
                this.params.range = val;
            }
        }
    }
</script>
<style scoped>
    thead tr input[type=checkbox]{
        vertical-align: bottom;
        margin-right: 8px;
    }
    table tr input[type=checkbox] {
        width: 17px;
        height: 17px;
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }
</style>