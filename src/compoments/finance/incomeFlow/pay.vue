<template>
    <div>

        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>收支流水</li>
            <li class="active">应付</li>
        </ol>

        <div class="clearFix">
            <div class="panel col-lg-12">
                <form class="form-inline" v-show="operId==0" role="form">
                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">玄武</option>
                            <option value="1">栖霞</option>
                        </select>
                    </div>

                    <div class="form-group datetime">
                        <label>
                            <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                        </label>
                        <label>
                            <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                        </label>
                    </div>

                    <div class="input-group bootstrap-timepicker">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"  @keydown.enter.prevent="">
                        <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click=""><i class="fa fa-search"></i></button>
                    </span>
                    </div>
                    <div class="form-group pull-right">
                        <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addNew">
                            <i class="fa fa-plus-square"></i>&nbsp;新增应付
                        </a>
                    </div>
                </form>

                <div class="choosed" v-show="operId!=0">
                    <ul class="clearFix">
                        <li><a>已选中&nbsp;1&nbsp;项</a></li>
                        <li>
                            <a @click="oper">编辑</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="panel tips">
            <ul class="clearFix">
                <li>
                    应付款项:
                    <span>{{tips.payables}}</span>
                </li>
                <li>
                    实付款项:
                    <span>{{tips.payments}}</span>
                </li>
                <li>
                    剩余款项
                    <span>{{tips.remainingFunds}}</span>
                </li>
            </ul>
        </div>

        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">片区</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">支出科目</th>
                        <th class="text-center">汇款账户</th>
                        <th class="text-center">应付款项</th>
                        <th class="text-center">实付款项</th>
                        <th class="text-center">剩余款项</th>
                        <th class="text-center">付款时间</th>
                        <th class="text-center">补齐时间</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">空置期</th>
                        <th class="text-center">收房价格</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">经手人</th>
                        <th class="text-center">状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <router-link tag="tr" :key="item.id" :to="{path:'payingRent' , query:{address:item.address}}" class="text-center" v-for="(item,index) in cont.myData">
                        <td>
                            <input type="checkbox" :value="item.id" :checked="operId===item.id" @click.stop="changeIndex($event,item.id)">
                        </td>
                        <td>{{item.people}}</td>
                        <td>{{item.region.name}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.expenditureAccount}}</td>
                        <td>{{item.account}}</td>
                        <td>{{item.receivables}}</td>
                        <td>{{item.payables}}</td>
                        <td>{{item.remainingFunds}}</td>
                        <td>{{item.payTime}}</td>
                        <td>{{item.fillTime}}</td>
                        <td>{{item.payWay.name}}</td>
                        <td>{{item.vacancyTime}}</td>
                        <td>{{item.collectPrice}}</td>
                        <td>{{item.years}}</td>
                        <td>{{item.byHand}}</td>
                        <td>
                            <button type="button" class="btn btn-sm btn-success">入账</button>
                        </td>
                    </router-link>
                    </tbody>
                </table>
            </section>
        </div>


        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="addModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="form-group">
                            <label class="col-sm-3 control-label">开单人:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">片区:</label>
                            <div class="col-sm-8">
                                <div class="dropdown">
                                    <select name="type" class="form-control">
                                        <option value="">啊啊</option>
                                        <option value="1">搜索</option>
                                        <option value="1">得到</option>
                                    </select>
                                </div>
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
                            <label class="col-sm-3 control-label">栋:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">室:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">支出科目:</label>
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
                            <label class="col-sm-3 control-label">付款方式:</label>
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
                            <label class="col-sm-3 control-label">应付款项:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">实付款项:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-sm-3 control-label">付款时间:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="付款时间" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">剩余款项:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-sm-3 control-label">补齐时间:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="补齐时间" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">汇款账户:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">空置期:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>


                        <div class="form-group">
                            <label class="col-sm-3 control-label">收房价格:</label>
                            <div class="form-group col-sm-8">
                                <label class="col-sm-3 control-label">第一年:</label>
                                <div class="col-sm-7">
                                    <input type="number" min="0" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <i class="fa fa-plus-circle" @click="addMoreYears"></i>
                                </div>
                            </div>
                        </div>

                        <div class="form-group" v-show="moreYears>=2">
                            <label class="col-sm-3 control-label"></label>
                            <div class="form-group col-sm-8">
                                <label class="col-sm-3 control-label">第二年:</label>
                                <div class="col-sm-7">
                                    <input type="number" min="0" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"  v-show="moreYears>=3">
                            <label class="col-sm-3 control-label"></label>
                            <div class="form-group col-sm-8">
                                <label class="col-sm-3 control-label">第三年:</label>
                                <div class="col-sm-7">
                                    <input type="number" min="0" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"  v-show="moreYears>=4">
                            <label class="col-sm-3 control-label"></label>
                            <div class="form-group col-sm-8">
                                <label class="col-sm-3 control-label">第四年:</label>
                                <div class="col-sm-7">
                                    <input type="number" min="0" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>
                                </div>
                            </div>
                        </div>
                        <div class="form-group"  v-show="moreYears==5">
                            <label class="col-sm-3 control-label"></label>
                            <div class="form-group col-sm-8">
                                <label class="col-sm-3 control-label">第五年:</label>
                                <div class="col-sm-7">
                                    <input type="number" min="0" class="form-control">
                                </div>
                                <div class="col-sm-2">
                                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">年限:</label>
                            <div class="col-sm-8">
                                <input type="number" min="0" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">经手人:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">合同开始日期:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="合同开始日期" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">合同结束日期:</label>
                            <div class="col-sm-8">
                                <input @click="remindData" type="text" name="addtime" value="" placeholder="合同结束日期" class="form-control form_datetime">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">合同编号:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">房东姓名:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-sm-3 control-label">联系方式:</label>
                            <div class="col-sm-8">
                                <input type="tel" class="form-control">
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <!--<button type="button" class="btn btn-default">取消</button>-->
                        <button type="button" class="btn btn-primary" v-if="isAdd">保存</button>
                        <button type="button" class="btn btn-primary" v-else="isAdd">修改</button>
                    </div>
                </div>
            </div>
        </div>
        <Page :pg="paging" @pag="getPage"></Page>


        <ChooseAddress @getChildData="getAddress"></ChooseAddress>
        <!--提示信息-->
        <Status :state='info'></Status>

    </div>
