<template>
    <div>
        <!--客户池-->
        <section class="panel">
            <div class="panel-body">

                <!--没有选中-->
                <div v-if="pitch.length === 0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_status_s($event)">
                                <option value="" selected="selected">客户状态</option>
                                <option value="1">新建</option>
                                <option value="2">跟进中客户</option>
                                <option value="3">已成交客户</option>
                                <option value="4">已失败客户</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_intention_c($event)">
                                <option value="" selected="selected">客户意向</option>
                                <option value="1">低</option>
                                <option value="2">中</option>
                                <option value="3">高</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_id_s($event)">
                                <option value="" selected="selected">客户身份</option>
                                <option value="1">业主</option>
                                <option value="3">租客</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="ser_source_s($event)">
                                <option value="" selected="selected">客户来源</option>
                                <option value="1">25</option>
                                <option value="2">26</option>
                                <option value="3">27</option>
                                <option value="4">28</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_belong_s($event)">
                                <option value="" selected="selected">客户所属</option>
                                <option value="1">乐伽</option>
                                <option value="2">线下</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_type_s($event)">
                                <option value="" selected="selected">个人/中介</option>
                                <option value="1">个人</option>
                                <option value="2">中介</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 pull-right" style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="">
                            <span class="input-group-btn">
                            <button class="btn btn-success" type="button" @click="search_pool()">搜索</button>
                        </span>
                        </div>
                    </div>
                </div>

                <!--选中两个以上-->
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
            </div>
        </section>

        <!--客户池列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">客户名称</th>
                            <th class="text-center">尊称</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">客户优先级</th>
                            <th class="text-center">客户意向</th>
                            <th class="text-center">跟进进度</th>
                            <th class="text-center">来源</th>
                            <th class="text-center">客户状态</th>
                            <th class="text-center">客户行业</th>
                            <th class="text-center">房屋所属</th>
                            <th class="text-center">置顶</th>
                            <th class="text-center">更多</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(cus, index) in custom_list">
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left"
                                       @click="rules(index, $event, cus.name)">
                            </td>
                            <td class="text-center">{{cus.name}}</td>
                            <td class="text-center">{{cus.sex}}</td>
                            <td class="text-center">{{cus.phone}}</td>
                            <td class="text-center">{{cus.priority}}</td>
                            <td class="text-center">{{cus.intention}}</td>
                            <td class="text-center">
                                <a data-v-2f43a2b3="" href="#">
                                    <div data-v-2f43a2b3="" class="progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: cus.progress + '%'}">
                                            <span data-v-2f43a2b3="" class="sr-only">{{cus.progress}}%</span>
                                        </div>
                                    </div>
                                </a>
                                {{cus.progress}}%
                            </td>
                            <td class="text-center">{{cus.source}}</td>
                            <td class="text-center">{{cus.state}}</td>
                            <td class="text-center">{{cus.client}}</td>
                            <td class="text-center">{{cus.status}}</td>
                            <td class="text-center"><a @click="stick(index)"><i class="fa fa-paperclip"></i></a></td>
                            <td class="text-center">
                                <router-link to="/details">更多</router-link>
                            </td>
                        </tr>
                        <tr v-show="custom_list.length === 0">
                            <td colspan="13" class="text-center text-muted">
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
    import New_add from './new_add.vue'
    import remindDaily from './remindDaily.vue'
    import Distribution from '../common/distribution.vue'       //分配
    export default {
        components: {Page, Distribution, New_add, remindDaily},
        data (){
            return {
                custom_list: [],            //列表
                paging: '',                 //总页数
                pitch: [],                  //选中id
                bool: '',                   //remindDaily状态
                cus_name: [],               //分派名称
//                搜索字典
                sea_status: '',             //客户状态
                sea_intention: '',          //客户意向
                sea_id: '',                 //客户身份
                sea_source: '',             //客户来源
                sea_belong: '',             //客户所属
                sea_type: '',               //个人/中介
            }
        },
        created (){
            this.collectList();
        },
        methods: {
//            客户列表
            collectList (){
                this.$http.get('json/tsconfig.json').then((res) => {
                    this.custom_list = res.data.data.custom;
                    this.paging = res.data.data.pages;
                })
            },
//            搜索
            search_pool (){

            },
//            分配
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
//            remindDaily状态
            add_state (val){
                this.bool = val;
            },
//            客户状态
            sea_status_s (val){
                this.sea_status = val.target.value;
            },
//            客户意向
            sea_intention_c (val){
                this.sea_intention = val.target.value;
            },
//            客户身份
            sea_id_s (val){
                this.sea_id = val.target.value;
            },
//            客户来源
            ser_source_s (val){
                this.sea_source = val.target.value;
            },
//            客户所属
            sea_belong_s (val){
                this.sea_belong = val.target.value;
            },
//            个人/中介
            sea_type_s (val){
                this.sea_type = val.target.value;
            },
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

    select {
        margin-bottom: 0;
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

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }

    .progress.progress-striped.active {
        margin-bottom: 0;
        height: 10px;
    }
</style>
