<template>
    <!--分配-->
    <div>
        <div class="modal fade " id="distribution" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="z-index: 1048">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!--客户派发-->
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true" @click="empty_cus">
                            ×
                        </button>
                        <h4 class="modal-title">客户派发</h4>
                    </div>

                    <!--客户派发-->
                    <div class="modal-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" disabled v-model="msg">
                                </div>
                            </div>
                            <div class="form-group">

                                <label class="col-lg-2 col-sm-2 control-label">派发对象</label>
                                <div class="col-lg-10 iconic-input right">
                                    <i class="fa fa-plus-square"></i>
                                    <input type="text" @click="distributions"
                                           class="form-control" v-model="salesman"
                                           placeholder="请选择姓名" readonly>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button data-dismiss="modal" class="btn btn-default" type="button" @click="empty_cus">取消
                        </button>
                        <button class="btn btn-success" type="button" @click="distribution_ok"> 确定</button>
                    </div>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>

        <SelectStaff @Staff="selectDateSend" :configure="configure"></SelectStaff>
    </div>
</template>

<script>
    import SelectStaff from '../common/oraganization.vue'
    import Status from '../common/status.vue';                          //提示信息
    export default {
        components: {SelectStaff, Status},
        props: ['pit', 'msg'],
        data (){
            return {
                configure: [],
                salesman: '',       //客户姓名
                salesman_id: '',    //客户ID
                department_id: '',  //部门ID
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
//            组织架构
            distributions (){
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {
                    length: 1,
                    type: 'staff'
                };
            },
//            清空员工ID
            empty_cus (){
                this.salesman = '';
                this.salesman_id = '';
                this.department_id = '';
            },
//            获得派发对象
            selectDateSend (val){
                this.empty_cus();
                this.salesman = val.staff[0].name;
                this.salesman_id = val.staff[0].id;
                this.department_id = val.staff[0].department;
            },
            distribution_ok (){
                this.$http.post('core/customer_pool/allotCustomer', {
                    customer_id: this.pit,                  //客户id
                    staff_id: this.salesman_id,             //员工id
                    department: this.department_id          //部门id
                }).then((res) => {
                    if (res.data.code === '70070') {
                        $('#distribution').modal('hide');
                        this.$emit('distribution', 1);
                        //成功信息 ***
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.empty_cus();
                    } else {
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        this.empty_cus();
                    }
                });
            }
        }
    }
</script>


<style scoped>
    .iconic-input.right i {
        right: 20px;
    }
</style>
