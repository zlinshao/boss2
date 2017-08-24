<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品批量申领</li>
        </ol>


        <div class="batchContainer">
            <div class="batchList" v-for="item in myData">
                <h4>{{item.name}}</h4>
                <div class="batchItem">
                    <div class="row">
                        <div class="col-md-12">
                            <section class="panel table table-responsive roll">
                                <table class="table table-striped table-advance table-hover">
                                    <thead>
                                    <tr>
                                        <th class="text-center">名称</th>
                                        <th class="text-center">库存</th>
                                        <th class="text-center">单价</th>
                                        <th class="text-center">类型</th>
                                        <th class="text-center">数量</th>
                                        <!--<th class="text-center">总价</th>-->
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td colspan="5">
                                            {{item.inventory}}
                                        </td>
                                    </tr>
                                    <tr class="text-center" v-for="list in item.inventory">
                                        <td>{{list.name}}</td>
                                        <td>{{list.existing_inventory}}</td>
                                        <td>¥{{list.price}}</td>
                                        <td>
                                            <div class="numInput">
                                                <select class="form-control">
                                                    <option value="">登记类型</option>
                                                    <option :value="value" v-for="(key,value) in dict.register_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="numInput">
                                                <input type="number" min="0" class="form-control" @blur="check($event)">
                                                <!--<input type="number" min="0" :max="max" class="form-control" v-model="num" @blur="check($event)">-->
                                            </div>
                                        </td>
                                        <!--<td>¥100</td>-->
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="submit">
            <button class="btn btn-primary btn-lg btn-block" type="button">提交</button>
        </div>
    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                dict : {},
                myData : []
            }
        },
        mounted(){
            this.$http.get('manager/management/dict').then((res)=>{
//                    console.log(res);
                this.dict = res.data.management;
                this.getList();
            });
        },
        methods: {
            getList(){
                this.$http.post('manager/management/all').then((res)=>{
                    console.log(res.data);
                    this.myData = res.data.data.data;
                })
            },
            check(ev){
//                console.log(ev.target.max);
                if (ev.target.value<0){
                    ev.target.value = 0;
                }
                if (ev.target.value>ev.target.max){
                    ev.target.value = ev.target.max;
                }
            }
        }
    }
</script>
<style scoped>
    .batchList h4{
        line-height: 40px;
        border-left: 4px solid #FCB322;
        padding-left: 16px;
        cursor: pointer;
    }

    .numInput{
        width: 50%;
        margin: auto;
    }
    .numInput .form-control{
        margin-bottom: 0;
    }
    .submit{
        width: 40%;
        margin: 20px auto;
    }
</style>