<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li class="active">待处理项</li>
        </ol>
        <section class="panel">
            <div class="panel-body col-lg-12">
                <div v-show="operId==0">
                    <form class="form-inline" v-show="operId==0" role="form">
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
                            <a class="btn btn-success" data-toggle="modal" data-target="#addModal">
                                <i class="fa fa-plus-square"></i>&nbsp;新增待处理项
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">事项类型</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">租客姓名</th>
                        <th class="text-center">入住时间</th>
                        <th class="text-center">离开时间</th>
                        <th class="text-center">水费</th>
                        <th class="text-center">电费</th>
                        <th class="text-center">燃气卡费</th>
                        <th class="text-center">物业费</th>
                        <th class="text-center">转租费用</th>
                        <th class="text-center">违约金</th>
                        <th class="text-center">经手人</th>
                        <th class="text-center">状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>
                            <input type="checkbox">
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-success">待处理</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <!--新增模态框-->
        <div class="modal fade full-width-modal-right" id="addModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="addModalLabel">新增待处理项</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">事件类型:</label>
                            <div class="col-sm-8">
                                <div class="dropdown">
                                    <select name="type" class="form-control">
                                        <option value="">调房</option>
                                        <option value="1">转租</option>
                                        <option value="1">退房</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">租房人:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="villageName" class="col-sm-3 control-label">租房地址:</label>
                            <div class="col-sm-8 input-group">
                                <input title="请点击选择" type="text" class="form-control" readonly  data-toggle="modal" data-target="#myModal1">
                                <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">租客姓名:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">入住时间:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="入住时间" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">离开时间:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="入住时间" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">水费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">电费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">燃气卡费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">物业费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">转租费用:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">违约金:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">经手人:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <!--<button type="button" class="btn btn-default">取消</button>-->
                        <button type="button" class="btn btn-primary">保存</button>
                    </div>

                </div>
            </div>
        </div>


        <!--编辑模态框-->
        <div class="modal fade full-width-modal-right" id="operModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="operModalLabel">编辑待处理项</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">事件类型:</label>
                            <div class="col-sm-8">
                                <div class="dropdown">
                                    <select name="type" class="form-control">
                                        <option value="">调房</option>
                                        <option value="1">转租</option>
                                        <option value="1">退房</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">租房人:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="villageName" class="col-sm-3 control-label">租房地址:</label>
                            <div class="col-sm-8 input-group">
                                <input title="请点击选择" type="text" class="form-control" id="villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">租客姓名:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">入住时间:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="入住时间" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">离开时间:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="入住时间" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">剩余租金:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">水费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">电费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">燃气卡费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">物业费:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">转租费用:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">违约金:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">结算金额:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#delete">删除</button>
                        <button type="button" class="btn btn-primary">结算</button>
                        <!--<button type="button" class="btn btn-default">退出</button>-->
                    </div>
                </div>
            </div>
        </div>

        <Page :pg="paging" @pag="getPage"></Page>


        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }

</style>
<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'

    export default{
        components: {Page,Status,DatePicker},
        data(){
            return {
                operId : 0,
                paging : '',
                page : 1,                  // 当前页数

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
        updated (){
            this.remindData();
            //            时间选择
        },
        created () {
            this.pendingItemList();
        },
        methods : {
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            pendingItemList(){
                /*this.$http.get('json/pendingItem.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.cont.myData = res.data.data.pendingItemList;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })*/
            },
            remindData (){
                var that = this;
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                });
                $('.form-inline .form_datetime').on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                });

            },
            getPage(data){
                this.page = data
            },
            oper(){
                console.log(this.operId);

                // 先请求

//                请求成功打开模态框
                $('#operModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/

            },
            getDate(data){

            }
        }
    }
</script>