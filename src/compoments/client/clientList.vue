<template>
    <div>
        <ol class="breadcrumb">
            <li>客户管理</li>
            <li>客户</li>
        </ol>

        <!--客户-->
        <section class="panel">
            <div class="panel-body has-js">
                <!--没有选中-->
                <div v-if="true">
                    <div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control">
                                    <option value="">客户状态</option>
                                    <option v-for=""></option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control">
                                    <option value="">客户意向</option>
                                    <option v-for=""></option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control">
                                    <option value="">客户身份</option>
                                    <option v-for=""></option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control">
                                    <option value="">客户来源</option>
                                    <option v-for=""></option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort">
                            <label>
                                <select class="form-control">
                                    <option value="">个人/中介</option>
                                    <option v-for=""></option>
                                </select>
                            </label>
                        </div>
                        <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2"
                             style="padding: 0;margin-right: 20px;">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="客户名/手机号">
                                <span class="input-group-btn">
                                    <button class="btn btn-success" type="button">搜索</button>
                                </span>
                            </div>
                        </div>
                        <div class="pro-sort" style="height: 39px;">
                            <label style="margin-top: 8px;padding-left: 25px;"
                                   :class="{'label_check':true}">
                                <input type="checkbox" class="pull-left">三天内未成交
                            </label>
                        </div>

                        <div class="pro-sort">
                            <button class="btn btn-warning" type="button">重置</button>
                        </div>
                        <div class="pull-right">
                            <a class="btn btn-primary">
                                <i class="fa fa-plus-square"></i>&nbsp;增加客户
                            </a>
                        </div>
                    </div>
                </div>

                <!--被选中-->
                <div v-if="true" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a ><i class="fa fa-edit"></i>&nbsp;增加沟通日志</a></h5>
                        </li>
                        <li>
                            <h5><a ><i class="fa fa-edit"></i> 提醒</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-users"></i>&nbsp;放入客户池</a></h5>
                        </li>
                        <li>
                            <h5>
                                <a><i class="fa fa-pencil"></i>&nbsp;编辑</a>
                            </h5>
                        </li>
                        <li>
                            <h5>
                                <a><i class="fa fa-arrow-up"></i>&nbsp;置顶</a>
                            </h5>
                            <h5>
                                <!--<a><i class="fa fa-times-circle-o"></i>&nbsp;取消置顶</a>-->
                            </h5>
                        </li>
                        <li>
                            <h5>
                                <a><i class="fa fa-times-circle"></i>&nbsp;删除</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--客户列表-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                            <tr>
                                <th class="text-center"></th>
                                <th class="text-center width80">客户名称</th>
                                <th class="text-center width50">尊称</th>
                                <th class="text-center width110">手机号</th>
                                <th class="text-center width80">客户意向</th>
                                <th class="text-center width100">跟进进度</th>
                                <th class="text-center width90">来源</th>
                                <th class="text-center width80">客户状态</th>
                                <th class="text-center width80">客户身份</th>
                                <th class="text-center width80">个人/中介</th>
                                <th class="text-center width80">负责人</th>
                                <th class="text-center width50">置顶</th>
                                <th class="text-center width50">详情</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                               <td >
                                   <a href="tel:400-888-6633">拨打电话</a>

                                       <a href="sms:19956321564">发送短信</a>
                               </td>
                            </tr>
                            <tr v-if="false">
                                <td colspan="14" class="text-center text-muted">
                                    <h4>暂无数据....</h4>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

    </div>
</template>

<script>

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

    .panel {
        padding-top: 0;
    }

    .pro-sort {
        padding-right: 6px;
        height: 39px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
</style>
