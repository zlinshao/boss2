<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <!--http://test.v2.api.boss.lejias.cn/-->
                <div class="pull-right" style="margin-left: 20px;" v-show="!isShow">
                    <a class="btn btn-success"
                       :href="address_url + 'export/manager/export/village_name/' + sea_con">
                        <i class="fa  fa-share-square-o"></i>&nbsp;导出Excel
                    </a>
                </div>

                <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-3 pull-right" style="padding: 0;">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="sea_info" @keyup.enter="cus_search(1)"
                               placeholder="请输入小区名称">
                        <span class="input-group-btn">
                            <button class="btn btn-success" type="button" @click="cus_search(1)">搜索</button>
                        </span>
                    </div>
                </div>
            </div>
        </section>
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">地址</th>
                            <th class="text-center">租客姓名</th>
                            <th class="text-center">租客电话</th>
                            <th class="text-center">租客身份证号</th>
                            <th class="text-center">业主姓名</th>
                            <th class="text-center">业主电话</th>
                            <th class="text-center">业主身份证号</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="list in leading_list">
                            <td class="text-center width130">{{list.village_name}}</td>
                            <td class="text-center width80">{{list.z_mobile}}</td>
                            <td class="text-center width110">{{list.z_name}}</td>
                            <td class="text-center width170">{{list.z_id_num}}</td>
                            <td class="text-center width80">{{list.y_name}}</td>
                            <td class="text-center width110">{{list.y_mobile}}</td>
                            <td class="text-center width170">{{list.y_id_num}}</td>
                        <tr v-show="isShow">
                            <td colspan="7" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Status :state='info'></Status>

        <Page @pag="cus_search" :pg="paging" :beforePage="beforePage"></Page>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    import Page from '../common/page.vue';
    export default {
        components: {Status, Page},
        data (){
            return {
                address_url: globalConfig.server,
                leading_list: [],   //搜索结果列表
                isShow: true,
                sea_info: '',       //搜索内容
                sea_con: '',        //发送搜索内容
                paging: '',         //总页数
                beforePage: '',     //当前页数
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        methods: {
//            搜索客户
            cus_search (val){
                this.paging = '';
                this.beforePage = val;
                this.$http.post('export/manager/index/pages/' + val, {
                    village_name: this.sea_info,
                }).then((res) => {
                    if (res.data.code === '40010') {
                        console.log(res.data);
                        this.leading_list = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;

                        this.sea_con = this.sea_info;
                        //成功信息 ***
                        this.info.success = res.data.msg;
//                    //关闭失败弹窗 ***
                        this.info.state_error = false;
//                    //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        this.leading_list = [];
                        this.isShow = true;
//                      关闭成功信息(可选)
                        this.info.state_success = false;
//                      失败信息 ***
                        this.info.error = res.data.msg;
//                      显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .width80 {
        min-width: 80px;
    }

    .width110 {
        min-width: 110px;
    }

    .width130 {
        min-width: 130px;
    }

    .width170 {
        min-width: 170px;
    }
</style>
