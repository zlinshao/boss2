<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade " id="selectHouse">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择房屋</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal tasi-form">
                            <div class="row">
                                <label class="col-sm-2 control-label col-lg-2" >房屋地址</label>
                                <div class="iconic-input right col-lg-4">
                                    <i class="fa fa-search"></i>
                                    <input type="text" class="form-control" placeholder="请输入房屋地址" v-model="keywords"
                                         @keydown.enter.prevent="search"  >
                                </div>
                                <div class="col-lg-2">
                                    <a class="btn btn-success" @click="search">搜索</a>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                <tr class="lightGray">
                                    <th></th>
                                    <th>房屋地址</th>
                                    <th>房型</th>
                                    <th>面积</th>
                                    <th>装修</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in houseList" @click="chooseItem($event,item)">
                                    <td>
                                        <input type="radio" name="radio" >
                                    </td>
                                    <td>{{item.amap_json.villageName}}</td>
                                    <td>
                                        <span> {{item.rooms.rooms}}室{{item.rooms.hall}}厅{{item.rooms.toilet}}卫</span>
                                    </td>
                                    <td>{{item.area}}㎡</td>
                                    <td>{{dictionary.decoration[item.decoration]}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="ensure">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                keywords:'',
                houseList:[],
                dictionary:[],
                houseAddress:{          //发送回父组件的数据
                    id:'',
                    address:''
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
                    this.$http.get('core/core_common/villalist/keywords/'+encodeURI(this.keywords)).then((res) => {
                        this.houseList=res.data.data;
                        this.keywords='';
                    })
                }
            },
//            selectHouse(item){
//                this.houseAddress.id=item.id;
//                this.houseAddress.address=item.address;
//            },
            ensure(){
                this.$emit('House',this.houseAddress);
                this.houseList=[];
                $('#selectHouse').modal('hide');
            },
            chooseItem(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.houseAddress.id=item.id;
                this.houseAddress.address=item.amap_json.villageName;
            }
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
</style>