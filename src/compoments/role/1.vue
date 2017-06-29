<template>

    <div>
        <switchbtn @fff="aaaa" @llll="yyyy" :result="'pic'"></switchbtn>
        <switchbtn @fff="cccc" :result="'card'"></switchbtn>
        {{ppp}}
        {{ooo}}
    </div>
</template>

<script>
    import switchbtn from './2.vue'
    export default {
        components: {switchbtn},
        data() {
            return {
                ppp: [],
                ooo: []
            }
        },

        methods: {
            indexOf (val) {
                for (let i = 0; i < this.length; i++) {
                    if (this[i] === val) return i;
                }
                return -1;
            },
            yyyy (val){
                let index = this.ppp.indexOf(val);
                if (index > -1) {
                    this.ppp.splice(index, 1);
                }
            },
            aaaa (val){
                this.ppp = val;


            },
            cccc (val){
                this.ooo = val;
            },

            rules (rul, eve){
                if (eve.target.checked === true) {
                    this.checkboxModel.push(rul);
                }

            }
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
