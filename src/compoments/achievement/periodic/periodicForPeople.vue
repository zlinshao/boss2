<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li>个人</li>
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
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
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
                            <th class="text-center">详情</th>
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
                            <td><router-link :to="{path:'/periodicPeopleDetail',query: {id:1}}">详情</router-link></td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="6" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

    </div>
</template>
<style scoped>

    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
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
                beforePage : 1,
                isShow : false,
                dict : '',
                params : {
//                    department_id : [],
//                    staff_id : [],
//                    periodic : 1,
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
            this.perPersonList();

        },
        updated (){

//            时间选择
//            this.remindData();
        },
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
                /*this.$http.get('periodic/now')
                    .then(
                        (res) => this.params.periodic = res.data.data
                    );*/
            },

            search(val){
                this.filter(val);
            },
            filter(val){
                this.beforePage = val;
                this.$http.get('revenue/periodic/ranking?page='+val,{
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
                this.params.date_range = data;
                this.search(1);
            }
        }
    }
</script>