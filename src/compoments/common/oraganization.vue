<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectCustom" id="selectCustom" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close"  aria-label="Close" @click="closeModal" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选人{{checkboxModel}}</h4>
                    </div>
                    <div class="modal-body scoll">
                        <div class="row">
                            <div class="col-lg-7 col-sm-7" >
                                <div class="box" @click="inputFocus" id="borderBlue">
                                    <div id="tagsinput_tagsinput" class="tagsinput " style="border: none">
                                        <span class="tag" v-for="item in memberList" v-if="memberList!=''">
                                            <span >{{item.name}}&nbsp;</span>
                                            <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                        </span>
                                        <input v-model="keywords" @keyup="search($event)" @keydown.8="backSpace" style="width: 85px"
                                        placeholder="搜索" class="focusInput" @keydown.down="changeDown" @keydown.up="changeUp" @keydown.13='keyDownAdd'>
                                    </div>
                                    <div class="searchList box-body scoll" id="searchList" style="max-height: 348px">
                                        <ul>
                                            <li v-for="(item,index) in searchList" :class="{'hov':active_li==index}"
                                                @mouseover="changeClass(index,item)" @click="mouseAdd(item)">
                                                <div class="head">
                                                    <img :src="item.avatar" v-if="item.avatar !== '' ">
                                                </div>
                                                <div class="head">
                                                    <img src="../../assets/img/head.png" alt="" v-if="item.avatar === '' ">
                                                </div>

                                                <div style="display: inline-block">
                                                    <p style="height:14px;font-size: 14px;color: #2a3542">{{item.real_name}}</p>
                                                    <p style="height:10px;font-size: 10px">
                                                        {{item.department[0].name}}&nbsp;
                                                    </p>
                                                    <p style="height:10px;font-size: 10px">{{item.mobile}}</p>
                                                </div>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5 col-sm-5">
                                <div class="box">
                                    <div class="boxHead">组织架构</div>
                                    <ul class="breadcrumb-wrapper">
                                        <li class="breadcrumb">
                                            <a @click="breadcrumbSearch(1)">南京乐伽商业管理有限公司</a>
                                            <a v-for="(item,index) in breadcrumbList">
                                                <span @click="breadcrumbSearch(item,index)">&nbsp;&nbsp;&gt;&nbsp;{{item.name}}</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class=" box-body scoll" style="max-height: 304px">
                                        <ul class="organizeList">
                                            <li style="border-bottom: 1px dotted #CCCCCC">
                                                <div>
                                                    <input type="checkbox">
                                                    <span>全选</span>
                                                </div>
                                            </li>
                                            <li v-for="item in organizeList" class="staff">
                                                <div class="department" v-if="item.type === 'department'">
                                                    <input type="checkbox" @click="selectDpm(item,$event)" v-model='checkboxModel'
                                                           :value="item">
                                                    <span @click="getNextLevel(item)">{{item.name}}</span>
                                                    <span class="pull-right">{{item.member_num}}人 </span>
                                                </div>
                                                <div v-if="item.type === 'people'" >
                                                    <div class="head">
                                                        <img :src="item.avatar" v-if="item.avatar !== '' ">
                                                    </div>
                                                    <div class="head">
                                                        <img src="../../assets/img/head.png" alt="" v-if="item.avatar === '' ">
                                                        <span>{{item.real_name}}</span>
                                                        <span>({{item.vocation}})</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal">关闭</button>
                        <button type="button" class="btn btn-primary">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from './status.vue'
    export default {
        props:['configure'],
        components:{Status},
        data(){
            return{
                searchList:[],          //搜索列表
                memberList:[],          //显示label数组
                keywords:'',            //搜索关键字
                active_li: '-1',        //当前li索引
                hoverMember:'',         //hover名字
                checkboxModel:[],       //选中数组

                organize:{              //发送回父组件的数据
                    department:[        //部门

                        ],
                    staff:[             //员工

                    ]
                },
                info:{                  //提示信息
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                organizeList : [],      //组织架构数据列表
                breadcrumbList : [],
            }
        },
        mounted(){
            this.getNextLevel(1);
        },
        methods:{
            /*******************************右侧组织架构***************************************/
            getOrganize(id){
                this.$http.post('index/profile/index/id/' + id).then((res) => {
                    if(res.data.code === '90020'){
                       this.organizeList = res.data.data.data;
                    }else{
                        this.organizeList = [];
                        this.errorInfo(res.data.msg);
                    }
                })
            },
            getNextLevel(val){
                if(val === 1){
                    this.getOrganize(1);
                    this.breadcrumbList = [];
                }else {
                    this.getOrganize(val.id);
                    this.breadcrumbList.push(val);

                }
            },
            breadcrumbSearch(val,index){
                if(val === 1){
                    this.getOrganize(1);
                    this.breadcrumbList = [];
                }else {
                    this.getOrganize(val.id);
                    this.breadcrumbList.splice(index+1,this.breadcrumbList.length);

                }
            },
            selectDpm(val,e){
                if(e.target.checked === true){
                    this.memberList.push(val);
                }else {
                    for (let i = 0; i < this.memberList.length; i++) {
                        if (val.id === this.memberList[i].id && val.name === this.memberList[i].name) {
                            this.memberList.splice(i, 1)
                        }
                    }
                }
            },
            /*******************************左侧选人框***************************************/
            search(e){  //关键词搜索事件
                if (this.keywords !==''){
                    if(e.key !=='ArrowDown' && e.key !=='ArrowUp'){
                        this.$http.get('index/profile/searchStaff/keywords/' + this.keywords).then((res) => {
                            if(res.data.code === '90010'){
                                this.searchList = res.data.data;
                            }else{
                                this.searchList=[];
                                this.errorInfo(res.data.msg);
                            }
                        })
                    }
                } else {
                    this.searchList=[];
                }
            },
            //键盘向下事件
            changeDown(){
                if(this.searchList.length!==0){
                    this.active_li++;
                    if(this.active_li===this.searchList.length)this.active_li=this.searchList.length-1;
                    this.hoverMember=this.searchList[this.active_li];
                    if (this.active_li>2) document.getElementById('searchList').scrollTop+=55;
                }
            },
            //键盘向上事件
            changeUp(){
                if(this.searchList.length!==0){
                    this.active_li--;
                    if(this.active_li===-2){
                        this.active_li=-1;
                    }else if(this.active_li > -1){
                        this.hoverMember=this.searchList[this.active_li];
                    }
                    if (this.active_li<this.searchList.length-4) document.getElementById('searchList').scrollTop-=55;
                }
            },
            //hover事件
            changeClass(index,item){
                this.active_li=index;
                this.hoverMember=item;
            },
            //鼠标增加事件
            mouseAdd(item){
                let exist;
                exist = this.isExist(item,this.memberList);
                if(!exist){
                    this.memberList.push(item);
                    this.keywords='';
                    this.active_li=-1;
                    this.search();
                }else {
                    this.errorInfo('您已经选择该成员');
                }
            },
            //键盘enter事件
            keyDownAdd(){
                let exist;
                exist = this.isExist(this.hoverMember,this.memberList);
                if(!exist){
                    this.memberList.push(this.hoverMember);
                    this.keywords='';
                    this.active_li=-1;
                    this.search();
                }else {
                    this.errorInfo('您已经选择该成员');
                }
            },
            //回车删除事件
            backSpace(){
                if(this.keywords==='' && this.memberList.length>0){
                    if(this.memberList[this.memberList.length-1].flag===1){
                        this.memberList.pop();
                    }else {
                        this.memberList.pop();
                    }
                }
            },
            //删除成员
            deleteName(item){
                this.memberList = this.memberList.filter((x)=>x!==item);

            },

            inputFocus(){   //点击选人框，input触发focus事件
                $(".focusInput").focus();
            },

            //************************************************************
            closeModal(){   //关闭模态框
                $('#selectCustom').modal('hide');
            },
            successInfo(msg){    //正确信息提示
                this.info.success = msg;
                this.info.state_success = true;
            },
            errorInfo(msg){     //错误信息提示
                this.info.error = msg;
                this.info.state_error = true;
            },
            isExist(select,memberList){     //判断该id是否已经被选中
                for(let i=0;i < memberList.length;i++){
                    if(select.id===memberList[i].id && select.name===this.memberList[i].name){
                        return true;
                    }
                }
                return false;
            },
            isChecked(){

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
    #borderBlue:hover{
        border:1px solid #52B9D5;
    }
    .organizeList>li{
        height: 50px;
        line-height: 40px;
    }
    .organizeList li:hover{
        background: #f1f2f7;
    }
    .staff{
        line-height: 0;
    }
    ul li{
        cursor: pointer;
        padding: 4px 10px;
    }

    .box-body{
        max-height: 317px;
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
    input{
        margin-bottom:0;
    }
    .head{
        display: inline-block;
    }
    .head img{
        vertical-align:baseline;
        display: inline-block;
        width: 38px;
        height: 38px;
        border-radius: 50%;
    }
    p {
       margin: 2px;
    }
    input[type=checkbox] {

        float: left;
        margin-right: 10px;
        margin-top: 11px;
        width: 17px;
        height: 17px;
    }
    #box-body li{
        height: 50px;
    }

    *{
        user-select: none;
    }
    .boxHead{
        text-align: center;
        padding:5px;
        font-weight: bold;
    }
</style>
