<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade addHouse" id="addHouse">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">新增客户</h4>
                    </div>
                    <div class="modal-body roll">

                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label for="villageName" class="col-sm-2 control-label">小区名称<sup>*</sup></label>
                                <div class="col-sm-10">
                                    <input title="请点击选择" type="text" class="form-control" id="villageName"
                                           v-model="houseAdd.amap_json.villageName" readonly  data-toggle="modal" data-target="#myModal1">
                                </div>
                            </div>
                            <div class="form-group">
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
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="addNewHouse">确定</button>
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
        data(){
            return {
                houseAdd: {
                    amap_json: {
                        villageAddress: '',
                        villageName: '',
                        district: '',
                        address: '',
                        id: '',
                        location: '',
                    },
                    building: '',
                    unit: '',
                    house_number: '',
                },
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

        },
        methods : {
            addNewHouse(){
                this.$http.post('core/villa/savevilla',this.houseAdd).then((res) => {
                        if(res.data.code==='80010'){
                            this.$emit('addHouse',res.data.data);
                            $('.addHouse').modal('hide');
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
                        }else{
                            this.info.error =res.data.msg;
                            //显示成功弹窗 ***
                            this.info.state_error = true;
                        }
                })
            },
            selectAddress(val){
                this.houseAdd.amap_json=val;
            },
        }
    }
</script>
<style scoped>

</style>