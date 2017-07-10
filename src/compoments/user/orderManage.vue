<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <div>
                    <div class="form-inline"  v-if="picks<1">
                        <div class="form-group">
                            <label for="search" style="font-weight: bold">查 询</label>
                            <input type="text" class="form-control" id="search" placeholder="点击查询"
                               v-model="selected"   @click='select' readonly>
                        </div>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <div class="form-group">
                            <input type="email" class="form-control" placeholder="关键字搜索">
                        </div>
                        <button class="btn btn-primary">搜索</button>
                    </div>
                    <!--选中-->
                    <div class="col-lg-12 remind" v-if="picks>0">
                        <ul>
                            <li>
                                <h5><a>已选中&nbsp;{{picks}}&nbsp;项</a></h5>
                            </li>
                            <li>
                                <h5 @click="distribution"><a>分配</a></h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!--客户列表-->
        <div class="row">
            <div class="col-md-12">
                <section class="panel table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center"></th>
                            <th class="text-center">合同编号</th>
                            <th class="text-center">上传时间</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">业主姓名</th>
                            <th class="text-center">地址手机号</th>
                            <th class="text-center">合同到期时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td class="text-center">
                                <label for="cus_id"></label>
                                <input id="cus_id" type="checkbox" class="pull-left" @click="picked($event)">
                            </td>
                            <th class="text-center">合同编号</th>
                            <th class="text-center">上传时间</th>
                            <th class="text-center">开单人</th>
                            <th class="text-center">业主姓名</th>
                            <th class="text-center">地址手机号</th>
                            <th class="text-center">合同到期时间</th>
                        </tr>
                        <tr v-show="">
                            <td colspan="12" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
        <!--分页-->
        <Page :pg="pages"></Page>
        <Organize :configure="configure" @Staff="isSelect"></Organize>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Organize from  '../common/organization/selectStaff.vue'
    export default {
        components: {Page,Organize},
        data (){
            return {
                picks:'',
                pages:'',
                configure:[],
                selected:[],
            }
        },
        created (){
        },
        methods: {
            picked (e){
                if(e.target.checked===true){
                    this.picks++;
                }else {
                    this.picks--;
                }
            },
            select(){
                $('#selectCustom').modal({backdrop: 'static',});
                $('#selectCustom').modal('show');
                this.configure={type:'all',class:'selectType'};
            },
            isSelect(val){
                for(let i=0;i<val.department.length;i++){
                    this.selected.push(val.department[i].name);
                };
                for(let i=0;i<val.staff.length;i++){
                    this.selected.push(val.staff[i].name);
                };
            },
            distribution(){
                $('#selectCustom').modal({backdrop: 'static',});
                $('#selectCustom').modal('show');
                this.configure={length:1,class:'onlyOneDpm'};
            }
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

    select {
        margin-bottom: 0;
    }

    .pro-sort {
        padding-right: 6px;
    }

    .pro-sort select.form-control {
        padding: 6px 8px;
    }
    .remind li {
        float: left;
    }

    .remind li a {
        padding: 0 10px;
    }
    input,label,button{
        margin: 0;
    }
    .panel-body {
        padding: 15px;
    }
</style>
