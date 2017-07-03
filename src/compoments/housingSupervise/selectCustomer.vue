<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade " id="selectCustom">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择客户</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal tasi-form">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >客户名称</label>
                                <div class="col-lg-4">
                                    <select  class="form-control">
                                        <option value="1">个人</option>
                                        <option value="2">中介</option>
                                    </select>
                                </div>
                                <div class="iconic-input right col-lg-4">
                                    <i class="fa fa-search"></i>
                                    <input type="text" class="form-control" placeholder="搜索客户">
                                </div>
                                <div class="col-lg-2">
                                    <a class="btn btn-success">搜索</a>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                <tr class="lightGray">
                                    <td></td>
                                    <td>客户名称</td>
                                    <td>尊称</td>
                                    <td>国籍</td>
                                    <td>手机号</td>
                                    <td>房屋地址</td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>
                                        <input type="radio" name="radio">
                                    </td>
                                    <td>客户名称</td>
                                    <td>尊称</td>
                                    <td>国籍</td>
                                    <td>手机号</td>
                                    <td>房屋地址</td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" name="radio">
                                    </td>
                                    <td>客户名称</td>
                                    <td>尊称</td>
                                    <td>国籍</td>
                                    <td>手机号</td>
                                    <td>房屋地址</td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">新增</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    }
</script>


<style scoped>
    .lightGray{
        background-color: #F2F2F2;
    }
    .iconic-input i {
        margin: 8px 25px 8px 10px;
    }
</style>
