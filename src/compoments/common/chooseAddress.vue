<template>
    <div>
        <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true" @click="clearInfo">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">选择小区</h4>
                    </div>
                    <div class="modal-body">
                        <div class="chooseContainer">
                            <div class="chooseBody">
                                <div class="headFrom col-lg-12 clearFix">
                                    <form class="form-inline clearFix" role="form" method="get">
                                        <div class="dropdown form-group">
                                            <select name="" class="form-control" v-model="chooseCity" @change="search">
                                                <option value="" selected>所有城市</option>
                                                <option value="南京">南京</option>
                                                <option value="苏州">苏州</option>
                                            </select>
                                        </div>
                                        <div class="input-group bootstrap-timepicker">
                                            <label class="sr-only">搜索</label>
                                            <input type="text" class="form-control" placeholder="" @keyup="searchVillage" @keydown.enter.prevent="" v-model="searchInfo">
                                            <span class="input-group-btn">
                                                <button class="btn btn-success" type="button" @click="search">立即搜索</button>
                                            </span>
                                        </div>

                                    </form>
                                </div>

                                <!--表格-->
                                <div class="col-lg-12">
                                    <section class="panel table table-responsive">
                                        <table class="table table-advance table-hover">
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>小区名称</th>
                                                <th>地区</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in villages" @click="chooseItem($event)">
                                                <td>
                                                    <input type="radio" :value="item.id" name="address">
                                                </td>
                                                <td>{{item.name}}</td>
                                                <td>{{item.district}}</td>
                                            </tr>

                                            </tbody>
                                        </table>
                                    </section>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal" @click="clearInfo">取消</button>
                                <button type="button" class="btn btn-primary" @click="save">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
    /*.chooseContainer{
        position: fixed;
        z-index: 1001;
        width: 600px;
        height: 400px;
        top:50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -300px;
        background-color: white;
    }*/
    .title{
        color: white;
        padding: 12px 24px;
        background-color: #2A3542;
    }
    .title h3{
        margin: 0;
    }
    .title i{
        font-size: 16px;
        float: right;
    }
    .chooseBody{
        overflow-y: auto;
        padding: 12px 20px;
        height: 350px;
    }
    .table tbody tr{
        cursor: pointer;
    }
    .chooseBtn{
        text-align: right;
        padding: 12px 24px;
        background-color: #F5F5F5;
        border-top: 1px solid #ddd;
    }
    .text{
        width: 10%;
    }


</style>
<script>
    var addr="http://restapi.amap.com/v3/assistant/inputtips?key=181a17662347392d30ce7962d0deb60a&datatype=all";
    export default{

        data(){
            return {
                searchInfo : '',
                chooseCity : '',
                villages : [],
                villageId : '',
                village : {
                    villageAddress : '',
                    villageName : '',
                    district : '',
                    address : '',
                    id : '',
                    location : ''
                }
            }
        },
        components: {},
        created : function () {

        },
        methods : {
            search(){
                this.$http.defaults.withCredentials = false;
                this.$http.defaults.headers = {};
                this.$http.get(addr+'&keywords='+this.searchInfo+'&city='+this.chooseCity)
                    .then(
                        res => this.villages = res.data.tips
                    );
//                this.$http.defaults.withCredentials = true;
//                this.$http.defaults.headers.common['Env'] = globalConfig.env;
            },
            searchVillage(){// 搜索小区
                if (this.searchInfo.length >= 2){
                    this.search();
                }
            },
            clearInfo(){
                this.searchInfo = '';
                this.chooseCity = '';
                this.villages = []
            },
            save(){
                if (this.villageId.length === 0){
                    return;
                }else {
                    for ( var i in this.villages){
//                        console.log(this.villages[i]);
                        if (this.villages[i].id === this.villageId){
                            this.village.villageAddress = this.villages[i].district+this.villages[i].address;
                            this.village.villageName = this.villages[i].name;
                            this.village.id = this.villages[i].id;
                            this.village.location = this.villages[i].location;
                            this.village.district = this.villages[i].district;
                            this.village.address = this.villages[i].address;
                        }
                    }
                    this.$emit('getChildData' , this.village);
                    $('#myModal1').modal('hide');
                }

            },
            chooseItem(ev){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.villageId = $(ev.currentTarget).find('input').val();
//                console.log(this.villageId);
            }
        }
    }
</script>