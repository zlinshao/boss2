<template>
    <div>
        <!--&lt;!&ndash; 房屋 新增/编辑&ndash;&gt;-->
        <div class="modal fade full-width-modal-right" id="collectAdd" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <!--新增-->
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" >×</button>
                            <h4 class="modal-title">新增房屋</h4>
                        </div>

                        <!--新增/编辑-->
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <h3 style="margin-bottom: 22px">基本信息</h3>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区名称<sup>*</sup></label>
                                    <div class="col-sm-10" v-if="houseAdd.is_amap">
                                        <input title="请点击选择" type="text" class="form-control"
                                               v-model="houseAdd.amap_json.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                    </div>
                                    <div class="col-sm-10" v-if="!houseAdd.is_amap">
                                        <input title="请点击选择" type="text" class="form-control"
                                               v-model="houseAdd.village_name" readonly  data-toggle="modal" data-target="#myModal1">
                                    </div>
                                </div>
                                <div class="form-group" v-if="houseAdd.is_amap">
                                    <label class="col-sm-2 control-label">小区地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control"
                                               v-model="houseAdd.amap_json.villageAddress" disabled >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">门牌地址<sup>*</sup></label>
                                    <div class="col-lg-3">
                                        <input type="text" class="form-control" v-model="houseAdd.building" placeholder="幢/座">
                                    </div>
                                    <div class="col-lg-3">
                                        <input type="number" class="form-control" v-model="houseAdd.unit" placeholder="单元">
                                    </div>
                                    <div class="col-lg-3">
                                        <input type="text" class="form-control" v-model="houseAdd.house_number" placeholder="门牌号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房型<sup>*</sup></label>

                                    <div class="col-sm-3">
                                        <select class="form-control" v-model="houseAdd.rooms.rooms">
                                            <option value="1">一室</option>
                                            <option value="2">二室</option>
                                            <option value="3">三室</option>
                                            <option value="4">四室</option>
                                            <option value="5">五室</option>
                                            <option value="6">六室</option>
                                            <option value="7">七室</option>
                                            <option value="8">八室</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <select class="form-control" v-model="houseAdd.rooms.hall">
                                            <option value="1">一厅</option>
                                            <option value="2">二厅</option>
                                            <option value="3">三厅</option>
                                            <option value="4">四厅</option>
                                            <option value="5">五厅</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <select class="form-control" v-model="houseAdd.rooms.toilet">
                                            <option value="1">一卫</option>
                                            <option value="2">二卫</option>
                                            <option value="3">三卫</option>
                                            <option value="4">四卫</option>
                                            <option value="4">五卫</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label" style="padding-top: 7px;">面积<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <input type="text" class="form-control" v-model="houseAdd.area" placeholder="请输入面积 ㎡">
                                    </div>
                                    <label class="col-lg-2 col-sm-2 control-label">装修</label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseAdd.decoration">
                                            <option :value="key"  v-for="(value,key) in myDictionary.decoration">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">配套设施<sup>*</sup></label>
                                    <div class="col-lg-10">
                                        <label class="checkbox-inline check first" v-for="(value,key) in myDictionary.facility">
                                            <input type="checkbox" class="pull-left" :value="key" @click="rules(key,$event)"
                                            v-model="checkboxModel"> {{value}}
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">楼层<sup>*</sup></label>
                                    <div class="col-lg-10">
                                        <div class="col-xs-5 col-sm-4 col-lg-5">
                                            <input type="number" class="form-control" placeholder="当前楼层"
                                                   @blur="computeFloor($event)" v-model="houseAdd.floor">
                                        </div>
                                        <label class="col-xs-1" style="font-size: 20px">/</label>
                                        <div class="col-xs-5 col-sm-4 col-lg-5">
                                            <input type="number" class="form-control" placeholder="总楼层"
                                                   @blur="computeFloor($event)"  v-model="houseAdd.total_floor">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋类型<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseAdd.house_type">
                                            <option :value="key"  v-for="(value,key) in myDictionary.house_type">{{value}}</option>
                                        </select>
                                    </div>
                                    <label class="col-lg-2 col-sm-2 control-label">房屋特色<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseAdd.house_feature">
                                            <option :value="key"  v-for="(value,key) in myDictionary.house_feature">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">建筑楼层<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseAdd.floor_type">
                                            <option :value="key"  v-for="(value,key) in myDictionary.floor_type">{{value}}</option>
                                        </select>
                                    </div>
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseAdd.person_medium">
                                            <option :value="key"  v-for="(value,key) in myDictionary.person_medium">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">房屋照片<sup>*</sup></label>
                                    <div class="col-lg-10">
                                        <up-load @photo="housePicId" @delete="picDelete" @complete="complete"  placeholder="房屋照片"
                                                 :result="'housePic'" :idPhotos="housePic"></up-load>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">负责人</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="staff_id" disabled class="form-control" placeholder="负责人">
                                    </div>
                                </div>
                                <hr>

                                <!--其他信息-->

                                <h3 style="margin-bottom: 22px">其他信息</h3>

                                <!--未收 新增/编辑 房屋-->
                                <div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">房屋来源<sup>*</sup></label>
                                        <div class="col-lg-10">
                                            <select class="form-control" v-model="houseAdd.source">
                                                <option :value="key"  v-for="(value,key) in myDictionary.source">{{value}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">水费卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="houseAdd.water_card_num" placeholder="水费卡号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">电费卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="houseAdd.elec_card_num" placeholder="燃气卡号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">燃气卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="houseAdd.gas_card_num" placeholder="燃气卡号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">水卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="waterPicId" @delete="picDelete" @complete="complete"
                                                     :result="'waterPic'" :idPhotos="waterPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">电卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="elePicId" @delete="picDelete" @complete="complete"
                                                     :result="'elePic'" :idPhotos="elePic"></up-load>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">燃气卡照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="gasPicId" @delete="picDelete" @complete="complete"
                                                     :result="'gasPic'" :idPhotos="gasPic"></up-load>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">产权证照片</label>
                                        <div class="col-lg-10">
                                            <up-load @photo="propertyPicId" @delete="picDelete" @complete="complete"
                                                     :result="'certificatePic'" :idPhotos="propertyPic"></up-load>
                                        </div>
                                    </div>
                                </div>

                                <!--已收 房屋-->
                                <!--<div v-if="!msg.sss">-->
                                    <!--<div class="form-group">-->
                                        <!--<label class="col-lg-2 col-sm-2 control-label">客户姓名</label>-->
                                        <!--<div class="col-lg-10">-->
                                            <!--<input type="text" class="form-control" placeholder="客户姓名" >-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="form-group">-->
                                        <!--<label class="col-lg-2 col-sm-2 control-label">身份照片</label>-->
                                        <!--<div class="col-lg-10">-->
                                            <!--<input type="text" class="form-control" placeholder="">-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="form-group">-->
                                        <!--<label class="col-lg-2 col-sm-2 control-label">来源</label>-->
                                        <!--<div class="col-lg-10">-->
                                            <!--<select class="form-control">-->
                                                <!--<option value="1">推荐客户</option>-->
                                            <!--</select>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="form-group">-->
                                        <!--<label class="col-lg-2 col-sm-2 control-label">参考租金</label>-->
                                        <!--<div class="col-lg-10">-->
                                            <!--<input type="text" class="form-control" disabled placeholder="">-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="form-group">-->
                                        <!--<label class="col-lg-2 col-sm-2 control-label">备注</label>-->
                                        <!--<div class="col-lg-10">-->
                                            <!--<textarea class="form-control"></textarea>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                <!--</div>-->
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button class="btn btn-success" type="button" @click="addHouse">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ChooseAddress @getChildData="selectAddress"></ChooseAddress>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import ChooseAddress from '../common/chooseAddress.vue'
    import upLoad from '../common/upload.vue'
    import Status from '../common/status.vue'
    export default {
        components:{ChooseAddress,upLoad,Status},
        props: ['dictionary'],
        data (){
            return {
                myDictionary :[],
                checkboxModel:[],
                housePic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                waterPic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                elePic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                gasPic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                propertyPic:{
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //证件照片
                },
                complete_ok : 'ok',
                //新增房屋字段
                houseAdd:{
                    amap_json: {
                        villageAddress:'',
                        villageName:'',
                        district:'',
                        address:'',
                        id:'',
                        location:''
                    },
                    village_name : '',
                    building:'',
                    unit:'',
                    house_number:'',
                    rooms:{
                        rooms:'1',
                        hall:'1',
                        toilet:'1'
                    },
                    area:'',
                    decoration:'',
                    facility:[],
                    floor:'',
                    total_floor:'',
                    house_type:'1',
                    house_feature:'1',
                    floor_type:'1',
                    person_medium:'1',
                    source:'1',
                    elec_card_num:'',
                    water_card_num:'',
                    gas_card_num:'',
                    elec_card_pic:[],
                    water_card_pic:[],
                    gas_card_pic:[],
                    remarks:'',
                    house_pic:[],
                    property_pic:[],
                    is_amap : true,

                },
                staff_id:'',
                info:{
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
        mounted(){
            this.Info();
        },
        watch:{
            dictionary(val){
                this.myDictionary=val;
                //触发up-load
                this.propertyPic.cus_idPhoto=[];
                this.housePic.cus_idPhotos={};
                this.waterPic.cus_idPhotos={};
                this.elePic.cus_idPhotos={};
                this.gasPic.cus_idPhotos={};
                this.propertyPic.cus_idPhotos={};
            }
        },
        methods: {
            Info(){
              this.$http.get('staff/info').then((res)=>{
                  this.staff_id=res.data.name;
              })
            },
            selectAddress(val){
                if(val.villageAddress ===undefined){
                    this.houseAdd.village_name = val.villageName;
                    this.houseAdd.is_amap = false;
                }else {
                    this.houseAdd.is_amap = true;
                    for (let key in val){
                        this.houseAdd.amap_json[key] = val[key];
                    }
                }
            },
            //获取图片id
            housePicId (val){
                this.houseAdd.house_pic = val;
            },
            waterPicId(val){
                this.houseAdd.water_card_pic = val;
            },
            elePicId(val){
                this.houseAdd.elec_card_pic = val;
            },
            gasPicId(val){
                this.houseAdd.gas_card_pic = val;
            },
            propertyPicId(val){
                this.houseAdd.property_pic = val;
            },
            //图片上传完成
            complete(val){
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let house = this.housePic.cus_idPhoto.indexOf(val);
                if (house > -1) {
                    this.housePic.cus_idPhoto.splice(house, 1);
                }
                let water = this.waterPic.cus_idPhoto.indexOf(val);
                if (water > -1) {
                    this.waterPic.cus_idPhoto.splice(water, 1);
                }
                let ele = this.elePic.cus_idPhoto.indexOf(val);
                if (ele > -1) {
                    this.elePic.cus_idPhoto.splice(ele, 1);
                }
                let gas = this.gasPic.cus_idPhoto.indexOf(val);
                if (gas > -1) {
                    this.gasPic.cus_idPhoto.splice(gas, 1);
                }
                let property = this.propertyPic.cus_idPhoto.indexOf(val);
                if (property > -1) {
                    this.propertyPic.cus_idPhoto.splice(property, 1);
                }

            },
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },
            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.houseAdd.facility.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.houseAdd.facility.indexOf(rul);
                    if (index > -1) {
                        this.houseAdd.facility.splice(index, 1);
                    }
                }
            },
            computeFloor(e){
                if(Number(this.houseAdd.floor) > Number(this.houseAdd.total_floor) &&
                    this.houseAdd.total_floor !=='' && this.houseAdd.floor !== ''){
                    if(e.target.placeholder === '总楼层'){
                        this.houseAdd.total_floor = '';
                    }else {
                        this.houseAdd.floor = '';
                    }
                    this.info.error ='当前楼层不能大于总楼层！';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                }
            },
//            computeFloor(){
//                if(this.houseAdd.floor > this.houseAdd.total_floor && this.houseAdd.floor !== ''){
//                    this.houseAdd.floor = '';
//                    this.info.error ='当前楼层不能大于总楼层！';
//                    //显示成功弹窗 ***
//                    this.info.state_error = true;
//                }
//            },
            addHouse(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0 || res.data.data ===null ) {
                            this.$http.post('core/villa/savevilla',this.houseAdd).then((res) => {
                                if(res.data.code==='80010'){
                                    this.$emit('addHouse','addHouse');
                                    $('#collectAdd').modal('hide');
                                    this.info.success =res.data.msg;
                                    //显示成功弹窗 ***
                                    this.info.state_success = true;
                                    this.houseAdd.amap_json.villageAddress='';
                                    this.houseAdd.amap_json.villageName='';
                                    this.houseAdd.amap_json.district='';
                                    this.houseAdd.amap_json.address='';
                                    this.houseAdd.amap_json.id='';
                                    this.houseAdd.amap_json.location='';
                                    this.houseAdd.building='';
                                    this.houseAdd.house_number='';
                                    this.houseAdd.rooms.rooms='';
                                    this.houseAdd.rooms.hall='';
                                    this.houseAdd.rooms.toilet='';
                                    this.houseAdd.area='';
                                    this.houseAdd.decoration='';
                                    this.houseAdd.floor='';
                                    this.houseAdd.total_floor='';
                                    this.houseAdd.house_type='';
                                    this.houseAdd.house_feature='';
                                    this.houseAdd.floor_type='';
                                    this.houseAdd.person_medium='';
                                    this.houseAdd.source='';
                                    this.houseAdd.elec_card_num='';
                                    this.houseAdd.water_card_num='';
                                    this.houseAdd.gas_card_num='';
                                    this.houseAdd.remarks='';
                                    this.houseAdd.facility=[];
                                    this.houseAdd.house_pic = [];
                                    this.houseAdd.water_card_pic = [];
                                    this.houseAdd.elec_card_pic = [];
                                    this.houseAdd.gas_card_pic = [];
                                    this.houseAdd.property_pic = [];
                                    this.housePic.cus_idPhoto=[];
                                    this.waterPic.cus_idPhoto=[];
                                    this.elePic.cus_idPhoto=[];
                                    this.gasPic.cus_idPhoto=[];
                                    this.propertyPic.cus_idPhoto=[];
                                    this.housePic.cus_idPhotos={};
                                    this.waterPic.cus_idPhotos={};
                                    this.elePic.cus_idPhotos={};
                                    this.gasPic.cus_idPhotos={};
                                    this.propertyPic.cus_idPhotos={};
                                    this.checkboxModel=[];
                                }else{
                                    this.info.error =res.data.msg;
                                    //显示成功弹窗 ***
                                    this.info.state_error = true;
                                }
                            });
                        }
                    });

                } else {
                    this.info.error = '图片正在上传';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }

            },


        }
    }
</script>


<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 2px;
        width: 17px;
        height: 17px;
    }

    .check {
        display: inline-block;
        padding: 5px 0;
        font-size: 14px;
        margin-top: 2px;
    }
    .first{
        margin-left: 10px;
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
    sup{
        color: #e8403f;
    }
</style>
