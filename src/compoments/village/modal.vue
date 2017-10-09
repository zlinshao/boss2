<template>
    <div>
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" aria-labelledby="myModalLabel">
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
                                        <div class="col-sm-10 input-group">
                                            <input title="请点击选择" type="text" class="form-control" id="villageName" v-model="village.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                            <div class="input-group-addon"><i class="fa fa-align-justify"></i></div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villageAddress" class="col-sm-2 control-label">地址</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="villageAddress" v-model="villageAddress" readonly>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villageYear" class="col-sm-2 control-label">年限</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="villageYear" min="0" v-model="villageYear">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="villageNum" class="col-sm-2 control-label">栋数</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="villageNum" min="0" v-model="villageNum">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">房屋类型</label>
                                        <div class="col-sm-10">
                                            <div class="dropdown">
                                                <select name="type" class="form-control" v-model="villageType">
                                                    <option value="1" selected>住宅</option>
                                                    <option value="2">公寓</option>
                                                    <option value="3">商住两用</option>
                                                </select>
                                            </div>
                                            <!--<label class="control-label"><input type="radio" v-model="villageType" class="radioInput" name="villageType">住宅</label>
                                            <label class="control-label"><input type="radio" v-model="villageType" class="radioInput" name="villageType">公寓</label>
                                            <label class="control-label"><input type="radio" v-model="villageType" class="radioInput" name="villageType">商住两用</label>-->
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="propertyFee" class="col-sm-2 control-label">物业费</label>
                                        <div class="col-sm-10">
                                            <input type="number" class="form-control" id="propertyFee" min="0" v-model="propertyFee">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">小区照片</label>
                                        <div class="col-sm-10">
                                            <div class="iconic-input right">
                                                <i class="fa fa-cloud-upload" style="font-size: 22px;margin-right: 10px;"></i>
                                                <div id="picFileUp" class="dz-clickable" @click="fileUp"></div>
                                            </div>
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
                                            <input type="text" class="form-control" id="traffic" v-model="traffic">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="life" class="col-sm-2 control-label">生活配套</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" id="life" v-model="life">
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <!--选择小区控件-->
        <ChooseAddress @getChildData="getData"></ChooseAddress>
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

    div.input-group{
        padding: 0 15px;
    }
    .dz-clickable{
        border: 1px solid #DDDDDD;
        padding: 10px;
        border-radius: 6px;
        min-height: 34px;
    }
</style>
<script>
    import ChooseAddress from '../common/chooseAddress.vue'
    export default{
        props : ['oper'],
        data(){
            return {

                showChooseAddress : false,      // 是否显示选择地区组件
                // 表单数据

                // 基本

                villageAddress : '',    // 小区地址
                villageYear : '',       // 小区年限
                villageNum : '',        // 栋数
                villageType : '',       // 房屋类型
                propertyFee : '',       // 物业费
                villagePic : [],        // 小区照片

                // 周边
                traffic : [],           // 交通情况
                life : [],             // 生活配套


                village : {
                    villageName : '',       // 小区名称
                    id : '',
                    location : '',
                    address : '',
                    district : ''
                },
            }
        },
        created : function () {
//            console.log(this.oper);
        },
        components: {
            ChooseAddress
        },
        methods : {
            addAddress(){
                this.showChooseAddress = true;
            },
            getData(data){
                this.village.villageName = data.villageName;
                this.villageAddress = data.villageAddress;
                this.village.id = data.id;
                this.village.location = data.location;
                this.village.district = data.district;
                this.village.address = data.address;
                console.log(data);
            },
            fileUp(){
                // 图片上传

            }
        }
    }
</script>