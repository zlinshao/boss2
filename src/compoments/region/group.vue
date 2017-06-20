<template>
    <div>
        <!--<div>区域id：{{recRegionId}}</div>-->

        <!--添加-->
        <div class="form-group">
            <button class="btn btn-success" @click="showAddToggle()">
                <i class="fa  fa-plus-square"></i>&nbsp;新增小组
            </button>
        </div>
        <!--<AddGroup v-show="showAdd"></AddGroup>-->
        <div class="panel-body" v-show="showAdd">
            <form class="form-inline" role="form">
                <div class="dropdown form-group">
                    <select name="area" id="area" class="form-control" v-model="areaId">
                        <option :value="item.id" v-for="item in regions">{{item.area_name}}</option>
                    </select>
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="小组名称" v-model="areaName">
                </div>

                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="办公地址" v-model="areaAddr" @keyup.enter="addNewGroup">
                    <span class="input-group-btn">
                        <button class="btn btn-success" type="button"  @click="addNewGroup">确定</button>
                    </span>
                </div>

                <!--<div class="form-group">
                    <input type="text" class="form-control" placeholder="办公地址">
                    <span class="input-group-btn">
                        <button class="btn btn-success" type="button" @click="addNewGroup">确定</button>
                    </span>
                </div>-->

                <!--<div class="form-group">
                    <button type="button" class="btn btn-success" @click="addNewGroup">
                        确定
                    </button>
                </div>-->
            </form>
        </div>


        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">ID</th>
                        <th class="text-center">小组名称</th>
                        <th class="text-center">办公地址</th>
                        <th class="text-center">小组组长</th>
                        <th class="text-center">区域人数</th>
                        <th class="text-center">收房数</th>
                        <th class="text-center">租房数</th>
                        <th class="text-center">房源数</th>
                        <th class="text-center">操作</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <!--<router-link tgrouparea" v-for="item in regions" class="text-center">-->
                    <tr v-for="item in areas" class="text-center">
                        <td>{{item.id}}</td>
                        <td>{{item.groups}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.gm}}</td>
                        <td>{{item.nums}}</td>
                        <td>{{item.collect}}</td>
                        <td>{{item.rent}}</td>
                        <td>{{item.house}}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" data-toggle="modal" href="#edit" @click="modify(item.id)">修改</button>
                        </td>
                    </tr>

                    <!--</router-link>-->
                    </tbody>
                </table>
            </section>
            <div class="row pull-right" style="padding-right: 15px;">
                <!--<nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li>
                            <input type="button" href="#" class="previous btn btn-white" value="上一页">
                        </li>
                        <li>
                            <input type="button" href="#" class="next btn btn-white" value="下一页">
                        </li>
                    </ul>
                </nav>-->
                <!--<div id="loadings">
                    <div id='loading' class='loading'>正在处理中</div>
                </div>-->

                <router-link to="/region" class="pull-right">
                    <button class="btn btn-success">返回</button>
                </router-link>
            </div>
        </div>



    <!--修改模态框-->
        <div class="modal fade full-width-modal-right" id="edit" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">修改小组信息</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-inline" role="form">
                                <!--<div class="dropdown form-group">
                                    <label>修改所属区域：</label>
                                    <select class="form-control" v-model="areaId">
                                        <option :value="item.id" v-for="item in regions">{{item.area_name}}</option>
                                    </select>
                                </div>-->
                                <div class="form-group">
                                    <label>修改小组名称：</label>
                                    <input type="text" class="form-control" placeholder="小组名称" v-model="modifyAreaName">
                                </div>

                                <div class="form-group">
                                    <label>修改办公地址：</label>
                                    <input type="text" class="form-control" placeholder="办公地址" v-model="modifyAreaAddr" @keyup.enter="modifySubmit">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button data-dismiss="modal" class="btn btn-success" type="button" @click="modifySubmit">提交</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>
<style scoped>
    .form-inline .form-control{
        vertical-align: baseline;
    }
    label{
        font-weight: 700;
    }
    .form-control{
        margin-left: 5%;
        width: 100%;
        border-color: transparent;
        border-bottom-color: #ccc;
    }
    .input-group .form-control:focus{
        z-index: auto;
    }
</style>
<script>
    import newAdd from '../common/new_add.vue'
    import Edit from '../common/edit.vue'
    import Dele from '../common/delete.vue'
    export default{
        data(){
            return {
                recRegionId : '',
                regions :'',
                areas : '',
                showAdd : false,
                // 添加
                areaId:this.$route.query.regionId,
                areaName : '',
                areaAddr : '',
                // 修改
                modifyAreaId : '',
                modifyAreaName : '',
                modifyAreaAddr : ''
            }
        },
        created: function() {
            var id = this.$route.query.regionId;
//            console.log(id);
            this.recRegionId = id;
            this.getRegions();
            this.getAreas();
        },
        methods : {
            getRegions(){// 获取南京所有区域
//                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/Area/areaList')
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/User/searchArea')
                    .then(
                        res => this.regions=res.data.data
                    );
            },
            showAddToggle(){// 显示/隐藏添加部分
                this.showAdd = !this.showAdd;
            },
            getAreas(){// 获取当前区域的小组信息
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/Groups/groupList/id/'+this.recRegionId)
                    .then(
                        res => this.areas=res.data.data
                    );
            },
            addNewGroup(){// 添加新的小组信息
                var that = this;
                this.$http.post('http://test.v2.api.boss.lejias.cn/manager/Groups/saveGroup' , {
                    "groups": this.areaName, //小组名称
                    "address": this.areaAddr,//办公地点
                    "region_id": this.areaId//所属区域id   select框选择区域名称
                })
                    .then(
                        res => {
                            if (res.data.code == 20020){
                                that.getAreas();
                                that.showAddToggle();
                                that.areaName = '';
                                that.areaAddr = ''
                            }else if (res.data.code == 20022){
                                alert('表单验证失败');
                            }
                        }
                    )
            },
            modify(id){// 点击修改获取该小组信息
//                alert(id);
                var that = this;
                this.modifyAreaId = id;
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/Groups/readGroup/id/'+id)
                    .then(
                        res => {
                            if (res.data.code == 20030){
                                // 成功
//                            alert('success');
                                console.log(res.data.data);
                                that.modifyAreaName = res.data.data[0].groups;
                                that.modifyAreaAddr = res.data.data[0].address;
                            }
                        }
                    )
            },
            modifySubmit(){// 提交修改
                var that = this;
                this.$http.post('http://test.v2.api.boss.lejias.cn/manager/Groups/updateGroup' , {
                    "id": this.modifyAreaId,//所属小组id   select框选择区域名称
                    "groups": this.modifyAreaName, //小组名称
                    "address": this.modifyAreaAddr,//办公地点
                }).then(
                    res => {
                        console.log(res.data);
                        if(res.data.code==20020){
                            that.getAreas();
                        } else if (res.data.code==20022){
                            alert('修改失败');
                        }
                    }
                )
            }
        }
    }
</script>