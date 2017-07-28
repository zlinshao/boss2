<template>
    <div>
        <!--日志/提醒/放入客户池-->
        <div class="modal fade " id="sharing" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="cancel">×</button>
                        <h4 class="modal-title">共享客户</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">派发对象</label>
                                <div class="col-lg-9 iconic-input right">
                                    <i style="right: 18px;" class="fa fa-plus-square"></i>
                                    <input type="text" @click="distributions"
                                           class="form-control" v-model="salesman"
                                           placeholder="请选择姓名" readonly>
                                </div>
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button" @click="cancel">取消</button>
                            <button class="btn btn-primary" type="button" @click="distribution_ok">确定</button>
                        </div>
                    </div>
                </div>
            </div>

            <!--提醒-->
            <Status :state='info'></Status>

            <SelectStaff @Staff="selectDateSend" :configure="configure"></SelectStaff>
        </div>
    </div>
</template>

<script>
    import SelectStaff from '../common/organization/selectStaff.vue'
    import Status from '../common/status.vue';
    export default {
        components: {Status, SelectStaff},
        props: ['msg'],
        data (){
            return {
                configure: [],
                salesman: [],       //员工姓名
                salesman_id: [],    //员工ID
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
//            取消
            cancel (){
                this.configure = [];
                this.salesman = [];
                this.salesman_id = [];
            },
//            组织架构
            distributions (){
                $('#selectCustom').modal('show');
                this.configure = {
                    length: 1,
                    class: 'amount'
                };
            },
//            获得派发对象
            selectDateSend (val){
                this.salesman = [];
                this.salesman.push(val.staff[0].name);
                this.salesman_id.push(val.staff[0].id);
            },
//            共享
            distribution_ok (){
                this.$http.get('core/customer/doshare/customer_id/' + this.msg + '/staff_id/' + String(this.salesman_id)).then((res) => {
                    if(res.data.code === '70070'){
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.cancel ();
                        $('#sharing').modal('hide');
                    }else{
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>
