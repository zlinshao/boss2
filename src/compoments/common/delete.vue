<template>
    <div>
        <div role="dialog" class="modal fade bs-example-modal-sm" id="delete">
            <div class="modal-dialog ">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">提示信息</h4>
                    </div>
                    <div class="modal-body">
                        <h4 class="modal-title">确认删除么?</h4>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-primary btn-md">取消</button>
                        <button data-dismiss="modal" class="btn btn-danger btn-md" @click="deleteMsg">确认</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['msg'],
        methods: {
//              确认删除
            deleteMsg () {
                console.log(this.msg.nowIndex);
                if (this.msg.nowIndex === -3) {
                    // 全部删除
                    this.msg.myData = [];
                } else {
//                    this.msg.myData.splice(this.msg.nowIndex, 1);
                    this.$emit('yes');
//                    this.dele();
                }
            }
        }
    }
</script>


<style scoped>

</style>
