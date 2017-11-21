<template>
    <div>
        <div role="dialog" class="modal fade bs-example-modal-sm" id="detail_info">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">详情</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row has-js">
                            <div class="col-lg-12">
                                <section class="panel table table-responsive roll">
                                    <table class="table table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th class="text-center width80">客户姓名</th>
                                            <th class="text-center width100">手机号</th>
                                            <th class="text-center width80">租房月数</th>
                                            <th class="text-center width80">付款方式</th>
                                            <th class="text-center width80">月单价</th>
                                            <th class="text-center width120" v-if="detail == 'pay'">第一次付款时间</th>
                                            <th class="text-center width120" v-if="detail == 'pay'">第二次付款时间</th>
                                            <th class="text-center width100">合同时间周期</th>
                                            <th class="text-center width80">开单人</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="text-center" v-for="item in msg">
                                            <td>
                                                <span >{{item.info.customer}}</span>
                                            </td>
                                            <td>
                                                <span v-if="item.customer != null">{{item.customer.contact}}</span>
                                            </td>
                                            <td>
                                                <span v-if="item.customer != null">{{item.customer.months}}</span>
                                            </td>
                                            <td>
                                                <!--<span v-if="item.customer != null && detail == 'collect'">押{{item.customer.bet}}付{{item.customer.pay[0]}}</span>-->
                                                <!--<span v-if="item.customer != null && detail == 'pay'">{{dict.pay_type[item.customer.pay_types[0]]}}</span>-->
                                                <span>{{item.info.description}}</span>
                                            </td>
                                            <td>
                                                <span v-if="item.customer != null">{{item.customer.prices[0]}}</span>
                                            </td>
                                            <td v-if="item.customer != null && detail == 'pay'">
                                                <span>{{item.customer.first_pay_date}}</span>
                                            </td>
                                            <td v-if="item.customer != null && detail == 'pay'">
                                                <span>{{item.customer.second_pay_date}}</span>
                                            </td>
                                            <td>{{item.info.months}}</td>
                                            <!--<td>{{dict.staff_id[item.staff_id]}}</td> -->
                                            <td>{{item.info.staff}}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <!--<button data-dismiss="modal" class="btn btn-default btn-md">取消</button>-->
                        <button data-dismiss="modal" class="btn btn-primary btn-md">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        props: ['msg', 'dict', 'detail'],
        data(){
            return {}
        },
        methods: {}
    }
</script>