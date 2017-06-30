<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>喜报录入</li>
            <li class="active">收房</li>
        </ol>

        <div class="col-lg-12 clearFix">
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
                        <option value="">玄武</option>
                        <option value="">栖霞</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="">组员</option>
                        <option value="">组员</option>
                        <option value="">组员</option>
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
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"  @keydown.enter.prevent="search">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                </div>
                <div class="form-group pull-right">
                    <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addGleefulNews">
                        <i class="fa fa-plus-square"></i>&nbsp;新增收房喜报
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
                        <th class="text-center">收房片区</th>
                        <th class="text-center">收房签约人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">房屋类型</th>
                        <th class="text-center">价格</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">空置期</th>
                        <th class="text-center">是否中介</th>
                        <th class="text-center">收实际业绩</th>
                        <th class="text-center">收溢出业绩</th>
                        <th class="text-center">喜报状态</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                        <tr class="text-center">
                            <td>2017-05-18</td>
                            <td>秦淮一组</td>
                            <td>彩云姐</td>
                            <td>
                                亚东观云 <br>
                                3-403
                            </td>
                            <td>3</td>
                            <td>1200</td>
                            <td>2</td>
                            <td>季付</td>
                            <td>30</td>
                            <td>是</td>
                            <td>35000</td>
                            <td>35000</td>
                            <td>
                                <!--<router-link :to="{path:'group' , query:{regionId:item.id}}">-->
                                    <button class="btn btn-primary btn-sm">已退单</button>
                                <!--</router-link>-->
                            </td>
                        </tr>
                        <tr class="text-center">
                            <td>2017-05-18</td>
                            <td>秦淮一组</td>
                            <td>彩云姐</td>
                            <td>
                                亚东观云 <br>
                                3-403
                            </td>
                            <td>3</td>
                            <td>1200</td>
                            <td>2</td>
                            <td>季付</td>
                            <td>30</td>
                            <td>是</td>
                            <td>35000</td>
                            <td>35000</td>
                            <td>
                                <!--<router-link :to="{path:'group' , query:{regionId:item.id}}">-->
                                <button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" @click="operGleefulNews(1)">已签</button>
                                <!--</router-link>-->
                            </td>
                        </tr>

                    </tbody>
                </table>
            </section>

            <div class="row pull-right" style="padding-right: 15px;">
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


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body">
                        <div class="modalList">
                            <span>收房片区:</span>
                            <select name="" class="form-control" v-model="news.region">
                                <option value="0">马群</option>
                                <option value="1">迈皋桥</option>
                            </select>
                        </div>
                        <div class="modalList">
                            <span>收房签约人:</span>
                            <input type="text" class="form-control" v-model="news.people">
                        </div>
                        <div class="modalList">
                            <span>房屋地址:</span>
                            <input type="text" class="form-control" v-model="news.address">
                        </div>
                        <div class="modalList">
                            <span>空置期:</span>
                            <input type="number" class="form-control" v-model="news.vacancyTime">
                        </div>
                        <div class="modalList">
                            <span>房屋类型:</span>
                            <select name="" class="form-control" v-model="news.type">
                                <option value="0">住宅</option>
                                <option value="1">商用</option>
                            </select>
                        </div>
                        <div class="modalList">
                            <span>年限:</span>
                            <input type="number" class="form-control" v-model="news.years">
                        </div>
                        <div class="modalList">
                            <span>收房价格:</span>
                            <input type="number" class="form-control" v-model="news.price">
                        </div>
                        <div class="modalList">
                            <span>付款方式:</span>
                            <select name="" class="form-control" v-model="news.payWay">
                                <option value="0">季付</option>
                                <option value="1">年付</option>
                            </select>

                        </div>
                        <div class="modalList">
                            <span>是否中介:</span>
                            <input type="text" class="form-control" v-model="news.isAgency">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div v-if="add">
                            <button type="button" class="btn btn-primary" @click="addGNCollect">完成</button>
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
    .modalList{
        font-size: 0;
        padding: 10px 0;
    }
    .modalList+.modalList{
        border-top: 1px dashed #ddd;
    }
    .modalList span{
        font-size: 14px;
        display: inline-block;
        width: 35%;
        padding-left: 15px;
    }
    .modal-body{
        /*padding: 12px 10px;*/
    }
    .modalList .form-control{
        width: 50%;
        display: inline-block;
        margin-bottom: 0;
    }
    .modalList+.modalList{
        /*margin-top: 12px;*/
    }
</style>
<script>
    export default{
        data(){
            return {
                title : '新增收房喜报',         // 新增/修改
                news : {
                    region : '',        // 收房片区
                    people : '',        // 收房签约人
                    address : '',       // 房屋地址
                    vacancyTime : '',   // 空置期
                    type : '',          // 房屋类型
                    years : '',         // 年限
                    price : '',         // 收房价格
                    payWay : '',        // 付款方式
                    isAgency : ''       // 是否中介
                },

                add : true          // 是否新增
            }
        },
        components: {},
        methods : {
            addGleefulNews(){   // 新增收房喜报
                this.title = '新增收房喜报';
                this.add = true;
            },
            operGleefulNews(id){    // 对喜报进行操作
                this.title = '编辑收房喜报';
                this.add = false;
                var that = this;

                var res = {
                    region : 0,             // 收房片区
                    people : '阿加',          // 收房签约人
                    address : '啊时间卡',       // 房屋地址
                    vacancyTime : 20,       // 空置期
                    type : 1,               // 房屋类型
                    years : 30,             // 年限
                    price : 3500,           // 收房价格
                    payWay : 1,             // 付款方式
                    isAgency : 1            // 是否中介
                };

                // 获取信息后修改
                that.news.region = res.region;
                that.news.people = res.people;
                that.news.address = res.address;
                that.news.vacancyTime = res.vacancyTime;
                that.news.type = res.type;
                that.news.years = res.years;
                that.news.price = res.price;
                that.news.payWay = res.payWay;
                that.news.isAgency = res.isAgency;


            },
            addGNCollect (){

            },
            clear(){    // 清空input
                this.news.region = '';
                this.news.people = '';
                this.news.address = '';
                this.news.vacancyTime = '';
                this.news.type = '';
                this.news.years = '';
                this.news.price = '';
                this.news.payWay = '';
                this.news.isAgency = '';
            },
            search(){

            }
        }
    }
</script>