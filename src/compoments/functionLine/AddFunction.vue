<template>
    <div>
        <!--增加/编辑排期-->
        <div class="modal fade full-width-modal-right" id="AddFunction" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content roll">
                        <!--新增客户-->
                        <div class="modal-header">
                            <button type="button" class="close" @click="close_" aria-hidden="true">×</button>
                            <h4 class="modal-title" v-if="fun === 'add'">新增排期</h4>
                            <h4 class="modal-title" v-if="fun === 'rev'">编辑排期</h4>
                        </div>

                        <div class="modal-body has-js">
                            <form class="form-horizontal" role="form">

                                <!--功能名称-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">功能名称</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="fun_name" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--结束时间-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">结束时间</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="end_time" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--前端-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">前端</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="fore_end" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--后端-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">后端</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="after_end" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--产品-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">产品</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="produce" class="form-control" placeholder="">
                                    </div>
                                </div>

                                <!--申请人-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">申请人</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="proposer" class="form-control" placeholder="" readonly>
                                    </div>
                                </div>

                                <!--申请部门-->
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">申请部门</label>
                                    <div class="col-lg-10">
                                        <input type="text" v-model="proposer_branch" class="form-control" placeholder="" readonly>
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default" type="button" @click="close_">取消</button>
                            <button class="btn btn-primary" v-if="fun === 'add'" type="button"
                                    @click="function_add('http://httpbin.org')">确定
                            </button>
                            <button class="btn btn-warning" v-if="fun === 'rev'" type="button"
                                    @click="function_add('http://httpbin.org')">修改
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['msg'],
        data (){
            return {
                fun: '',
                fun_name: '',               //功能名称
                end_time: '',               //结束时间
                fore_end: '',               //前端
                after_end: '',              //后端
                produce: '',                //产品
                proposer: '',               //申请人
                proposer_branch: '',        //申请部门
            }
        },
        watch: {
            msg (val) {
                this.fun = val;
                if (val === 'add') {
                    this.clear_content();
                } else if (val === 'rev') {
                    this.fun_name = '';               //功能名称
                    this.end_time = '';               //结束时间
                    this.fore_end = '';               //前端
                    this.after_end = '';              //后端
                    this.produce = '';                //产品
                    this.proposer = '';               //申请人
                    this.proposer_branch = '';        //申请部门
                }
            }
        },
        methods: {
//            确定新增功能
            function_add (addr){
                this.$http.post(addr, {
                    a: this.fun_name,               //功能名称
                    a: this.end_time,               //结束时间
                    a: this.fore_end,               //前端
                    a: this.after_end,              //后端
                    a: this.produce,                //产品
                    a: this.proposer,               //申请人
                    a: this.proposer_branch,        //申请部门
                }).then((res) => {

                })
            },
//            关闭模态框
            close_ (){
                this.clear_content();
                $('#AddFunction').modal('hide');    //成功关闭模态框
            },

//            清空内容
            clear_content (){
                this.fun_name = '';                 //功能名称
                this.end_time = '';                 //结束时间
                this.fore_end = '';                 //前端
                this.after_end = '';                //后端
                this.produce = '';                  //产品
                this.proposer = '';                 //申请人
                this.proposer_branch = '';          //申请部门
            },
        }
    }
</script>


<style scoped>
    .col-lg-10.iconic-input.right div {
        margin-top: 6px;
        color: #AFAFAF;
    }

    .form-group {
        margin-bottom: 22px;
    }

    .form-control {
        margin-bottom: 0;
    }

    i.fa.fa-check-square, i.fa.fa-square-o {
        right: 28px;
        color: #000;
        font-size: 20px
    }
</style>
