<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <section class="panel table-responsive">
                    <table class="table table-striped table-advance table-hover">
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" class="pull-left">
                            </th>
                            <th>客户名称</th>
                            <th>尊称</th>
                            <th>手机号</th>
                            <th>客户优先级</th>
                            <th>客户意向</th>
                            <th>跟进进度</th>
                            <th>来源</th>
                            <th>客户状态</th>
                            <th>客户身份</th>
                            <th>个人/中介</th>
                            <th>负责人</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(a,index) in 15">
                            <td>
                                <input type="checkbox" class="pull-left" @click="rules(index,$event)">
                            </td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{a}}</td>
                            <td>{{pitch}}</td>
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
        <Page :pg="paging" @click=""></Page>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    export default {
        components: {Page},
        data (){
            return {
                paging: 10,
                pitch: [],
            }
        },
        methods: {

//            增删数组
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },
            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.pitch.push(rul);
                }
                if (eve.target.checked === false) {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            }
        }
    }
</script>


<style scoped>
    input[type=checkbox] {
        margin-right: 8px;
        margin-top: 2px;
        width: 17px;
        height: 17px;
    }
</style>
