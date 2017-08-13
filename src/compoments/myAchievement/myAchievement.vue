<template>
    <div>
        <ol class="breadcrumb">
            <li>我的业绩</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                    @sendDate="getDate"></DatePicker>
                    </div>
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
                            <th class="text-center"></th>
                        </tr>
                        </thead>
                        <tbody id="rentingId">
                        <tr class="text-center">
                            <td></td>
                            <td>
                                <!--&lt;!&ndash;收房合同&ndash;&gt;-->
                                <!--<router-link :to="{ path:'/contractDetail',query: { ContractId: 1}}">-->
                                    <!--详情-->
                                <!--</router-link>-->

                                <!--&lt;!&ndash;租房合同&ndash;&gt;-->
                                <!--<router-link :to="{ path:'/rentingDetail',query: { ContractId: 1}}">-->
                                    <!--详情-->
                                <!--</router-link>-->
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="4" class="text-center text-muted">
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

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import DatePicker from '../common/datePicker.vue'

    export default{
        components: {Page, Status, DatePicker},
        data(){
            return {
                beforePage: 1,
                isShow: false,
                params: {
                    department_id: [],
                    range: ''
                },
                myData: [],
                paging: '',
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

                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                        position: 'top-right',
                    }
                ],
                currentDate: [],
            }
        },
        mounted(){
            this.perGroupList(1);
        },
        methods: {
            search(val){
                this.perGroupList(val);
            },
            perGroupList (val){
                this.paging = '';
                this.beforePage = val;
                this.$http.get('periodic/company?page=' + val, {
                    params: this.params
                }).then((res) => {

                });
            },

            getDate(data){
                console.log(data);
                this.params.range = data;
                this.search(1);
            },
        }
    }
</script>

<style scoped>
    .tagsinput {
        border: none;
    }

    .table-striped tbody tr {
        cursor: pointer;
    }

    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }

    @media (max-width: 798px) {
        .panel-body .form-inline .input-group {
            margin-bottom: 5px;
        }
    }

    .tips {
        line-height: 30px;
        /*padding-left: 12px;*/
        padding-bottom: 5px;
        font-size: 15px;
        /*margin-top: 20px;*/
        /*width: 100%;*/
    }

    .tips ul {
        margin: 0;
        padding: 12px 0;
    }

    .tips ul li {
        /*float: left;*/
        padding: 0 50px;
        box-sizing: border-box;
    }

    .tips ul li + li {
        /*margin-left: 30px;*/
        border-left: 1px solid #ddd;

    }

    .tips ul li span {
        font-size: 18px;
        /*padding-left: 8px;*/
        /*font-weight: bold;*/
    }

    .tips ul li span.green {
        color: #78CD51;
    }

    .tips ul li span.yellow {
        color: #FF9A02;
    }
</style>