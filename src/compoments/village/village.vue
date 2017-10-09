<template>
    <div>
        <ol class="breadcrumb">
            <li>小区管理</li>
        </ol>
        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" role="form">
                <div class="dropdown form-group">
                    <select name="type" id="search_type" class="form-control">
                        <option value="">房屋类型</option>
                        <option value="1">住宅</option>
                        <option value="2">公寓</option>
                        <option value="3">商住两用</option>
                    </select>
                </div>

                <div class="dropdown form-group">
                    <select name="traffic" id="search_traffic" class="form-control">
                        <option value="">交通情况</option>
                        <option value="1">啊啊啊</option>
                        <option value="2">阿萨斯</option>
                    </select>
                </div>

                <div class="dropdown form-group">
                    <select name="life" id="search_life" class="form-control">
                        <option value="">生活配套</option>
                        <option value="1">啊啊啊</option>
                        <option value="2">阿萨斯</option>
                    </select>
                </div>

                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="" @keydown.enter.prevent="search">
                    <span class="input-group-btn">
                    <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                </span>
                </div>



                <div class="form-group pull-right clearFix">
                    <div class="form-group show-way pull-left">
                        <label>视图：</label>
                        <button class="btn" type="button" :class="{'btn-success' : isActived==0}" @click="changeShowWay(0)">列表</button>
                        <button class="btn" type="button" :class="{'btn-success' : isActived==1}" @click="changeShowWay(1)">地图</button>
                    </div>
                    <button class="btn btn-success" type="button" data-toggle="modal" data-target="#myModal">
                        <i class="fa  fa-plus-square"></i>&nbsp;添加小区
                    </button>
                </div>

            </form>
        </div>


        <!--列表显示-->
        <div class="col-lg-12" v-if="showAsList">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">小区名称</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">房屋类型</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">交通情况</th>
                        <th class="text-center">生活配套</th>
                        <th class="text-center">空置套数</th>
                        <th class="text-center">查看该小区</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>金马郡城</td>
                        <td>南京市建邺区嵩山路101号</td>
                        <td>住宅</td>
                        <td>5</td>
                        <td>公交、地铁</td>
                        <td>齐全</td>
                        <td>3</td>
                        <td>
                            <!--<router-link :to="{path:'group' , query:{regionId:item.id}}">-->
                            <router-link to="/villageDetail">
                                <button class="btn btn-primary btn-sm">查看小组</button>
                            </router-link>
                        </td>
                    </tr>
                    <!--<router-link tgrouparea" v-for="item in regions" class="text-center">-->
                    <!--<tr v-for="item in regions" class="text-center">
                        <td>{{item.id}}</td>
                        <td>{{item.area_name}}</td>
                        <td>{{item.am}}</td>
                        <td>{{item.collect}}</td>
                        <td>{{item.house}}</td>
                        <td>{{item.nums}}</td>
                        <td>{{item.rent}}</td>
                        <td>
                            <router-link :to="{path:'group' , query:{regionId:item.id}}">
                                <button class="btn btn-primary btn-sm">查看小组</button>
                            </router-link>
                        </td>
                    </tr>-->

                    <!--</router-link>-->
                    </tbody>
                </table>
            </section>


        </div>

        <!--地图-->
        <div class="col-lg-12 map" v-else="showAsList">
            <!--显示主要信息的表格-->
            <!--<div>
                <div class="col-lg-12">
                    <section class="panel table table-responsive">
                        <table class="table table-striped table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">小区名称</th>
                                <th class="text-center">地址</th>
                                <th class="text-center">房屋类型</th>
                                <th class="text-center">查看该小区</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center">
                                <td>金马郡城</td>
                                <td>南京市建邺区嵩山路101号</td>
                                <td>住宅</td>
                                <td>
                                    &lt;!&ndash;<router-link :to="{path:'group' , query:{regionId:item.id}}">&ndash;&gt;
                                    <router-link to="/villageDetail">
                                        <button class="btn btn-primary btn-sm">查看小组</button>
                                    </router-link>
                                </td>
                            </tr>
                            &lt;!&ndash;<router-link tgrouparea" v-for="item in regions" class="text-center">&ndash;&gt;
                            &lt;!&ndash;<tr v-for="item in regions" class="text-center">
                                <td>{{item.id}}</td>
                                <td>{{item.area_name}}</td>
                                <td>{{item.am}}</td>
                                <td>{{item.collect}}</td>
                                <td>{{item.house}}</td>
                                <td>{{item.nums}}</td>
                                <td>{{item.rent}}</td>
                                <td>
                                    <router-link :to="{path:'group' , query:{regionId:item.id}}">
                                        <button class="btn btn-primary btn-sm">查看小组</button>
                                    </router-link>
                                </td>
                            </tr>&ndash;&gt;

                            &lt;!&ndash;</router-link>&ndash;&gt;
                            </tbody>
                        </table>
                    </section>


                </div>
            </div>-->

            <!--地图-->
            <MapVue class="iframe"></MapVue>
        </div>

        <!-- Modal -->
        <Modal :oper="oper"></Modal>

    </div>

</template>
<style scoped>
    .show-way{
        /*border-left: 1px solid #ccc;*/
        /*border-right: 1px solid #ccc+;*/
        /*padding: 0 20px;*/
        margin: 0 10px 0 0;
        vertical-align: top;
    }
    .show-way button:nth-of-type(1){
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
    .show-way button:nth-of-type(2){
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        margin-left: -3px;
    }
    .map>div{
        font-size: 0;
        vertical-align: top;
        width: 100%;
        height: 800px;
    }
    /*.map>div{
        display: inline-block;
        font-size: 14px;
        vertical-align: top;
        width: 50%;
        height: 800px;
    }*/
    /*.headFrom{
        position: relative;
    }
    .headFrom .pull-right{
        float: none;
        position: absolute;
        right: 0;
    }*/

</style>
<script>
    import MapVue from './map.vue'
    import Modal from './modal.vue'
    export default{
        data(){
            return {
                isActived : 0,
                showAsList : true, // 列表显示
                oper : {
                    operName : '新建小区',
                    villageId : -1
                }
            }
        },
        components: {
            MapVue,
            Modal
        },
        created : function () {
//            this.getMap();
        },
        methods : {
            changeShowWay(num){
                this.isActived=num;
                if (num == 0){
                    // 列表
                    this.showAsList = true;
                } else {
                    // 地图
                    this.showAsList = false;
                }
            },
            search(){

            }

        }
    }
</script>