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
                            <select name="" class="form-control" v-model="params.belong" @change="search">
                                <option value="">所有归属</option>
                                <option :value="value" v-for="(key,value) in dict.subject_root">{{key}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select name="" class="form-control" v-model="params.er_type" @change="search">
                                <option value="">所有类型</option>
                                <option :value="value" v-for="(key,value) in dict.er_type">{{key}}</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="科目名称"  @keydown.enter.prevent="search" v-model="params.search">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
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
                            <h5><a><i class="fa fa-times-circle-o"></i>&nbsp;删除</a></h5>
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
                            <td colspan="5">暂无数据...</td>
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
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" >×</button>
                            <h4 class="modal-title">{{title}}</h4>
                        </div>
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <div class="form-group">
                                    <label class="col-sm-3 control-label">归属</label>
                                    <div class="col-sm-8">
                                        <div class="dropdown">
                                            <select name="" class="form-control">
                                                <option value="1">乐伽</option>
                                                <option value="2">乐品</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-3 control-label">科目</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-3 control-label">科目</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control"/>
                                        <!--<datalist id="cars">
                                            <option value="BMW">
                                            <option value="Ford">
                                            <option value="Volvo">
                                        </datalist>-->
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-sm-3 control-label">类型</label>
                                    <div class="col-sm-8">
                                        <div class="dropdown">
                                            <select name="" class="form-control">
                                                <option value="1">收入</option>
                                                <option value="2">支出</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-group">
                                    <label class="col-sm-3 control-label">备注</label>
                                    <div class="col-sm-8">
                                        <input type="text" class="form-control">
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" v-show="isAdd">保存</button>
                            <button type="button" class="btn btn-primary" v-show="!isAdd">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--<Delete :msg="cont" @yes="getData"></Delete>-->

        <Page :pg="paging" @pag="getPage"></Page>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    .table-hover > tbody > tr.lightYellow {
        background-color: #fffcd9;
    }
</style>
<script>
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';

    export default{
        components: {Page,Status},
        data(){
            return {
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

                formData : {
                    belong : '',
                    er_type : '',

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
                }
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
                console.log(this.operId);
                this.$http.get('account/subject/'+this.operId)
                    .then(
                        console.log
                    )
                $('#myModal').modal('show');
            },
            getData(data){
                // 确认删除
//                this.cont.myData.splice(this.cont.nowIndex, 1);

            },
            clearForm(){
                /*this.pramas.ascription = '';
                this.pramas.classify = '';
                this.pramas.subject = '';
                this.pramas.type = '';
                this.pramas.remark = '';*/
                $('#myModal').find('input').val('');
                $('#myModal').find('select').val('');

                $('#myModal').modal('hide');
            },
            getPage(data){
                this.page = data;
            },
            search(){
//                console.log(this.params);
                this.page = 1;
//                this.params['page'] = 1;
                this.operId = 0;
                this.filter();
            },
            filter(){
                this.$http.get('account/subject?page='+this.page,{
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
            }
        }
    }
</script>