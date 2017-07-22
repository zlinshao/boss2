<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">个人</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <!--<div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">全部</option>
                            <option value="1">鸡腿</option>
                            <option value="2">梦想</option>
                        </select>
                    </div>-->
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                    </div>

<!--
                    <div class="input-group" @click="search">
                        <button type="button" class="btn btn-success">搜索</button>
                    </div>-->
                </form>

            </div>
        </section>

        <!--表格-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive">
                    <table class="table table-striped table-advance">
                        <thead>
                        <tr>
                            <!--<th class="text-center">城市</th>-->
                            <!--<th class="text-center">部门</th>-->
                            <!--<th class="text-center">组长</th>-->
                            <th class="text-center">组员</th>
                            <th class="text-center">实际业绩</th>
                            <th class="text-center">溢出业绩</th>
                            <th class="text-center">收房/套</th>
                            <th class="text-center">租房/套</th>
                            <th class="text-center">绩效套餐</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="item in myData" v-show="myData.length!=0">
                            <td>{{item.real_name}}</td>
                            <td>{{item.real_achv_sum}}</td>
                            <td>{{item.overflow_achv_sum}}</td>
                            <td>{{item.collect}}</td>
                            <td>{{item.rent}}</td>
                            <td></td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="6">暂无数据...</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>

    </div>
</template>
<style scoped>

    div.padd {
        display: inline-block;
        padding: 0 15px 0 0;
    }
</style>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page,Status,DatePicker},
        data(){
            return {
                isShow : false,
                dict : '',
                params : {
//                    department_id : [],
//                    staff_id : [],
                    periodic : 1,
                    date_range : ''
                },
                myData : [],
                paging : '',
                page : '',

                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },

                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                currentDate : [],
            }
        },
        mounted (){
            /*this.$http.get('periodic/range')
                .then(
                    (res) => {
                        this.dict = res.data.data;
                        this.perPersonList();
                    }
                );*/

        },
        updated (){

//            时间选择
//            this.remindData();
        },
        /*watch : {
            'params.month':{
                handler(val,oldVal){
                    console.log(val);
                    let that = this;
                    this.$http.get('periodic/range?month='+val)
                        .then(
                            (res) => {
//                                console.log(that.params.month)
                                that.dict = res.data.data;
                                that.params.periodic = 1
//                                console.log(that.dict)
//                                console.log(res.data.data)
                            }
                        )
//                    console.log(oldVal)
                }
            }
        },*/
        methods : {
            perPersonList (){
                this.$http.get('revenue/periodic/ranking')
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code == 18300){
                                this.paging = res.data.data.pages;
                                this.myData = res.data.data.data;
                                this.isShow = false;
                            } else {
                                this.isShow = true;
                            }

                        }
                    );
                this.$http.get('periodic/now')
                    .then(
                        (res) => this.params.periodic = res.data.data
                    );
            },
            getData(data){
                // 页数
//                console.log(data);
                this.page = data;
                this.search();
            },
            search(){
                console.log(this.params);
                this.$http.get('revenue/periodic/ranking?page='+this.page,{
                    params : this.params
                })
                    .then(
                        (res) => {
//                            console.log(res);
                            if (res.data.code == 18300){
                                this.paging = res.data.data.pages;
                                this.myData = res.data.data.data;
                                this.isShow = false;
                            } else {
                                this.myData = [];
                                this.isShow = true;
                                this.paging = '';
                            }

                        }
                    )
            },
            getDate(data){
                console.log(data);
                this.date_range = data;
                this.search();
            }
        }
    }
</script>