<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>科目管理</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div v-show="operId==0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select name="" class="form-control" v-model="params.belong" @change="search(1)">
                                <option value="">所有归属</option>
                                <option :value="value" v-for="(key,value) in dict.subject_root">{{key}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select name="" class="form-control" v-model="params.er_type" @change="search(1)">
                                <option value="">所有类型</option>
                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="科目名称"  @keydown.enter.prevent="search(1)" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group pull-right">
                            <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addNew">
                                <i class="fa fa-plus-square"></i>&nbsp;新增科目
                            </a>
                        </div>
                    </form>
                </div>

                <div v-show="operId!=0" class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5 @click="oper"><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5 @click="dele"><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>


        <!--表格-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th></th>
                            <th class="text-center">归属</th>
                            <th class="text-center">科目</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr :class="{'lightYellow' : operId===item.id , 'text-center' : true}" v-for="item in myData">
                            <td>
                                <input type="checkbox" :checked="operId===item.id" @click="changeIndex($event,item.id)">
                            </td>
                            <td>{{item.root_id==0?'':dict.subject_root[item.root_id]}}</td>
                            <td>{{item.title}}</td>
                            <td>{{dict.er_type[item.er_type]}}</td>
                            <td>{{item.remark}}</td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="5" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" aria-hidden="true" @click="clearForm">×</button>
                            <h4 class="modal-title">{{title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">上级科目</label>
                                    <div class="col-sm-8 selectSubject">
                                        <input type="text" class="form-control" readonly @click="getBaseSubject" v-model="Superior_name"/>
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
                                    <div class="col-sm-2">
                                        <button type="button" class="btn btn-primary" @click="reset">重置</button>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">科目名称<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <input type="text" class="form-control" v-model="formData.title">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">类型<sup class="required">*</sup></label>
                                    <div class="col-sm-10">
                                        <div class="dropdown">
                                            <select name="" class="form-control" v-model="formData.er_type" :disabled="formData.superior_id==0">
                                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <label class="col-sm-2 control-label">备注</label>
                                    <div class="col-sm-10">
                                        <textarea class="form-control" v-model="formData.remark"></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-default"  @click="clearForm">取消</button>
                            <button type="button" class="btn btn-primary" v-show="isAdd" @click="add">保存</button>
                            <button type="button" class="btn btn-primary" v-show="!isAdd" @click="modify">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--<Delete :msg="cont" @yes="getData"></Delete>-->

        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
        <!--Confirm-->
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
    </div>
</template>

<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';
    import Confirm from '../../common/confirm.vue'

    export default{
        components: {Page,Status,Confirm},
        data(){
            return {
                beforePage : 1,
                dict : {},

                isShow : false,

                operId : 0,
                paging : '',
                page : '',

                title : '',
                isAdd : true,       // 是否新增

                myData: [],      //列表数据

                params : {
                    belong : '',
                    er_type : '',
                    search : ''
                },

                showChooseSubject : false,
                subjectData : [],
                curSuperior_id : 0,
                Superior_name : '',

                formData : {
                    title : '',
                    er_type : 3,
                    superior_id : 0,
                    remark : ''

                },
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                confirmMsg: {
                    msg: '',
                },
            }
        },
        mounted (){
            this.$http.get('revenue/glee_collect/dict')
                .then(
//                    console.log
                    (res) => {
                        this.dict = res.data;
                        this.subjectList();
                    }
                );

        },
        watch : {
            'formData.superior_id' : {
                handler(val){
                    if (val==0){
                        this.formData.er_type = 3;
                    }
                }
            }
        },
        methods : {
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            subjectList(){
                this.$http.get('account/subject').then((res) => {
//                    console.log(res.data);
                    if (res.data.code==18300){
                        this.myData = res.data.data.data;
                        this.paging = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.isShow = true;
                    }

//                    this.paging = res.data.data.pages;
                })
            },
            addNew(){
                // 新增
                this.title = '新增科目';
                this.isAdd = true;
            },
            oper(){
                // 编辑
                this.title = '编辑科目';
                this.isAdd = false;
//                console.log(this.operId);
                this.$http.get('account/subject/'+this.operId)
                    .then(
//                        console.log
                        (res) =>{
//                            console.log(res.data.data);
                            let val = res.data.data;
                            this.formData.title = val.title;
                            this.formData.er_type = val.er_type;
                            this.formData.superior_id = val.superior_id;
                            this.formData.remark = val.remark;
                            this.curSuperior_id = val.superior_id;

                            if (this.formData.superior_id!=0){
                                this.$http.get('account/subject/'+this.formData.superior_id).then((res) => this.Superior_name = res.data.data.title)
                            }

                        }
                    );
                $('#myModal').modal('show');
            },

            clearForm(){
                this.curSuperior_id = 0;
                this.Superior_name = '';
                this.formData.title = '';
                this.formData.er_type = 3;
                this.formData.superior_id = 0;
                this.formData.remark = '';

                this.reset();
//                console.log(this.Superior_name)
                $('#myModal').modal('hide');
            },
            getPage(data){
                this.page = data;
                this.filter();
            },
            search(val){
//                console.log(this.params);
//                this.params['page'] = 1;
                this.filter(val);
            },
            filter(val){
                this.beforePage = val;
                this.operId = 0;
                this.$http.get('account/subject?page='+val,{
                    params : this.params
                })
                    .then(
                        (res) => {
                            if (res.data.code==18300){
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.isShow = false;
                            } else {
                                this.myData = [];
                                this.paging = 1;
                                this.isShow = true;
                            }
                        }
                    )
            },


            changeCurId(id,name){
                this.curSuperior_id = id;
                this.Superior_name = name;
            },
            // 获取科目
            getBaseSubject(){
                if(this.showChooseSubject){
                    this.reset();
                } else {
                    this.showChooseSubject = !this.showChooseSubject;
                    this.curSuperior_id = 0;
                    this.Superior_name = '';
                    if (this.showChooseSubject){
                        this.$http.get('account/subject/next/'+this.curSuperior_id).then((res)=>{
                            if (res.data.code==18300){
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
                this.formData.superior_id = this.curSuperior_id;
                this.showChooseSubject = false;
                this.subjectData = [];
            },
            reset(){
                this.curSuperior_id = 0;
                this.formData.superior_id = 0;
                this.Superior_name = '';
                this.showChooseSubject = false;
                this.subjectData = [];
            },

            // 新增
            add(){
                this.$http.post('account/subject',this.formData).then((res)=>{
                    console.log(res);
                    if (res.data.code==18310){
                        // 成功
                        this.info.success = '新增科目成功';
                        //显示失败弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        }, 2000);
                        this.clearForm();
                        this.search(1);
                    } else {
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }
                })
            },
            // 编辑
            modify(){
                this.$http.put('account/subject/'+this.operId,this.formData)
                    .then((res) =>{
                        if (res.data.code==18310){
                            // 成功
                            this.info.success = '修改科目成功';
                            //显示失败弹窗 ***
                            this.info.state_success = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_success = false;
                            }, 2000);
                            this.clearForm();
                            this.search(1);
                        } else {
                            this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            this.info.state_error = true;
                            //一秒自动关闭失败信息弹窗 ***
                            setTimeout(() => {
                                this.info.state_error = false;
                            }, 2000);
                        }
                    })
            },

            dele(){
                this.confirmMsg.msg = '确定删除此科目吗？';
                $('#confirm').modal('show');
            },
            // 删除
            getConfirm(){
                this.$http.get('account/subject/delete/'+this.operId).then((res)=>{
                    if (res.data.code==18310){
                        // 成功
                        this.info.success = '删除科目成功';
                        //显示失败弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        }, 2000);
                        this.filter();
                    } else {
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭失败信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }
                })
            }
        }
    }
</script>

<style scoped>
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }

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

    textarea{
        max-width: 100%;
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }
</style>