<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li>
                <router-link to="periodicForPeople">个人</router-link>
            </li>
            <li>个人详情</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate" @sendDate="getDate"></DatePicker>
                    </div>
                    <div class="input-group clearFix">
                        <input type="text" class="form-control" placeholder="搜索房屋地址"
                               v-model="params.search" @keydown.enter.prevent="search(1)">
                        <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                    </div>
                </form>
            </div>
        </section>

        <div class="row">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">房屋地址</th>
                            <th class="text-center">收租状态</th>
                            <th class="text-center">年限</th>
                            <th class="text-center">月单价</th>
                            <th class="text-center">付款方式</th>
                            <th class="text-center">中介费</th>
                            <th class="text-center">中介费比例</th>
                            <th class="text-center">实际业绩</th>
                            <th class="text-center">溢出业绩</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">
                            <td></td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="9" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>
    </div>
</template>
<style scoped>
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }
</style>
<script>
    import DatePicker from '../../common/datePicker.vue'
    import Page from '../../common/page.vue'
    export default{
        components: {DatePicker,Page},
        data(){
            return {
                isShow : false,
                paging :1,
                dateConfigure : [
                    {
                        range : true,
                        needHour : true,
                        position : 'top-right',
                    }
                ],
                currentDate : [],

                beforePage : 1,

                params:{
                    range : '',
                    search : ''
                }
            }
        },
        methods: {
            getDate(date){
                this.params.range = date;
            },
            search(val){
                this.filter(val);
            },
            filter(val){
                this.beforePage = val;

            }
        }
    }
</script>