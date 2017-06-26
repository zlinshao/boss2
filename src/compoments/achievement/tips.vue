<template>
    <div>
        <div class="col-lg-12 ">
            <div class="tip col-lg-3">
                <span>当前收多少套：</span>
                <strong>12000</strong>
            </div>
            <div class="tip col-lg-3">
                <span>当前租多少套：</span>
                <strong>12000</strong>
            </div>
            <div class="tip col-lg-3">
                <span>当前总业绩：</span>
                <strong>12000</strong>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .tip{
        line-height: 50px;
        margin: 0 0 20px 5%;
        border-radius: 8px;
        background-color: #FCB322;
        font-size: 16px;
        text-align: center;
        color: #fff;
        user-select: none;
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>