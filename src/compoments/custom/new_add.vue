<template>
    <div>
        <Status :state='info'></Status>
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
                                    <div class="col-lg-10 status1">
                                        <label>
                                            <input type="radio" name="status" value="1"
                                                   class="pull-left" v-model="cus_status">业主
                                        </label>
                                        <label>
                                            <input type="radio" name="status" value="2"
                                                   class="pull-left" v-model="cus_status">租客
                                        </label>
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">基本信息
                                    <!--<h4 v-if="!btn_state" class="pull-right" style="margin-top: 0;">-->
                                    <!--<a>修改日志</a>-->
                                    <!--</h4>-->
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
                                    <div class="col-lg-10 status1">
                                        <label>
                                            <input type="radio" name="gender" value="1"
                                                   class="pull-left" v-model="cus_gender">先生
                                        </label>
                                        <label>
                                            <input type="radio" name="gender" value="2"
                                                   class="pull-left" v-model="cus_gender">女士
                                        </label>
                                    </div>
                                </div>
                                <!--国籍-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">国籍&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_nationality">
                                            <option v-for="(val,index) in select_c.nationality" :value="index">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--手机号-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">手机号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" v-model="cus_phone"
                                               placeholder="请输入手机号" maxlength="11">
                                    </div>
                                </div>
                                <!--进度-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">进度</label>
                                    <div class="col-lg-10 sliders">
                                        <select class="form-control" v-model="cus_progress">
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户状态-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_status_quo">
                                            <option v-for="(val,index) in select_c.customer_status" v-if="index != 3"
                                                    :value="index">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户意向-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_intention">
                                            <option v-for="(val,index) in select_c.customer_will" :value="index">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户来源-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_source">
                                            <option v-for="(val,index) in select_c.source" :value="index">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--个人/中介-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_intermediate">
                                            <option v-for="(val,index) in select_c.person_medium" :value="index">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--中介-->
                                <div v-if="cus_intermediate === '2'">
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
                                                   placeholder="联系方式" maxlength="11">
                                        </div>
                                    </div>
                                </div>

                                <!--地址-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区名称</label>
                                    <div class="col-sm-10">
                                        <input title="请点击选择" type="text" class="form-control"
                                               v-model="village.villageName" readonly data-toggle="modal"
                                               data-target="#myModal1">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="village.villageAddress"
                                               readonly>
                                    </div>
                                </div>

                                <hr>
                                <h3 style="margin-bottom: 22px">附加信息</h3>
                                <!--证件类型-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件类型</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_credentials_state">
                                            <option v-for="(val,index) in select_c.credentials" :value="index">{{val}}
                                            </option>
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
                                    <label class="col-lg-2 col-sm-2 control-label" style="z-index: 10;">证件照片</label>
                                    <div class="col-lg-10">
                                        <up-load @photo="idNumber" @delete="idNumber_delete" @complete="complete"
                                                 :result="'id_number'" :idPhotos="photos"></up-load>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">婚姻状况</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_marriage">
                                            <option v-for="(val,index) in select_c.marriage_status" :value="index">{{val}}
                                            </option>
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
                                        <input type="email" v-model="cus_email" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">性格</label>
                                    <div class="col-lg-10">
                                        <select class="form-control" v-model="cus_nature">
                                            <option v-for="(val,index) in select_c.character" :value="index">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control" @blur="cus_remarks_c($event)"
                                                  :value="cus_remarks"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button" @click="remove_s">取消
                            </button>
                            <button v-if="btn_state" class="btn btn-success" type="button"
                                    @click="cus_confirm('saveCustomer')"> 确定
                            </button>

                            <button v-if="!btn_state" class="btn btn-warning" type="button"
                                    @click="cus_confirm('updateCustomer')"> 修改
                            </button>
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
    import ChooseAddress from '../common/chooseAddress.vue' //地址选择
    import Status from '../common/status.vue';              //提示信息
    import upLoad from '../common/upload.vue'               //图片上传
    export default {
        components: {upLoad, ChooseAddress, Status},
        props: ['msg', 'revise', 'selects'],
        data (){
            return {
                btn_state: false,                   //新增/修改
                select_c: {},                       //字典
                cus_id: '',                         //修改ID
                cus_status: '',                     //业主/租客
//                基本信息
                cus_name: '',                       //客户姓名
                cus_gender: '',                     //性别
                cus_progress: '0',                  //进度
                cus_nationality: '1',               //国籍
                cus_phone: '',                      //手机号
                cus_status_quo: '1',                //客户状态
                cus_intention: '1',                 //客户意向
                cus_source: '1',                    //客户来源

                cus_intermediate: '1',              //个人/中介
                cus_intermediate_name: '',          //中介名
                cus_intermediate_phone: '',         //联系方式
                village: {
                    villageAddress: '',                 //小区地址
                    villageName: '',                    //小区名称
                },
                cus_credentials_state: '1',         //证件类型
                cus_idNumber: '',                   //证件号

                photos: {
                    cus_idPhotos: {},                   //修改图片ID
                    cus_idPhoto: [],                    //证件照片
                },
                complete_ok: '',                        //图片上传完成

                cus_marriage: '1',                  //婚姻状况
                cus_qq: '',                         //qq号
                cus_email: '',                      //邮箱
                cus_nature: '1',                    //性格
                cus_remarks: '',                    //备注
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        watch: {
            selects (val){
                this.select_c = val;
            },
            msg(val) {
                if (val === 'new') {
                    this.btn_state = true;                    //新增
//                    业主租客
                    this.photos.cus_idPhotos = {};            //修改图片ID
                    this.cus_id = '';                         //修改ID
                    this.cus_status = '';                     //业主/租客
//                基本信息
                    this.cus_name = '';                       //客户姓名
                    this.cus_gender = '';                     //性别
                    this.cus_progress = '0';                  //进度
                    this.cus_nationality = '1';               //国籍
                    this.cus_phone = '';                      //手机号
                    this.cus_status_quo = '1';                //客户状态
                    this.cus_intention = '1';                 //客户意向
                    this.cus_source = '1';                    //客户来源
//                    中介
                    this.cus_intermediate = '1';              //个人/中介
                    this.cus_intermediate_name = '';          //中介名
                    this.cus_intermediate_phone = '';         //联系方式
//                    地址
                    this.village.villageId = '';                      //高德ID
                    this.village.villageAddress = '';                 //小区地址
                    this.village.villageName = '';                    //小区名称
//                    附加信息
                    this.cus_credentials_state = '1';         //证件类型
                    this.cus_idNumber = '';                   //证件号
                    this.photos.cus_idPhoto = [];                    //证件照片
                    this.cus_marriage = '1';                  //婚姻状况
                    this.cus_qq = '';                         //qq号
                    this.cus_email = '';                      //邮箱
                    this.cus_nature = '1';                    //性格
                    this.cus_remarks = '';                    //备注
                }
                if (val === 'rev') {
                    this.btn_state = false;                    //修改
                    this.complete_ok = 'ok';
                }
            },
            revise (val){
                this.cus_id = val.id;                                           //修改ID
                this.cus_status = val.identity;                                 //业主/租客
                this.cus_name = val.name;                                       //客户姓名
                this.cus_gender = val.gender;                                   //性别
                this.cus_progress = val.follow;                                 //进度
                this.cus_nationality = val.nationality;                         //国籍
                this.cus_phone = val.mobile;                                    //手机号
                this.cus_status_quo = val.customer_status;                      //客户状态
                this.cus_intention = val.customer_will;                         //客户意向
                this.cus_source = val.source;                                   //客户来源

                this.cus_intermediate = String(val.person_medium);              //是否中介
                this.cus_intermediate_name = val.medium_name;                   //中介名称
                this.cus_intermediate_phone = val.medium_mobile;                //中介联系方式
                if (val.amap_id) {
                    this.village.villageAddress = val.amap_id.villageAddress;       //小区地址
                    this.village.villageName = val.amap_id.villageName;             //小区名称
                }
                this.cus_credentials_state = val.id_type;                       //证件类型
                this.cus_idNumber = val.id_num;                                 //证件号
                this.photos.cus_idPhoto = [];
                this.photos.cus_idPhotos = val.album.id_pic;                    //修改图片ID
                for (let i in this.photos.cus_idPhotos) {
                    this.photos.cus_idPhoto.push(i);
                }
                this.cus_marriage = val.marriage_status;                        //婚姻状况
                this.cus_qq = val.qq;                                           //qq号
                this.cus_email = val.e_mail;                                    //邮箱
                this.cus_nature = val.character;                                //性格
                this.cus_remarks = val.remarks                                  //备注

            }
        },
        methods: {
            remove_s (){
                $('.rem_div').remove();
            },
//            照片ID
            idNumber (val){
                this.photos.cus_idPhoto = val;
            },
//            图片上传完成
            complete(val){
                this.complete_ok = val;
            },
//            删除照片ID
            idNumber_delete (val){
                let index = this.photos.cus_idPhoto.indexOf(val);
                if (index > -1) {
                    this.photos.cus_idPhoto.splice(index, 1);
                }
            },

//            确定新增/修改
            cus_confirm (url){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok' || this.photos.cus_idPhoto.length === 0) {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0) {
                            this.succeed(url);
                        }
                    });
                }
                else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }
            },
