<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>公司业绩</li>
            <li class="active">租房</li>
        </ol>

        <div class="panel col-lg-12">
            <form class="form-inline clearFix" role="form">

                <Cascade @change="getCascadeData"></Cascade>

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
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" v-model="params.searchInfo" @keydown.enter.prevent="search">
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
                        <router-link tag="tr" class="text-center" :key="item.id" :to="{path:'compare' , query:{address:item.address}}" v-for="item in myData">
                            <td>{{item.date}}</td>
                            <td>{{item.region.name}}</td>
                            <td>{{item.situation.name}}</td>
                            <td>{{item.people}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.type.name}}</td>
                            <td>{{item.payWay.name}}</td>
                            <td>{{item.price}}</td>
                            <td>{{item.alreadyType.name}}</td>
                            <td>{{item.alreadyMoney}}</td>
                            <td>{{item.isAgency==1?"是":"否"}}</td>
                            <td>{{item.rentingReal}}</td>
                            <td>{{item.collectReal}}</td>
                            <td>{{item.allAchieve}}</td>
                        </router-link>

                    </tbody>
                </table>
            </section>

        </div>


        <!--modal-->
        <Modal></Modal>

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
    import Modal from './CAModal.vue'
    import Page from '../../common/page.vue'
    import Cascade from '../../common/cascade.vue'

    export default{
        data(){
            return {
                myData: [],      //列表数据
                paging : '',
                params : {
                    city: '',
                    group: "",
                    people: "",
                    region: "",
                    startDataTime : '',
                    finishDataTime : '',
                    searchInfo : ''
                }
            }
        },
        created(){
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
                this.$http.get('json/CARenting.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.myData = res.data.data.companyAchieveCollect;
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
                    if (ev.target.placeholder === '开始时间'){
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            search(){
                console.log(this.params);
            },
            getData(data){
                // 页数
                console.log(data);
            },
            getCascadeData(data){
//                console.log(data);
                for(var attr in data){
                    this.params[attr]=data[attr];
                }
            }
        }
    }
</script>