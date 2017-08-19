<template>
    <div class="flexBox">
        <div class="form-group">
            <label class="col-sm-2 control-label">{{title}}<sup class="required">*</sup></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label" v-show="moreYears>=2">第一年</label>
                <div :class="{'col-sm-6':moreYears>=2,'col-sm-8':moreYears==1}">
                    <input type="text" class="form-control" v-model="data[0]" @blur="sendData">
                </div>
                <div class="col-sm-4 icons">
                    <!--<i class="fa fa-plus-circle" @click="addMoreYears"></i>
                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>-->
                    <label class="control-label" @click="changeMoney($event)"><input type="checkbox"
                                                                                     :checked="changeYears">月单价不固定</label>
                </div>
            </div>
        </div>

        <div class="form-group" v-show="moreYears>=2">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第二年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control margin_0" v-model="data[1]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=3">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第三年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[2]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=4">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第四年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[3]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=5">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第五年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[4]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=6">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第六年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[5]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=7">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第七年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[6]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=8">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第八年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[7]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=9">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第九年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[8]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group" v-show="moreYears>=10">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label">第十年</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="data[9]" @blur="sendData">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .icons {
        user-select: none;
    }

    .col-sm-3 i {
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /*text-align: left;*/
        cursor: pointer;
    }

    .col-sm-3 i + i {
        margin-left: 5px;
    }

    .col-sm-3 i:hover {
        color: #999;
    }

    input[type=checkbox] {
        width: 17px;
        height: 17px;
        margin-right: 8px;
        vertical-align: bottom;
    }
    .form-horizontal.tasi-form .form-group {
        border-bottom: 0px;
        padding-bottom: 0px;
        margin-bottom: 15px;
    }
</style>
<script>
    export default{
        props: ['flexData', 'datas', 'change', 'title'],
        data(){
            return {
                moreYears: 1,
                data: ['', '', '', '', '', '', '', '', '', ''],
                changeYears: false,
            }
        },
        watch: {
//            deep : true,
            datas (val){
//                alert(typeof val);
//                console.log(val);
                this.setData(val);
            },
            flexData(val){
//                if (val % 12 === 0) {
//                    let year = parseInt(val / 12);
//                    this.flexDatas = year;
//                    if (year < this.moreYears) {
//                        this.moreYears = year;
//                        this.sendData();
//                    }
//                } else {
//                    let year = parseInt(val / 12 + 1);
//                    this.flexDatas = year;
//                    if (year < this.moreYears) {
//                        this.moreYears = year;
//                        this.sendData();
//                    }
//                }
                if (val < this.moreYears) {
                    this.moreYears = val;
                    this.sendData();
                }
            },
            change(val){
                this.changeYears = val;
            }
        },
        components: {},
        methods: {
            changeMoney(ev){
//                alert('changeYears=='+this.changeYears)
                if (ev.target.checked) {
                    this.changeYears = true;
                    if (this.flexData !== '') {
                        this.moreYears = this.flexData;
                    } else {
                        this.moreYears = 1;
                    }
                } else {
                    this.changeYears = false;
                    this.moreYears = 1;
                    this.data.splice(1, this.moreYears, '');
                    this.data.splice(1, this.moreYears, '');
                    this.sendData();
                }
            },

            sendData(){
                this.$emit('sendData', this.data.slice(0, this.moreYears))
            },
            setData(val){
                this.data = ['', '', '', '', '', '', '', '', '', ''];
                if (val.length === 0) {
                    this.moreYears = 1;
                    return
                } else {
                    let that = this;
                    this.moreYears = val.length;
                    for (let i = 0; i < val.length; i++) {
                        (function (i) {
                            that.data[i] = val[i];
                        })(i)
                    }
//                    console.log(this.data);
                }
            }
        }
    }
</script>