<template>
    <div>
        <div class="modal fade full-width-modal-right bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">计算详情</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <h5>房屋地址：北苑二村18-205</h5>
                        <div>
                            <div class="col-lg-3">
                                <div class="calcItem">
                                    <span>租房人：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>租房合同编号：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>租房付款方式：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>收房价格：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="calcItem">
                                    <span>所属片区：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>上传时间：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>租房价格：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>收房年限：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="calcItem">
                                    <span>收房人：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>收房合同编号：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>价格差：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>付款方式：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                            </div>
                            <div class="col-lg-3">
                                <div class="calcItem">
                                    <span>所属片区：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>上传时间：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>租房中介费：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                                <div class="calcItem">
                                    <span>收房中介费：</span><br>
                                    <span>啊啊啊</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="clacList col-lg-6">
                                <div class="calcItem">
                                    <span>总业绩：</span>啊啊啊
                                </div>
                                <div class="calcItem">
                                    <span>租房人实际业绩：</span>啊啊啊
                                </div>
                                <div class="calcItem">
                                    <span>收房人实际业绩：</span>啊啊啊
                                </div>
                            </div>
                            <div class="clacList col-lg-6">
                                <div class="calcItem">
                                    <span>价格差额比：</span>啊啊啊
                                </div>
                                <div class="calcItem">
                                    <span>租溢出业绩：</span>啊啊啊
                                </div>
                                <div class="calcItem">
                                    <span>收溢出业绩：</span>啊啊啊
                                </div>
                            </div>
                        </div>


                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modal-footer{
        text-align: center;
    }
    .modal-body h5{
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding-bottom: 15px;
        margin-bottom: 20px;
        font-weight: bold;
    }
    .calcItem{
        line-height: 25px;
        font-size: 15px;
        border-bottom: 1px dashed #ddd;
    }
    .calcItem+.calcItem{
        margin-top: 15px;
    }
    .calcItem span:nth-of-type(1){
        font-weight: bold;
    }
    .calcItem span:nth-of-type(2){
        margin-left: 30px;
    }
    .clacList{
        text-align: center;
        margin-top: 20px;
    }
</style>
<script>
    export default{
        props : ['id'],
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>