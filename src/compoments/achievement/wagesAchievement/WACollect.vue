<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>每单工资</li>
            <li>收房</li>
        </ol>

        <section class="panel clearFix">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">

                        <Cascade @change="getCascadeData"></Cascade>

                        <!--<div class="dropdown form-group">
                            <select name="" class="form-control">
                                <option value="">全部</option>
                                <option value="1">鸡腿</option>
                                <option value="2">梦想</option>
                            </select>
                        </div>-->

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="合同编号/业务员/地址" v-model="params.searchInfo" @keydown.enter.prevent="search">
                            <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>


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
                        <th class="text-center">总业绩</th>
                        <th class="text-center">收实际业绩</th>
                        <th class="text-center">收溢出业绩</th>
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
    div.padd {
        display: inline-block;
        padding: 0 15px 0 0;
    }
</style>
<script>
    import Modal from './WAModal.vue'
    import Page from '../../common/page.vue'
    import DatePicker from '../../common/datePicker.vue'

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
                paging : '',
                dateConfigure: [
                    {
                        range: true,
                        needHour: true
                    }
                ]
            }
        },
        created (){
            this.caCollectList();
        },
        updated (){
//            时间选择
            this.remindData();
        },
        components: {
            Modal,
            Page,
            DatePicker
        },
        methods : {
            caCollectList (){
                this.$http.get('json/WACollect.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.myData = res.data.data.wageAchieveCollect;
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