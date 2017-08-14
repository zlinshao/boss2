<template>
    <div>
        <div class="modal fade full-width-modal-right cteatePayment" id="cteatePayment" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-label="Close" @click="closeModal">
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
                                        <input type="text" class="form-control" disabled v-model="msg.house==undefined?'':msg.house.detailed_address">
                                    </div>
                                </div>


                                <div v-if="from!=3">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-3">
                                            <select class="form-control" v-model="money[0].money_name">
                                                <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-3">
                                            <SelectSubject @choose="getSubject1" :current="money[0].subject_id"></SelectSubject>
                                        </div>
                                        <div class="col-sm-2 icons">
                                            <i class="fa fa-plus-circle" @click="add_nowNum"></i>
                                            <i class="fa fa-minus-circle" @click="minus_nowNum"></i>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="now_num>=2">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-3">
                                            <select class="form-control" v-model="money[1].money_name">
                                                <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-3">
                                            <SelectSubject @choose="getSubject2" :current="money[1].subject_id"></SelectSubject>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="now_num>=3">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-3">
                                            <select class="form-control" v-model="money[2].money_name">
                                                <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-3">
                                            <SelectSubject @choose="getSubject3" :current="money[2].subject_id"></SelectSubject>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="now_num>=4">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-3">
                                            <select class="form-control" v-model="money[3].money_name">
                                                <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-3">
                                            <SelectSubject @choose="getSubject4" :current="money[3].subject_id"></SelectSubject>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="now_num>=5">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-3">
                                            <select class="form-control" v-model="money[4].money_name">
                                                <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-3">
                                            <SelectSubject @choose="getSubject5" :current="money[4].subject_id"></SelectSubject>
                                        </div>
                                    </div>
                                    <div class="form-group" v-show="now_num>=6">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-3">
                                            <select class="form-control" v-model="money[5].money_name">
                                                <option :value="value" v-for="(key,value) in money_name">{{key}}</option>
                                            </select>
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-3">
                                            <SelectSubject @choose="getSubject6" :current="money[5].subject_id"></SelectSubject>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="from==3">
                                    <div class="form-group">
                                        <label class="col-sm-2 control-label">款项名称</label>
                                        <div class="col-sm-4">
                                            <input type="text" class="form-control" readonly v-model="msg.money_name">
                                        </div>
                                        <label class="col-sm-2 control-label">款项科目</label>
                                        <div class="col-sm-4">
                                            <SelectSubject @choose="getSubject7" :current="otherSubject"></SelectSubject>
                                        </div>
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
                                <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                                <button type="button" class="btn btn-primary" @click="save">通过并生成款项</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import SelectSubject from '../common/selectSubject.vue'
    import Status from '../common/status.vue';
    export default{
        props:['from','addPayment_id'],
        components: {SelectSubject,Status},
        data(){
            return {
                dict : {},
                msg : '',
                money_name : {},
                money_name_length : 0,
                now_num : 1,

                money : [
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    }
                ],
                id : '',

                otherSubject : '',
                formData:{
                    item : {},
                    remark : ''
                },
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

                    if (this.from!=3){
                        // console.log(this.money_name);
                        for (let i in this.money_name){
                            this.money_name_length++;
                        }
                    }

//                    alert(this.addPayment_id)
//                    this.getDetails()
                }

            );
        },
        watch:{
            addPayment_id(val){
//                alert(val);
                this.getDetails();
//                this.id = this.addPayment_id;
            }
        },
        methods: {
            // 获取选择的科目名称
            getSubject1(val){
                console.log(val);
                this.money[0].subject_id = val;
            },
            getSubject2(val){
                this.money[1].subject_id = val;
            },
            getSubject3(val){
                this.money[2].subject_id = val;
            },
            getSubject4(val){
                this.money[3].subject_id = val;
            },
            getSubject5(val){
                this.money[4].subject_id = val;
            },
            getSubject6(val){
                this.money[5].subject_id = val;
            },
            getSubject7(val){
                this.otherSubject = val;
            },

            closeModal(){
                this.msg = '';
                this.money = [
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    },
                    {
                        money_name : '1',
                        subject_id : '',
                    }
                ];
                this.formData.item = {};
                this.formData.remark = '';
                this.otherSubject = '';

                $('#cteatePayment').modal('hide');
                this.getDetails();
            },

            getDetails(){
                this.msg = {};
                let url;
                if (this.from==1){
                    // 收
                    url = 'checkin/collect/'+this.addPayment_id;
                } else if (this.from==2){
                    // 租
                    url = 'checkin/rent/'+this.addPayment_id;

                } else {
                    // 其他
                    url = 'checkin/extra/'+this.addPayment_id;
                }
                this.$http.get(url)
                    .then(
                        (res) => {
                            this.msg = res.data.data;
                            console.log(this.msg);
                        }
                    );
            },

            add_nowNum(){
                if (this.now_num>=this.money_name_length){
                    return;
                }
                this.now_num++;
            },
            minus_nowNum(){
                if (this.now_num==1){
                    return;
                }
                this.money.splice(this.now_num-1,1,{
                    money_name : '1',
                    subject_id : ''
                });
                this.now_num--;
            },


            save(){
//                this.formData.id = this.addPayment_id;

                this.formData.item = this.money.slice(0,this.now_num);
//                console.log(this.money_name_length)
//                console.log(this.formData.item);
                console.log(this.formData);
                let url;
                if (this.from==1){
                    // 收
//                    url = 'checkin/collect/generate/'+this.addPayment_id;
                    this.$http.post('checkin/collect/generate/'+this.addPayment_id,this.formData).then((res) =>{
                        console.log(res);
                        if (res.data.code==18210){
                            // 成功
                            this.info.success = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.closeModal();
                            this.$emit('success');
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_error = false;
                            }, 2000);
                        }
                    })
                } else if (this.from==2){
                    // 租
//                    url = 'checkin/rent/generate/'+this.addPayment_id;
                    this.$http.post('checkin/rent/generate/'+this.addPayment_id,this.formData).then((res) =>{
                        console.log(res);
                        if (res.data.code==18110){
                            // 成功
                            this.info.success = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.closeModal();
                            this.$emit('success');
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_error = false;
                            }, 2000);
                        }
                    })
                } else {
                    // 其他
                    let data = {
                        otherSubject : this.otherSubject,
                        remark : this.formData.remark
                    };
                    console.log(data)
                    this.$http.post('checkin/extra/generate/'+this.addPayment_id,data).then((res) =>{
                        console.log(res);
                        if (res.data.code==18010){
                            // 成功
                            this.info.success = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.closeModal();
                            this.$emit('success');
                        } else {
                            // 失败
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_error = false;
                            }, 2000);
                        }
                    })
                }

            }
        }
    }
</script>

<style scoped>
    textarea{
        max-width: 100%;
    }
    .icons{
        user-select: none;
    }
    .icons i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /*text-align: left;*/
        cursor: pointer;
    }
    .icons i+i{
        margin-left: 5px;
    }
    .icons i:hover{
        color: #999;
    }
</style>