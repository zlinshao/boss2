<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>科目管理</li>
            <li class="active">归类</li>
        </ol>

        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" v-show="operId==0" role="form">
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="">所有归属</option>
                        <option value="1">栖霞</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="">所有类型</option>
                        <option value="1">栖霞</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="">所有归类</option>
                        <option value="1">栖霞</option>
                    </select>
                </div>
                <div class="input-group bootstrap-timepicker">
                    <label class="sr-only" for="search_info">搜索</label>
                    <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格"  @keydown.enter.prevent="">
                    <span class="input-group-btn">
                            <button class="btn btn-success" id="search" type="button" @click=""><i class="fa fa-search"></i></button>
                        </span>
                </div>

                <div class="form-group pull-right">
                    <a class="btn btn-success" data-toggle="modal" data-target="#myModal">
                        <i class="fa fa-plus-square"></i>&nbsp;新增归类
                    </a>
                </div>
            </form>

            <div class="choosed" v-show="operId!=0">
                <ul class="clearFix">
                    <li><a>已选中&nbsp;1&nbsp;项</a></li>
                    <li>
                        <a @click="oper">编辑</a>
                    </li>
                </ul>
            </div>
        </div>

        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">归属</th>
                        <th class="text-center">归类</th>
                        <th class="text-center">类型</th>
                        <th class="text-center">备注</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="item in cont.myData">
                        <td>
                            <input type="checkbox" :value="item.id" :checked="operId===item.id" @click="changeIndex($event,item.id)">
                        </td>
                        <td>{{item.ascription.name}}</td>
                        <td>{{item.classify.name}}</td>
                        <td>{{item.type.name}}</td>
                        <td>{{item.remark}}</td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>


        <!--modal-->
        <div class="modal fade full-width-modal-right" id="myModal" tabindex="-1" aria-hidden="true" data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="clearForm"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>

                    <div class="modal-body clearFix">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">归属:</label>
                            <div class="col-sm-8">
                                <div class="dropdown">
                                    <select name="" class="form-control">
                                        <option value="0">乐伽</option>
                                        <option value="1">乐品</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">归类:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">类型:</label>
                            <div class="col-sm-8">
                                <div class="dropdown">
                                    <select name="" class="form-control">
                                        <option value="0">收入</option>
                                        <option value="1">支出</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">备注:</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-show="isAdd">保存</button>
                        <button type="button" class="btn btn-primary" v-show="!isAdd">修改</button>
                        <button type="button" class="btn btn-primary" v-show="!isAdd" data-toggle="modal" data-target="#delete">删除</button>
                    </div>
                </div>
            </div>
        </div>
        <Delete :msg="cont" @yes="getData"></Delete>
        <Page :pg="paging" @pag="getPage"></Page>
        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>
<style scoped>
    label{
        line-height: 34px;
    }
    .choosed{
        /*padding-bottom: 10px;*/
    }
    .choosed ul li{
        float: left;
    }
    .choosed ul li+li:before{
        content: '|';
        display: inline-block;
        margin: 0 10px;
    }
    tbody tr input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
</style>
<script>
    import Delete from '../../common/delete.vue'
    import Page from '../../common/page.vue'
    import Status from '../../common/status.vue';



    export default{
        data(){
            return {
                operId : 0,
                paging : '',
                page : 1,                  // 当前页数

                title : '',
                isAdd : true,       // 是否新增
                cont: {
                    myData: [],      //列表数据
                    nowIndex: '',      //删除索引
                },
                pramas : {
                    ascription : '',        // 归属
                    classify : '',          // 归类
                    type : '',              // 类型
                    remark : ''             // 备注
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
        created () {
            this.classifyList();
        },
        components: {Delete,Page,Status},
        methods: {
            changeIndex(ev,id){
//                console.log("一开始"+this.operId);
                if (ev.currentTarget.checked){
                    this.operId = id;
//                    console.log(this.operId);
                }else {
                    this.operId = 0;
                }


            },
            classifyList(){
                this.$http.get('json/subject.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.cont.myData = res.data.data.classifyList;
//                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })
            },
            addNew(){
                // 新增
                this.title = '新增归类';
                this.isAdd = true;
            },
            operation(id,index){
                // 编辑
                this.title = '编辑归类';
                this.isAdd = false;
                this.cont.nowIndex = index;
                console.log(id);
            },
            getData(data){
                // 确认删除
//                this.cont.myData.splice(this.cont.nowIndex, 1);

            },
            clearForm(){
                this.pramas.ascription = '';
                this.pramas.classify = '';
                this.pramas.type = '';
                this.pramas.remark = '';
                $('#myModal').modal('hide');
            },
            getPage(){

            },
            oper(){
                console.log(this.operId);
                this.title = '编辑归类';
                this.isAdd = false;
                // 先请求

//                请求成功打开模态框
                $('#myModal').modal('show');
//                失败弹出错误信息
                /*this.info.state_error = true;
                 this.info.error = '您没有编辑权限';*/

            }
        }
    }
</script>