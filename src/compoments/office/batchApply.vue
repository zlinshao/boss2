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
                    <input type="number" min="0" max="10" class="form-control" v-model="num" @blur="check($event)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        components: {},
        data(){
            return {
                num: 0
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

</style>