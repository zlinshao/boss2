<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectHouse" id="selectHouse">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选择房屋</h4>
                    </div>
                    <div class="modal-body inbox-body panel table table-responsive">
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
                        <table class="table table-striped table-advance table-hover">
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
                            <tr v-if="isShow">
                                <td colspan="10" class="text-center text-muted">
                                    暂无数据...
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="ensure">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>
<script>
    import Status from './status.vue'
    export default{
        components:{
            Status
        },
        data(){
            return {
                keywords:'',
                houseList:[],
                dictionary:[],
                houseAddress:{          //发送回父组件的数据
                    id:'',
                    address:''
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
                        if(res.data.code === '20010'){
                            this.houseList=res.data.data;
                            this.isShow = false;
                        }else {
                            this.houseList=[];
                            this.isShow = true;
                        }
                    })
                }
            },
            chooseItem(ev,item){// 点击行选中
                $(ev.currentTarget).find('input').prop('checked' , 'true');
                this.houseAddress.id=item.id;
                this.houseAddress.address=item.amap_json.villageName;
            },
            ensure(){
                if(this.houseAddress.id === ''){
                    this.info.error = '请先选择房屋';
                    this.info.state_error = true;
                }else {
                    this.$emit('House',this.houseAddress);
                    $('.selectHouse').modal('hide');
                    this.houseList=[];
                    this.keywords='';
                }
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
</style>