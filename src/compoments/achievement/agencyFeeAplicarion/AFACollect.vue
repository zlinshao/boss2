<template>
    <div>
        <ol class="breadcrumb">
            <li>中介费申请</li>
            <li class="active">收房</li>
        </ol>

        <div class="panel col-lg-12">
            <div>
                <form class="form-inline clearFix" role="form">
                    <div class="input-group bootstrap-timepicker">
                        <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                    </div>
                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="0">所有</option>
                            <option value="1">待审核</option>
                            <option value="2">已通过</option>
                        </select>
                    </div>
                    <div class="form-group datetime">
                        <label>
                            <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime" v-model="params.from">
                        </label>
                        <label>
                            <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime" v-model="params.to">
                        </label>
                    </div>
                    <div class="input-group bootstrap-timepicker">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="签收人/房屋地址/价格" @keydown.enter.prevent="search" v-model="params.search">
                        <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search"><i class="fa fa-search"></i></button>
                    </span>
                    </div>
                    <div class="form-group pull-right">
                        <a class="btn btn-success" data-toggle="modal" data-target="#myModal" @click="addNew">
                            <i class="fa fa-plus-square"></i>&nbsp;申请收房中介费
                        </a>
                    </div>

                </form>
                <div class="tagsinput" v-show="filtrate.departmentList.length!=0">
                    <h4>部门</h4>
                    <span class="tag" v-for="item in filtrate.departmentList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteDepartment(item)"></a>
                    </span>
                </div>
                <div class="tagsinput " v-show="filtrate.staffList.length!=0">
                    <h4>员工</h4>
                    <span class="tag" v-for="item in filtrate.staffList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteStaff(item)"></a>
                    </span>
                </div>
            </div>
            <!--<div class="choosed">
                <ul class="clearFix">
                    <li><a>已选中&nbsp;1&nbsp;项</a></li>
                    <li>
                        <a>编辑</a>
                    </li>
                    <li>
                        <a>222</a>
                    </li>
                    <li>
                        <a data-toggle="modal" data-target="#delete">删除</a>
                    </li>
                </ul>
            </div>-->
        </div>
        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">喜报日期</th>
                        <th class="text-center">收房开单人</th>
                        <th class="text-center">所属部门</th>
                        <th class="text-center">房屋地址</th>
                        <th class="text-center">门牌号</th>
                        <th class="text-center">房型</th>
                        <th class="text-center">收房价格</th>
                        <th class="text-center">年限</th>
                        <th class="text-center">付款方式</th>
                        <th class="text-center">空置期</th>
                        <th class="text-center">应付款项</th>
                        <th class="text-center">实付款项</th>
                        <th class="text-center">剩余款项</th>
                        <th class="text-center">补齐时间</th>
                        <th class="text-center">中介费</th>
                        <th class="text-center">申请状态</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center">
                        <td>
                            <input type="checkbox">
                        </td>
                        <td>南京</td>
                        <td>仙林一组</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
                        <td>哈哈</td>
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
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" @clcik="clear()"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">{{title}}</h4>
                    </div>
                    <div class="modal-body clearFix">
                    </div>
                    <div class="modal-footer">
                        <div v-if="isAdd">
                            <button type="button" class="btn btn-primary">完成</button>
                        </div>
                        <div v-else="isAdd">
                            <button type="button" class="btn btn-primary">修改</button>

                        </div>

                    </div>
                </div>
            </div>
        </div>


        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

    </div>
</template>
<style scoped>
    .tagsinput{
        border:none;
    }
    h4{
        display: inline-block;
        margin: 0;
    }
    input[type=checkbox]{
        width: 17px;
        height: 17px;
    }
    .choosed ul li{
        float: left;
    }
    .choosed ul li+li:before{
        content: '|';
        display: inline-block;
        margin: 0 10px;
    }


    .yellow{
        background-color: #F9E175;
    }
    .green{
        background-color: #83E96D;
    }
</style>
<script>
    import STAFF from  '../../common/organization/selectStaff.vue'
    export default{
        components: {STAFF},
        data(){
            return {
                title : '',
                isAdd : true,
                operId : 0,
                statusName : '',

                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
                selectConfigure : '',
                configure : {},
                params : {
                    department_id : [],
                    staff_id : [],
                    from : '',
                    to : '',
                    search : ''
                }
            }
        },
        methods: {
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder === '开始时间'){
                        this.params.from = ev.target.value;
                    } else if (ev.target.placeholder === '结束时间') {
                        this.params.to = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            search(){

            },
            select(){

                this.selectConfigure = 'all';
                $('#selectCustom').modal({backdrop: 'static',});
                this.configure={type:'all',class:'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(this.configure);
//                console.log(this.selectConfigure)
                console.log(val);
                if (this.selectConfigure=='all'){
                    // all
//                    alert('all');
                    this.receive(val);
                    this.filtrate.departmentList = val.department;
                    this.filtrate.staffList = val.staff;
                } else if (this.selectConfigure=='department'){
                    // 选择的是部门
//                    alert('部门');
                    this.formData.department_id = val.department[0];
//                    console.log(this.formData.department_id)
                } else {
                    // 选择员工
//                    alert('员工');
                    this.formData.staff_id = val.staff[0];
//                    console.log(this.formData.staff_id)
                }

            },
            receive(val){
                for(let j=0;j<val.department.length;j++){
                    if($.inArray(val.department[j].id,this.params.department_id)===-1){
                        this.filtrate.departmentList.push(val.department[j]);
                        this.params.department_id.push(val.department[j].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
                for(let i=0;i<val.staff.length;i++){
                    if($.inArray(val.staff[i].id,this.params.staff_id)===-1){
                        console.log()
                        this.filtrate.staffList.push(val.staff[i]);
                        this.params.staff_id.push(val.staff[i].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
            },
            deleteStaff(item){
                this.filtrate.staffList=this.filtrate.staffList.filter((x)=>x!==item);
                this.params.staff_id=this.params.staff_id.filter((x)=>x!=item.id)
            },
            deleteDepartment(item){
                this.filtrate.departmentList=this.filtrate.departmentList.filter((x)=>x!==item);
                this.params.department_id=this.params.staff_id.filter((x)=>x!=item.id)
            },
            addNew(){
                // 新增申请（按钮）
                this.isAdd = true;
                this.title = '申请收房中介费';
            },
            oper(){
                // 新增申请（按钮）
                this.isAdd = false;
                this.title = '修改收房中介费';
            }
        }
    }
</script>