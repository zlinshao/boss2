<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <div class="pull-right" style="margin-left: 20px;">
                    <a class="btn btn-success" @click="leadingOut">
                        <i class="fa  fa-share-square-o"></i>&nbsp;导出Excel
                    </a>
                </div>

                <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-3 pull-right" style="padding: 0;">
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="sea_info" @keyup.enter="cus_search"
                               placeholder="请输入小区名称">
                        <span class="input-group-btn">
                            <button class="btn btn-success" type="button" @click="cus_search">搜索</button>
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
                        <tr v-for="list in 7">
                            <td class="text-center width130">仙居雅苑 00-000</td>
                            <td class="text-center width80">迪丽热巴</td>
                            <td class="text-center width110">18052001167</td>
                            <td class="text-center width170">111111222222333333</td>
                            <td class="text-center width80">迪丽热巴</td>
                            <td class="text-center width110">18052001167</td>
                            <td class="text-center width170">111111222222333333</td>
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
                isShow: true,
                sea_info: '',       //搜索内容
                paging: '3',        //总页数
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
//            导出
            leadingOut (){
                alert(2);
            },
//            搜索客户
            cus_search (val){
                alert(1);
                this.paging = '';
                this.beforePage = val;
//                if (false) {
//                    //成功信息 ***
//                    this.info.success = res.data.msg;
//                    //关闭失败弹窗 ***
//                    this.info.state_error = false;
//                    //显示成功弹窗 ***
//                    this.info.state_success = true;
//                } else {
//                    //关闭成功信息(可选)
//                    this.info.state_success = false;
//                    //失败信息 ***
//                    this.info.error = res.data.msg;
//                    //显示失败弹窗 ***
//                    this.info.state_error = true;
//                }
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
