<template>
    <div>
        <ol class="breadcrumb">
            <li>组长报备</li>
            <li>收房报备</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <!--<div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">全部</option>
                            <option value="1">鸡腿</option>
                            <option value="2">梦想</option>
                        </select>
                    </div>-->
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                    </div>


                    <div class="input-group clearFix">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="搜索房屋地址"
                               v-model="params.search" @keydown.enter.prevent="search">
                        <span class="input-group-btn">
                            <button class="btn btn-success" id="search" type="button" @click="search"><i
                                    class="fa fa-search"></i></button>
                        </span>
                    </div>

                    <div class="input-group pull-right">
                        <a class="btn btn-success" data-toggle="modal" data-target="#myModal"><i class="fa fa-plus-square"></i>&nbsp;新增收房报备
                        </a>
                    </div>

                </form>

            </div>
        </section>

        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive">
                    <table class="table table-striped table-advance">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">签约人</th>
                            <th class="text-center">所属部门</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">门牌号</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">收月单价</th>
                            <th class="text-center">收房年限</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">空置期</th>
                            <th class="text-center">押金</th>
                            <th class="text-center">中介费</th>
                            <th class="text-center">汇款方式</th>
                            <th class="text-center">汇款账户</th>
                            <th class="text-center">签约日期</th>
                            <th class="text-center">备注</th>
                            <th class="text-center">状态</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <input type="checkbox">
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">ssss</h4>
                    </div>
                    <div class="modal-body clearFix">
                        ashdjkasnd
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="button" class="btn btn-primary">完成</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>

    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'
    export default{
        components: {Page,Status,DatePicker},
        data(){
            return {
                isShow : false,

                paging : '',
                page : '',
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
                dateConfigure : [
                    {
                        range : true,
                        needHour : true
                    }
                ],
                myData : [],
                params : {
                    date_range : '',
                    search : ''
                },
            }
        },
        methods: {
            search(){
                console.log(this.params);
            },
            getDate(data){
                console.log(data);
                this.date_range = data;
                this.search();
            },
            getData(data){
                // 页数
//                console.log(data);
                this.page = data;
                this.search();
            },
        }
    }
</script>

<style scoped>
    div.padd {
        display: inline-block;
        padding: 0 15px 0 0;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>