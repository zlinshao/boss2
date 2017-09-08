<template>
    <div>
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>发布文章</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div>
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <select class="form-control">
                                <option value="">乐伽新闻</option>
                            </select>
                        </div>
                        <div class="input-group">
                            <select class="form-control">
                                <option value="">草稿</option>
                            </select>
                        </div>
                        <!--<div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>-->
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="办公用品名称"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group pull-right">
                            <router-link to="/postArticle" class="btn btn-success">
                                <i class="fa fa-plus-square"></i>&nbsp;文章发布
                            </router-link>
                        </div>
                    </form>
                </div>

                <!--<div class="col-lg-12 remind">
                    <ul>
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;编辑</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-mail-reply"></i>&nbsp;归还</a></h5>
                        </li>
                    </ul>
                </div>-->
            </div>
        </section>

        <!--表格-->
        <div class="row has-js">
            <div class="col-md-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th class="text-center">
                                <label for="allCheck"
                                       :class="{'label_check':true,'c_on':myData.length!=0&&pitch.length==myData.length,'c_off':pitch.length!=myData.length}"
                                       @click.prevent="chooseAll($event)">
                                    <input id="allCheck" type="checkbox" :checked="myData.length!=0&&pitch.length==myData.length">
                                </label>
                            </th>
                            <th class="text-center">标题</th>
                            <th class="text-center">类型</th>
                            <th class="text-center">发布人</th>
                            <th class="text-center">发布时间</th>
                            <th class="text-center">评论</th>
                            <th class="text-center">点赞</th>
                            <th class="text-center">状态</th>
                            <th class="text-center">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center">
                            <td>
                                <label class="label_check">
                                    <input type="checkbox">
                                </label>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <router-link :to="{path : '/articleDetail',query:{articleId : 1}}">
                                    详情
                                </router-link>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--分页-->
        <Page :pg="paging" @pag="search" :beforePage="beforePage"></Page>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>

    </div>
</template>

<script>
    import STAFF from  '../../common/organization/selectStaff.vue'
    import Page from '../../common/page.vue'
    import Confirm from '../../common/confirm.vue'
    export default{
        components: {STAFF,Page,Confirm},
        data(){
            return {
                paging : 1,
                beforePage :1,
                myData : [],
                isShow : false,
                pitch : [],

                configure: {},
                selected: [],
                params : {
//                    department_id : [],
//                    staff_id : [],
                    type : '',
                    status : '',
                    search : ''
                },
                confirmMsg: {
                    msg: '',
                },

            }
        },
        methods: {
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
            clearSelect(){
                if (this.selected.length == 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

            chooseAll(ev){

            },

            search(val){

            },

            getConfirm(){}
        }
    }
</script>
<style scoped>

</style>