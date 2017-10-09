<template>
    <div class="flexBox">
        <div class="form-group">
            <label class="col-sm-2 control-label">{{title}}<sup class="required">*</sup></label>
            <div class="col-sm-10 padding_0">
                <label class="col-sm-2 control-label" v-show="moreYears >= 2">第一年</label>
                <div :class="{'col-sm-6':moreYears>=2,'col-sm-8':moreYears == 1}">
                    <input type="text" class="form-control" v-model="data[0]" @blur="sendData">
                </div>
                <div class="col-sm-4 icons">
                    <label class="control-label" @click="changeMoney($event)">
                        <input type="checkbox" :checked="changeYears">月单价不固定
                    </label>
                </div>
            </div>
        </div>

        <div class="form-group col-sm-6" v-show="moreYears>=2">
            <div class="">
                <label class="col-sm-4 control-label">第二年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control margin_0" v-model="data[1]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=3">
            <div class="">
                <label class="col-sm-4 control-label">第三年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[2]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=4">
            <div class="">
                <label class="col-sm-4 control-label">第四年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[3]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=5">
            <div>
                <label class="col-sm-4 control-label">第五年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[4]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=6">
            <div>
                <label class="col-sm-4 control-label">第六年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[5]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=7">
            <div>
                <label class="col-sm-4 control-label">第七年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[6]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=8">
            <div>
                <label class="col-sm-4 control-label">第八年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[7]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=9">
            <div>
                <label class="col-sm-4 control-label">第九年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[8]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=10">
            <div>
                <label class="col-sm-4 control-label">第十年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[9]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=11">
            <div>
                <label class="col-sm-4 control-label">第十一年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[10]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=12">
            <div>
                <label class="col-sm-4 control-label">第十二年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[11]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=13">
            <div>
                <label class="col-sm-4 control-label">第十三年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[12]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=14">
            <div>
                <label class="col-sm-4 control-label">第十四年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[13]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=15">
            <div>
                <label class="col-sm-4 control-label">第十五年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[14]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=16">
            <div>
                <label class="col-sm-4 control-label">第十六年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[15]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=17">
            <div>
                <label class="col-sm-4 control-label">第十七年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[16]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=18">
            <div>
                <label class="col-sm-4 control-label">第十八年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[17]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=19">
            <div>
                <label class="col-sm-4 control-label">第十九年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[18]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group col-sm-6" v-show="moreYears>=20">
            <div>
                <label class="col-sm-4 control-label">第二十年</label>
                <div class="col-sm-8">
                    <input type="text" class="form-control" v-model="data[19]" @blur="sendData">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['flexData', 'datas', 'change', 'title'],
        data(){
            return {
                moreYears: 1,
                data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
                changeYears: false,
            }
        },
        watch: {
            datas (val){
                this.setData(val);
            },
            flexData(val){
                if (this.changeYears) {
                    this.moreYears = val;
                    if (this.moreYears === 0){
                        this.changeYears = false;
                    }
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
                if (this.moreYears === 0 || this.flexData === 0){
                    ev.target.checked = false;
                    return;
                }
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
                this.data = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
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
                }
            }
        }
    }
</script>

<style scoped>
    .icons {
        user-select: none;
    }

    .col-sm-3 i {
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
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
        border-bottom: 0;
        padding-bottom: 0;
        margin-bottom: 15px;
    }

    .form-horizontal .form-group {
        margin-right: 0;
        margin-left: 0;
    }
</style>