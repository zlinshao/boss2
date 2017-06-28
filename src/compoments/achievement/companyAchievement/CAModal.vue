<template>
    <div>
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">收租房对比信息</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="col-lg-6 renting">
                            <div class="modalList">
                                <span>喜报日期:</span>
                                <span>2016-12-03</span>
                            </div>
                            <div class="modalList">
                                <span>租房片区:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>租房签约人:</span>
                                <span>哈哈哈</span>
                            </div>
                            <div class="modalList">
                                <span>租房情况:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>房屋地址:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>房屋类型:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>付款方式:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>租房价格:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>已收类型:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>已收金额:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>是否中介:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>租实际业绩:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>租溢出业绩:</span>
                                <span>啊啊啊</span>
                            </div>
                            <div class="modalList">
                                <span>总业绩:</span>
                                <span>啊啊啊</span>
                            </div>
                        </div>
                        <div class="col-lg-6 collect">
                            <div class="modalList">
                                <span>喜报日期:</span>
                                <span>2016-12-03</span>
                            </div>
                            <div class="modalList">
                                <span>收房片区:</span>
                                <span>是是是</span>
                            </div>
                            <div class="modalList">
                                <span>收房签约人:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>房屋地址:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>空置期:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>房屋类型:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>年限:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>付款方式:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>收房价格:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>是否中介:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>租实际业绩:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>租溢出业绩:</span>
                                <span>对对对</span>
                            </div>
                            <div class="modalList">
                                <span>总业绩:</span>
                                <span>对对对</span>
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">退出</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modalList{
        line-height: 30px;
        font-size: 0;
    }
    .modalList + .modalList{
        margin-top: 20px;
    }
    .modalList span{
        display: inline-block;
        font-size: 14px;
    }
    .modalList span:nth-child(1){
        width: 35%;
    }
    .modalList span+span{
        border-bottom: 1px dashed #ddd;
        box-sizing: border-box;
        width: 60%;
    }
    .modal-footer{
        text-align: center;
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
        created : function () {
//            alert(this.id);
        },
        components: {}
    }
</script>