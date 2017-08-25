<template>
    <div>
        <ol class="breadcrumb">
            <li>办公用品</li>
            <li>办公用品批量申领</li>
        </ol>


        <div class="batchContainer">
            <div class="batchList" v-for="(item,index) in submitData">
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
                                        <th class="text-center">总价</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <!--<tr>
                                        <td colspan="5">
                                            {{item.inventory}}
                                        </td>
                                    </tr>-->
                                    <tr class="text-center" v-for="(list,index$1) in item.inventory">
                                        <td>{{list.name}}</td>
                                        <td>{{list.existing_inventory}}</td>
                                        <td>¥{{list.price}}</td>
                                        <td>
                                            <div class="numInput">
                                                <select class="form-control" v-model="list.register_type">
                                                    <option value="">登记类型</option>
                                                    <option :value="value" v-for="(key,value) in dict.register_type">{{key}}</option>
                                                </select>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="numInput">
                                                <input type="number" min="0" :max="list.existing_inventory" class="form-control" v-model="list.num" @blur="check($event,index,index$1)">
                                                <!--<input type="number" min="0" :max="max" class="form-control" v-model="num" @blur="check($event)">-->
                                            </div>
                                        </td>
                                        <td style="width: 120px">¥{{list.price*list.num}}</td>
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
            <button class="btn btn-primary btn-lg btn-block" type="button" @click="submitAll">提交</button>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default{
        components: {Status},
        data(){
            return {
                dict : {},
                myData : [],

                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                submitData:[],
                /*dataList : {
                    inventory_id : '',
                    price : '',
                    register_type : '',
                    num : ''
                }*/
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

                    let dataLength = this.myData.length;
                    console.log(dataLength);
//                    let listLength = 0;
                    this.submitData = [];
                    for (let i = 0 ; i<dataLength;i++){
//                        listLength+=this.myData[i].inventory.length;
                        let first = {
                            name : this.myData[i].name,
                            inventory : []
                        };
                        this.submitData.push(first);
                        for (let j = 0 ; j<this.myData[i].inventory.length;j++){
                            let dataList = {
                                inventory_id : this.myData[i].inventory[j].id,
                                name: this.myData[i].inventory[j].name,
                                price : this.myData[i].inventory[j].price,
                                existing_inventory: this.myData[i].inventory[j].existing_inventory,
                                register_type : '',
                                num : 0,
                                subTotal : 0
                            };
                            this.submitData[i].inventory.push(dataList);


//                            this.submitData.push(dataList);
                        }
                    }
                    console.log(this.submitData);
                })
            },
            check(ev,index1,index2){
//                console.log('max:'+ev.target.max);
//                console.log(index1)
//                console.log(index2)
                let a = parseInt(ev.target.value);
                let max = parseInt(ev.target.max);
                if (a<0||ev.target.value==''){
                    this.submitData[index1].inventory[index2].num = 0;
                }
//                alert(ev.target.value)
//                alert(ev.target.value>ev.target.max)
                if (a>max){
                    this.submitData[index1].inventory[index2].num = ev.target.max;
                }


            },
            submitAll(){
                let final = [];

                for (let i = 0; i<this.submitData.length;i++){
                    for (let j = 0 ; j<this.submitData[i].inventory.length;j++){
                        if (this.submitData[i].inventory[j].num>0){
                            final.push(this.submitData[i].inventory[j]);
                        }
                    }
                }

                console.log(final);
                this.$http.post('manager/management/receive_insert_all',final).then((res)=>{
                    console.log(res);
                    if (res.data.code==10091){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        this.$router.replace({ path: '/officeApply'});
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
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