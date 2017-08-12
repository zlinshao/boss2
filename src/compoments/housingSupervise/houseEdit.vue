<template>
    <div>
        <!--&lt;!&ndash; 房屋 新增/编辑&ndash;&gt;-->
        <div class="modal fade full-width-modal-right" id="houseEdit" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <!--新增-->
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="closeModal">×</button>
                            <h4 class="modal-title">编辑房屋</h4>
                        </div>

                        <!--新增/编辑-->
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <h3 style="margin-bottom: 22px">基本信息</h3>
                                <div v-if="houseEdit.amap_json !==null && houseEdit.amap_json !==undefined && houseEdit.amap_json.villageName!== ''">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">小区名称<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input title="请点击选择" type="text" class="form-control"
                                                   v-model="houseEdit.amap_json.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">小区地址<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input type="text" class="form-control"
                                                   v-model="houseEdit.amap_json.villageAddress" disabled>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="houseEdit.amap_json.villageName === ''">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">小区地址<sup>*</sup></label>
                                        <div class="col-sm-10">
                                            <input title="请点击选择" type="text" class="form-control"
                                                   v-model="houseEdit.village_name" readonly  data-toggle="modal" data-target="#myModal1">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">门牌地址<sup>*</sup></label>
                                    <div class="col-lg-3">
                                        <input type="text" class="form-control" v-model="houseEdit.building" placeholder="栋/座">
                                    </div>
                                    <div class="col-lg-3">
                                        <input type="number" class="form-control" v-model="houseEdit.unit" placeholder="栋/座">
                                    </div>
                                    <div class="col-lg-3">
                                        <input type="number" class="form-control" v-model="houseEdit.house_number" placeholder="门牌号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房型<sup>*</sup></label>

                                    <div class="col-sm-3">
                                        <select class="form-control" v-model="houseEdit.rooms.rooms">
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
                                        <select class="form-control" v-model="houseEdit.rooms.hall">
                                            <option value="1">一厅</option>
                                            <option value="2">二厅</option>
                                            <option value="3">三厅</option>
                                            <option value="4">四厅</option>
                                            <option value="5">五厅</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <select class="form-control" v-model="houseEdit.rooms.toilet">
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
                                        <input type="text" class="form-control" v-model="houseEdit.area" placeholder="请输入面积 ㎡">
                                    </div>
                                    <label class="col-lg-2 col-sm-2 control-label">装修<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseEdit.decoration">
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
                                                   @blur="computeFloor" v-model="houseEdit.floor">
                                        </div>
                                        <label class="col-xs-1" style="font-size: 20px">/</label>
                                        <div class="col-xs-5 col-sm-4 col-lg-5">
                                            <input type="number" class="form-control" placeholder="总楼层"
                                                  @blur="computeFloor" v-model="houseEdit.total_floor">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋类型<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseEdit.house_type">
                                            <option :value="key"  v-for="(value,key) in myDictionary.house_type">{{value}}</option>
                                        </select>
                                    </div>
                                    <label class="col-lg-2 col-sm-2 control-label">房屋特色<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseEdit.house_feature">
                                            <option :value="key"  v-for="(value,key) in myDictionary.house_feature">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">建筑楼层<sup>*</sup></label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseEdit.floor_type">
                                            <option :value="key"  v-for="(value,key) in myDictionary.floor_type">{{value}}</option>
                                        </select>
                                    </div>
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-lg-4">
                                        <select class="form-control" v-model="houseEdit.person_medium">
                                            <option :value="key"  v-for="(value,key) in myDictionary.person_medium">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">参考租金</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="houseEdit.reference" class="form-control" placeholder="参考租金">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 control-label">房屋照片<sup>*</sup></label>
                                    <div class="col-lg-10">
                                        <up-load @photo="housePicId" @delete="picDelete" @complete="complete"
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
                                            <select class="form-control" v-model="houseEdit.source">
                                                <option :value="key"  v-for="(value,key) in myDictionary.source">{{value}}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">水费卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="houseEdit.water_card_num" placeholder="水费卡号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">电费卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="houseEdit.elec_card_num" placeholder="燃气卡号">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 control-label">燃气卡号</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" v-model="houseEdit.gas_card_num" placeholder="燃气卡号">
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
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button" @click="closeModal">取消</button>
                            <button class="btn btn-warning" type="button" @click="houseRevise">修改</button>
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
        props: ['dictionary','HouseRevise'],
        data (){
            return {
                myDictionary :[],
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
                houseEdit:{
                    amap_json: {
                        villageAddress:'',
                        villageName:'',
                        district:'',
                        address:'',
                        id:'',
                        location:''
                    },
                    village_name : '',
                    is_amap : '',
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
                    reference:'0.00',     //参考租金
                    person_medium:'1',
                    source:'',
                    elec_card_num:'',
                    water_card_num:'',
                    gas_card_num:'',
                    elec_card_pic:[],
                    water_card_pic:[],
                    gas_card_pic:[],
                    remarks:'',
                    house_pic:[],
                    property_pic:[],
                },
                myHouseEdit:[],   //接受房屋数据
                checkboxModel:[], //已被选中的多选框
                oldFacility:[],
                reviseHouseId:'',
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                staff_id:'',  //负责人
            }
        },
        watch:{
            dictionary(val){
                this.myDictionary=val;
                for(let key in val.facility){
                    this.oldFacility.push(key);
                }
            },
            HouseRevise(val){
                if(Array.isArray(val) === false){
                    this.myHouseEdit=val;
                    this.complete_ok='ok';
                    this.reviseHouseId=val.id;

                    val.amap_json.villageAddress ===''? this.houseEdit.is_amap = false : this.houseEdit.is_amap = true;

                    this.houseEdit.village_name =val.detailed_address;
                    this.staff_id = val.staff_id;
                    if(val.amap_json !==null || undefined){
                        this.houseEdit.amap_json.villageAddress=val.amap_json.villageAddress;
                        this.houseEdit.amap_json.villageName=val.amap_json.villageName;
                        this.houseEdit.amap_json.district=val.amap_json.district;
                        this.houseEdit.amap_json.address=val.amap_json.address;
                        this.houseEdit.amap_json.id=val.amap_json.id;
                        this.houseEdit.amap_json.location=val.amap_json.location;
                    }
                    this.houseEdit.building=val.building;
                    this.houseEdit.unit=val.unit;
                    this.houseEdit.house_number=val.house_number;
                    if(val.rooms !== null || undefined){
                        this.houseEdit.rooms.rooms=val.rooms.rooms;
                        this.houseEdit.rooms.hall=val.rooms.hall;
                        this.houseEdit.rooms.toilet=val.rooms.toilet;
                    }
                    this.houseEdit.area=val.area;
                    this.houseEdit.decoration=val.decoration;
                    this.houseEdit.floor=val.floor;
                    this.houseEdit.total_floor=val.total_floor;
                    this.houseEdit.house_type=val.house_type;
                    this.houseEdit.house_feature=val.house_feature;
                    this.houseEdit.floor_type=val.floor_type;
                    this.houseEdit.person_medium=val.person_medium;
                    this.houseEdit.source=val.source;
                    this.houseEdit.elec_card_num=val.elec_card_num;
                    this.houseEdit.water_card_num=val.water_card_num;
                    this.houseEdit.gas_card_num=val.gas_card_num;
                    this.houseEdit.remarks=val.remarks;
                    this.houseEdit.reference=val.reference;
                    this.houseEdit.facility=[];
                    if(val.facility !==null && val.facility !==undefined){
                        for(let i=0;i<val.facility.length;i++){
                            this.houseEdit.facility.push(val.facility[i])
                        }
                    }

                    this.checkboxModel=val.facility;;
                    this.housePic.cus_idPhoto = [];
                    this.houseEdit.house_pic = [];
                    this.housePic.cus_idPhotos = val.album.house_pic;                    //修改图片ID
                    for (let i in this.housePic.cus_idPhotos) {
                        this.housePic.cus_idPhoto.push(i);
                        this.houseEdit.house_pic.push(i);
                    }
                    this.waterPic.cus_idPhoto = [];
                    this.houseEdit.water_card_pic = [];
                    this.waterPic.cus_idPhotos = val.album.water_card_pic;                    //修改图片ID
                    for (let i in this.waterPic.cus_idPhotos) {
                        this.waterPic.cus_idPhoto.push(i);
                        this.houseEdit.water_card_pic.push(i);
                    }
                    this.elePic.cus_idPhoto = [];
                    this.houseEdit.elec_card_pic = [];
                    this.elePic.cus_idPhotos = val.album.elec_card_pic;                    //修改图片ID
                    for (let i in this.elePic.cus_idPhotos) {
                        this.elePic.cus_idPhoto.push(i);
                        this.houseEdit.elec_card_pic.push(i);
                    }
                    this.gasPic.cus_idPhoto = [];
                    this.houseEdit.gas_card_pic = [];
                    this.gasPic.cus_idPhotos = val.album.gas_card_pic;                    //修改图片ID
                    for (let i in this.gasPic.cus_idPhotos) {
                        this.gasPic.cus_idPhoto.push(i);
                        this.houseEdit.gas_card_pic.push(i);
                    }
                    this.propertyPic.cus_idPhoto = [];
                    this.houseEdit.property_pic = [];
                    this.propertyPic.cus_idPhotos = val.album.property_pic;                    //修改图片ID
                    for (let i in this.propertyPic.cus_idPhotos) {
                        this.propertyPic.cus_idPhoto.push(i);
                        this.houseEdit.property_pic.push(i);
                    }
                }
            },
            'checkboxModel': {
                handler: function (val, oldVal) {
                    if(this.checkboxModel !==null && this.checkboxModel !==undefined){
                        if (this.checkboxModel.length === this.oldFacility.length) {
                            this.checked = true;
                        } else {
                            this.checked = false;
                        }
                    }

                },
                deep: true
            }
        },
        mounted(){
        },
        methods: {
            selectAddress(val){
                this.houseEdit.amap_json.villageAddress='';
                this.houseEdit.amap_json.villageName='';
                this.houseEdit.amap_json.district='';
                this.houseEdit.amap_json.address='';
                this.houseEdit.amap_json.id='';
                this.houseEdit.amap_json.location='';
                if(val.villageAddress ===undefined){
                    this.houseEdit.village_name = val.villageName;
                    this.houseEdit.is_amap = false;
                }else {
                    this.houseEdit.is_amap = true;
                    for (let key in val){
                        this.houseEdit.amap_json[key] = val[key];
                    }
                }
            },
            //获取图片id
            housePicId (val){
                this.houseEdit.house_pic = val;
            },
            waterPicId(val){
                this.houseEdit.water_card_pic = val;
            },
            elePicId(val){
                this.houseEdit.elec_card_pic = val;
            },
            gasPicId(val){
                this.houseEdit.gas_card_pic = val;
            },
            propertyPicId(val){
                this.houseEdit.property_pic = val;
            },
            //图片上传完成
            complete(val){
                this.complete_ok = val;
            },
            //删除照片ID
            picDelete (val){
                let house = this.houseEdit.house_pic.indexOf(val);
                if (house > -1) {
                    this.housePic.cus_idPhoto.splice(house, 1);
                    this.houseEdit.house_pic.splice(house, 1);
                }
                let water = this.houseEdit.water_card_pic.indexOf(val);
                if (water > -1) {
                    this.waterPic.cus_idPhoto.splice(water, 1);
                    this.houseEdit.water_card_pic.splice(water, 1);
                }
                let ele = this.houseEdit.elec_card_pic.indexOf(val);
                if (ele > -1) {
                    this.elePic.cus_idPhoto.splice(ele, 1);
                    this.houseEdit.elec_card_pic.splice(ele, 1);
                }
                let gas = this.houseEdit.gas_card_pic.indexOf(val);
                if (gas > -1) {
                    this.gasPic.cus_idPhoto.splice(gas, 1);
                    this.houseEdit.gas_card_pic.splice(gas, 1);
                }
                let property = this.houseEdit.property_pic.indexOf(val);
                if (property > -1) {
                    this.propertyPic.cus_idPhoto.splice(property, 1);
                    this.houseEdit.property_pic.splice(property, 1);
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
                    this.houseEdit.facility.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.houseEdit.facility.indexOf(rul);
                    if (index > -1) {
                        this.houseEdit.facility.splice(index, 1);
                    }
                }
            },
            computeFloor(e){
                if(Number(this.houseEdit.floor) > Number(this.houseEdit.total_floor) &&
                    this.houseEdit.total_floor !=='' && this.houseEdit.floor !== ''){
                    if(e.target.placeholder === '总楼层'){
                        this.houseEdit.total_floor = '';
                    }else {
                        this.houseEdit.floor = '';
                    }
                    this.info.error ='当前楼层不能大于总楼层！';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                }
            },
            houseRevise(){
                this.$http.defaults.withCredentials = true;
                if (this.complete_ok === 'ok') {
                    this.$http.get('api/picture/poll').then((res) => {
                        if (res.data.data === 0 || res.data.data ===null ) {
                            this.$http.post('core/villa/updatevilla/id/'+this.reviseHouseId,this.houseEdit).then((res) => {
                                if(res.data.code==='80010'){
                                    this.$emit('reviseHouse',this.reviseHouseId);
                                    $('#houseEdit').modal('hide');
                                    this.info.success =res.data.msg;
                                    //显示成功弹窗 ***
                                    this.info.state_success = true;
                                    //一秒自动关闭成功信息弹窗 ***
                                    setTimeout(() => {
                                        this.info.state_success = false;
                                    },2000);
                                    this.houseEdit.amap_json.villageAddress='';
                                    this.houseEdit.amap_json.villageName='';
                                    this.houseEdit.amap_json.district='';
                                    this.houseEdit.amap_json.address='';
                                    this.houseEdit.amap_json.id='';
                                    this.houseEdit.amap_json.location='';
                                    this.houseEdit.building='';
                                    this.houseEdit.unit='';
                                    this.houseEdit.house_number='';
                                    this.houseEdit.rooms.rooms='';
                                    this.houseEdit.rooms.hall='';
                                    this.houseEdit.rooms.toilet='';
                                    this.houseEdit.area='';
                                    this.houseEdit.decoration='';
                                    this.houseEdit.floor='';
                                    this.houseEdit.total_floor='';
                                    this.houseEdit.house_type='';
                                    this.houseEdit.house_feature='';
                                    this.houseEdit.floor_type='';
                                    this.houseEdit.person_medium='';
                                    this.houseEdit.source='';
                                    this.houseEdit.elec_card_num='';
                                    this.houseEdit.water_card_num='';
                                    this.houseEdit.gas_card_num='';
                                    this.houseEdit.remarks='';
                                    this.houseEdit.reference='0.00';
                                    this.houseEdit.facility=[];
                                    this.houseEdit.house_pic = [];
                                    this.houseEdit.water_card_pic = [];
                                    this.houseEdit.elec_card_pic = [];
                                    this.houseEdit.gas_card_pic = [];
                                    this.houseEdit.property_pic = [];
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
                                    //一秒自动关闭成功信息弹窗 ***
                                    setTimeout(() => {
                                        this.info.state_error = false;
                                    },2000);
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
            closeModal(){
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
                $('.rem_div').remove();
                this.$emit('reviseHouse',this.reviseHouseId);
            }

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
