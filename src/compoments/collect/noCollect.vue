<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <div>
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
                </div>
                <div class="pull-right">
                    <a data-toggle="modal" href="#collectAdd" class="btn btn-success"><i
                            class="fa fa-plus-square"></i>&nbsp;增加客户
                    </a>
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
                            <th class="text-center">地址</th>
                            <th class="text-center">房型</th>
                            <th class="text-center">面积</th>
                            <th class="text-center">装修</th>
                            <th class="text-center">配套设施</th>
                            <th class="text-center">建筑楼层</th>
                            <th class="text-center">房屋特色</th>
                            <th class="text-center">个人/中介</th>
                            <th class="text-center">负责人</th>
                            <th class="text-center">锁定</th>
                            <th class="text-center">置顶</th>
                            <th class="text-center">更多</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(cus, index) in custom_list">
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left"
                                       @click="rules(cus.id, $event, cus.address)">
                            </td>
                            <td class="text-center">{{cus.address}}</td>
                            <td class="text-center">{{cus.room_type}}</td>
                            <td class="text-center">{{cus.proportion}}</td>
                            <td class="text-center">{{cus.decorate}}</td>
                            <td class="text-center">{{cus.install}}</td>
                            <td class="text-center">{{cus.floor}}</td>
                            <td class="text-center">{{cus.chara}}</td>
                            <td class="text-center">{{cus.attribute}}</td>
                            <td class="text-center">{{cus.charge}}</td>
                            <td class="text-center"><i class="fa fa-unlock-alt"></i><i class="fa fa-unlock"></i></td>
                            <td class="text-center"><a @click="stick(index)"><i class="fa fa-paperclip"></i></a></td>
                            <td class="text-center">
                                <router-link to="/collectMore">更多</router-link>
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

        <!--新增/修改-->
        <!--<New_add></New_add>-->

        <!--房屋 新增-->
        <Collect-add :msg="noColl"></Collect-add>

        <!--分页-->
        <Page :pg="paging"></Page>
    </div>
</template>

<script>
    import CollectAdd from './collect_add.vue'
    import Page from '../common/page.vue'
    //    import New_add from '../custom/new_add.vue'
    export default {
        components: {Page, CollectAdd}, //, New_add
        data (){
            return {
                custom_list: [],            //列表
                paging: '',                 //总页数
                pitch: [],                  //选中id
                cus_name: [],
                noColl: {
                   newState: true,              //新增房屋
                   sss: true
                }
            }
        },
        created (){
            this.collectList();
        },
        methods: {
//            客户列表
            collectList (){
                this.$http.get('json/collects.json').then((res) => {
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
        }
    }
    //    export default {
    //        data (){
    //            return {
    //                collectId: 'aaaaaaaa'
    //            }
    //        },
    //        mounted (){
    //            this.collectId = this.$route.query.name
    //        }
    //    }
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

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }

</style>
