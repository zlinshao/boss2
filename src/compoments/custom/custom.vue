<template>
    <div>
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
                        <button data-toggle="modal" href="#myModal17" class="btn btn-success"><i
                                class="fa fa-plus-square"></i>&nbsp;增加客户
                        </button>
                    </div>
                </div>

                <!--被选中一个-->
                <div v-if="pitch.length === 1" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中{{num}}项</a></h5>
                        </li>
                        <li>
                            <h5><a>增加沟通日志</a></h5>
                        </li>
                        <li>
                            <h5><a>提醒</a></h5>
                        </li>
                        <li>
                            <h5><a>放入客户池</a></h5>
                        </li>
                        <li>
                            <h5><a>分配</a></h5>
                        </li>
                        <li>
                            <h5><a>编辑</a></h5>
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
                            <h5><a>已选中{{num}}项</a></h5>
                        </li>
                        <li>
                            <h5><a>放入客户池</a></h5>
                        </li>
                        <li>
                            <h5><a>分配</a></h5>
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
                                <input id="cus_id" type="checkbox" class="pull-left" @click="rules(index,$event)">
                            </td>
                            <td class="text-center">{{cus.name}}</td>
                            <td class="text-center">{{cus.sex}}</td>
                            <td class="text-center">{{cus.phone}}</td>
                            <td class="text-center">{{cus.priority}}</td>
                            <td class="text-center">{{cus.intention}}</td>
                            <td class="text-center">{{cus.progress}}</td>
                            <td class="text-center">{{cus.source}}</td>
                            <td class="text-center">{{cus.state}}</td>
                            <td class="text-center">{{cus.client}}</td>
                            <td class="text-center">{{cus.status}}</td>
                            <td class="text-center">{{cus.charge}}</td>
                            <td class="text-center"><a><i class="fa fa-paperclip"></i></a></td>
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

        <!--新增/修改-->
        <div class="modal fade full-width-modal-right" id="myModal17" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增客户</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份</label>
                                    <div class="col-lg-10 status">
                                        <label><input type="radio" class="pull-left">业主</label>
                                        <label><input type="radio" class="pull-left">租客</label>
                                        <label><input type="checkbox" class="pull-left">中介</label>
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">基本信息</h3>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="起输入客户姓名">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">手机号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入手机号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">尊称</label>
                                    <div class="col-lg-10 status">
                                        <label>
                                            <input type="radio" name="gender" class="pull-left">先生
                                        </label>
                                        <label>
                                            <input type="radio" name="gender" class="pull-left">女士
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户状态</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户意向</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户来源</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">客户优先级</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">地址</label>
                                    <div class="col-lg-10">
                                        <div class="form-group street">
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="1">1</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="2">2</option>
                                                </select>
                                            </div>
                                            <div class="col-sm-3">
                                                <select class="form-control">
                                                    <option value="3">3</option>
                                                </select>
                                            </div>
                                        </div>
                                        <input type="text" class="form-control" placeholder="街道信息">
                                    </div>
                                </div>
                                <hr>
                                <h3 style="margin-bottom: 22px">附加信息</h3>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份证号</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="请输入身份证号">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">身份照片</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">婚姻状况</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">QQ</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">邮箱</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">性格</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">1</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                    <div class="col-lg-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button class="btn btn-success" type="button"> 确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--分页-->
        <Page :pg="paging"></Page>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    export default {
        components: {Page},
        data (){
            return {
                custom_list: [],
                num: '1',
                paging: '',
                pitch: [],
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
            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.pitch.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            }
        }
    }
</script>


<style scoped>
    input[type=checkbox], input[type=radio] {
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

    label {
        font-weight: normal;
    }

    .status {
        padding-top: 7px;
    }

    .status label {
        margin-right: 20px;
    }

    .modal-content {
        overflow: auto;
    }
    .street select{
        margin-bottom: 10px;
    }
</style>
