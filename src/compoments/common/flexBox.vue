<template>
    <div class="flexBox">
        <div class="form-group">
            <label class="col-sm-2 control-label">收月单价</label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第一年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[0]" @blur="sendData">
                </div>
                <div class="col-sm-3">
                    <i class="fa fa-plus-circle" @click="addMoreYears"></i>
                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>
                </div>
            </div>
        </div>

        <div class="form-group" v-show="moreYears>=2">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第二年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control margin_0" v-model="data[1]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=3">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第三年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[2]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=4">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第四年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[3]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=5">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第五年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[4]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=6">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第六年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[5]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=7">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第七年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[6]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=8">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第八年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[7]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=9">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第九年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[8]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=10">
            <label class="col-sm-2 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-3 control-label">第十年</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" v-model="data[9]" @blur="sendData">
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

    .col-sm-3 i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        /*text-align: left;*/
        cursor: pointer;
    }
    .col-sm-3 i+i{
        margin-left: 5px;
    }
    .col-sm-3 i:hover{
        color: #999;
    }

</style>
<script>
    export default{
        props : ['flexData','datas'],
        data(){
            return {
                moreYears : 1,
                data : ['','','','','','','','','','']
            }
        },
        watch: {
//            deep : true,
            datas (val){
//                alert(val);
//                console.log(val);
                this.setData(val);
            },
        },
        components: {},
        methods: {
            addMoreYears(){
                if (this.moreYears == this.flexData || this.flexData==''){
                    return;
                }else {
                    this.moreYears++;
                }
            },
            reduceMoreYears(){
                if (this.moreYears === 1){
                    return;
                }else {
                    console.log(this.moreYears-1);
//                    console.log($('.flexBox input'));
//                    console.log($('.flexBox input').eq(this.moreYears-1).val());
//                    $('.flexBox input').eq(this.moreYears-1).val('');
                    this.data[this.moreYears-1]='';
                    this.moreYears--;
                }
            },
            sendData(){
                this.$emit('sendData',this.data.slice(0,this.moreYears))
            },
            setData(val){
                if (val.length===0){
                    this.moreYears = 1;
                } else {
                    let that = this;
                    this.moreYears = val.length;
                    this.data = ['','','','','','','','','',''];
                    for (let i = 0;i<val.length ; i++){
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