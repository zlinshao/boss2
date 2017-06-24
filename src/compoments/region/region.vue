<template>
    <div>
        <!--<span class="btn btn-primary btn-lg" @click="getData()">获取数据</span>-->
        <!--<h2>{{msg}}</h2>-->
        <div class="row">
            <div class="panel-body">



                <form class="form-inline" role="form">

                    <!--<div class="form-group pull-left">
                        <a class="btn btn-success">
                            <i class="fa  fa-plus-square"></i>&nbsp;新增区域信息
                        </a>
                    </div>-->
                    <div class="form-group">
                        <label>选择城市：</label>
                        <button class="btn btn-success" data-cityId="0" @click="getRegions(0)" :class="{active : isActive == 0}">所有城市</button>
                        <button class="btn btn-success" data-cityId="1" @click="getRegions(1)" :class="{active : isActive == 1}">南京</button>
                        <button class="btn btn-success" data-cityId="2" @click="getRegions(2)" :class="{active : isActive == 2}">苏州</button>
                    </div>

                    <div class="input-group bootstrap-timepicker pull-right">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="区域名/区域经理" @keyup.enter="search()">
                        <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search()"><i
                                        class="fa fa-search"></i></button>
                            </span>
                    </div>
                </form>
            </div>

            <!--添加新区域信息-->
            <!--<div class="addNewRegion">

                <form class="form-inline">
                    <div class="col-lg-3 form-group">
                        <label for="newRegionName">区域名：</label>
                        <select nagrouparea" id="newRegionName" class="form-control">
                            <option v-bind:value="item.id"  v-for="item in regions">{{item.area_name}}</option>
                        </select>
                    </div>
                    <div class="col-lg-3 form-group">
                        <label for="newRegionAmName">区域经理：</label>
                        <select nagrouparea" id="newRegionAmName" class="form-control">
                            <option v-bind:value="item.am.id" v-for="item in regions">{{item.am.name}}</option>
                        </select>
                    </div>

                    <button class="btn btn-success">添加</button>
                </form>
            </div>-->

            <!--表格-->
            <div class="col-lg-12">
                <section class="panel table table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">ID</th>
                            <th class="text-center">区域名称</th>
                            <th class="text-center">区域经理</th>
                            <th class="text-center">收房数</th>
                            <th class="text-center">房源数</th>
                            <th class="text-center">区域人数</th>
                            <th class="text-center">租房数</th>
                            <th class="text-center">查看该区域小组</th>
                        </tr>
                        </thead>
                        <tbody id="rentingId">
                            <!--<router-link tgrouparea" v-for="item in regions" class="text-center">-->
                                <tr v-for="item in regions" class="text-center">
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
                                </tr>

                            <!--</router-link>-->
                        </tbody>
                    </table>
                </section>

                <div class="row pull-right" style="padding-right: 15px;" v-show="showPage">
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li>
                                <input type="button" href="#" class="previous btn btn-white" value="上一页">
                            </li>
                            <li>
                                <input type="button" href="#" class="next btn btn-white" value="下一页">
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .form-inline .form-control{
        vertical-align: baseline;
    }
    .active{
        background-color: #398439;
        border-color: #398439;
    }

</style>

<script>
    export default {
        name : 'region',
        data (){
            return{
                msg : '',
                regions : '',
                showPage : true,
                isActive : 0

            }
        },
        created: function () {
            this.getRegions(0);
        },
        methods: {
            getRegions(num){
                if (num == 0){// 所有区域
                    this.showPage = true;
                    this.isActive = num;
                    this.$http.get('manager/Area/areaList')
                        .then(
                            res => this.regions=res.data.data
                        );
                }else {
                    this.showPage = false;
                    if (num == 1){// 南京
                        alert('南京');
                        this.isActive = num;
                    } else if (num == 2){// 苏州
                        alert('苏州');
                        this.isActive = num;
                    }
                }

            },
            search(){
                // 调用后台搜索方法
                alert(1);
            }
        }
    }
</script>