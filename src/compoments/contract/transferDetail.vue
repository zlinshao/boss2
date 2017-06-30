<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade " id="transferDetail">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">打款详情</h4>
                    </div>
                    <div class="modal-body">
                        <div class="total">
                            <b>合计</b>:123456
                            <b>未打款</b>:123456
                            <b>打款账号</b>:12345678913246587
                        </div>
                        <table class="table">
                            <thead>
                            <tr class="lightGray">
                                <td>打款时间</td>
                                <td>打款金额</td>
                                <td>打款人</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>2017-06-23</td>
                                <td>2000</td>
                                <td>哈哈</td>
                            </tr>
                            <tr>
                                <td>2017-06-23</td>
                                <td>2000</td>
                                <td>哈哈</td>
                            </tr>
                            </tbody>
                        </table>
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
    export default{
        data(){
            return {

            }
        },
        methods : {

        }
    }
</script>
<style scoped>
    .lightGray{
        background-color: #F2F2F2;
    }
</style>