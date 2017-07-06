<template>
    <div>
        <ol class="breadcrumb">
            <li>日志管理</li>
            <li class="active">操作记录</li>
        </ol>

        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" role="form">

                <div class="dropdown form-group">
                    <!--<label>操作模块</label>-->
                    <select name="" class="form-control" v-model="params.module">
                        <option value="0">全部操作模块</option>
                        <option value="1">南京</option>
                        <option value="2">苏州</option>
                    </select>
                </div>

                <div class="dropdown form-group">
                    <!--<label>操作类型</label>-->
                    <select name="" class="form-control" v-model="params.type">
                        <option value="0">全部操作类型</option>
                        <option value="1">新增</option>
                        <option value="2">删除</option>
                        <option value="3">修改</option>
                        <option value="4">查询</option>
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
                    <input type="text" class="form-control" id="search_info" placeholder="请输入操作人" v-model="params.searchInfo"  @keydown.enter.prevent="search">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
        </div>

        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">操作人</th>
                        <th class="text-center">所在部门</th>
                        <th class="text-center">操作时间</th>
                        <th class="text-center">操作平台</th>
                        <th class="text-center">IP地址</th>
                        <th class="text-center">操作浏览器</th>
                        <th class="text-center">操作模块</th>
                        <th class="text-center">操作类型</th>
                        <th class="text-center">操作结果</th>
                        <th class="text-center">操作描述</th>
                    </tr>
                    </thead>
                </table>
            </section>
        </div>

        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>
    </div>
</template>
<style scoped>

</style>
<script>
    import Page from '../common/page.vue'

    export default{
        data(){
            return {
                paging: 5,                 //总页数
                page : 1,                  // 当前页数

                params : {
                    module : 0,
                    type : 0,
                    startDataTime : '',
                    finishDataTime : '',
                    searchInfo : ''

                },
            }
        },
        components: {Page},
        methods: {
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
                    if (ev.target.placeholder === '开始时间'){
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            search(){
                console.log(this.params);
            },
            getData(data){
                // 页数
                console.log(data);
                this.page = data;
            }
        }
    }
</script>