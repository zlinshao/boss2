<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade " id="selectCustom">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选人</h4>
                    </div>
                    <div class="modal-body">
                            <div class="row">
                                <div class="col-lg-7" >
                                    <div class="box">
                                        <div id="tagsinput_tagsinput" class="tagsinput " style="height: 42px; border: none">
                                            <span class="tag" v-for="item in member" v-if="member!=''">
                                                <span >{{item}}&nbsp;&nbsp;</span>
                                                <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                            </span>
                                            <input placeholder="搜索企业联系人" v-model="keywords" @keyup="search" @keydown.8="backSpace"
                                                   @keydown.down="changeDown" @keydown.up="changeUp" @keydown.13='keydownAdd'>
                                        </div>
                                        <div class="searchList box-body">
                                            <ul>
                                                <li v-for="(item,index) in searchList" :class="{'hov':active1==index}"
                                                    @mouseover="changeClass(index)" @click="mouseAdd(item.real_name)">
                                                    {{item.real_name}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <div class="box">
                                        <div class="boxHead">组织架构</div>
                                        <div>
                                            <a @click="getFirst">南京乐伽商业管理有限公司</a>
                                            <a v-if="isSecond" @click="getSecond(secondId,secondName)"> &gt; {{secondName}}</a>
                                            <a v-if="isThird" @click="getThird(thirdId,thirdName)"> &gt; {{thirdName}}</a>
                                            <a v-if="isFour" @click="getFour(fourId,fourName)"> &gt; {{fourName}}</a>
                                            <a v-if="isFive" > &gt; {{fiveName}}</a>
                                        </div>
                                        <div class="checkbox">

                                        </div>
                                        <div class="organizeList box-body" id="box-body" >
                                            <ul>
                                                <li v-for="item in organizeList"   v-if="type==1" @click="getSecond(item.id,item.name)">
                                                    {{item.name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==2" @click="getThird(item.id,item.name)">
                                                    {{item.name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==3" @click="select(item.id,item.real_name)">
                                                    {{item.real_name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==4" @click="getFour(item.id,item.name)">
                                                    {{item.name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==5" @click="select(item.id,item.real_name)">
                                                    {{item.real_name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==6" @click="getFive(item.id,item.name)">
                                                    {{item.name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==7" @click="select(item.id,item.real_name)">
                                                    {{item.real_name}}
                                                </li>
                                                <li v-for="item in organizeList" v-if="type==8" @click="select(item.id,item.real_name)">
                                                    {{item.real_name}}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="selectUser">新增</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                searchList:[],
                organizeList:[],
                member:[],
                keywords:'',
                active1: '-1',
                hovName:'',
                type:'',
                secondName:'',
                thirdName:'',
                fourName:'',
                fiveName:'',
                secondId:'',
                thirdId:'',
                fourId:'',
                fiveId:'',
                isSecond:false,
                isThird:false,
                isFour:false,
                isFive:false,
            }
        },
        mounted(){
          this.getFirst();
        },
        methods:{
            /*******************************右侧组织架构***************************************/
            getFirst(){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/departmentIndex/id/'+1).then((res) => {
                    this.organizeList = res.data.data.department;
                    this.type=1;
                    this.isSecond=false;
                    this.isThird=false;
                    this.isFour=false;
                    this.isFive=false;
                })
            },
            getSecond(id,name){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/departmentIndex/id/'+id).then((res) => {
                    if(res.data.data.department.length===0){
                        this.organizeList = res.data.data.user;
                        this.type=3;
                    }else {
                        this.organizeList = res.data.data.department;
                        this.type=2;
                    }
                    this.secondName=name;
                    this.secondId=id;
                    this.isSecond=true;
                    this.isThird=false;
                    this.isFour=false;
                    this.isFive=false;
                })
            },
            getThird(id,name){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/departmentIndex/id/'+id).then((res) => {
                    if(res.data.data.department.length===0){
                        this.organizeList = res.data.data.user;
                        this.type=5;
                    }else {
                        this.organizeList = res.data.data.department;
                        this.type=4;
                    }
                    this.thirdName=name;
                    this.thirdId=id;
                    this.isSecond=true;
                    this.isThird=true;
                    this.isFour=false;
                    this.isFive=false;
                })
            },
            getFour(id,name){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/departmentIndex/id/'+id).then((res) => {
                    if(res.data.data.department.length===0){
                        this.organizeList = res.data.data.user;
                        this.type=7;
                    }else {
                        this.organizeList = res.data.data.department;
                        this.type=6;
                    }
                    this.fourName=name;
                    this.fourId=id;
                    this.isSecond=true;
                    this.isThird=true;
                    this.isFour=true;
                    this.isFive=false;
                })
            },
            getFive(id,name){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/departmentIndex/id/'+id).then((res) => {
                    this.organizeList = res.data.data.user;
                    this.type=8;
                    this.fiveName=name;
                    this.fiveId=id;
                    this.isSecond=true;
                    this.isThird=true;
                    this.isFour=true;
                    this.isFive=true;
                })
            },
            select(id,name){
                if($.inArray(name, this.member)===-1){
                    this.member.push(name);
                }else if($.inArray(name, this.member)!==-1){
                    this.member=this.member.filter((x)=>x!==name);
                }
            },
            /*******************************左侧选人框***************************************/
            //关键词搜索事件
            search(){
                if (this.keywords != '') {
                    this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/searchUser/keywords/' +
                        decodeURI(this.keywords)).then((res) => {
                        if(res.data.data!==undefined){
                            this.searchList = res.data.data.list;
                        }else{
                            this.searchList=[];
                        }

                    })
                } else {
                    this.searchList=[];
                }
            },
            //键盘向下事件
            changeDown(){
                if(this.searchList.length!==0){
                    this.active1++;
                    if(this.active1===this.searchList.length)this.active1=this.searchList.length-1;
                    this.hovName=this.searchList[this.active1].real_name;
                }
            },
            //键盘向上事件
            changeUp(){
                if(this.searchList.length!==0){
                    this.active1--;
                    if(this.active1===-2)this.active1=-1;
                    if(this.active1>-1){
                        this.hovName=this.searchList[this.active1].real_name;
                    }


                }
            },
            //hover事件
            changeClass(index){
                this.active1=index;
            },
            //鼠标增加事件
            mouseAdd(name){
                if($.inArray(name, this.member)===-1){
                    this.member.push(name);
                }
            },
            //键盘enter事件
            keydownAdd(){
                if(this.hovName!==''&& $.inArray(this.hovName, this.member)===-1){
                    this.member.push(this.hovName)
                }
                this.hovName='';
            },
            //回车删除事件
            backSpace(){
                if(this.keywords===''){
                    this.member.pop();
                }
            },
            //删除成员
            deleteName(name){
                this.member=this.member.filter((x)=>x!==name);
            },
            //选择成员并发回父组件
            selectUser(){
                this.$emit('Staff',this.member);
                $('#selectCustom').modal('hide');
                this.member=[];
            }
        },
    }
