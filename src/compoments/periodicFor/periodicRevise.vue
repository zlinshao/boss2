<template>
    <div>
        <!--充公选择-->
        <div class="modal fade " id="periodicRevise" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <!--新增客户-->
                    <div class="modal-header">
                        <button type="button" class="close" @click="close_" aria-hidden="true">×</button>
                        <h4 class="modal-title">充公选择</h4>
                    </div>

                    <!--充公选择-->
                    <div class="modal-body has-js">
                        <form class="form-horizontal" role="form">

                            <!--房屋地址-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">房屋地址</label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="house_addr" class="form-control" placeholder=""
                                           readonly>
                                </div>
                            </div>

                            <!--收房人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">收房人</label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="collect_house" class="form-control" placeholder=""
                                           readonly>
                                </div>
                            </div>

                            <!--租房人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">租房人</label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="renter_house" class="form-control" placeholder=""
                                           readonly>
                                </div>
                            </div>

                            <!--充公人-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">充公人</label>
                                <div class="col-lg-10">
                                    <select v-model="confiscate" class="form-control">
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                    </select>
                                </div>
                            </div>

                            <!--充公原因-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">充公原因</label>
                                <div class="col-lg-10">
                                    <input type="text" v-model="confiscate_cause" class="form-control"
                                           placeholder="" readonly>
                                </div>
                            </div>

                            <!--备注-->
                            <div class="form-group">
                                <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" v-model="remarks"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" @click="close_">取消</button>
                        <button class="btn btn-primary" type="button" @click="periodicRevise()">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [],
        data (){
            return {
                house_addr: '',                     //房屋地址
                collect_house: '',                  //收房人
                renter_house: '',                   //租房人
                confiscate: '',                     //充公人
                confiscate_cause: '',               //充公原因
                remarks: '',                        //备注
            }
        },
        methods: {
//            确定编辑
            periodicRevise (){
                this.$http.post('http://httpbin.org', {
                    a: this.house_addr,                     //房屋地址
                    a: this.collect_house,                  //收房人
                    a: this.renter_house,                   //租房人
                    a: this.confiscate,                     //充公人
                    a: this.confiscate_cause,               //充公原因
                    a: this.remarks,                    //备注
                }).then((res) => {

                })
            },

//            备注按钮
            remark_s (val){
                this.remark_status = val;
            },

//            关闭模态框
            close_ (){
                this.clear_content();
                $('#periodicRevise').modal('hide');          //成功关闭模态框
            },

//            清空内容
            clear_content (){
                this.house_addr = '';                     //房屋地址
                this.collect_house = '';                  //收房人
                this.renter_house = '';                   //租房人
                this.confiscate = '';                     //充公人
                this.confiscate_cause = '';               //充公原因
                this.remarks = '';                        //备注
            }
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
