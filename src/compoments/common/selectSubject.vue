<template>
    <div>
        <div class="selectSubject">
            <input type="text" class="form-control" readonly @click="getBaseSubject" v-model="Superior_name" />
            <div class="subjectList" v-show="showChooseSubject">
                <ul>
                    <li @click="changeCurId(value,key)" :class="{'active':curSuperior_id == value}" v-for="(key,value) in subjectData">{{key}}</li>
                </ul>
                <div class="choose">
                    <ul class="clearFix">
                        <li class="btn-primary" @click="sure">确定</li>
                        <li class="btn-default" @click="getNext">下一步</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props : ['current'],
        components: {},
        data(){
            return {
                showChooseSubject: false,
                subjectData: [],
                curSuperior_id: 0,
                Superior_name: '',
            }
        },
        watch:{
            current(val){
                if (val==''){
//                    alert(1);
                    this.Superior_name = '';
                }
            }
        },
        methods: {
            changeCurId(id, name){
                this.curSuperior_id = id;
                this.Superior_name = name;
            },
            // 获取科目
            getBaseSubject(){
                if (this.showChooseSubject) {
                    this.reset();
                } else {
                    this.showChooseSubject = !this.showChooseSubject;
                    this.curSuperior_id = 0;
                    this.Superior_name = '';
                    if (this.showChooseSubject) {
                        this.$http.get('account/subject/next/' + this.curSuperior_id).then((res) => {
                            if (res.data.code == 18300) {
                                // 成功
                                this.subjectData = res.data.data;
//                            console.log(this.subjectData)
                            }
                        })
                    }
                }
            },
            // 获取下级科目
            getNext(){
                this.$http.get('account/subject/next/'+this.curSuperior_id).then((res)=>{
                    if (res.data.code==18300){
                        // 成功
                        this.subjectData = res.data.data;
//                        console.log(this.subjectData)
                    }
                })
            },
            sure(){
//                this.formData.superior_id = this.curSuperior_id;
                this.showChooseSubject = false;
                this.subjectData = [];

                this.$emit('choose',this.curSuperior_id);
            },
            reset(){
                this.curSuperior_id = 0;
//                this.formData.superior_id = 0;
                this.Superior_name = '';
                this.showChooseSubject = false;
                this.subjectData = [];
                this.$emit('choose','');
            },

        }
    }
</script>
<style scoped>
    .selectSubject{
        position: relative;
    }
    .subjectList{
        top:37px;
        width: 85%;
        position: absolute;
        background: white;
        z-index: 20;
        border-radius: 4px;
        border: 1px solid #ddd;
        box-shadow: 1px 1px 2px #ddd;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    .subjectList>ul{
        padding: 12px 20px;
        line-height: 25px;
    }
    .subjectList>ul>li{
        font-size: 13px;
        background: #f5f5f5;
        border: 1px solid #f5f5f5;
        /*color: #08c;*/
        padding: 0 12px;
        margin-bottom: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        cursor: pointer;
    }
    .subjectList>ul>li:hover{
        background: #08c;
        border: 1px solid #08c;
        color: #fff;
    }
    .subjectList>ul>li.active{
        background: #08c;
        border: 1px solid #08c;
        color: #fff;
    }
    .subjectList:before{
        position: absolute;
        top: -7px;
        left: 9px;
        display: inline-block;
        border-right: 7px solid transparent;
        border-bottom: 7px solid rgba(0, 0, 0, 0.2);
        border-left: 7px solid transparent;
        /*border-bottom-color: rgba(0, 0, 0, 0.2);*/
        content: '';
    }
    .subjectList:after{
        position: absolute;
        top: -6px;
        left: 10px;
        display: inline-block;
        border-right: 6px solid transparent;
        border-bottom: 6px solid #fff;
        border-left: 6px solid transparent;
        content: '';
    }
    .choose ul li{
        float: left;
        width: 50%;
        text-align: center;
        border: 1px solid #ddd;
        cursor: pointer;
        display: inline-block;
        padding: 10px 0;
    }
    .choose ul li:nth-of-type(1){
        border-bottom-left-radius: 4px;
    }
    .choose ul li:nth-of-type(2){
        border-bottom-right-radius: 4px;
    }
    .choose ul li+li{
        box-sizing: border-box;
        border-left: 1px solid #ddd;
    }
</style>