//            修改/新增 调用
            succeed (val){
                this.$http.post('core/customer/' + val, {
                    id: this.cus_id,
                    identity: this.cus_status,                  //业主/租客
                    name: this.cus_name,                        //客户姓名
                    gender: this.cus_gender,                    //性别
                    follow: this.cus_progress,                  //进度
                    nationality: this.cus_nationality,          //国籍
                    mobile: this.cus_phone,                     //手机号
                    customer_status: this.cus_status_quo,       //客户状态
                    customer_will: this.cus_intention,          //客户意向
                    source: this.cus_source,                    //客户来源

                    person_medium: this.cus_intermediate,       //个人/中介
                    medium_name: this.cus_intermediate_name,    //中介名称
                    medium_mobile: this.cus_intermediate_phone, //中介电话

                    amap_id: this.village,                      //高德ID
                    id_type: this.cus_credentials_state,        //证件类型
                    id_num: this.cus_idNumber,                  //证件号
                    id_pic: this.photos.cus_idPhoto,            //证件照片
                    marriage_status: this.cus_marriage,         //婚姻状况
                    qq: this.cus_qq,                            //QQ
                    e_mail: this.cus_email,                     //email
                    character: this.cus_nature,                 //性格
                    remarks: this.cus_remarks,                  //备注
                }).then((res) => {
                    if (res.data.code === '70010') {
                        $('#customModel').modal('hide');            //成功关闭模态框
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;

                        this.$emit('cus_list', res.data);           // 更新客户列表

                    } else {
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
//            中介/个人
            intermediary (e){
                let val = e.target.value;
                this.cus_intermediate = val;
                if (val === '1') {
                    this.inter_state = false;
                }
                if (val === '2') {
                    this.inter_state = true;
                }
            },
//            小区/地址
            getData(val){
                this.village = val;
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

    .status1 {
        padding-top: 7px;
    }

    .status1 label {
        margin-right: 20px;
    }

    .modal-content {
        overflow: auto;
    }

    .street select {
        margin-bottom: 10px;
    }
</style>
