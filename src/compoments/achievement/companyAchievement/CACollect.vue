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
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button"><i class="fa fa-search"></i></button>
                    </span>
                </div>
            </form>
        </div>

        <div class="col-lg-12 ">
            <div class="tip col-lg-3">
                <span>当前收多少套：</span>
                <strong>12000</strong>
            </div>
            <div class="tip col-lg-3">
                <span>当前租多少套：</span>
                <strong>12000</strong>
            </div>
            <div class="tip col-lg-3">
                <span>当前总业绩：</span>
                <strong>12000</strong>
            </div>
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
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr class="text-center" data-toggle="modal" data-target="#myModal" @click="operGleefulNews(1)">
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

    </div>
</template>
<style scoped>
    .tip{
        line-height: 50px;
        margin: 0 0 20px 5%;
        border-radius: 8px;
        background-color: #FCB322;
        font-size: 16px;
        text-align: center;
        color: #fff;
    }

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>