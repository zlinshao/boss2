<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade selectCustom" id="selectCustom" data-backdrop="static">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">选人</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-7 col-sm-7">
                                <div class="box" @click="inputFocus" id="borderBlue">
                                    <div id="tagsinput_tagsinput" class="tagsinput " style="border: none">
                                        <span class="tag" v-for="item in memberList" v-if="memberList!=''">
                                            <span>{{item.name}}&nbsp;</span>
                                            <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                        </span>
                                        <input v-model="keywords" @keyup="search($event)" @keydown.8="backSpace"
                                               style="width: 85px"
                                               placeholder="搜索" class="focusInput" @keydown.down="changeDown"
                                               @keydown.up="changeUp" @keydown.13='keyDownAdd'>
                                    </div>
                                    <div class="searchList box-body scoll" id="searchList" style="max-height: 348px">
                                        <ul>
                                            <li v-for="(item,index) in searchList" :class="{'hov':active_li==index}"
                                                @mouseover="changeClass(index,item)" @click="mouseAdd(item)">
                                                <div class="head">
                                                    <img :src="item.avatar" v-if="item.avatar !== '' ">
                                                    <img src="../../assets/img/head.png" v-if="item.avatar === '' ">
                                                </div>

                                                <div style="display: inline-block">
                                                    <p style="height:14px;font-size: 14px;color: #2a3542">
                                                        {{item.name}}</p>
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
                                            <a @click="breadcrumbSearch(0)">组织架构</a>
                                            <a v-for="(item,index) in breadcrumbList">
                                                <span @click="breadcrumbSearch(item,index)">&nbsp;&gt;&nbsp;{{item.name}}</span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class=" box-body scoll" style="max-height: 304px">
                                        <ul class="organizeList">
                                            <!--<li style="border-bottom: 1px dotted #CCCCCC">-->
                                            <!--<div>-->
                                            <!--<input type="checkbox">-->
                                            <!--<span>全选</span>-->
                                            <!--</div>-->
                                            <!--</li>-->
                                            <li v-for="item in organizeList">
                                                <div v-if="item.type === 'department'">
                                                    <input type="checkbox" @click="selectDpm(item,$event)"
                                                           v-model='checkboxModel' :disabled = 'onlyStaff'
                                                           :value="item.id">
                                                    <span @click="getNextLevel(item)">{{item.name}}</span>
                                                    <span class="pull-right">{{item.member_num}}人 </span>
                                                </div>
                                                <div v-if="item.type === 'people'" @click="selectStaff(item)">
                                                    <div class="head">
                                                        <img :src="item.avatar" v-if="item.avatar !== ''"
                                                             style="vertical-align: top">
                                                        <img src="../../assets/img/head.png" v-if="item.avatar === ''"
                                                             style="vertical-align: top">
                                                        <!--对号-->
                                                        <span class="fa" :class="{'fa-check': shadeList.indexOf(item.id) > -1}"></span>
                                                        <!--遮罩-->
                                                        <span :class="{'shade': shadeList.indexOf(item.id) > -1}"></span>

                                                        <span>{{item.name}}</span>
                                                        <span v-if="item.vocation !== '' && item.vocation !== null">
                                                            ({{item.vocation}})
                                                        </span>
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
                        <button type="button" class="btn btn-primary" @click="confirmSelect">确定</button>
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
        props: ['configure'],
        components: {Status},
        data(){
            return {
                searchList: [],          //搜索列表
                memberList: [],          //显示label数组
                keywords: '',            //搜索关键字
                active_li: '-1',         //当前li索引
                hoverMember: [],         //hover名字
                checkboxModel: [],       //选中数组

                organize: {              //发送回父组件的数据
                    department: [        //部门

                    ],
                    staff: [             //员工

                    ]
                },
                info: {                  //提示信息
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                organizeList: [],         //组织架构数据列表
                breadcrumbList: [],       //面包屑列表
                onlyDepartment: false,    //只选部门
                onlyStaff: false,         //只选员工
                myConfigure: [],          //配置项
                lengthLimit : false,      //选择长度限制
                shadeList : [],           //遮罩层id 列表
            }
        },
        created(){
            this.getNextLevel(0)
        },
        watch: {
            memberList(val, oldVal){
                this.checkboxModel = this.isChecked(val, this.checkboxModel); //复选框
                this.shadeList = this.isShade(val, this.shadeList);
                if (this.onlyDepartment) {
                    for (let i = 0; i < val.length; i++) {
                        if (val[i].type === 'people') {
                            val.splice(i, 1);
                            this.errorInfo('您只能选择部门');
                        }
                    }
                }
                if(this.lengthLimit && val.length > this.myConfigure.length){
                    val.splice(this.myConfigure.length,1);
                    this.errorInfo('选择超过限制');
                }
            },
            shadeList(val,oldVal){   //遮罩层
                if(this.lengthLimit && val.length > this.myConfigure.length){
                    val.splice(this.myConfigure.length,1);
                    this.errorInfo('选择超过限制');
                }
            },
            configure(val){
                this.myConfigure = val;
                if (val.type === 'department') {
                    this.onlyStaff = false;
                    this.onlyDepartment = true;
                } else if (val.type === 'staff') {
                    this.onlyDepartment = false;
                    this.onlyStaff = true;
                } else {
                    this.onlyDepartment = false;
                    this.onlyStaff = false;
                }
                if(val.length !== '' && val.length !== undefined){
                    this.lengthLimit = true;
                }
                if(val.id !== '' && val.id !== undefined){
                    this.getNextLevel(val)
                }
            }
        },
        methods: {
            /*******************************右侧组织架构***************************************/
            getOrganize(id){    //请求部门数据
                this.$http.post('index/profile/index/id/' + id).then((res) => {
                    if (res.data.code === '90020') {
                        this.organizeList = res.data.data.data;
                    } else {
                        this.organizeList = [];
                        this.errorInfo(res.data.msg);
                    }
                })
            },
            getNextLevel(val){  //获取下级部门
                if (val === 0) {
                    this.getOrganize(0);
                    this.breadcrumbList = [];
                } else {
                    this.getOrganize(val.id);
                    this.breadcrumbList.push(val);

                }
            },
            breadcrumbSearch(val, index){    //面包屑导航
                if (val === 0) {
                    this.getOrganize(0);
                    this.breadcrumbList = [];
                } else {
                    this.getOrganize(val.id);
                    this.breadcrumbList.splice(index + 1, this.breadcrumbList.length);
                }
            },
            selectDpm(val, e){   //选择部门
                if (e.target.checked) {
                    this.memberList.push(val);
                } else {
                    for (let i = 0; i < this.memberList.length; i++) {
                        if (val.id === this.memberList[i].id && val.name === this.memberList[i].name) {
                            this.memberList.splice(i, 1)
                        }
                    }
                }
            },
            selectStaff(val){    //选择员工
                let exist;
                exist = this.isExist(val, this.memberList);
                if (!exist) {
                    this.memberList.push(val);
                    this.shadeList.push(val.id);
                } else {
                    for (let i = 0; i < this.memberList.length; i++) {
                        if (val.id === this.memberList[i].id && val.name === this.memberList[i].name) {
                            this.memberList.splice(i, 1)
                            this.shadeList.splice(i, 1)
                        }
                    }
                }
            },
            /*******************************左侧选人框***************************************/
            search(e){  //关键词搜索事件
                if (this.keywords !== '') {
                    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
                        this.$http.get('index/profile/searchStaff/keywords/' + this.keywords).then((res) => {
                            if (res.data.code === '90010') {
                                this.searchList = res.data.data;
                            } else {
                                this.searchList = [];
                                this.errorInfo(res.data.msg);
                            }
                        })
                    }
                } else {
                    this.searchList = [];
                }
            },
            //键盘向下事件
            changeDown(){
                if (this.searchList.length !== 0) {
                    this.active_li++;
                    if (this.active_li === this.searchList.length) this.active_li = this.searchList.length - 1;
                    this.hoverMember = this.searchList[this.active_li];
                    if (this.active_li > 2) document.getElementById('searchList').scrollTop += 55;
                }
            },
            //键盘向上事件
            changeUp(){
                if (this.searchList.length !== 0) {
                    this.active_li--;
                    if (this.active_li <= -1) {
                        this.active_li = -1;
                        this.hoverMember = [];
                    } else if (this.active_li > -1) {
                        this.hoverMember = this.searchList[this.active_li];
                    }
                    if (this.active_li < this.searchList.length - 4) document.getElementById('searchList').scrollTop -= 55;
                }
            },
            //hover事件
            changeClass(index, item){
                this.active_li = index;
                this.hoverMember = item;
            },
            //鼠标增加事件
            mouseAdd(item){
                let exist;
                exist = this.isExist(item, this.memberList);
                if (!exist) {
                    this.memberList.push(item);
                    this.keywords = '';
                    this.active_li = -1;
                    this.hoverMember = [];
                    this.search();
                } else {
                    this.errorInfo('您已经选择该成员');
                }
            },
            //键盘enter事件
            keyDownAdd(){
                if(!Array.isArray(this.hoverMember)){
                    let exist;
                    exist = this.isExist(this.hoverMember, this.memberList);
                    if (!exist) {
                        this.memberList.push(this.hoverMember);
                        this.keywords = '';
                        this.active_li = -1;
                        this.hoverMember = [];
                        this.search();
                    } else {
                        this.errorInfo('您已经选择该成员');
                    }
                }
            },
            //回车删除事件
            backSpace(){
                this.hoverMember = [];
                if (this.keywords === '' && this.memberList.length > 0) {
                    this.memberList.pop();
                }
            },
            //删除成员
            deleteName(item){
                this.memberList = this.memberList.filter((x) => x !== item);

            },

            inputFocus(){   //点击选人框，input触发focus事件
                $(".focusInput").focus();
            },

            //************************************************************

            successInfo(msg){    //正确信息提示
                this.info.success = msg;
                this.info.state_success = true;
            },
            errorInfo(msg){     //错误信息提示
                this.info.error = msg;
                this.info.state_error = true;
            },
            isExist(select, memberList){     //判断该id是否已经被选中
                for (let i = 0; i < memberList.length; i++) {
                    if (select.id === memberList[i].id && select.name === this.memberList[i].name) {
                        return true;
                    }
                }
                return false;
            },
            isChecked(a, b){    //复选框已选择
                let result = [];
                for (let i = 0; i < a.length; i++) {
                    for (let j = 0; j < b.length; j++) {
                        if (b[j] === a[i].id && a[i].type === 'department') {
                            result.push(b[j]);
                        }
                    }
                }
                return result;
            },
            isShade(a,b){       //遮罩层是否存在
                let result = [];
                for (let i = 0; i < a.length; i++) {
                    for (let j = 0; j < b.length; j++) {
                        if (b[j] === a[i].id && a[i].type === 'people') {
                            result.push(b[j]);
                        }
                    }
                }
                return result;
            },
            closeModal(){   //关闭模态框
                this.organize = {
                    department: [],
                    staff: []
                };
                this.memberList = [];
                this.shadeList = [];
                $('.selectCustom').modal('hide');
            },
            confirmSelect(){    //确认选择
                for (let i = 0; i < this.memberList.length; i++) {
                    if (this.memberList[i].type === 'department') {
                        this.organize.department.push(this.memberList[i]);
                    } else {
                        this.organize.staff.push(this.memberList[i]);
                    }
                }
                this.$emit('Staff',this.organize);
                this.closeModal();
            },
        },
    }
