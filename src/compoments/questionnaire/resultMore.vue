<template>
    <div>
        <div class="modal fade resultMore" id="resultMore" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">更多</h4>
                    </div>
                    <div class="modal-body inbox-body panel roll">
                        <div class="row ">
                            <div class="col-xs-12" v-for="(value,key) in moreResult">
                                {{key+1}} ) {{value.answer}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props : ['moreResult'],
    }
</script>
<style scoped>
    .roll{
        max-height:400px;
        overflow: auto;
    }
</style>