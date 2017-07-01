<template>
    <div>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix" v-if="pitch.length==0">
                <form class="form-inline clearFix" role="form">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">房屋类型</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">房屋装修</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">房型</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">建筑楼层</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">房屋特色</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">房屋面积</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">房屋状态</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">客户类型</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">参考价格</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 pull-right" style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="">
                            <span class="input-group-btn">
                                <button class="btn btn-success" type="button">搜索</button>
                            </span>
                        </div>
                    </div>
                </form>
            </div>

            <!--选中-->
            <div v-if="pitch.length > 0" class="col-lg-12 remind">
                <ul>
                    <li>
                        <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                    </li>
                    <li>
                        <h5><a data-toggle="modal" href="#distribution">分配</a></h5>
                    </li>
                </ul>
            </div>
        </section>

        <!--客户列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">地址</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">面积</th>
                            <th class="text-center">装修</th>
                            <th class="text-center">配套设施</th>
                            <th class="text-center">建筑楼层</th>
                            <th class="text-center">房屋特色</th>
                            <th class="text-center">参考租金</th>
                            <th class="text-center">剩余空置期</th>
                            <th class="text-center">房屋状态</th>
                            <th class="text-center">房屋所属</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">锁定</th>
                            <th class="text-center">置顶</th>
                            <th class="text-center">更多</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in custom_list">
                            <td class="text-center">
                                <label for="item_id"></label>
                                <input id="item_id" type="checkbox" class="pull-left"
                                       @click="rules(item.id, $event, item.address)">
                            </td>
                            <td class="text-center">{{item.address}}</td>
                            <td class="text-center">{{item.room_type}}</td>
                            <td class="text-center">{{item.proportion}}</td>
                            <td class="text-center">{{item.decorate}}</td>
                            <td class="text-center">{{item.install}}</td>
                            <td class="text-center">{{item.floor}}</td>
                            <td class="text-center">{{item.chara}}</td>
                            <td class="text-center">{{item.reprises}}</td>
                            <td class="text-center">{{item.vacant}}</td>
                            <td class="text-center">{{item.stay}}</td>
                            <td class="text-center">{{item.attribute}}</td>
                            <td class="text-center">{{item.charge}}</td>
                            <td class="text-center" @click="clock">
                                <i class="fa fa-unlock-alt" v-if="isClock"></i>
                                <i class="fa fa-unlock" v-else="isClock"></i>
                            </td>
                            <td class="text-center">
                                <a><i class="fa fa-paperclip"></i></a>
                            </td>
                            <td class="text-center">
                                <router-link to="/collectDetail" @click="houseDetail(item.id)">更多</router-link>
                            </td>
                        </tr>
                        <tr v-show="">
                            <td colspan="12" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--分配-->
        <Distribution :msg="cus_name"></Distribution>

        <!--分页-->
        <Page :pg="paging"></Page>
    </div>
</template>

<script>
    import Page from '.././common/page.vue'
    import remindDaily from '../custom/remindDaily.vue'
    import Distribution from '../common/distribution.vue'          //分配
    export default {
        components: {Page, Distribution, remindDaily},
        data (){
            return {
                custom_list: [],            //列表
                paging: '',                 //总页数
                pitch: [],                  //选中id
                bool: '',
                cus_name: [],
                isClock:true,            //是否被锁
            }
        },
        created (){
            this.collectList();
        },
        methods: {
//            客户列表
            collectList (){
                this.$http.get( 'json/collects.json').then((res) => {
                    this.custom_list = res.data.data.custom;
                    this.paging = res.data.data.pages;
                })
            },
//            锁定状态
            clock(){
                this.isClock=!this.isClock;
            },
//            增删数组
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },
            rules (rul, eve, cus){
                if (eve.target.checked === true) {
                    this.pitch.push(rul);
                    this.cus_name.push(cus)
                }
                if (eve.target.checked === false) {
                    let index = this.pitch.indexOf(rul);
                    let cus_name = this.cus_name.indexOf(cus);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                    if (cus_name > -1) {
                        this.cus_name.splice(cus_name, 1);
                    }
                }
            },
            houseDetail(){

            }
        }
    }
</script>


<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }


    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }
    .nav-tabs>li {
        margin-bottom: 0;
    }


    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
</style>
