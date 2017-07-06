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
                        <h4 class="modal-title">选人 </h4>
                    </div>
                    <div class="modal-body scoll">
                            <div class="row">
                                <div class="col-lg-7" >
                                    <div class="box">
                                        <div id="tagsinput_tagsinput" class="tagsinput " style="border: none">
                                            <span class="tag" v-for="item in member" v-if="member!=''">
                                                <span >{{item}}&nbsp;&nbsp;</span>
                                                <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                            </span>
                                            <input v-model="keywords" @keyup="search" @keydown.8="backSpace" style="width: 65px"
                                            placeholder="搜索"       @keydown.down="changeDown" @keydown.up="changeUp" @keydown.13='keydownAdd'>
                                        </div>
                                        <div class="searchList box-body scoll" id="d1" style="max-height: 348px">
                                            <ul>
                                                <li v-for="(item,index) in searchList" :class="{'hov':active1==index}"
                                                    @mouseover="changeClass(index,item.real_name)" @click="mouseAdd(item.real_name)">
                                                    <div class="head"></div>
                                                    <div style="display: inline-block">
                                                        <p style="height:14px;font-size: 14px;color: #2a3542">{{item.real_name}}</p>
                                                        <p style="height:10px;font-size: 10px">{{item.enroll_time}}</p>
                                                        <p style="height:10px;font-size: 10px">{{item.mobile}}</p>
                                                    </div>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-5">
                                    <div class="box">
                                        <div class="boxHead">组织架构</div>
                                        <div style="margin-left: 10px">
                                            <a @click="getFirst">南京乐伽商业管理有限公司</a>
                                            <a v-if="isSecond"  @click="getSecond(secondId,secondName)">&gt; {{secondName}}</a>
                                            <a v-if="isThird" @click="getThird(thirdId,thirdName)"> &gt; {{thirdName}}</a>
                                            <a v-if="isFour" @click="getFour(fourId,fourName)"> &gt; {{fourName}}</a>
                                            <a v-if="isFive"> &gt; {{fiveName}}</a>
                                        </div>
                                        <div style="margin-top: 15px">
                                            <div class="organizeList box-body scoll" id="box-body" >
                                                <ul>
                                                    <li v-for="item in organizeList"   v-if="type==1">
                                                        <label class="checkbox-inline check">
                                                            <input type="checkbox" class="pull-left" value="1" v-model='checkboxModel'
                                                                   @click="checkedOne(item.name)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <p @click="getSecond(item.id,item.name)">{{item.name}}</p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==2">
                                                        <label class="checkbox-inline check">
                                                            <input type="checkbox" class="pull-left" value="1" v-model='checkboxModel'
                                                                   @click="checkedOne(item.name)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <p @click="getThird(item.id,item.name)">{{item.name}}</p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==3" @click="select(item.id,item.real_name)">
                                                        <div class="head"></div>
                                                        <div style="display: inline-block">
                                                            <p style="height:20px;font-size: 14px;color: #2a3542">{{item.real_name}}</p>
                                                            <p style="height:14px;font-size: 10px">
                                                                {{item.department[0].name}}&nbsp;&nbsp;
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==4" >
                                                        <label class="checkbox-inline check">
                                                            <input type="checkbox" class="pull-left" value="1" v-model='checkboxModel'
                                                                   @click="checkedOne(item.name)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <p @click="getFour(item.id,item.name)">{{item.name}}</p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==5" @click="select(item.id,item.real_name)">
                                                        <div class="head"></div>
                                                        <div style="display: inline-block">
                                                            <p style="height:20px;font-size: 14px;color: #2a3542">{{item.real_name}}</p>
                                                            <p style="height:14px;font-size: 10px">
                                                                {{item.department[0].name}}&nbsp;&nbsp;
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==6">
                                                        <label class="checkbox-inline check">
                                                            <input type="checkbox" class="pull-left" value="1" v-model='checkboxModel'
                                                                   @click="checkedOne(item.name)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <p  @click="getFive(item.id,item.name)">{{item.name}}</p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==7" @click="select(item.id,item.real_name)">
                                                        <div class="head"></div>
                                                        <div style="display: inline-block">
                                                            <p style="height:20px;font-size: 14px;color: #2a3542">{{item.real_name}}</p>
                                                            <p style="height:14px;font-size: 10px">
                                                                {{item.department[0].name}}&nbsp;&nbsp;
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==8" @click="select(item.id,item.real_name)">
                                                        <div class="head"></div>
                                                        <div style="display: inline-block">
                                                            <p style="height:20px;font-size: 14px;color: #2a3542">{{item.real_name}}</p>
                                                            <p style="height:14px;font-size: 10px">
                                                                {{item.department[0].name}}&nbsp;&nbsp;
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary" @click="selectUser">确定</button>
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
                hovId:'',
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
                checked:false,
                checkboxModel:[],
                checkbox1:[],
                organize:{
                    department:{
                        id:[],
                        name:[]
                    },
                    staff:{
                        id:[],
                        name:[]
                    }
                }
            }
        },
        mounted(){
          this.getFirst();
        },
        watch: {//深度 watcher

        },
        methods:{
            /*******************************右侧组织架构***************************************/
            getFirst(){
                this.$http.get('manager/user/departmentIndex/id/'+1).then((res) => {
                    this.organizeList = res.data.data.department;
                    this.type=1;
                    this.isSecond=false;
                    this.isThird=false;
                    this.isFour=false;
                    this.isFive=false;
                })
            },
            getSecond(id,name){
                this.$http.get('manager/user/departmentIndex/id/'+id).then((res) => {
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
                this.$http.get('manager/user/departmentIndex/id/'+id).then((res) => {
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
                this.$http.get('manager/user/departmentIndex/id/'+id).then((res) => {
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
                this.$http.get('manager/user/departmentIndex/id/'+id).then((res) => {
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
                    this.$http.get('manager/user/searchUser/keywords/' +
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
                    this.hovId=this.searchList[this.active1].id;
                    if (this.active1>2) document.getElementById('d1').scrollTop+=55;
                }
            },
            //键盘向上事件
            changeUp(){
                if(this.searchList.length!==0){
                    this.active1--;
                    if(this.active1===-2)this.active1=-1;
                    if(this.active1>-1){
                        this.hovName=this.searchList[this.active1].real_name;
                        this.hovId=this.searchList[this.active1].id;

                    }
                    if (this.active1<this.searchList.length-4) document.getElementById('d1').scrollTop-=55;
                }
            },
            //hover事件
            changeClass(index,name){
                this.active1=index;
                this.hovName=name;
            },
            //鼠标增加事件
            mouseAdd(name){
                if($.inArray(name, this.member)===-1){
//                    this.organize
                    this.member.push(name);
                    this.keywords='';
                    this.search();
                    this.active1=-1;
                }
            },
            //键盘enter事件
            keydownAdd(){
                if(this.hovName!==''&& $.inArray(this.hovName, this.member)===-1){
                    this.member.push(this.hovName)
                    this.keywords='';
                    this.search();
                    this.active1=-1;
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
                this.isChecked();

            },
            //选择成员并发回父组件
            selectUser(){
                this.$emit('Staff',this.member);
                $('#selectCustom').modal('hide');
                this.member=[];
            },
//            checkedAll: function() {
//                var _this = this;
//                if (this.checked) {//实现全选
//                    _this.checkboxModel = [];
//                    _this.organizeList.forEach(function(item) {
//                        _this.checkboxModel.push(item.name);
//                    });
//                }else{//实现反选
//                    _this.checkboxModel = [];
//                }
//                this.member=this.checkboxModel;
//            },
            checkedOne:  function (name){
                if($.inArray(name, this.member)===-1){
                    this.member.push(name);
                }else {
                    this.member=this.member.filter((x)=>x!==name);
                }
            },
            isChecked(){
                this.checkbox1=[];
                for(var i=0;i<this.member.length;i++){
                    for(var j=0;j<this.checkboxModel.length;j++){
                        if(this.checkboxModel[j].name===this.member[i]){
                            this.checkbox1.push(this.checkboxModel[j]);
                        }
                    }
                }
                this.checkboxModel=this.checkbox1;

            },
        },
    }
</script>


<style scoped>
    .modal-body{
        overflow-y: auto;
        background: #fafafc;
    }
    .hov{
        background:#f1f2f7;
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
        height: 400px;
        border:1px solid #ccc;
        border-radius: 5px;
        background: #ffffff;
    }
    .boxHead{
        text-align: center;
        padding:5px;
        font-weight: bold;
    }
    .organizeList ul li:hover{
        background: #f1f2f7;;
    }
    ul li{
        cursor: pointer;
        padding: 4px 20px;
    }

    .box-body{
        max-height: 280px;
        overflow: auto;
        background: #ffffff;
    }
    .scoll::-webkit-scrollbar {
        width:8px;
    }
    .scoll::-webkit-scrollbar-button    {
        background-color:#ffff;
    }
    .scoll::-webkit-scrollbar-track     {
        background:#ffffff;
    }
    .scoll::-webkit-scrollbar-thumb{
        background:#ccc;
        border-radius:10px;
    }
    li{
        cursor: pointer;
    }
    .form-control{
        border: none;
    }
    input{
        margin-bottom:0;
    }
    .head{
        display: inline-block;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 1px solid #eeeeee;
        background: url(../../assets/img/chat-avatar.jpg) no-repeat -5px -5px;
    }
    p {
       margin: 2px;
    }
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }
    .check {
        display: inline-block;
        padding: 5px 0;
        font-size: 14px;
        margin-top: -3px;
    }
    #box-body li{
        height: 50px;
    }
    .info{
        display: inline-block;
        line-height: 36px;
        width: 150px;
    }
</style>
