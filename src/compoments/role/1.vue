<template>

    <div>
        <switch-btn @photo="idNumber" @delete="idNumber_Delete" :result="'pic'"></switch-btn>
        <switch-btn @photo="bankCard" @delete="bankCard_Delete" :result="'card'"></switch-btn>
    </div>
</template>

<script>
    import switchBtn from './2.vue'
    export default {
        components: {switchBtn},
        data() {
            return {
                idNumbers: [],
                bankCards: []
            }
        },

        methods: {
            idNumber (val){
                this.idNumbers = val;
            },
            idNumber_Delete (val){
                let index = this.idNumbers.indexOf(val);
                if (index > -1) {
                    this.idNumbers.splice(index, 1);
                }
            },
            bankCard (val){
                this.bankCards = val;
            },
            bankCard_Delete (val){
                let index = this.bankCards.indexOf(val);
                if (index > -1) {
                    this.bankCards.splice(index, 1);
                }
            },
        }
    }


    //    let hhh = document.getElementById('pic');

    //    import switchbtn from './2.vue'
    //    export default {
    //        components: {switchbtn},
    //        data() {
    //            return {
    //                result: true
    //            }
    //        },
    //        methods: {
    //            change() {
    //                this.result = !this.result;
    //            },
    //            onResultChange(val){
    //                this.result = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    //            }
    //        }
    //    }
</script>


<style scoped>

</style>
