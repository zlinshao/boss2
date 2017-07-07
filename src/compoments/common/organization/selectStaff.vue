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
                    <div class="modal-body scoll">
                            <div class="row">
                                <div class="col-lg-7" >
                                    <div class="box">
                                        <div id="tagsinput_tagsinput" class="tagsinput " style="border: none">
                                            <span class="tag" v-for="item in member" v-if="member!=''">
                                                <span >{{item.name}}&nbsp;&nbsp;</span>
                                                <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                            </span>
                                            <input v-model="keywords" @keyup="search" @keydown.8="backSpace" style="width: 65px"
                                            placeholder="搜索"       @keydown.down="changeDown" @keydown.up="changeUp" @keydown.13='keydownAdd'>
                                        </div>
                                        <div class="searchList box-body scoll" id="d1" style="max-height: 348px">
                                            <ul>
                                                <li v-for="(item,index) in searchList" :class="{'hov':active1==index}"
                                                    @mouseover="changeClass(index,item)" @click="mouseAdd(item)">
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
                                                                :disabled="noDepartment || isMarket.indexOf(item.id)>-1"
                                                                   @click="checkedOne(item)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <button @click="getSecond(item.id,item.name)" class="btn btn-white"
                                                                    :disabled="checkIndex.indexOf(item.id)>-1" style="border: none">
                                                                {{item.name}}
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==2">
                                                        <label class="checkbox-inline check">
                                                            <input type="checkbox" class="pull-left" value="1" v-model='checkboxModel'
                                                                   :disabled="noDepartment"   @click="checkedOne(item)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <button @click="getThird(item.id,item.name)" style="border: none"
                                                                    :disabled="checkIndex.indexOf(item.id)>-1"  class="btn btn-white">
                                                                {{item.name}}
                                                            </button>
                                                        </div>
                                                    </li>
                                                    <li v-for="item in organizeList" v-if="type==3" @click="select(item.id,item.real_name)"
                                                        :disabled='true'>
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
                                                                   :disabled="noDepartment"  @click="checkedOne(item)" :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <button @click="getFour(item.id,item.name)" class="btn btn-white"
                                                                    :disabled="checkIndex.indexOf(item.id)>-1" style="border: none">
                                                                {{item.name}}
                                                            </button>
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
                                                                   :disabled="noDepartment"  @click="checkedOne(item)"   :value="item">
                                                        </label>
                                                        <div class="info">
                                                            <button @click="getFive(item.id,item.name)" class="btn btn-white"
                                                                    :disabled="checkIndex.indexOf(item.id)>-1" style="border: none" >
                                                                {{item.name}}
                                                            </button>
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
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../status.vue'
    export default {
        props:['configure'],
        components:{Status},
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
                checkIndex:[],
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
                    department:[

                        ],
                    staff:[

                    ]
                },
                noDepartment:false,
                noStaff:false,
                isMarket:[],
                myConfigure:{},
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        mounted(){
          this.getFirst();
        },
        watch: {//深度 watcher
            configure(val){
                this.myConfigure=val;
                if(val.class==='selectType'){
                    if(val.type==='all'){
                        this.noDepartment=false;
                        this.noStaff=false;
                    }else if(val.type==='staff'){
                        this.noDepartment=true;
                        this.noStaff=false;
                    }else if(val.type==='department'){
                        this.noStaff=true;
                        this.noDepartment=false;
                    }
                }else if(val.class==='department'){
                    let arr=[2,4,9,10];
                    for(let i=0;i<val.id.length;i++){
                        this.isMarket=arr.filter((x)=>x!==val.id[i]);
                        this.checkIndex=arr.filter((x)=>x!==val.id[i]);
                    }
                }else if(val.class==='amount'){
                    this.noDepartment=true;
                }
            },
            'member':{
                handler: function (val, oldVal) {
                    if(this.myConfigure.name==='amount'){
                        if(this.member.length>this.myConfigure.length){
                            this.member.splice(this.myConfigure.length,1);
                            this.info.success = '选择超过限制';
                            //显示成功弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭成功信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            },2000);
                        }
                    }

                },
            }
        },
        methods:{
            /*******************************右侧组织架构***************************************/
            getFirst(){
                this.$http.get('index/profile/dpmtinfo/department_id/'+1+'/type/all').then((res) => {
                    this.organizeList = res.data.department;
                    this.type=1;
                    this.isSecond=false;
                    this.isThird=false;
                    this.isFour=false;
                    this.isFive=false;
                })
            },
            getSecond(id,name){
                this.$http.get('index/profile/dpmtinfo/department_id/'+id+'/type/all').then((res) => {
                    if(res.data.department.length===0){
                        this.organizeList = res.data.user;
                        this.type=3;
                    }else {
                        this.organizeList = res.data.department;
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
                this.$http.get('index/profile/dpmtinfo/department_id/'+id+'/type/all').then((res) => {

                    if(res.data.department.length===0){
                        this.organizeList = res.data.user;
                        this.type=5;
                    }else {
                        this.organizeList = res.data.department;
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
                this.$http.get('index/profile/dpmtinfo/department_id/'+id+'/type/all').then((res) => {
                    if(res.data.department.length===0){
                        this.organizeList = res.data.user;
                        this.type=7;
                    }else {
                        this.organizeList = res.data.department;
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
                this.$http.get('index/profile/dpmtinfo/department_id/'+id+'/type/all').then((res) => {
                    this.organizeList = res.data.user;
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
                let staff={};
                let isExist=false;
                staff.flag=1;
                staff.id=id;
                staff.name=name;
                for(let i=0;i<this.member.length;i++){
                    if(id===this.member[i].id){
                        isExist=true;
                    }
                }
                if(!this.noStaff){
                    if(!isExist){
                        this.member.push(staff);
                        this.organize.staff.push(staff);
                    }else{
                        for(let i=0;i<this.member.length;i++){
                            if(id===this.member[i].id){
                                this.member.splice(i,1)
                                this.organize.staff.splice(i,1)
                            }
                        }
                    }
                }else {
                    this.info.success = '您只能选择部门';
                    //显示成功弹窗 ***
                    this.info.state_success = true;
                    //一秒自动关闭成功信息弹窗 ***
                    setTimeout(() => {
                        this.info.state_success = false;
                    },2000);
                }

            },
            /*******************************左侧选人框***************************************/
            //关键词搜索事件
            search(){
                if (this.keywords !=='') {
                    this.$http.get('index/profile/searchStaff/keywords/' +
                        decodeURI(this.keywords)).then((res) => {
                        if(res.data!==undefined){
                            this.searchList = res.data.data;
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
            changeClass(index,item){
                this.active1=index;
                this.hovName=item.real_name;
                this.hovId=item.id;
            },
            //鼠标增加事件
            mouseAdd(item){
                if($.inArray(item.real_name, this.member)===-1){
                    let staff={}
                    staff.flag=1;
                    staff.id=this.hovId;
                    staff.name=this.hovName;
                    this.member.push(staff);
                    this.organize.staff.push(staff);
                    this.keywords='';
                    this.search();
                    this.active1=-1;
                }
            },
            //键盘enter事件
            keydownAdd(){
                if(this.hovName!==''&& $.inArray(this.hovName, this.member)===-1){
                    let staff={}
                    staff.flag=1;
                    staff.id=this.hovId;
                    staff.name=this.hovName;
                    this.member.push(staff);
                    this.organize.staff.push(staff);
                    this.keywords='';
                    this.search();
                    this.active1=-1;
                }
                this.hovName='';
            },
            //回车删除事件
            backSpace(){
                if(this.keywords===''&& this.member.length>0){
                    if(this.member[this.member.length-1].flag===1){
                        this.member.pop();
                        this.organize.staff.pop();
                    }else {
                        this.member.pop();
                        this.organize.department.pop()
                    }
                    this.isChecked();
                }
            },
            //删除成员
            deleteName(item){
                this.member=this.member.filter((x)=>x!==item);
                if(item.flag===1){
                    this.organize.staff=this.organize.staff.filter((x)=>x!==item);
                }else {
                    this.organize.department=this.organize.department.filter((x)=>x!==item);
                }
                this.isChecked();

            },
            checkedOne:  function (item){
                let _this=this;
                let staff={};
                let isExist=false;
                staff.flag=2;
                staff.id=item.id;
                staff.name=item.name;
                for(let i=0;i<this.member.length;i++){
                    if(item.id===this.member[i].id){
                        isExist=true;
                    }
                }
                if(isExist===false){
                    this.checkIndex.push(item.id);
                    this.member.push(staff);
                    this.organize.department.push(staff);
                }else {
                    this.checkIndex=this.checkIndex.filter((x)=>x!==item.id);
                    for(let i=0;i<this.member.length;i++){
                        if(item.id===this.member[i].id){
                            this.member.splice(i,1)
                            this.organize.department.splice(i,1)
                        }
                    }
                }
            },
            isChecked(){
                this.checkbox1=[];
                this.checkIndex=[];
                for(var i=0;i<this.member.length;i++){
                    for(var j=0;j<this.checkboxModel.length;j++){
                        if(this.checkboxModel[j].name===this.member[i].name){
                            this.checkbox1.push(this.checkboxModel[j]);
                            this.checkIndex.push(this.checkboxModel[j].id)
                        }
                    }
                }
                this.checkboxModel=this.checkbox1;

            },
            //选择成员并发回父组件
            selectUser(){
                this.$emit('Staff',this.organize);
                $('#selectCustom').modal('hide');
                this.organize={
                    department:[

                    ],
                        staff:[

                    ]
                };
                this.member=[];
                this.checkboxModel=[];
                this.checkIndex=[];
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
    .organizeList ul li:hover .btn-white{
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
        background: url(../../../assets/img/chat-avatar.jpg) no-repeat -5px -5px;
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
    .btn-white{
        width: 150px;
        text-align: left;
    }
    .hide{
        display: none;
    }
</style>