</script>


<style scoped>
    .modal-body {
        background: #fafafc;
    }

    .hov {
        background: #f1f2f7;
    }

    .iconic-input i {
        margin: 8px 25px 8px 10px;
    }

    .col-lg-5, .col-lg-7 {
        padding: 8px;
    }

    @media (max-width: 1200px) {
        .box {
            height: 200px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }
    }

    .box {
        height: 400px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #ffffff;
    }

    #borderBlue:hover {
        border: 1px solid #52B9D5;
    }

    .organizeList > li {
        height: 50px;
        line-height: 40px;
    }

    .organizeList li:hover {
        background: #f1f2f7;
    }

    ul li {
        cursor: pointer;
        padding: 4px 10px;
    }

    .box-body {
        max-height: 317px;
        overflow: auto;
        background: #ffffff;
    }

    .scoll::-webkit-scrollbar {
        width: 8px;
    }

    .scoll::-webkit-scrollbar-button {
        background-color: #ffff;
    }

    .scoll::-webkit-scrollbar-track {
        background: #ffffff;
    }

    .scoll::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 10px;
    }

    li {
        cursor: pointer;
    }

    input {
        margin-bottom: 0;
    }

    .head {
        position: relative;
        display: inline-block;
    }

    .head img {
        vertical-align: baseline;
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

    #box-body li {
        height: 50px;
    }

    * {
        user-select: none;
    }

    .boxHead {
        text-align: center;
        padding: 5px;
        font-weight: bold;
    }

    .fa-check {
        color: #ffffff;
        font-size: 20px;
        position: absolute;
        left: 9px;
        top: 8px;
        z-index: 1
    }

    .shade {
        width: 38px;
        height: 38px;
        background: #777777;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 50%;
        opacity: .6
    }
    .modal{
        z-index: 1100;
    }
    @media (min-width: 768px) {
        .modal-dialog{
            width: 676px;
        }
    }
</style>
