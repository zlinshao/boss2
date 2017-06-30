<template>
    <div>
        <!--客户-->
        <section class="panel">
            <div class="panel-body">

                <!--没有选中-->
                <div v-if="pitch.length === 0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="10" selected="selected">发的啥了发生</option>
                                <option value="25">25</option>
                            </select>
                        </label>
                    </div>
                    <div class="pull-right">
                        <a data-toggle="modal" href="#customModel" class="btn btn-success"><i
                                class="fa fa-plus-square"></i>&nbsp;增加客户
                        </a>
                    </div>
                </div>

                <!--被选中一个-->
                <div v-if="pitch.length === 1" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#remindDaily" @click="add_state('daily')">增加沟通日志</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#remindDaily" @click="add_state('inter')">提醒</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#remindDaily" @click="add_state('pool')">放入客户池</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#distribution">分配</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#customModel">编辑</a></h5>
                        </li>
                        <li>
                            <h5><a>取消置顶</a></h5>
                        </li>
                    </ul>
                </div>

                <!--选中两个以上-->
                <div v-if="pitch.length > 1" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#remindDaily" @click="add_state('pool')">放入客户池</a></h5>
                        </li>
                        <li>
                            <h5><a data-toggle="modal" href="#distribution">分配</a></h5>
                        </li>
                    </ul>
                </div>
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
                            <th class="text-center">客户名称</th>
                            <th class="text-center">尊称</th>
                            <th class="text-center">手机号</th>
                            <th class="text-center">客户优先级</th>
                            <th class="text-center">客户意向</th>
                            <th class="text-center">跟进进度</th>
                            <th class="text-center">来源</th>
                            <th class="text-center">客户状态</th>
                            <th class="text-center">客户身份</th>
                            <th class="text-center">个人/中介</th>
                            <th class="text-center">负责人</th>
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
                            <td class="text-center">{{cus.charge}}</td>
                            <td class="text-center"><a @click="stick(index)"><i class="fa fa-paperclip"></i></a></td>
                            <td class="text-center">
                                <router-link to="/details">更多</router-link>
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

        <!--增加日志/增加提醒/放入客户池-->
        <remindDaily :state="bool" :cus_name="cus_name"></remindDaily>

        <!--客户 新增/修改-->
        <New_add></New_add>

        <!--分配-->
        <Distribution :msg="cus_name"></Distribution>

        <!--分页-->
        <Page :pg="paging"></Page>
    </div>
</template>

<script>
    import Page from '.././common/page.vue'
    import New_add from '../common/new_add.vue'
    import remindDaily from './remindDaily.vue'
    import Distribution from '../common/distribution.vue'          //分配

    export default {
        components: {Page, Distribution, New_add, remindDaily},
        data (){
            return {
                custom_list: [],            //列表
                paging: '',                 //总页数
                pitch: [],                  //选中id
                bool: '',
                cus_name: []                //派发信息
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
            add_state (val){
                this.bool = val;
            },

//            置顶
            stick (val){
//                this.custom_list[0] = (this.custom_list[val]);
//                if (val > -1) {
//                    this.custom_list.splice(val, 1);
//                }
//                this.$set(this.custom_list, val, this.custom_list[val]);
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
