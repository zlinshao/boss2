<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>公司业绩</li>
            <li class="active">租房</li>
        </ol>

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
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" @keydown.enter.prevent="search">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
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
                        <th class="text-center">租房片区</th>
                        <th class="text-center">租房情况</th>
                        <th class="text-center">租房签约人</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">房屋类型</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">租房价格</th>
                        <th class="text-center">已收类型</th>
                        <th class="text-center">已收金额</th>
                        <th class="text-center">是否中介</th>
                        <th class="text-center">租实际业绩</th>
                        <th class="text-center">收实际业绩</th>
                        <th class="text-center">总业绩</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                        <router-link tag="tr" class="text-center" :to="{path:'compare' , query:{id:1}}">
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
                            <td>2</td>
                            <td>季付</td>
                            <td>30</td>
                            <td>是</td>
                        </router-link>

                    </tbody>
                </table>
            </section>

        </div>


        <!--modal-->
        <Modal></Modal>
    </div>
</template>
<style scoped>
    .table tbody tr{
        cursor: pointer;
    }

</style>
<script>
    import Modal from './CAModal.vue'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            Modal
        },
        methods : {
            search(){

            }
        }
    }
</script>