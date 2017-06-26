<template>
    <div>
        <div class="col-lg-12">
            <form class="form-inline clearFix" role="form">

                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">全部</option>
                        <option value="1">南京</option>
                        <option value="2">苏州</option>
                    </select>
                </div>

                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">玄武</option>
                        <option value="1">栖霞</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">组员</option>
                        <option value="1">组员</option>
                        <option value="2">组员</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">新租</option>
                        <option value="1">续租</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="sr-only" for="star_time">开始时间</label>
                    <input type="date" class="form-control" id="star_time" placeholder="开始时间">
                </div>
                <div class="form-group">
                    <label class="sr-only" for="end_time">结束时间</label>
                    <input type="date" class="form-control" id="end_time" placeholder="结束时间">
                </div>
                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button"><i class="fa fa-search"></i></button>
                    </span>
                </div>
                <div class="form-group pull-right">
                    <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addGleefulNews">
                        <i class="fa fa-plus-square"></i>&nbsp;新增租房喜报
                    </a>
                </div>
            </form>
        </div>


        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">喜报日期</th>
                        <th class="text-center">喜报情况</th>
                        <th class="text-center">租房片区</th>
                        <th class="text-center">租房签约人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">租房价格</th>
                        <th class="text-center">已收类型</th>
                        <th class="text-center">已收金额</th>
                        <th class="text-center">租实际业绩</th>
                        <th class="text-center">租溢出业绩</th>
                        <th class="text-center">总业绩</th>
                        <th class="text-center">喜报状态</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr class="text-center">
                        <td>2017-05-18</td>
                        <td>新租</td>
                        <td>秦淮一组</td>
                        <td>彩云姐</td>
                        <td>
                            亚东观云 <br>
                            3-403
                        </td>
                        <td>半年付</td>
                        <td>35000</td>
                        <td>部分定金</td>
                        <td>35000</td>
                        <td>35000</td>
                        <td>35000</td>
                        <td>35000</td>
                        <td>
                            <button class="btn btn-primary btn-sm" disabled>已退单</button>
                        </td>
                    </tr>
                    <tr class="text-center">
                        <td>2017-05-18</td>
                        <td>新租</td>
                        <td>秦淮一组</td>
                        <td>彩云姐</td>
                        <td>
                            亚东观云 <br>
                            3-403
                        </td>
                        <td>半年付</td>
                        <td>35000</td>
                        <td>部分定金</td>
                        <td>35000</td>
                        <td>35000</td>
                        <td>35000</td>
                        <td>35000</td>
                        <td>
                            <button class="btn btn-primary btn-sm" @click="operGleefulNews(1)" data-toggle="modal" data-target="#myModal">待审核</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </section>

        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                        <div class="col-lg-6 renting">
                            <div class="modalList">
                                <span>房屋地址:</span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="modalList">
                                <span>租房签约人:</span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="modalList">
                                <span>租房情况:</span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="modalList">
                                <span>租房片区:</span>
                                <select name="" class="form-control">
                                    <option value="0">马群</option>
                                    <option value="1">迈皋桥</option>
                                </select>
                            </div>
                            <div class="modalList">
                                <span>付款方式:</span>
                                <select name="" class="form-control">
                                    <option value="0">季付</option>
                                    <option value="1">月付</option>
                                </select>
                            </div>
                            <div class="modalList">
                                <span>租房价格:</span>
                                <input type="number" class="form-control">
                            </div>
                            <div class="modalList">
                                <span>已收类型:</span>
                                <select name="" class="form-control">
                                    <option value="0">季付</option>
                                    <option value="1">月付</option>
                                </select>
                            </div>
                            <div class="modalList">
                                <span>已收金额:</span>
                                <input type="number" class="form-control">
                            </div>
                            <div class="modalList">
                                <span>是否中介:</span>
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="col-lg-6 collect">
                            <div class="modalList">
                                <span>收房签约人:</span>
                                <input type="text" class="form-control">
                            </div>
                            <div class="modalList">
                                <span>房屋类型:</span>
                                <select name="" class="form-control">
                                    <option value="0">住宅</option>
                                    <option value="1">商用</option>
                                </select>
                            </div>
                            <div class="modalList">
                                <span>房屋价格:</span>
                                <input type="number" class="form-control">
                            </div>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <div v-if="add">
                            <button type="button" class="btn btn-primary">完成</button>
                        </div>
                        <div v-else="add">
                            <button type="button" class="btn btn-primary">修改</button>
                            <button type="button" class="btn btn-danger">取消合作</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                title : '',
                add : true      // 是否新增

            }
        },
        components: {},
        methods : {
            addGleefulNews(){
                this.title = '新增租房喜报';
                this.add = true;
            },
            operGleefulNews(num){
                this.title = '编辑租房喜报';
                this.add = false;
            }
        }
    }
</script>