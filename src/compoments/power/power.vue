<template>
    <div>
        <!--新增权限管理-->
        <div class="form-group text-right">
            <a class="btn btn-success" data-toggle="modal" href="#new_add">
                <i class="fa fa-plus-square"></i>&nbsp;&nbsp;新增权限管理
            </a>
        </div>

        <!--新增 模态框-->
        <new-add></new-add>

        <!--权限列表-->
        <div class="row">
            <div class="col-lg-12">
                <section class="panel">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th><i class="fa fa-bullhorn"></i> Company</th>
                            <th class="hidden-phone"><i class="fa fa-question-circle"></i> Descrition</th>
                            <th><i class="fa fa-bookmark"></i> Profit</th>
                            <th><i class=" fa fa-edit"></i> Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td><a href="#">Vector Ltd</a></td>
                            <td class="hidden-phone">Lorem Ipsum dorolo imit</td>
                            <td>12120.00$</td>
                            <td>
                                <a class="btn btn-success btn-sm" data-toggle="modal" href="#edit">编辑</a>
                                <a class="btn btn-danger btn-sm" data-toggle="modal" href="#delete">删除</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <!--编辑-->
        <Edit></Edit>

        <!--删除-->
        <Dele></Dele>
    </div>
</template>
<script>
    import newAdd from '../common/new_add.vue'
    import Edit from '../common/edit.vue'
    import Dele from '../common/delete.vue'
    export default {
        name: 'hello',
        components: {
          newAdd,Edit,Dele
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
//        ,
//        created: function() {
//            let id = this.$route.query.id;
//            console.log(id);
//        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>