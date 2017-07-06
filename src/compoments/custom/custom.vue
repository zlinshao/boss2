<template>
    <div>
        <!--客户-->
        <section class="panel">
            <div class="panel-body">

                <!--没有选中-->
                <div v-if="pitch.length === 0">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_status_s($event)">
                                <option value="" selected="selected">客户状态</option>
                                <option v-for="(val,index) in select_list.customer_status" :value="index">{{val}}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_intention_c($event)">
                                <option value="" selected="selected">客户意向</option>
                                <option v-for="(val,index) in select_list.customer_will" :value="index">{{val}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_id_s($event)">
                                <option value="" selected="selected">客户身份</option>
                                <option v-for="(val,index) in select_list.identity" :value="index">{{val}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="ser_source_s($event)">
                                <option value="" selected="selected">客户来源</option>
                                <option v-for="(val,index) in select_list.customer_source" :value="index">{{val}}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control" @click="sea_type_s($event)">
                                <option value="" selected="selected">个人/中介</option>
                                <option v-for="(val,index) in select_list.person_medium" :value="index">{{val}}</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort" style="height: 39px;">
                        <label style="margin-top: 8px;">
                            <input type="checkbox" class="pull-left">三天内未成交
                        </label>
                    </div>
                    <div class="pull-right" style="margin-bottom: 3px; margin-left: 14px;">
                        <a href="#customModel" class="btn btn-success"
                           @click="customers_new('new')">
                            <i class="fa fa-plus-square"></i>&nbsp;增加客户
                        </a>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2 pull-right" style="padding: 0;">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="">
                            <span class="input-group-btn">
                            <button class="btn btn-success" type="button">搜索</button>
                        </span>
                        </div>
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
                            <h5><a href="#customModel"
                                   @click="customers_rev('rev')">编辑</a></h5>
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
                        <tr v-for="list in custom_list">
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left"
                                       @click="rules(list.id, $event, list.name)">
                            </td>
                            <td class="text-center">{{list.name}}</td>
                            <td class="text-center">{{list.gender}}</td>
                            <td class="text-center">{{list.mobile}}</td>
                            <td class="text-center">{{list.customer_will}}</td>
                            <td class="text-center">
                                <a data-v-2f43a2b3="" href="#">
                                    <div data-v-2f43a2b3="" class="progress progress-striped active">
                                        <div data-v-2f43a2b3="" aria-valuemax="100" aria-valuemin="0"
                                             aria-valuenow="45" role="progressbar" class="progress-bar"
                                             :style="{ width: list.follow + '%'}">
                                            <span data-v-2f43a2b3="" class="sr-only">{{list.follow}}%</span>
                                        </div>
                                    </div>
                                </a>
                                <!--{{cus.progress}}%-->
                            </td>
                            <td class="text-center">{{list.customer_source}}</td>
                            <td class="text-center">{{list.customer_status}}</td>
                            <td class="text-center">{{list.identity}}</td>
                            <td class="text-center">{{list.person_medium}}</td>
                            <td class="text-center">{{list.staff_id}}</td>
                            <td class="text-center"><a @click="stick(list.id)"><i class="fa fa-paperclip"></i></a></td>
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

        <!--增加日志/增加提醒/放入客户池-->
        <remindDaily :state="bool" :cus_name="cus_name"></remindDaily>

        <!--客户 新增/修改-->
        <new-add @ffff="dddd" :msg="revise_state" :revise="revise_cus" :selects="select_list"></new-add>

        <!--分配-->
        <Distribution :msg="cus_name"></Distribution>

        <!--分页-->
        <Page :pg="paging"></Page>
    </div>
</template>

<script>
    import Page from '.././common/page.vue'
    import newAdd from './new_add.vue'
    import remindDaily from './remindDaily.vue'                     //修改客户
    import Distribution from '../common/distribution.vue'           //分配

    export default {
        components: {Page, Distribution, newAdd, remindDaily},
        data (){
            return {
                select_list: {},            //select字典
                custom_list: [],            //列表
                paging: '',                 //总页数
                pitch: [],                  //选中id
                bool: '',
                cus_name: [],               //派发信息
                revise_cus: {},             //修改客户
                revise_state: '',           //新增/修改客户状态
//                搜索字典
                sea_status: '',             //客户状态
                sea_intention: '',          //客户意向
                sea_id: '',                 //客户身份
                sea_source: '',             //客户来源
                sea_type: '',               //个人/中介
            }
        },
        created (){
            this.collectList();
        },
        methods: {
            dddd (val){
                this.revise_cus = val;
            },
//            客户列表
            collectList (){
                this.$http.get('core/customer/readCustomer/id/4').then((res) => {
                    console.log(res.data);
                    this.custom_list = res.data;
                    this.paging = 10;
                });
//                字典
                this.$http.get('core/customer/customerWb').then((res) => {
                    this.select_list = res.data;
                });
            },

//            增删数组
            rules (rul, eve, cus){
                if (eve.target.checked === true) {
                    this.pitch.push(rul);
                    this.cus_name.push(cus);

                    this.$http.get('core/customer/readCustomer/id/' + rul).then((res) => {
                        this.revise_cus = res.data.data;
                    });
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

//            增加日志/增加提醒/放入客户池
            add_state (val){
                this.bool = val;
            },
//            新增客户
            customers_new (val){
                this.revise_state = val;
                $('#customModel').modal({
                    backdrop: 'static',         //空白处模态框不消失
//                    keyboard: false           //成功动态打开模态框
                });
            },
//            修改客户
            customers_rev (val){
                this.revise_state = val;
                $('#customModel').modal({
                    backdrop: 'static',         //空白处模态框不消失
                });

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
//            个人/中介
            sea_type_s (val){
                this.sea_type = val.target.value;
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

    #custom-handle {
        width: 24px;
        height: 24px;
        top: 50%;
        text-align: center;
        line-height: 20px;
    }

    #custom-handle:focus {
        border: 0;
    }

</style>
