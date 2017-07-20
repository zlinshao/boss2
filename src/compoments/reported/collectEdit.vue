<template>
    <div>
        <div class="modal fade full-width-modal-right" id="edit" tabindex="-1" aria-hidden="true"
             data-backdrop="static" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" aria-label="Close" @click="closeModal">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">编辑收房报备</h4>
                    </div>
                    <div class="modal-body clearFix">
                        ashdjkasnd
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="button" class="btn btn-default">取消</button>
                            <button type="button" class="btn btn-primary">修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {},
        methods: {
            closeModal(){
                $('#edit').modal('hide');
            }
        }
    }
</script>