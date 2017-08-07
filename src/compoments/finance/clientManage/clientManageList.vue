<template>
    <div>
        <ol class="breadcrumb">
            <li>财务账本</li>
            <li>客户管理</li>
        </ol>
        <section class="panel">
            <!--未选中-->
            <div class="panel-body clearFix">
                <div  v-if="clientSeleted === 0">
                    <div class="pro-sort">
                        <label>
                            <input type="text" readonly class="form-control" @click="selectDpm" placeholder="点击选择部门">
                        </label>
                    </div>
                    <div class="pro-sort">
                        <label>
                            <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                        </label>
                    </div>
                    <div class="pro-sort col-xs-12 col-sm-5 col-md-4 col-lg-2" style="padding: 0;margin-right: 20px">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="请输入房屋地址">
                            <span class="input-group-btn">
                                    <button class="btn btn-success" type="button">搜索</button>
                            </span>
                        </div>
                    </div>
                    <div class="pro-sort">
                        <button class="btn btn-success" type="button">重置</button>
                    </div>
                    <div class="pro-sort pull-right">
                        <button class="btn btn-success" type="button" @click="addClient">
                            <i class="fa fa fa-plus-square"></i>
                            新增客户
                        </button>
                    </div>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="clientSeleted>0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp; 1 &nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-pencil-square-o"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-times-circle"></i>&nbsp;删除</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="panel table table-responsive">
            <table class="table table-striped table-advance table-hover">
                <thead class="text-center">
                <tr>
                    <th class="text-center">
                        <!--<input type="checkbox">-->
                    </th>
                    <th class="text-center">房屋地址</th>
                    <th class="text-center">客户姓名</th>
                    <th class="text-center">身份</th>
                    <th class="text-center">汇款方式</th>
                    <th class="text-center">收款人姓名</th>
                    <th class="text-center">开户行</th>
                    <th class="text-center">账号</th>
                    <th class="text-center">签约人</th>
                    <th class="text-center">所属部门</th>
                    <th class="text-center">负责人</th>
                    <th class="text-center">状态</th>
                    <th class="text-center">更多</th>
                </tr>
                </thead>
                <tbody class="text-center">
                    <tr class="text-center">
                        <td><input type="checkbox" @click="picked($event)"></td>
                        <td class="text-center">房屋地址</td>
                        <td class="text-center">客户姓名</td>
                        <td class="text-center">身份</td>
                        <td class="text-center">汇款方式</td>
                        <td class="text-center">收款人姓名</td>
                        <td class="text-center">开户行</td>
                        <td class="text-center">账号</td>
                        <td class="text-center">签约人</td>
                        <td class="text-center">所属部门</td>
                        <td class="text-center">负责人</td>
                        <td class="text-center">状态</td>
                        <td class="text-center">
                            <router-link :to="{path:'/ClientManageDetail'}">
                                更多
                            </router-link>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="13" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <Department  :configure='configure' @Staff="dpmSeleted"></Department>
        <ClientAdd></ClientAdd>
    </div>
</template>

<script>
    import DatePicker from '../../common/datePicker.vue'
    import Department from '../../common/organization/selectStaff.vue'
    import ClientAdd from  './clientAdd.vue'
    export default{
        components:{DatePicker , Department , ClientAdd},
        data(){
          return{
              dateConfigure : [{
                  range : true, // 是否选择范围
                  needHour : false // 是否需要选择小时
              }],
              clientSeleted : 0,
              configure : [],
          }
        },
        methods:{
            getDate(val){},
            picked(e){
                if(e.target.checked === true){
                    this.clientSeleted = 1;
                }else {
                    this.clientSeleted = 0;
                }
            },
            selectDpm(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure={class:'selectType',type:'department'};
            },
            dpmSeleted(val){
                console.log(val)
            },

            addClient(){
                $('#clientAdd').modal('show');
            },

        }
    }
</script>

<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }
    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }

    .remind li + li a {
        border-left: 1px solid #aaaaaa;
    }

    input, select {
        margin-bottom: 0px;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
</style>
