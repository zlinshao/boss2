<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>每单工资</li>
            <li class="active">租房</li>
        </ol>

        <div class="panel col-lg-12">
            <form class="form-inline clearFix" role="form">

                <Cascade @change="getCascadeData"></Cascade>

                <!--<div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">全部</option>
                        <option value="1">鸡腿</option>
                        <option value="2">梦想</option>
                    </select>
                </div>-->

                <div class="form-group datetime">
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                    </label>
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                    </label>
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
                        <th class="text-center">租房人</th>
                        <th class="text-center">合同开始时间</th>
                        <th class="text-center">合同结束时间</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">租房片区</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">租房价格</th>
                        <th class="text-center">价格差</th>
                        <th class="text-center">空置期</th>
                        <th class="text-center">总业绩</th>
                        <th class="text-center">租实际业绩</th>
                        <th class="text-center">租溢出业绩</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <router-link tag="tr" class="text-center" :key="item.id" :to="{path:'calc' , query:{address:item.address}}" v-for="item in myData">
                        <td>{{item.identify}}</td>
                        <td>{{item.people}}</td>
                        <td>{{item.startDate}}</td>
                        <td>{{item.finishDate}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.region.name}}</td>
                        <td>{{item.payWay.name}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.priceBalance}}</td>
                        <td>{{item.vacancyTime}}</td>
                        <td>{{item.allAchieve}}</td>
                        <td>{{item.realAchieve}}</td>
                        <td>{{item.moreAchieve}}</td>
                    </router-link>
                    </tbody>
                </table>
            </section>
        </div>
        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>
    </div>
</template>
<style scoped>
    .table tbody tr{
        cursor: pointer;
    }
</style>
<script>
    import Modal from './WAModal.vue'
    import Page from '../../common/page.vue'
    import Cascade from '../../common/cascade.vue'

    export default{
        data(){
            return {
                id : '',
                params : {
                    city: '',
                    group: "",
                    people: "",
                    region: "",
                    startDataTime : '',
                    finishDataTime : '',
                    searchInfo : ''
                },
                myData : [],
                paging : ''
            }
        },
        created (){
            this.caRentingList();
        },
        updated (){
//            时间选择
            this.remindData();
        },
        components: {
            Modal,
            Page,
            Cascade
        },
        methods : {
            caRentingList (){
                this.$http.get('json/WARenting.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.myData = res.data.data.wageAchieveRenting;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder == '开始时间'){
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            showDetail(num){
                this.id = num;
            },
            search(){
                console.log(this.params);
            },
            getData(data){
                console.log(data);
            },
            getCascadeData(data){
                for(var attr in data){
                    this.params[attr]=data[attr];
                }
            }
        }
    }
</script>