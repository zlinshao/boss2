<template>
    <div>
        <!--客户 新增/编辑-->
        <div class="modal fade full-width-modal-right" id="customModel" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <!--新增客户-->
                        <div v-if="btn_state" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增客户</h4>
                        </div>

                        <!--修改客户-->
                        <div v-if="!btn_state" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">修改客户</h4>
                        </div>

                        <!--新增/编辑-->
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                    <div class="col-lg-10 status">
                                        <label>
                                            <input type="radio" name="status" value="owner"
                                                   @click="cus_status_c($event)"
                                                   class="pull-left">业主
                                        </label>
                                        <label>
                                            <input type="radio" name="status" @click="cus_status_c($event)"
                                                   class="pull-left" value="renter">租客
                                        </label>
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">基本信息
                                    <h4 v-if="!btn_state" class="pull-right" style="margin-top: 0;">
                                        <a>修改日志</a>
                                    </h4>
                                </h3>

                                <!--客户姓名-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户姓名&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="cus_name" class="form-control"
                                               placeholder="起输入客户姓名">
                                    </div>
                                </div>
                                <!--尊称-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尊称&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10 status">
                                        <label>
                                            <input type="radio" @click="cus_gender_c($event)" name="gender" value="boy"
                                                   class="pull-left">先生
                                        </label>
                                        <label>
                                            <input type="radio" @click="cus_gender_c($event)" name="gender" value="girl"
                                                   class="pull-left">女士
                                        </label>
                                    </div>
                                </div>
                                <!--国籍-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">国籍&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_nationality_c($event)"
                                                :value="cus_nationality">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <!--手机号-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">手机号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="cus_phone"
                                               placeholder="请输入手机号">
                                    </div>
                                </div>
                                <!--进度-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">进度</label>
                                    <div class="col-lg-10 sliders">
                                        <select class="form-control" @click="progress_c($event)" :value="cus_progress">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户状态-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_status_quo_c($event)"
                                                :value="cus_status_quo">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户意向-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_intention_c($event)"
                                                :value="cus_intention">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户来源-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_source_c($event)" :value="cus_source">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <!--个人/中介-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="intermediary($event)">
                                            <option value="1">个人</option>
                                            <option>中介</option>
                                        </select>
                                    </div>
                                </div>
                                <!--中介-->
                                <div v-if="inter_state">
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">中介名称</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="cus_intermediate_name"
                                                   placeholder="中介名称">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">联系方式</label>
                                        <div class="col-lg-10">
                                            <input type="text" v-model="cus_intermediate_phone" class="form-control"
                                                   placeholder="联系方式">
                                        </div>
                                    </div>
                                </div>

                                <!--地址-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区名称</label>
                                    <div class="col-sm-10">
                                        <input title="请点击选择" type="text" class="form-control"
                                               v-model="villageName" readonly data-toggle="modal"
                                               data-target="#myModal1">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="villageAddress" readonly>
                                    </div>
                                </div>

                                <hr>
                                <h3 style="margin-bottom: 22px">附加信息</h3>
                                <!--证件类型-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件类型</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_credentials_state_c($event)"
                                                :value="cus_credentials_state">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="cus_idNumber"
                                               placeholder="请输入证件号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件照片</label>
                                    <div class="col-lg-10">
                                        <up-load :result="'idNum'"></up-load>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">婚姻状况</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_marriage_c($event)"
                                                :value="cus_marriage">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">QQ</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="cus_qq" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">邮箱</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="cus_email" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">性格</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="cus_nature_c($event)" :value="cus_nature">
                                            <option value="15">15</option>
                                            <option value="20">20</option>
                                            <option value="25">25</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control" @click="cus_remarks_c($event)"
                                                  :value="cus_remarks"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button class="btn btn-success" type="button"> 确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--选择小区控件-->
        <ChooseAddress @getChildData="getData"></ChooseAddress>
    </div>
</template>

<script>
    import ChooseAddress from '../common/chooseAddress.vue'
    import upLoad from './upload.vue'
    export default {
        components: {upLoad, ChooseAddress},
        props: ['msg'],
        data (){
            return {
                inter_state: false,                 //中介
                btn_state: true,                    //新增
//                基本信息
                cus_status: '',                     //业主/租客
                cus_name: '',                       //客户姓名
                cus_gender: '',                     //性别
                cus_progress: '',                   //进度
                cus_nationality: '',                //国籍
                cus_phone: '',                      //手机号
                cus_status_quo: '',                 //客户状态
                cus_intention: '',                  //客户意向
                cus_source: '',                     //客户来源
                cus_intermediate: '',               //个人/中介
                cus_intermediate_name: '',          //中介名
                cus_intermediate_phone: '',         //联系方式

                villageAddress: '',                 //小区地址
                villageName: '',                    //小区名称

                cus_credentials_state: '',          //证件类型
                cus_idNumber: '',                   //证件号
                cus_idPhoto: [],                    //证件照片
                cus_marriage: '',                   //婚姻状况
                cus_qq: '',                         //qq号
                cus_email: '',                      //邮箱
                cus_nature: '',                     //性格
                cus_remarks: '',                    //备注

            }
        },
        methods: {
//            中介/个人
            intermediary (ev){
                let val = ev.target.value;
                if (val === '1') {
                    this.inter_state = false;
                } else {
                    this.inter_state = true;
                }
            },
//            租客/业主
            cus_status_c (val){
                this.cus_status = val.target.value;
            },
//            尊称
            cus_gender_c (val){
                this.cus_gender = val.target.value;
            },
//            国籍
            cus_nationality_c (val){
                this.cus_nationality = val.target.value;
            },
//            进度
            progress_c (val){
                this.cus_progress = val.target.value;
            },
//            客户状态
            cus_status_quo_c (val){
                this.cus_status_quo = val.target.value;
            },
//            客户意向
            cus_intention_c (val){
                this.cus_intention = val.target.value;
            },
//            客户来源
            cus_source_c (val){
                this.cus_source = val.target.value;
            },
            getData(val){
//            小区/地址
                this.villageName = val.villageName;
                this.villageAddress = val.villageAddress;
            },
//            证件类型
            cus_credentials_state_c (val){
                this.cus_credentials_state = val.target.value;
            },
//            婚姻状况
            cus_marriage_c (val){
                this.cus_marriage = val.target.value;
            },
//            性格
            cus_nature_c (val){
                this.cus_nature = val.target.value;
            },
//            备注
            cus_remarks_c (val){
                this.cus_remarks = val.target.value;
            }
        }
    }
</script>


<style scoped>
    input[type=checkbox], input[type=radio] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    .status {
        padding-top: 7px;
    }

    .status label {
        margin-right: 20px;
    }

    .modal-content {
        overflow: auto;
    }

    .street select {
        margin-bottom: 10px;
    }
</style>
