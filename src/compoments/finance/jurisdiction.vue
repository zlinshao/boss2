<template>
    <div>
        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" role="form">
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="">所有财务人员</option>
                        <option value="1">栖霞</option>
                    </select>
                </div>

                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"  @keydown.enter.prevent="">
                    <span class="input-group-btn">
                            <button class="btn btn-success" id="search" type="button" @click=""><i class="fa fa-search"></i></button>
                        </span>
                </div>

                <!--<div class="form-group pull-right">
                    <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addNew">
                        <i class="fa fa-plus-square"></i>&nbsp;新增科目
                    </a>
                </div>-->
            </form>
        </div>

        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">归属</th>
                        <th class="text-center">归类</th>
                        <th class="text-center">名称</th>
                        <th class="text-center">类型</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>发送到发</td>
                        <td>中行</td>
                        <td>第三方</td>
                        <td>手机卡领导好卡号</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>

    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {},
        methods: {}
    }
</script>