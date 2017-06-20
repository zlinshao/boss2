<template>
    <div>
        <!--新增权限管理-->
        <div class="form-group text-right">
            <a class="btn btn-success" data-toggle="modal" href="#new_add"> <!--@click="add_btn"-->
                <i class="fa fa-plus-square"></i>&nbsp;&nbsp;新增角色
            </a>
        </div>
        <!--新增模态框-->
        <div class="modal fade full-width-modal-right" id="new_add" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">Modal Tittle</h4>
                        </div>
                        <div class="modal-body">
                            <!--<form role="form">-->
                                <!--<div class="form-group">-->
                                    <!--<label for="title">title:</label>-->
                                    <!--<input type="text" id="title" class="form-control" placeholder="title"-->
                                           <!--v-model="title">-->
                                <!--</div>-->
                                <!--<div class="form-group">-->
                                    <!--<button v-if="status1" data-dismiss="modal" class="btn btn-primary"-->
                                            <!--@click="add_power ()">添加-->
                                    <!--</button>-->
                                    <!--<button v-if="status2" data-dismiss="modal" @click="revise_power"-->
                                            <!--class="btn btn-primary">修改-->
                                    <!--</button>-->
                                    <!--<input type="reset" value="重置" class="btn btn-danger">-->
                                <!--</div>-->
                            <!--</form>-->
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!--<div class="row">-->
            <!--<div class="col-lg-12">-->
                <!--<section class="panel">-->
                    <!--<table class="table table-striped table-advance table-hover">-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<th>ID</th>-->
                            <!--<th>title</th>-->
                            <!--<th>Status</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody>-->
                        <!--<tr v-for="(item, index) in role_info">-->
                            <!--<td>-->
                                <!--<input type="checkbox" @click="rules(item.id, $event)" class="pull-left">&nbsp;&nbsp;-->
                                <!--{{item.id}}-->
                            <!--</td>-->
                            <!--<td>{{item.title}}</td>-->
                            <!--<td>-->
                                <!--<a class="btn btn-primary btn-sm" data-toggle="modal" href="#new_add"-->
                                   <!--@click="revise_btn(item.title)">编辑</a>-->
                            <!--</td>-->
                        <!--</tr>-->

                        <!--<tr v-show="role_info.length == 0">-->
                            <!--<td colspan="4" class="text-center text-muted">-->
                                <!--<h4>暂无数据....</h4>-->
                            <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                    <!--</table>-->
                <!--</section>-->
            <!--</div>-->
        <!--</div>-->

    </div>
</template>

<script>
    export default {
        data (){
            return {
                role_info: Array,       //列表数据
                username: '',           //Name
                title: '',              //Title
                status1: true,          //增加
                status2: false,         //修改
                arr_rules: [],
            }
        },
        created (){
            this.list_role();
        },
        methods: {

//            数组查询
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },

//            权限列表
            list_role (){
                this.$http.get('http://test.api.boss.lejias.cn/manager/Role/rolesList/page/1').then(res => {
                    this.role_info = res.data.data;
                    console.log(res.data)
                });

                this.$http.get('http://test.api.boss.lejias.cn/manager/Auth/authList/page/' + this.page).then(res => {
                    console.log(res.data);
                });
            },

//            修改按钮
            revise_btn (t){
                this.title = t;
                this.status1 = false;
                this.status2 = true;
            },

//             确认修改
            revise_power (){
                console.log(this.title);
            },

//             新增按钮
            add_btn (){
                this.title = '';
                this.status1 = true;
                this.status2 = false;
            },

//             确认新增
            add_power () {
                this.$http.post('http://test.api.boss.lejias.cn/manager/Auth/saveAuth',
                    {
                        name: this.username,
                        title: this.title
                    }
//                        headers: {
//                            'Content-Type': 'application/x-www-form-urlencoded',
//                        }
                ).then(res => {
//                    console.log(res.data.data);
//                    this.role_info.push({
//                        id: res.data.data.id,
//                        name: res.data.data.name,
//                        title: res.data.data.title,
//                    });
//                    this.username = '';
//                    this.title = '';
                });
            },

//            多选
            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.arr_rules.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.arr_rules.indexOf(rul);
                    if (index > -1) {
                        this.arr_rules.splice(index, 1);
                    }
                }
            }
        }
    };
</script>

<style scoped>

</style>
