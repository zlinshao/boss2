<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品批量申领</li>
        </ol>


        <div class="batchContainer">
            <div class="batchList">
                <h4>默认库</h4>
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
                                        <th class="text-center">数量</th>
                                        <th class="text-center">总价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center">
                                        <td>aa</td>
                                        <td>10</td>
                                        <td>100</td>
                                        <td>
                                            <div class="numInput">
                                                <input type="number" min="0" :max="max" class="form-control" v-model="num" @blur="check($event)">
                                            </div>
                                        </td>
                                        <td>100</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div class="batchList">
                <h4>电子数码</h4>
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
                                        <th class="text-center">数量</th>
                                        <th class="text-center">总价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center">
                                        <td>aa</td>
                                        <td>10</td>
                                        <td>100</td>
                                        <td>
                                            <div class="numInput">
                                                <input type="number" min="0" :max="max" class="form-control" v-model="num" @blur="check($event)">
                                            </div>
                                        </td>
                                        <td>100</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div class="batchList">
                <h4>办公设备</h4>
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
                                        <th class="text-center">数量</th>
                                        <th class="text-center">总价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="text-center">
                                        <td>aa</td>
                                        <td>10</td>
                                        <td>100</td>
                                        <td>
                                            <div class="numInput">
                                                <input type="number" min="0" :max="max" class="form-control" v-model="num" @blur="check($event)">
                                            </div>
                                        </td>
                                        <td>100</td>
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
                num: 0,
                max : 10
            }
        },
        methods: {
            check(ev){
//                console.log(ev.target.max);
                if (this.num<0){
                    this.num = 0;
                }
                if (this.num>ev.target.max){
                    this.num = ev.target.max;
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
        width: 50%;
        margin: 20px auto;
    }
</style>