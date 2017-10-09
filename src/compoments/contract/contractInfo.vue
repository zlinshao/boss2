<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade  bs-example-modal-sm" id="contractInfo">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">合同信息</h4>
                    </div>
                    <div class="modal-body">
                        <ul>
                            <li>
                                <a><i class="fa fa-bookmark"></i></a>
                                &nbsp;2017-07-20&nbsp;至&nbsp;2017-05-16
                            </li>
                            <li>
                                <b>合同编号</b> : LJS587608
                            </li>
                            <li>
                                <b>房屋地址</b> : 新街口
                            </li>
                            <li>
                                <b>负责人</b> : 张琳
                            </li>
                            <li>
                                <b>结束原因</b> : 死亡
                            </li>
                        </ul>
                        <hr>
                        <ul>
                            <li>
                                <a><i class="fa fa-bookmark"></i></a>
                                &nbsp;2017-07-20&nbsp;至&nbsp;2017-05-16
                            </li>
                            <li>
                                <b>合同编号</b> : LJS587608
                            </li>
                            <li>
                                <b>房屋地址</b> : 新街口
                            </li>
                            <li>
                                <b>负责人</b> : 张琳
                            </li>
                            <li>
                                <b>结束原因</b> : 死亡
                            </li>
                        </ul>

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
    b{
        margin-left: 18px;
    }
</style>