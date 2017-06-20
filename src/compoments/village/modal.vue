<template>
    <div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{oper.operName}}</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal">
                            <div class="baseInfo">
                                <h4>基础信息</h4>
                                <div class="form">
                                    <div class="form-group">
                                        <label for="villageName" class="col-sm-2 control-label">小区名称</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="villageName">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villageAddress" class="col-sm-2 control-label">地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="villageAddress">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villageYear" class="col-sm-2 control-label">年限</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="villageYear">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villageNum" class="col-sm-2 control-label">栋数</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="villageNum">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋类型</label>
                                        <div class="col-sm-10">
                                            <label class="control-label"><input type="radio" class="radioInput" name="villageType">住宅</label>
                                            <label class="control-label"><input type="radio" class="radioInput" name="villageType">公寓</label>
                                            <label class="control-label"><input type="radio" class="radioInput" name="villageType">商住两用</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="propertyFee" class="col-sm-2 control-label">物业费</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="propertyFee">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villagePic" class="col-sm-2 control-label">小区照片</label>
                                        <div class="col-sm-10">
                                            <input type="file" class="form-control" id="villagePic">
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="perimeterInfo">
                                <h4>周边信息</h4>
                                <div class="form">
                                    <div class="form-group">
                                        <label for="traffic" class="col-sm-2 control-label">交通情况</label>
                                        <div class="col-sm-10">
                                            <input type="password" class="form-control" id="traffic">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="life" class="col-sm-2 control-label">生活配套</label>
                                        <div class="col-sm-10">
                                            <input type="password" class="form-control" id="life">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .modal-body h4{
        font-weight: 700;
    }
    .modal-body .form{
        padding:10px 40px 0;
    }
    .modal-body label{
        font-weight: normal;
    }
    .baseInfo{
        border-bottom: 1px dashed #ccc;
        margin-bottom: 25px;
    }
    /*.baseInfo , .perimeterInfo{
        padding: 5px 0;
    }*/
    .col-sm-10 .control-label:nth-child(even){
        margin:0 30px;
    }
    .col-sm-10 .control-label{
        vertical-align: top;
    }
    .radioInput{
        vertical-align: top;
        margin-bottom: 25px;
    }
    .modal-footer{
        /*border-top: none;*/
    }
</style>
<script>
    export default{
        props : ['oper'],
        data(){
            return {
                msg: 'hello vue'
            }
        },
        created : function () {
//            console.log(this.oper);
        },
        components: {}
    }
</script>