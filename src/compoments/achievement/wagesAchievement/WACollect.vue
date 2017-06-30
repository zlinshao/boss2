<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>工资业绩</li>
            <li class="active">收房</li>
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
                        <option value="0">全部</option>
                        <option value="1">仙林一组</option>
                        <option value="2">河西一组</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">全部</option>
                        <option value="1">啊啊啊</option>
                        <option value="2">对对对</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">全部</option>
                        <option value="1">鸡腿</option>
                        <option value="2">梦想</option>
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
                    <input type="text" class="form-control" id="search_info" placeholder="合同编号/业务员/地址" @keydown.enter.prevent="search">
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
                        <th class="text-center">合同编号</th>
                        <th class="text-center">收房人</th>
                        <th class="text-center">合同开始时间</th>
                        <th class="text-center">合同结束时间</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">收房片区</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">收房价格</th>
                        <th class="text-center">价格差</th>
                        <th class="text-center">空置期差</th>
                        <th class="text-center">总业绩</th>
                        <th class="text-center">收实际业绩</th>
                        <th class="text-center">收溢出业绩</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                        <router-link tag="tr" class="text-center" :to="{path:'calc' , query:{id:1}}">
                            <td>LJS321456</td>
                            <td>啊啊啊</td>
                            <td>2017/12/12</td>
                            <td>2017/12/12</td>
                            <td>北苑二村18-205</td>
                            <td>马群一组</td>
                            <td>1年</td>
                            <td>一年付</td>
                            <td>680</td>
                            <td>20</td>
                            <td>20</td>
                            <td>8160</td>
                            <td>4080</td>
                            <td>3672</td>
                        </router-link>


                    </tbody>
                </table>
            </section>
        </div>

    </div>
</template>
<style scoped>

    .table tbody tr{
        cursor: pointer;
    }
</style>
<script>
    import Modal from './WAModal.vue'
    export default{
        data(){
            return {
                id : ''
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