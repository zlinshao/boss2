<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">待处理项</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline" v-show="operId==0" role="form">
                        <div class="dropdown input-group">
                            <select name="" class="form-control">
                                <option value="">全部</option>
                                <option value="1">租房</option>
                                <option value="2">收房</option>
                            </select>
                        </div>

                        <div class="dropdown input-group">
                            <select name="" class="form-control">
                                <option value="">全部</option>
                                <option value="1">租房</option>
                                <option value="2">收房</option>
                            </select>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="房屋地址/租房人"  @keydown.enter.prevent="">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click=""><i class="fa fa-search"></i></button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#add">
                                <i class="fa fa-plus-square"></i>&nbsp;新增待处理项
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="edit"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times-circle-o"></i>删除</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-calculator"></i>结算</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">事项类型</th>
                            <th class="text-center">合同编号</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">客户姓名</th>
                            <th class="text-center">入住周期</th>
                            <th class="text-center">入住时长</th>
                            <th class="text-center">应退</th>
                            <th class="text-center">实际扣款</th>
                            <th class="text-center">实际退款</th>
                            <th class="text-center">退款账户</th>
                            <th class="text-center">结算人</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">
                            <td><input type="checkbox" @click="picked($event)"></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="15" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--新增模态框-->
        <addModal></addModal>

        <Page :pg="paging" @pag="getPage" :beforePage = 'page'></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    import addModal from './pendingAdd.vue'

    export default{
        components: {Page,Status,DatePicker,addModal},
        data(){
            return {
                operId : 0,
                paging : '',
                page : 1,                  // 当前页数
                isShow:false,
                params : {
                    startDataTime : '',
                    finishDataTime : ''
                },
                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        created () {
            this.pendingList();
        },
        methods : {
            pendingList(){

            },
            picked(e){
                if(e.target.checked===true){
                    this.operId = 1;
                }else {
                    this.operId = 0;
                }

            },
            getPage(val){
                this.page = val;
            },
            edit(){
                $('#operModal').modal('show');

            },
            getDate(val){

            }
        }
    }
</script>
<style scoped>
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>