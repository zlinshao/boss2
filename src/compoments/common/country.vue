<template>
    <div>
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="display: none;">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                        <h4 class="modal-title">国家</h4>
                    </div>
                    <div class="modal-body" style="overflow: auto;height: 300px;">
                        <div class="input-group" style="margin-bottom: 18px;">
                            <input class="form-control" type="text" @keyup.enter="country" v-model="counts"
                                   placeholder="搜索（中文/英文）">
                            <span class="input-group-btn">
                                <button class="btn btn-success" @click="country" type="button">搜索</button>
                            </span>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <section class="panel table-responsive">
                                    <table class="table table-striped table-advance table-hover">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>中文</th>
                                            <th>英文</th>
                                            <th>缩写</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="con in all_count" @click="select_count(con)">
                                            <td>
                                                <input class="pull-left" type="radio" name="nation" :checked="isIndex === con.id">
                                            </td>
                                            <td>{{con.zh_name}}</td>
                                            <td>{{con.en_name}}</td>
                                            <td>{{con.abbreviation}}</td>
                                        </tr>

                                        <tr v-show="all_count.length === 0">
                                            <td colspan="4" class="text-center text-muted">
                                                <h4>暂无数据....</h4>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        <button class="btn btn-success" @click="conservation" type="button">保存</button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default {
        components: {Status},
        data (){
            return {
                isIndex: '',
                counts: '',         //关键字搜索
                all_count: [],      //国家列表
                nations: {},        //发送数据
                info:{
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    error: ''
                }
            }
        },
        mounted (){
            this.country();
        },
        methods: {
//            搜索国家列表
            country (){
                this.$http.post('index/country/index', {
                    name: this.counts
                }).then((res) => {
                    if (res.data.data) {
                        this.all_count = res.data.data;
                    }
                });
            },
//            获取id
            select_count (val){
                this.nations = val;
                this.isIndex = val.id;
            },
//            保存
            conservation (){
                if (JSON.stringify(this.nations) != "{}") {
                    this.$emit('nation', this.nations);
                    $('#myModal').modal('hide');
                    this.counts = '';
                    this.nations = {};
                    this.isIndex = '';
                    this.country();
                }else{
                    //失败信息 ***
                    this.info.error = '请选择国家';
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                }

            },
        }
    }
</script>


<style scoped>
    input[type=checkbox], input[type=radio] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

</style>
