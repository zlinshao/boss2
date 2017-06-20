<template>
    <div>
        <!--新增权限管理-->
        <div class="form-group text-right">
            <a class="btn btn-success" data-toggle="modal" href="#new_add">
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
                                    <button data-dismiss="modal" class="btn btn-primary" @click="add_power ()">添加
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
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>
                                <router-link to="/page">title</router-link>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item, index) in myData">
                            <td>{{item.id}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.title}}</td>
                        </tr>
                        <tr v-show="myData.length == 0">
                            <td colspan="4" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>


        <!--分页-->
        <Page :pg="paging" @pag="list_power"></Page>


        <div role="dialog" class="modal fade bs-example-modal-sm" id="prompt">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h4 class="modal-title">{{ prompt }}</h4>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-danger btn-md">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Page from '../common/page.vue'
    export default {
        components: {
            Page
        },
        data (){
            return {
                myData: Array,          //列表数据
                username: '',           //Name
                title: '',              //Title
                prompt: '',             //提示信息
                paging: 6,              //总页数
            }
        },
        created (){
            this.list_power(this.page);
        },
        methods: {

//            权限列表
            list_power (v){
                this.$http.get('http://test.api.boss.lejias.cn/manager/Auth/authList/page/' + v).then(res => {
                    this.myData = res.data.data;
                });
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
                    if (res.data.code === '30020') {
                        this.myData.push({
                            id: res.data.data.id,
                            name: res.data.data.name,
                            title: res.data.data.title,
                        });
                    }
                    else {
                        this.prompt = res.data.msg;
                        $('#prompt').modal({
                            keyboard: false
                        });
                    }
                    this.username = '';
                    this.title = '';
                });
            }
        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>