<template>
    <div>
        <div>
            <h3>小区信息</h3>
            <button class="btn btn-success pull-right" data-toggle="modal" data-target="#myModal">编辑</button>
            <div class="info col-lg-12">
                <div class="baseInfo col-lg-6">
                    <h4>基本信息</h4>
                </div>
                <div class="perimeterInfo col-lg-6">
                    <h4>周边信息</h4>
                </div>
            </div>
            <router-link to="/village">
                <button class="btn btn-success pull-right">返回</button>
            </router-link>
        </div>

        <!--模态框-->
        <Modal :oper="oper"></Modal>
    </div>
</template>
<style scoped>
    h3{
        background-color: #fff;
        line-height: 45px;
        padding-left: 10px;
        border-radius: 8px;
    }
    h4{
        color: #333;
        font-weight: 600;
    }
    .info{
        font-size: 0;
        padding: 0 15px;
    }
    .info>div{
        display: inline-block;
        width: 46%;
        padding: 0 2%;
        vertical-align: top;
    }
    .baseInfo{
        border-right: 1px dashed #ccc;
    }
</style>
<script>
    import Modal from './modal.vue'

    export default{
        data(){
            return {
                oper : {
                    operName : '编辑小区信息',
                    villageId : 10
                }
            }
        },
        components: {
            Modal
        }

    }
</script>