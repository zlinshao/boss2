<template>
    <div class="flexBox">
        <div class="form-group">
            <label class="col-sm-3 control-label">{{flexData.name}}:</label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">一:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[0]" @blur="sendData">
                </div>
                <div class="col-sm-3">
                    <i class="fa fa-plus-circle" @click="addMoreYears"></i>
                    <i class="fa fa-minus-circle" @click="reduceMoreYears"></i>
                </div>
            </div>
        </div>

        <div class="form-group" v-show="moreYears>=2">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">二:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[1]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=3">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">三:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[2]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=4">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">四:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[3]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=5">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">五:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[4]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=6">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">六:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[5]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=7">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">七:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[6]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=8">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">八:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[7]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=9">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">九:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[8]" @blur="sendData">
                </div>
            </div>
        </div>
        <div class="form-group"  v-show="moreYears>=10">
            <label class="col-sm-3 control-label"></label>
            <div class="form-group col-sm-8">
                <label class="col-sm-1 control-label">十:</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control" v-model="data[9]" @blur="sendData">
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
    label{
        line-height: 34px;
    }
</style>
<script>
    export default{
        props : ['flexData'],
        data(){
            return {
                moreYears : 1,
                data : ['','','','','','','','','','']
                /*data : {
                    one : '',
                    two : '',
                    three : '',
                    four : '',
                    five : '',
                    six : '',
                    seven : '',
                    eight : '',
                    nine : '',
                    ten : '',
                }*/

            }
        },
        components: {},
        methods: {
            addMoreYears(){
                if (this.moreYears === this.flexData.maxLength){
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
                this.$emit('sendData',this.data)
            }
        }
    }
</script>