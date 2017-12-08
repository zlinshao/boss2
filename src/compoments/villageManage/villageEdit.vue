<template>
    <div>
        <div class="modal fade full-width-modal-right" id="villageEdit" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">编辑小区</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <form class="form-horizontal tasi-form">

                                <div class="row">
                                    <label class="col-sm-2 control-label">小区位置</label>
                                    <div class="col-sm-4">
                                        <select class="form-control" v-model="params.province" @change="getCity">
                                            <option value="">省</option>
                                            <option :value="value.province_id"  v-for="(value,key) in province">
                                                {{value.province_name}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4" v-if="params.province != ''">
                                        <select class="form-control" v-model="params.city" @change="getArea">
                                            <option value="">市</option>
                                            <option :value="value.city_id" v-for="(value,key) in city">
                                                {{value.city_name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-4" v-if="params.city != ''">
                                        <select class="form-control" v-model="params.area" @change="getRegion">
                                            <option value="">区/县</option>
                                            <option :value="value.area_id" v-for="(value,key) in area">
                                                {{value.area_name}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4" v-if="params.area != ''">
                                        <select class="form-control" v-model="params.region">
                                            <option value="">区域</option>
                                            <option :value="value.id" v-for="(value,key) in region">
                                                {{value.region_name}}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="col-sm-2 control-label">小区地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="params.address">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">小区名称</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" readonly v-model="params.village_name" @click="chooseAddress">
                                    </div>
                                </div>
                                <div class="row" >
                                    <label class="col-sm-2 control-label">小区别名</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control" v-for="key in amount" v-model="params.village_alias[key-1]">
                                    </div>
                                    <div class="col-sm-2 flexBox">
                                        <i class="fa fa-plus-circle" @click="add()"></i>
                                        <i class="fa fa-minus-circle" @click="reduce()"></i>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">建筑年代</label>
                                    <div class="col-sm-4">
                                        <select class="form-control" v-model="params.built_year">
                                            <option value="">建造年限</option>
                                            <option v-for="item in now" v-if="item>=1949" :value="item">{{item}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-2 control-label">房屋类型</label>
                                    <div class="col-sm-4">
                                        <select class="form-control" v-model="params.house_type">
                                            <option value="">房屋类型</option>
                                            <option v-for="(value,key) in dictionary.house_type" :value="key">{{value}}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">总栋数</label>
                                    <div class="col-sm-4">
                                        <input type="number" class="form-control" v-model="params.total_buildings">
                                    </div>
                                    <label class="col-sm-2 control-label">物业费</label>
                                    <div class="col-sm-4">
                                        <input type="number" class="form-control" v-model="params.property_fee">
                                    </div>
                                </div>
                                <div class="row has-js">
                                    <label class="col-sm-2 control-label">门牌详情</label>
                                    <div class="col-sm-10">
                                        <label class="col-sm-2 control-label">区/组</label>
                                        <label class="col-sm-2 label_check" v-for="item in type"
                                               @click.prevent="pitch(item,$event,'district_group')"
                                               :class="{'c_on':params.district_group.indexOf(item.value) > -1,
                                               'c_off':params.district_group.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value"  :checked="params.district_group.indexOf(item.value) > -1">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="row has-js">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <label class="col-sm-2 control-label">幢/座</label>
                                        <label class="col-sm-2 label_check" v-for="item in type"
                                               @click.prevent="pitch(item,$event,'seat_block')"
                                               :class="{'c_on':params.seat_block.indexOf(item.value) > -1,
                                               'c_off':params.seat_block.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value"  :checked="params.seat_block.indexOf(item.value) > -1">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="row has-js">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <label class="col-sm-2 control-label">单元</label>
                                        <label class="col-sm-2 label_check" v-for="item in type"
                                               @click.prevent="pitch(item,$event,'floor')"
                                               :class="{'c_on':params.floor.indexOf(item.value) > -1,
                                               'c_off':params.floor.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value" :checked="params.floor.indexOf(item.value) > -1">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="row has-js">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <label class="col-sm-2 control-label">楼层</label>
                                        <label class="col-sm-2 label_check" v-for="item in type"
                                               @click.prevent="pitch(item,$event,'unit')"
                                               :class="{'c_on':params.unit.indexOf(item.value) > -1,
                                               'c_off':params.unit.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value"  :checked="params.unit.indexOf(item.value) > -1">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>

                                <div class="row has-js">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <label class="col-sm-2 control-label">房号</label>
                                        <label class="col-sm-2 label_check" v-for="item in type"
                                               @click.prevent="pitch(item,$event,'number_rooms')"
                                               :class="{'c_on':params.number_rooms.indexOf(item.value) > -1,
                                               'c_off':params.number_rooms.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value" :checked="params.number_rooms.indexOf(item.value) > -1">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="row has-js">
                                    <label class="col-sm-2 control-label"></label>
                                    <div class="col-sm-10">
                                        <label class="col-sm-2 control-label">后缀</label>
                                        <label class="col-sm-2 label_check" v-for="item in type"
                                               @click.prevent="pitch(item,$event,'suffix')"
                                               :class="{'c_on':params.suffix.indexOf(item.value) > -1,
                                               'c_off':params.suffix.indexOf(item.value) == -1}">
                                            <input type="checkbox" :value="item.value" :checked="params.suffix.indexOf(item.value) > -1">
                                            {{item.name}}
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-sm-2 control-label">小区照片</label>
                                    <div class="col-sm-10">
                                        <UpLoad @photo="housePicId" @delete="picDelete" @complete="complete"
                                                 :result="'housePic'" :idPhotos="housePic"></UpLoad>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">周边配套</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="params.peripheral_info"></textarea>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">小区简介</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="params.content"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <ChooseVillageAddress @getChildData="getAddress"></ChooseVillageAddress>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import UpLoad from '../common/upload.vue'
    import ChooseVillageAddress from '../common/chooseVillageAddress.vue'
    import Status from '../common/status.vue';
    export default{
        components : {UpLoad , ChooseVillageAddress ,Status},
        props:['startEdit','villageId'],
        data(){
            return{
                housePic : {
                    cus_idPhotos : {},    //修改图片ID
                    cus_idPhoto : [],     //
                },
                province : [],
                city : [],
                area :[],
                region :[],
                complete_ok : 'ok',
                amount: 1,
                type:[
                    {value : 1,name:'数字'},
                    {value : 2,name:'英文'},
                    {value : 3,name:'汉字'},
                    {value : 4,name:'不限'},
                ],
                //新增字段
                params :{
                    province : '',           //省
                    city : '',               //市
                    area :'',                //区、县
                    region :'',              //热门区域
                    address : '',            //小区地址
                    village_name : '',       //小区名字
                    village_alias : [],      //小区别名
                    built_year : '',         //建筑年代
                    house_type : '',         //房屋类型
                    total_buildings : '',    //总栋数
                    property_fee : '',       //物业费
                    district_group : [],     //区/组
                    seat_block : [],         //座/幢
                    unit : [],               //单元
                    floor : [],              //楼层
                    number_rooms : [],       //房间数
                    suffix : [],             //后缀
                    house_pic : [],          //小区照片
                    longitude : '',          //经度
                    latitude : '',           //纬度
                    code :'',                //城市code码
                    peripheral_info : '',    //周边信息
                    content : '',            //小区简介
                },
                dictionary : [],
                now : '',
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
            }
        },
        mounted(){
            this.getDictionary();
            this.getProvince();
        },
        watch:{
            startEdit(val){
                if(val){
                    this.getVillageInfo();
                }
            }
        },
        methods:{
            getDictionary(){
                this.housePic.cus_idPhotos = {};
                this.now = new Date().getFullYear();
                this.$http.get('core/house/dict').then((res) => {
                    this.dictionary = res.data;
                })
            },
            getVillageInfo(){
                this.$http.get('core/house/houseRead/id/' + this.villageId).then((res) => {
                    let data = res.data.data;
                    console.log(data);
                    this.params.province = data.province;           //省

                    this.$http.get('core/villa/city/city_parent/' + this.params.province).then((res) => {
                        this.city = res.data.data;
                        this.params.city = data.city;               //市
                        //2
                        this.$http.get('core/villa/area/area_parent/' + this.params.city).then((res) => {
                            this.area = res.data.data;
                            this.params.area = data.area;               //区、县
                            //3
                            this.$http.get('core/villa/region/region_parent/' + this.params.area).then((res) => {
                                this.region = res.data.data;
                                this.params.region = data.region;             //热门区域
                            });
                        });
                    });

                    this.params.address = data.address;            //小区地址
                    this.params.village_name = data.village_name;       //小区名字
                    this.params.village_alias = data.village_alias.split(',');      //小区别名
                    this.amount = this.params.village_alias.length;
                    this.params.built_year = data.built_year;         //建筑年代
                    this.params.house_type = data.house_type;         //房屋类型
                    this.params.total_buildings = data.total_buildings;    //总栋数
                    this.params.property_fee = data.property_fee;       //物业费
                    this.params.district_group = data.district_group;     //区/组
                    this.params.seat_block = data.seat_block;         //座/幢
                    this.params.unit = data.unit;               //单元
                    this.params.floor = data.floor;              //楼层
                    this.params.number_rooms = data.number_rooms;       //房间数
                    this.params.suffix = data.suffix;            //后缀
                    this.params.peripheral_info = data.peripheral_info;            //后缀
                    this.params.content = data.content;            //后缀
//                    this.params.house_pic = data.album.house_pic          //小区照片
                    this.params.longitude = data.longitude;
                    this.params.latitude = data.latitude;

                    this.housePic.cus_idPhotos = data.album.house_pic;                    //修改图片ID
                    for (let i in data.album.house_pic) {
                        this.housePic.cus_idPhoto.push(i);
                        this.params.house_pic.push(i);
                    }
                })
            },
            getProvince(){
                this.$http.get('core/villa/province').then((res) => {
                    this.province = res.data.data;
                    this.proposer_id = '';
                    this.params.city = '';
                    this.params.area = '';
                    this.params.region = '';
                })
            },
            getCity(){
                this.$http.get('core/villa/city/city_parent/' + this.params.province).then((res) => {
                    this.city = res.data.data;
                    this.params.city = '';
                    this.params.area = '';
                    this.params.region = '';
                })
            },
            getArea(){
                this.$http.get('core/villa/area/area_parent/' + this.params.city).then((res) => {
                    this.area = res.data.data;
                    this.params.area = '';
                    this.params.region = '';
                })
            },
            getRegion(){
                this.$http.get('core/villa/region/region_parent/' + this.params.area).then((res) => {
                    this.region = res.data.data;
                    this.params.region = '';
                })
            },
            housePicId(val){    //上传图片
                this.params.house_pic = val;
            },
            picDelete(val){     //上传完成
                let id = this.params.house_pic.indexOf(val);
                if (id > -1) {
                    this.params.house_pic.splice(id, 1);
                }
            },
            complete(val){      //删除图片
                this.complete_ok = val;
            },
            add(){
                this.amount++;
            },
            reduce(){
                this.amount > 1? this.amount-- : this.amount;
                console.log(this.params.village_alias)
                this.params.village_alias.pop();
            },
            chooseAddress(){
                $('#myModal1').modal('show');
            },
            getAddress(val){
                if(val !== undefined){
                    this.params.village_name = val.villageName;
                    this.params.address = val.address;
                    let arr=[];
                    arr = val.location.split(',');
                    this.params.longitude = Math.round(arr[0]*100)/100;
                    this.params.latitude = Math.round(arr[1]*100)/100;
                }
            },
            pitch(item,ev,type){

                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;

                switch (type){
                    case 'district_group':
                        this.isSelect(evInput,this.params.district_group,item);
                        break;
                    case 'seat_block':
                        this.isSelect(evInput,this.params.seat_block,item);
                        break;
                    case 'unit':
                        this.isSelect(evInput,this.params.unit,item);
                        break;
                    case 'floor':
                        this.isSelect(evInput,this.params.floor,item);
                        break;
                    case 'number_rooms':
                        this.isSelect(evInput,this.params.number_rooms,item);
                        break;
                    case 'suffix':
                        this.isSelect(evInput,this.params.suffix,item);
                        break;
                }
            },

            isSelect(e,arr,item){   //复选框选中 反选 方法
                if (e.checked) {
                    arr.push(item.value);
                } else {
                    let index = arr.indexOf(item.value);
                    if (index > -1) {
                        arr.splice(index, 1);
                    }
                }
            },

            confirmAdd(){   //确认提交
                if(this.complete_ok === 'ok'){
                    this.$http.put('core/house/houseUpdate/id/' + this.villageId,this.params).then((res) =>{
                        if(res.data.code === '10030'){
                            this.closeModal();
                            this.$emit('success');
                            this.info.success = res.data.msg;
                            this.info.state_success = true;
                        }else {
                            this.info.error = res.data.msg;
                            this.info.state_error = true;
                        }
                    })
                }else {
                    this.info.error = '图片正在上传';
                    //显示成功弹窗 ***
                    this.info.state_error = true;
                }
            },

            closeModal(){
                this.$emit('closeModal');
                this.params = {
                    province : '',           //省
                    city : '',               //市
                    area :'',                //区、县
                    region :'',              //热门区域
                    address : '',            //小区地址
                    village_name : '',       //小区名字
                    village_alias : [],      //小区别名
                    built_year : '',         //建筑年代
                    house_type : '',         //房屋类型
                    total_buildings : '',    //总栋数
                    property_fee : '',       //物业费
                    district_group : [],     //区/组
                    seat_block : [],         //座/幢
                    unit : [],               //单元
                    floor : [],              //楼层
                    number_rooms : [],       //房间数
                    suffix : [],             //后缀
                    house_pic : [],          //小区照片
                    longitude : '',          //经度
                    latitude : '',           //纬度
                    code :'',                //城市code码
                    peripheral_info : '',    //周边信息
                    content : '',            //小区简介
                };
                this.housePic = {
                    cus_idPhotos : {},          //修改图片ID
                    cus_idPhoto : []
                };
                $('#villageEdit').modal('hide');
            },
        }
    }
</script>

<style scoped>
    .flexBox i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        cursor: pointer;
    }
    .flexBox i+i{
        margin-left: 5px;
    }
    .flexBox i:hover{
        color: #999;
    }
    .label_check{
        margin-bottom: 18px;
    }
    input[type=checkbox] {
        margin-right: 8px;
        padding-bottom : 5px;
        width: 17px;
        height: 17px;
    }
    .has-js .label_check {
        margin-top: 8px;
    }
</style>
