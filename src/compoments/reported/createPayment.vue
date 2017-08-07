<template>
    <div>
        <div class="modal fade full-width-modal-right cteatePayment" id="cteatePayment" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                                <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">生成款项</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">负责人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled>
                                    </div>
                                </div>


                                <div class="form-group">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <select class="form-control">
                                            <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-2 control-label">款项科目</label>
                                    <div class="col-sm-4">
                                        <SelectSubject @choose="getSubject"></SelectSubject>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div>
                                <button type="button" class="btn btn-default">取消</button>
                                <button type="button" class="btn btn-primary">通过并生成应收款项</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    textarea{
        max-width: 100%;
    }
</style>
<script>
    import SelectSubject from '../common/selectSubject.vue'
    export default{
        components: {SelectSubject},
        data(){
            return {
                dict : {},
                val : {},
                money_name : {},
                formData:{

                }
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
            .then(
//                    console.log
                (res) => this.dict = res.data
            );
        },
        methods: {
            // 获取选择的科目名称
            getSubject(val){
                console.log(val)
            }
        }
    }
</script>