</script>


<style scoped>
    .hov{
        background: #ccc;
    }
    .lightGray{
        background-color: #F2F2F2;
    }
    .iconic-input i {
        margin: 8px 25px 8px 10px;
    }
    .col-lg-5,.col-lg-7{
        padding:8px;
    }
    @media (max-width: 1200px){
        .box{
            height: 200px;
            border:1px solid #ccc;
            border-radius: 3px;
        }
    }
    .box{
        min-height: 400px;
        border:1px solid #ccc;
        border-radius: 5px;
    }
    .boxHead{
        text-align: center;
        padding:5px;
        font-weight: bold;
    }
    .organizeList ul li{
        padding: 7px 0 7px 20px;
    }
    .organizeList ul li:hover{
        background: #c0c0c0;
    }
    .searchList ul li{
        padding: 7px 0 7px 20px;
    }
    .box-body{
        height: 357px;
        overflow: auto;
    }
    #box-body{
        height: 300px;
        overflow: auto;
    }
    .box-body::-webkit-scrollbar {
        width:8px;
        height:400px;
    }
    .box-body::-webkit-scrollbar-button    {
        background-color:#f0f0f8;
    }
    .box-body::-webkit-scrollbar-track     {
        background:#f0f0f8;
    }
    .box-body::-webkit-scrollbar-thumb{
        background:#ccc;
        border-radius:10px;
    }
    li{
        cursor: pointer;
    }
</style>
