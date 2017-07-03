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
                                        <label><input type="radio" name="status" @click="cus_status_c"
                                                      class="pull-left">业主</label>
                                        <label><input type="radio" name="status" @click="cus_status_c"
                                                      class="pull-left">租客</label>
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
                                        <input type="text" class="form-control" placeholder="起输入客户姓名">
                                    </div>
                                </div>
                                <!--尊称-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尊称&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10 status">
                                        <label>
                                            <input type="radio" name="gender" class="pull-left">先生
                                        </label>
                                        <label>
                                            <input type="radio" name="gender" class="pull-left">女士
                                        </label>
                                    </div>
                                </div>
                                <!--国籍-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">国籍&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入国际">
                                    </div>
                                </div>
                                <!--手机号-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">手机号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入手机号">
                                    </div>
                                </div>
                                <!--进度-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">进度</label>
                                    <div class="col-lg-10 sliders">
                                        <select class="form-control" @click="progress($event)" :value="cus_progress">
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
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户意向-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户来源-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <!--个人/中介-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" @click="intermediary($event)">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                        </select>
                                    </div>
                                </div>
                                <!--中介-->
                                <div v-if="inter_state">
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">中介名称</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="中介名称">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">联系方式</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="联系方式">
                                        </div>
                                    </div>
                                </div>
                                <!--地址-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">地址</label>
                                    <div class="col-lg-10">
                                        <div class="form-group street">
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control" placeholder="街道信息">
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">附加信息</h3>
                                <!--证件类型-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件类型</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入证件号">
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
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">QQ</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">邮箱</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">性格</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control"></textarea>
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
    </div>
</template>

<script>

    import upLoad from './upload.vue'
    export default {
        components: {upLoad},
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
                cus_address1: '',                   //省
                cus_address2: '',                   //市
                cus_address3: '',                   //区
//                附加信息
                cus_address4: '',                   //街道信息
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
                this.cus_status = val;
            },
            progress (val){
                this.cus_progress = val.target.value;
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
