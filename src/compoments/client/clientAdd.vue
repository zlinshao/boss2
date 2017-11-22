<template>
    <div>

        <!--客户 新增/编辑-->
        <div class="modal fade full-width-modal-right" id="clientAdd" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content roll">
                        <!--新增客户-->
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增客户</h4>
                        </div>

                        <!--新增/编辑-->
                        <div class="modal-body has-js">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                    <div class="col-sm-10 status1">
                                        <label class="label_check" v-for="item in identity"
                                               @click.prevent="selectIdentity(item,$event)"
                                               :class="{'c_on':params.identity.indexOf(item.value) > -1,
                                               'c_off':params.identity.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value" class="pull-left">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>

                                <!--客户姓名-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户姓名&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" v-model="params.name" class="form-control" placeholder="请输入客户姓名">
                                    </div>
                                </div>
                                <!--尊称-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尊称&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-sm-10 status1">
                                        <label :class="{'label_radio':true,'r_on':params.gender==1,'r_off':params.gender!=1}">
                                            <input type="radio" name="gender" value="1"
                                                   class="pull-left" v-model="params.gender">先生
                                        </label>
                                        <label :class="{'label_radio':true,'r_on':params.gender==2,'r_off':params.gender!=2}">
                                            <input type="radio" name="gender" value="2"
                                                   class="pull-left" v-model="params.gender">女士
                                        </label>
                                    </div>
                                </div>
                                <!--手机号-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">手机号&nbsp;<span
                                            class="text-danger">*</span></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="params.mobile"
                                               :class="{'error': !phone_status}" @blur="reg_phone"
                                               placeholder="请输入手机号" style="margin-bottom: 0;">
                                        <div>
                                            <span v-show="!phone_status" style="color: #E4393C">手机格号式不正确</span>
                                        </div>
                                    </div>
                                </div>
                                <!--国籍-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">国籍</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" data-toggle="modal" href="#myModal"
                                               v-model="params.nationality" placeholder="选择国家" readonly>
                                    </div>
                                </div>
                                <!--进度-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">进度</label>
                                    <div class="col-sm-10 sliders">
                                        <select class="form-control" v-model="params.follow">
                                            <option value="">进度</option>
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
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.customer_status">
                                            <option value="">客户状态</option>
                                            <option v-for="(val,key) in dictionary.customer_status" :value="key">
                                                {{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户意向-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.customer_will">
                                            <option value="">客户意向</option>
                                            <option v-for="(val,key) in dictionary.customer_will" :value="key">
                                                {{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--客户来源-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.source">
                                            <option value="">客户来源</option>
                                            <option v-for="(val,key) in dictionary.source" :value="key">
                                                {{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--个人/中介-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.person_medium">
                                            <option value="">个人/中介</option>
                                            <option v-for="(val,key) in dictionary.person_medium" :value="key">
                                                {{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <!--中介-->
                                <div v-if="params.person_medium === '2'">
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">中介名称</label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control" v-model="params.medium_name"
                                                   placeholder="中介名称">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">联系方式</label>
                                        <div class="col-sm-10">
                                            <input type="text" v-model="params.medium_mobile" class="form-control"
                                                   placeholder="联系方式" maxlength="11">
                                        </div>
                                    </div>
                                </div>

                                <!--地址-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区名称</label>
                                    <div class="col-sm-10">
                                        <input title="请点击选择" type="text" class="form-control" readonly data-toggle="modal"
                                             v-model="params.amap_id.villageName"  data-target="#myModal1">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="params.amap_id.villageAddress" disabled>
                                    </div>
                                </div>


                                <h3 style="margin-bottom: 22px">附加信息</h3>
                                <!--证件类型-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件类型</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.id_type">
                                            <option value="">证件类型</option>
                                            <option v-for="(val,key) in dictionary.credentials" :value="key">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">证件号</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="params.id_num" :class="{'error': cus_idNumber_status}"
                                               placeholder="请输入证件号" @blur="reg_number" style="margin-bottom: 0">
                                        <div>
                                            &nbsp;<span v-show="cus_idNumber_status" style="color: #E4393C">证件号格式不正确</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">证件照片</label>
                                    <div class="col-sm-10">
                                        <up-load @photo="idNumber" @delete="idNumber_delete" @complete="complete"
                                                 :result="'photos'" :idPhotos="photos"></up-load>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">婚姻状况</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.marriage_status">
                                            <option value="">婚姻状况</option>
                                            <option v-for="(val,key) in dictionary.marriage_status" :value="key">{{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">QQ</label>
                                    <div class="col-sm-10">
                                        <input type="text" v-model="params.qq" placeholder="QQ" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">邮箱</label>
                                    <div class="col-sm-10">
                                        <input type="email" v-model="params.e_mail" placeholder="邮箱" class="form-control">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">性格</label>
                                    <div class="col-sm-10">
                                        <select class="form-control" v-model="params.character">
                                            <option value="">性格</option>
                                            <option v-for="(val,key) in dictionary.character" :value="key">
                                                {{val}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" :value="params.remarks"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default">取消</button>
                            <button class="btn btn-success" @click="confirmAdd"> 确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Country @nation="getCountry"></Country>
        <!--选择小区控件-->
        <ChooseAddress @getChildData="getData"></ChooseAddress>

    </div>
</template>
<script>
    import Country from '../common/country.vue'             //
    import ChooseAddress from '../common/chooseAddress.vue' //地址选择
    import upLoad from '../common/upload.vue'               //图片上传
    export default{
        components:{Country,ChooseAddress,upLoad},
        data(){
            return{
                params:{
                    id: '',
                    identity: [],                       //业主/租客
                    name: '',                           //客户姓名
                    gender: '',                         //性别
                    follow: '',                         //进度
                    nationality: '',                    //国籍
                    mobile: '',                         //手机号
                    customer_status: '',                //客户状态
                    customer_will: '',                  //客户意向
                    source: '',                         //客户来源
                    person_medium: '',                  //个人/中介
                    medium_name: '',                    //中介名称
                    medium_mobile: '',                  //中介电话
                    amap_id: {                          //高德ID

                    },
                    id_type: '',                        //证件类型
                    id_num: '',                         //证件号
                    id_pic: [],                         //证件照片
                    marriage_status: '',                //婚姻状况
                    qq: '',                             //QQ
                    e_mail: '',                         //email
                    character: '',                      //性格
                    remarks: '',                        //备注
                },
                phone_status:true,
                cus_idNumber_status :false,
                dictionary:[],                          //字典
                photos: {
                    cus_idPhotos: {},                   //修改图片ID
                    cus_idPhoto: [],                    //证件照片
                },
                complete_ok :'ok',
                identity:[
                    {value : 1,name:'业主'},
                    {value : 2,name:'租客'},
                    {value : 3,name:'代理人'},
                ],
            }
        },
        created(){
            this.getDictionary();
        },
        methods:{
            getDictionary(){
                this.photos.cus_idPhotos = {};
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary = res.data;
                });
            },
            // 手机正则
            reg_phone (){
                let reg = /^1[3|4|5|7|8][0-9]{9}$/;
                if (this.params.mobile !== '') {
                   this.phone_status = reg.test(this.params.mobile);
                }else {
                    this.phone_status = true;
                }
            },
            // 证件号正则
            reg_number (){
                let reg = /[\u4E00-\u9FA5]/i;
                if (this.params.id_num !== '') {
                    this.cus_idNumber_status = reg.test(this.params.id_num);
                }else {
                    this.cus_idNumber_status = false;
                }
                
            },
            getCountry(val){
                this.params.nationality = val.zh_name;
            },
            getData(val){
                this.params.amap_id = val;
            },
            // 照片ID
            idNumber (val){
                this.params.id_pic = val;
            },
            // 图片上传完成
            complete(val){
                this.complete_ok = val;
            },
            // 删除照片ID
            idNumber_delete (val){
                let index = this.params.id_pic.indexOf(val);
                if (index > -1) {
                    this.params.id_pic.splice(index, 1);
                }
            },
            selectIdentity(item,e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.params.identity.push(item.value);
                } else {
                    this.params.identity = this.params.identity.filter(function (x) {
                        return x !== item.value;
                    })
                }
            },
            confirmAdd(){
                this.$http.post('core/customer/saveCustomer',this.params).then((res) => {

                })
            },
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
        margin-right: 30px;
    }

    .modal-content {
        overflow: auto;
    }

    .street select {
        margin-bottom: 10px;
    }

    .error {
        border-color: #E4393C;
    }
    input, select{
        margin-bottom: 0;
    }
</style>
