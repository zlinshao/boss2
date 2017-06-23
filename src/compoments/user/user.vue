<template>
    <div>
        <!--新增权限管理-->
        <div class="form-group text-right">
            <a class="btn btn-success" data-toggle="modal" href="#new_add" @click="add_btn">
                <i class="fa fa-plus-square"></i>&nbsp;&nbsp;新增权限管理
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
                            <form role="form">
                                <div class="form-group">
                                    <label for="username">Name:</label>
                                    <input type="text" id="username" class="form-control" placeholder="Name"
                                           v-model="username">
                                </div>
                                <div class="form-group">
                                    <label for="title">title:</label>
                                    <input type="text" id="title" class="form-control" placeholder="title"
                                           v-model="title">
                                </div>
                                <div class="form-group">
                                    <button v-if="status1" data-dismiss="modal" class="btn btn-primary"
                                            v-on:click="add_power ()">添加
                                    </button>
                                    <button v-if="status2" data-dismiss="modal" @click="revise_power"
                                            class="btn btn-primary">修改
                                    </button>
                                    <input type="reset" value="重置" class="btn btn-danger">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <div class="table table-striped">
                        <table class="table table-advance table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>title</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item, index) in cont.myData">
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.title}}</td>
                                <td>
                                    <a class="btn btn-primary btn-sm" data-toggle="modal" href="#new_add"
                                       @click="revise_btn(item.name, item.title)">编辑</a>
                                    <a class="btn btn-danger btn-sm" data-toggle="modal" data-target="#delete"
                                       @click="cont.nowIndex = index">删除
                                    </a>
                                </td>
                            </tr>

                            <!--删除全部-->
                            <tr v-show="cont.myData.length != 0">
                                <td colspan="4" class="text-right">
                                    <button class="btn btn-danger btn-sm" v-on:click="cont.nowIndex = -3"
                                            data-toggle="modal" data-target="#delete">删除全部
                                    </button>
                                </td>
                            </tr>

                            <tr v-show="cont.myData.length == 0">
                                <td colspan="4" class="text-center text-muted">
                                    <h4>暂无数据....</h4>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="list_power"></Page>

        <!--模态框 删除-->
        <Dele :msg="cont"></Dele>
    </div>
</template>

<script>
    import Dele from '../common/delete.vue'
    import Page from '../common/page.vue'

    export default {
        components: {Dele, Page},
        data (){
            return {
                username: '',           //Name
                title: '',              //Title
                status1: true,          //增加
                status2: false,         //修改
                paging: 10,
                page: 1,
                cont: {
                    myData: Array,      //列表数据
                    nowIndex: -10,      //删除索引
                }
            }
        },
        created (){
            this.list_power(this.page);
        },
        methods: {

//            权限列表
            list_power (v){
                this.$http.get('manager/Auth/authList/page/' + v).then(res => {
                    this.cont.myData = res.data.data;
                });
            },

//            修改按钮
            revise_btn (n, t){
                this.username = n;
                this.title = t;
                this.status1 = false;
                this.status2 = true;
            },

//             确认修改
            revise_power (){
                console.log(this.username, this.title);
            },

//             新增按钮
            add_btn (){
                this.username = '';
                this.title = '';
                this.status1 = true;
                this.status2 = false;
            },

//             确认新增
            add_power () {
                this.$http.post('manager/Auth/saveAuth',
                    {
                        name: this.username,
                        title: this.title
                    }
//                        headers: {
//                            'Content-Type': 'application/x-www-form-urlencoded',
//                        }
                ).then(res => {
                    console.log(res.data.data);
                    this.cont.myData.push({
                        id: res.data.data.id,
                        name: res.data.data.name,
                        title: res.data.data.title,
                    });
                });
            },
        }
    };
</script>


<style scoped>

</style>