</template>
<style scoped>
    .pull-right{
        padding-top: 5px;
    }
    .tips{
        line-height: 30px;
        padding-left: 12px;
        padding-bottom: 5px;
        font-size: 15px;
        /*margin-top: 20px;*/
    }
    .tips ul li{
        float: left;
    }
    .tips ul li+li{
        margin-left: 30px;
    }
    .tips ul li span{
        font-size: 18px;
        color: #FF6C60;
        font-weight: bold;
    }
    div.input-group{
        padding: 0 15px;
    }
    label{
        line-height: 34px;
    }
    .col-sm-2 i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /*text-align: left;*/
        cursor: pointer;
    }
    .col-sm-2 i:hover{
        color: #999;
    }
    tbody tr{
        cursor: pointer;
    }
    .choosed{
        /*padding-bottom: 10px;*/
    }
    .choosed ul li{
        float: left;
    }
    .choosed ul li+li:before{
        content: '|';
        display: inline-block;
        margin: 0 10px;
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>
<script>
    import Page from '../../common/page.vue'
    import ChooseAddress from '../../common/chooseAddress.vue'
    import Status from '../../common/status.vue';

    export default{
        data(){
            return {
                operId : 0,
                paging : '',
                page : 1,                  // 当前页数

                title : '',
                isAdd : true,
                moreYears : 1,
                modal : {
                    village : {
                        villageName : ''
                    }
                },
                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },
                params : {
                    startDataTime : '',
                    finishDataTime : ''
                },
                tips : {},
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
            this.payFlowList();
        },
        components: {Page,ChooseAddress},
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
            addNew(){
                this.title = '新增应付';
                this.isAdd = true;
            },
            operation(id,index){
                this.title = '修改应付';
                this.isAdd = false;
            },
            payFlowList(){
                this.$http.get('json/itemFlow.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.cont.myData = res.data.data.payFlowList;
                    this.tips = res.data.data.payTips;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })
            },
            remindData (){
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
                    if (ev.target.placeholder === '开始时间'){
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getPage(){

            },
            getAddress(data){
                this.modal.village = data;
                console.log(this.modal.village);
            },
            addMoreYears(){
                if (this.moreYears === 5){
                    return;
                }else {
                    this.moreYears++;
                }
            },
            reduceMoreYears(){
                if (this.moreYears === 1){
                    return;
                }else {
                    this.moreYears--;
                }
            },
            oper(){
                console.log(this.operId);
                this.title = '编辑应付';
                this.isAdd = false;
                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/

            }
        }
    }
</script>