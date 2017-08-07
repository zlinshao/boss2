<template>
    <div>
        <div class="modal fade full-width-modal-right cteatePayment" id="cteatePayment" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" data-dismiss="modal" @click="closeModal">
                                <span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title">生成款项</h4>
                        </div>
                        <div class="modal-body clearFix">
                            <form class="form-horizontal" role="form" v-if="msg!=''">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">签约人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.staff==undefined?'':msg.staff.real_name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">所属部门</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.department==undefined?'':msg.department.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">负责人</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.leader==undefined?'':msg.leader.real_name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">客户姓名</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.customer==undefined?'':msg.customer.name">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label">房屋地址</label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" disabled v-model="msg.house.detailed_address">
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
                                        <SelectSubject @choose="getSubject1"></SelectSubject>
                                    </div>
                                </div>
                                <div class="form-group" v-show="money_name_length>=2">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <select class="form-control">
                                            <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-2 control-label">款项科目</label>
                                    <div class="col-sm-4">
                                        <SelectSubject @choose="getSubject2"></SelectSubject>
                                    </div>
                                </div>
                                <div class="form-group" v-show="money_name_length>=3">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <select class="form-control">
                                            <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-2 control-label">款项科目</label>
                                    <div class="col-sm-4">
                                        <SelectSubject @choose="getSubject3"></SelectSubject>
                                    </div>
                                </div>
                                <div class="form-group" v-show="money_name_length>=4">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <select class="form-control">
                                            <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-2 control-label">款项科目</label>
                                    <div class="col-sm-4">
                                        <SelectSubject @choose="getSubject4"></SelectSubject>
                                    </div>
                                </div>
                                <div class="form-group" v-show="money_name_length>=5">
                                    <label class="col-sm-2 control-label">款项名称</label>
                                    <div class="col-sm-4">
                                        <select class="form-control">
                                            <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                        </select>
                                    </div>
                                    <label class="col-sm-2 control-label">款项科目</label>
                                    <div class="col-sm-4">
                                        <SelectSubject @choose="getSubject5"></SelectSubject>
                                    </div>
                                </div>




                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remark"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <div>
                                <button type="button" class="btn btn-default" data-dismiss="modal" @click="closeModal">取消</button>
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
        props:['from','addPayment_id'],
        components: {SelectSubject},
        data(){
            return {
                dict : {},
                msg : '',
                money_name : {},
                money_name_length : 0,

                money : [
                    {
                        money_name : 1,
                        subject_id : '',
                    },
                    {
                        money_name : 1,
                        subject_id : '',
                    },
                    {
                        money_name : 1,
                        subject_id : '',
                    },
                    {
                        money_name : 1,
                        subject_id : '',
                    },
                    {
                        money_name : 1,
                        subject_id : '',
                    }
                ],

                formData:{
                    id : '',
                    item : {},
                    remark : ''
                }
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
            .then(
//                    console.log
                (res) => {
                    this.dict = res.data;
                    if (this.from==1){
                        // 收
                        this.money_name = res.data["money_name_colelct"];
                        /*for (let attr in this.dict.money_name_collect){
                         this.money_name[attr] = this.dict.money_name_collect[attr];
                         }*/
//                        this.money_name = res.data.money_name_collect;
//                        alert(1)
                    } else if (this.from==2){
                        // 租
                        this.money_name = res.data["money_name_rent"];
                        /*for (let attr in this.dict.money_name_rent){
                         this.money_name[attr] = this.dict.money_name_rent[attr];
                         }*/
//                        this.money_name = this.dict.money_name_rent;
                    }

                    console.log(this.money_name);
                    for (let i in this.money_name){
                        this.money_name_length++;
                    }
                }

            );
        },
        watch:{
            addPayment_id(val){
                this.getDetails();
            }
        },
        methods: {
            // 获取选择的科目名称
            getSubject1(val){
                console.log(val)
            },
            getSubject2(val){},
            getSubject3(val){},
            getSubject4(val){},
            getSubject5(val){},

            closeModal(){
                this.msg = '';

                this.formData.remark = '';

                this.getDetails();
            },

            setMoneyName(){

            },
            getDetails(){
                if (this.from==1){
                    // 收
                    this.$http.get('checkin/collect/'+this.addPayment_id)
                        .then(
                            (res) => {
                                this.msg = res.data.data;
                                console.log(this.msg);
                            }
                        );
                } else if (this.from==2){
                    // 租
                } else {
                    // 其他
                }
            },


            save(){
                this.formData.id = this.addPayment_id;
            }
        }
    }
</script>