<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>租期将近</li>
            <li>租房</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>
                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="客户/手机号/房屋地址"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <!--表格-->
        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center width100">到期日期</th>
                            <th class="text-center width80">客户姓名</th>
                            <th class="text-center width80">房屋地址</th>
                            <th class="text-center width80">手机号</th>
                            <th class="text-center" style="min-width: 360px;">详细信息</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in myData" class="text-center">
                            <td>{{item.due_date}}</td>
                            <td>
                                <span v-if="item.customer != null">{{item.customer.customer_name}}</span>
                            </td>
                            <td>
                                <span v-if="item.customer != null">{{item.customer.address}}</span>
                            </td>
                            <td>
                                <span v-if="item.customer != null">{{item.customer.contact}}</span>
                            </td>
                            <td>{{item.description}}</td>
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

        <Page :pg="paging" @pag="search" :beforePage="params.page"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import DatePicker from '../../common/datePicker.vue'

    export default{
        components: {Page, Status, DatePicker,},
        data(){
            return {
                pitch: [],                  //选中id
                paging: '',
                dict: {},
                myData: [],                 //列表数据
                isShow: false,
                params: {
                    page: 1,
                    range: '',
                    search: '',
                },
                dateConfigure: [
                    {
                        range: true,
                        needHour: true
                    }
                ],
                currentDate: [],
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
            }
        },
        mounted (){
            this.rentList(1);
        },
        methods: {
            search (val){
                this.rentList(val);
            },
//            列表
            rentList(val){
                this.paging = '';
                this.params.page = val;
                this.$http.get('account/due/rent',{
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                        this.myData = [];
                    }
                })
            },
            getDate(data){
                this.params.range = data;
                this.search(1);
            },

            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>

<style scoped>

</style>