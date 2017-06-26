<template>
    <div>
        <switchbtn :result="result" @on-result-change="onResultChange"></switchbtn>
        <input type="button" value="change" @click="change">
    </div>
</template>

<script>
    import switchbtn from './2.vue'
    export default {
        components: {switchbtn},
        data() {
            return {
                result: true
            }
        },
        methods: {
            change() {
                this.result = !this.result;
            },
            onResultChange(val){
                this.result = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
            }
        }
    }
</script>


<style scoped>

</style>
