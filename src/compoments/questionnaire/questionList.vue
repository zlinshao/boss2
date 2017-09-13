<template>
    <div>
        <ol class="breadcrumb">
            <li class="active">问卷调查</li>
        </ol>

        <section class="panel">
            <div class="panel-body">

                <div class="form-inline">
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="">请选择</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <select class="form-control">
                                <option value="">请选择</option>
                            </select>
                        </label>
                    </div>
                    <div class="pro-sort">
                        <div class="input-group">
                            <input type="text" class="form-control">
                            <span class="input-group-btn">
                               <button class="btn btn-success" type="button">搜索</button>
                           </span>
                        </div>
                    </div>
                    <div class="pro-sort pull-right">
                        <div class="input-group">
                            <button class="btn btn-primary" @click="createQuestion">创建任务</button>
                        </div>
                    </div>
                </div>


                <div class="col-lg-12 remind" v-if="false">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-pencil-square-o"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-arrow-down"></i>&nbsp;下架</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-arrow-up"></i>&nbsp;发布</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times-circle"></i>&nbsp;删除</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-eye"></i>&nbsp;查看结果</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <!--问卷调查表-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>
                                <label for="allCheck" :class="{'label_check':true}">
                                    <input id="allCheck" type="checkbox">
                                </label>
                            </th>
                            <th class="text-center">标题</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">发布人</th>
                            <th class="text-center">发布时间</th>
                            <th class="text-center">回复量</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <label :class="{'label_check':true}">
                                    <input type="checkbox" class="pull-left">
                                </label>
                            </td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center"></td>
                            <td class="text-center">详情</td>
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="8" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <Add></Add>
    </div>
</template>

<script>
    import Add from './questionAdd.vue'
    export default {
        components :{Add},
        data(){
            return{
                isShow : true,
            }
        },
        methods :{
            createQuestion(){   //创建问卷
                $('.questionAdd').modal('show');
            }
        }
    }
</script>


<style scoped>
    input, select {
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
</style>
