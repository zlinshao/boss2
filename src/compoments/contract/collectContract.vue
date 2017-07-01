<template>
    <div>
        <ol class="breadcrumb">
            <li>合同管理</li>
            <li class="active">收房合同</li>
        </ol>

        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix" v-if="pitch.length==0">
                <form class="form-inline clearFix" role="form">
                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="0">全部</option>
                            <option value="1">已通过</option>
                            <option value="2">未通过</option>
                        </select>
                    </div>

                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">全部</option>
                            <option value="">秦淮区</option>
                            <option value="">栖霞区</option>
                            <option value="">建邺区</option>
                            <option value="">雨花区</option>
                            <option value="">江宁区</option>
                        </select>
                    </div>
                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">全部</option>
                            <option value="">组员</option>
                            <option value="">组员</option>
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
                        <input type="text" class="form-control" id="search_info" @keydown.enter.prevent="search">
                        <span class="input-group-btn">
                            <button class="btn btn-success" type="button" ><i class="fa fa-search"></i></button>
                        </span>
                    </div>

                    <div class="input-group showWay">
                        <label>
                            <input type="checkbox">
                            快到期合同
                        </label>
                    </div>
                    <div class="input-group showWay">
                        <span>排序方式：</span>
                        <label>
                            <input type="radio" name="sort">默认排序
                        </label>
                        <label>
                            <input type="radio" name="sort">最新发布
                        </label>
                    </div>
                    <div class="pull-right">
                        <a @click="addContract" class="btn btn-success"><i
                                 class="fa fa-plus-square"></i>&nbsp;新增合同
                        </a>
                    </div>
                </form>
            </div>

            <!--选中-->
            <div class="panel-body" v-if="pitch.length>0">
                <ul>
                    <li>已选中&nbsp;{{pitch.length}}&nbsp;项</li>
                    <li>
                        <a href="">标记</a>
                    </li>
                    <li>
                        <a href="">删除</a>
                    </li>
                </ul>
            </div>
        </section>
        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">
                            <!--<input type="checkbox">-->
                        </th>
                        <th class="text-center">合同编号</th>
                        <th class="text-center">上传时间</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">业主姓名</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">手机号码</th>
                        <th class="text-center">合同到期时间</th>
                        <th class="text-center">资料补齐时间</th>
                        <th class="text-center">过期情况</th>
                        <th class="text-center">回访情况</th>
                        <th class="text-center">资料状态</th>
                        <th>更多</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td><input type="checkbox" @change="rules(1 , $event)"></td>
                        <td>LJS081740</td>
                        <td>2017-05-18<br>10:22:48</td>
                        <td>李彬彬</td>
                        <td>戴辉</td>
                        <td>金马郦城4-328</td>
                        <td>18865652235</td>
                        <td>2018-06-05</td>
                        <td>2017-06-05</td>
                        <td>充公</td>
                        <td>未回访</td>
                        <td>
                            <span v-bind:class="contractStatus">待审核</span>
                        </td>
                        <td>
                            <router-link to="/contractDetail">更多</router-link>
                        </td>
                        <td class="icon">
                            <i class="fa fa-lock" v-if="isLock"></i>
                            <i class="fa fa-unlock" v-else="isLock"></i>
                            <i class="fa fa-paperclip"></i>
                        </td>

                    </tr>
                    <tr class="text-center">
                        <td><input type="checkbox" @change="rules(2 , $event)"></td>
                        <td>LJS081740</td>
                        <td>2017-05-18<br>10:22:48</td>
                        <td>李彬彬</td>
                        <td>戴辉</td>
                        <td>金马郦城4-328</td>
                        <td>18865652235</td>
                        <td>2018-06-05</td>
                        <td>2017-06-05</td>
                        <td>充公</td>
                        <td>未回访</td>
                        <td>
                            <span :class="contractStatus">待审核</span>
                        </td>
                        <td>
                            <a href="">更多</a>
                        </td>
                        <td class="icon">
                            <i class="fa fa-lock" v-if="isLock"></i>
                            <i class="fa fa-unlock" v-else="isLock"></i>
                            <i class="fa fa-paperclip"></i>
                        </td>

                    </tr>

                    </tbody>
                </table>
            </section>
        </div>
        <!--//组件-->
        <contractAdd></contractAdd>
    </div>
</template>
<script>
    import contractAdd from  './contractAdd.vue'
    export default{
        components: { contractAdd },
        data(){
            return {
                pitch : [],      // 选中id
                contractStatus : {
                    'cStatus' : true ,
                    'yellow' : true,
                    'gray' : false,
                    'green' : false
                },           // 合同状态样式
                isLock : true,      // 是否锁定
            }
        },
        updated (){
//            时间选择
            this.remindData();
        },
        methods : {
            search(){

            },
            remindData (){   //日期选择
                $('.form_datetime').datetimepicker({
                    minView: "day",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoClose: 1,
                });
            },
            rules(id , ev){   //多选框选中
                if (ev.target.checked){
                    this.pitch.push(id);
                }else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
            addContract(){  //新增合同订单

                $('#contractAdd').modal({backdrop: 'static',});
                $('#contractAdd').modal('show')
            },
        }
    }
</script>

<style scoped>
    .panel-body{
        padding: 8px;
        padding-bottom: 0;
    }
    .datetime{
        padding-top: 5px;
    }
    input[type=checkbox],input[type=radio]{
        width: 17px;
        height: 17px;
        vertical-align: bottom;
        margin-right: 4px;
    }
    input[type=radio]{
        margin-left: 5px;
    }
    .showWay{
        line-height: 20px;
        vertical-align: text-bottom;
        margin-left: 10px;
        font-size: 14px;
    }
    .panel-body ul{
        margin: 0;
        padding: 0;
        font-size: 14px;
        line-height: 50px;
        padding-left: 20px;
    }
    .panel-body ul li{
        float: left;
    }
    .panel-body ul li+li:before{
        content: '|';
        margin: 0 10px;
    }
    div.pull-right{
        margin-top: 5px;
    }
    .icon i{
        font-size: 16px;
        cursor: pointer;
    }
    .icon i:nth-of-type(1){
        color: #ccc;
    }
    .icon i+i{
        margin-left: 8px;
    }
    .cStatus{
        display: inline-block;
        width: 80px;
        padding: 8px 0;
        color: white;
        border-radius: 20px;
    }
    .yellow{
        background-color: #F9E175;
    }
    .gray{
        background-color: #CCCCCC;
    }
    .green{
        background-color: #83E96D;
    }
</style>