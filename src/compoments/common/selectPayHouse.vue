<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectHouse" id="selectHouse" data-backdrop="static" style="z-index: 1080;">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择房屋</h4>
                    </div>
                    <div class="modal-body inbox-body panel" v-if="!isNewHouse">
                        <div class="row">
                            <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                            <div class="iconic-input right col-lg-4">
                                <i class="fa fa-search"></i>
                                <input type="text" class="form-control" placeholder="请输入房屋地址" v-model="keywords"
                                     @keydown.enter.prevent="search"  >
                            </div>
                            <div class="col-lg-4">
                                <a class="btn btn-success" @click="search">搜索</a>
                                <a class="btn btn-success" v-if="house_status != '1'" @click="newAddHouse">新增</a>
                            </div>
                        </div>
                        <div class="table table-responsive roll">
                            <table class="table table-striped table-advance table-hover">
                                <thead>
                                <tr class="lightGray">
                                    <th></th>
                                    <th>房屋地址</th>
                                    <th>房型</th>
                                    <th>面积</th>
                                    <th>装修</th>
                                    <th>负责人</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in houseList" @click="chooseItem($event,item)">
                                    <td>
                                        <input type="radio" name="radio" >
                                    </td>
                                    <td>{{item.detailed_address}}</td>
                                    <td>
                                    <span v-if="item.rooms !==null && item.rooms !==undefined">
                                        {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫
                                    </span>
                                    </td>
                                    <td>{{item.area}}㎡</td>
                                    <td>{{dictionary.decoration[item.decoration]}}</td>
                                    <td>{{item.staff_id}}</td>
                                </tr>
                                <tr v-if="isShow">
                                    <td colspan="10" class="text-center text-muted">
                                        暂无数据...
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div class="modal-body roll" v-if="isNewHouse">
                        <form class="form-horizontal" role="form">
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
                                        <option value="0">0室</option>
                                        <option value="1">1室</option>
                                        <option value="2">2室</option>
                                        <option value="3">3室</option>
                                        <option value="4">4室</option>
                                        <option value="5">5室</option>
                                        <option value="6">6室</option>
                                        <option value="7">7室</option>
                                        <option value="8">8室</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                    <select class="form-control" v-model="houseAdd.rooms.hall">
                                        <option value="0">0厅</option>
                                        <option value="1">1厅</option>
                                        <option value="2">2厅</option>
                                        <option value="3">3厅</option>
                                        <option value="4">4厅</option>
                                        <option value="5">5厅</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                    <select class="form-control" v-model="houseAdd.rooms.toilet">
                                        <option value="0">0卫</option>
                                        <option value="1">1卫</option>
                                        <option value="2">2卫</option>
                                        <option value="3">3卫</option>
                                        <option value="4">4卫</option>
                                        <option value="4">5卫</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeModal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="ensure">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <ChooseAddress @getChildData="selectAddress"></ChooseAddress>
    </div>
</template>
<script>
    import Status from './status.vue'
    import ChooseAddress from '../common/chooseAddress.vue'
    export default{
        components:{
            Status,
            ChooseAddress
        },
        props: ['msg','house_status'],
        watch: {
            msg (val){
                this.houseAdd.salesman = val
            }
        },
        data(){
            return {
                keywords:'',
                houseList:[],
                dictionary:[],
                houseAddress:{          //发送回父组件的数据
                    id:'',
                    address:'',
                    rooms : '',
                },
                isShow:true,
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
                isNewHouse : false,

                houseAdd: {
                    salesman: '',
                    amap_json: {
                        villageAddress: '',
                        villageName: '',
                        district: '',
                        address: '',
                        id: '',
                        location: '',
                    },
                    village_name : '',
                    is_amap : true,
                    building: '',
                    unit: '',
                    house_number: '',
                    rooms:{
                        rooms:'0',
                        hall:'0',
                        toilet:'0'
                    },
                },

            }
        },
        mounted(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('core/customer/dict').then((res) => {
                    this.dictionary=res.data;
                });
            },
            search(){
                if(this.keywords!==''){
                    this.$http.get('core/financial_villa/searchFinancialVilla/keywords/'+encodeURI(this.keywords)).then((res) => {
                        if(res.data.code === '80010'){
                            this.houseList=res.data.data;
                            this.isShow = false;
                        }else {
                            this.houseList=[];
                            this.isShow = true;
                            this.info.error = res.data.msg;
                            this.info.state_error = true;
                        }
                    })
                }
            },
            chooseItem(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.houseAddress.id=item.id;
                this.houseAddress.address=item.detailed_address;
                this.houseAddress.rooms=item.rooms.rooms + '室' + item.rooms.hall + '厅' + item.rooms.toilet + '卫';
            },
            addHouse(){
                if(this.houseAddress.id === ''){
                    this.info.error = '请先选择房屋';
                    this.info.state_error = true;
                }else {
                    this.$emit('House',this.houseAddress);
                    $('.selectHouse').modal('hide');
                    this.houseList=[];
                    this.keywords='';
                    this.isNewHouse = false;
                }
            },

            newAddHouse(){
                this.isNewHouse = true;
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
            ensure(){
                if(this.isNewHouse === false){
                    this.addHouse();
                }else {
                    this.$http.post('core/financial_villa/savevilla',this.houseAdd).then((res) => {
                        if(res.data.code==='80010'){
                            console.log(res.data.data)
                            this.houseAddress.id=res.data.data.id;
                            this.houseAddress.address=res.data.data.detailed_address;
                            this.houseAddress.rooms=res.data.data.rooms.rooms + '室' + res.data.data.rooms.hall + '厅' + res.data.data.rooms.toilet + '卫';
                            this.addHouse();
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
                            this.houseAdd.unit='';
                            this.houseAdd.house_number='';
                            this.houseAdd.rooms.rooms = '0';
                            this.houseAdd.rooms.hall = '0';
                            this.houseAdd.rooms.toilet = '0';
                        }else{
                            this.info.error =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                    })
                }
            },
            closeModal(){
                this.isNewHouse = false;
            },
        }
    }
</script>
<style scoped>
    .lightGray{
        background-color: #F2F2F2;
    }
    .iconic-input i {
        margin: 8px 25px 8px 10px;
    }
    div.table.table-responsive table tr td:first-child {
        width: 80px ;
    }
    label{
        margin-top: 5px;
    }
    .roll{
        max-height: 300px;
        overflow: auto;
    }
</style>