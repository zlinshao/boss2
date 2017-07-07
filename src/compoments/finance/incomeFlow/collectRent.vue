<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>收支流水</li>
            <li>
                <router-link to="/collectFlow">应收</router-link>
            </li>
            <li class="active">收房租日期</li>
        </ol>
        <div class="clearFix" v-show="operId!=0">
            <div class="panel col-lg-12">
                <div class="choosed">
                    <ul class="clearFix">
                        <li><a>已选中&nbsp;1&nbsp;项</a></li>
                        <li>
                            <a @click="oper">编辑收房租日期</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center"></th>
                        <th class="text-center">收房租日期</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">收入科目</th>
                        <th class="text-center">应收款项</th>
                        <th class="text-center">实收款项</th>
                        <th class="text-center">租客姓名</th>
                        <th class="text-center">联系方式</th>
                        <th class="text-center">合同日期</th>
                        <th class="text-center">租房价格</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">备注</th>
                        <th class="text-center">经手人</th>

                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>
                            <input type="checkbox" :value="1" :checked="operId===1" @click.stop="changeIndex($event,1)">
                        </td>
                        <td>第&nbsp;1&nbsp;次打房租</td>
                        <td>的说都v</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                    </tr>
                    <tr class="text-center">
                        <td>
                            <input type="checkbox" :value="2" :checked="operId===2" @click.stop="changeIndex($event,2)">
                        </td>
                        <td>第&nbsp;1&nbsp;次打房租</td>
                        <td>的说都v</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                        <td>你都可苏宁</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <a class="pull-right" @click="$router.back(-1)">
            <button class="btn btn-success">返回</button>
        </a>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">修改打房租日期</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="form">
                            <div class="form-group">
                                <label class="col-sm-3 control-label">收房租日期:</label>
                                <div class="col-sm-8">
                                    <input @click="remindData" type="text" name="addtime" value="" placeholder="收房租日期" class="form-control form_datetime">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--提示信息-->
        <Status :state='info'></Status>

    </div>
</template>
<style scoped>
    label{
        line-height: 34px;
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
    import Status from '../../common/status.vue';

    export default{
        data(){
            return {
                data : '',
                id : '',

                operId : 0,
                paging : '',
                page : 1,                  // 当前页数
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
        components: {Status},
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
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    this.date = ev.target.value;
//                    console.log(this.date)
                }.bind(this));
            },
            oper(){
                console.log(this.operId);

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