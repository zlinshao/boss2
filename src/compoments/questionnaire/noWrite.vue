<template>
    <div>
        <div class="modal fade noWrite" id="noWrite" data-backdrop="static">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">未填写员工</h4>
                    </div>
                    <div class="modal-body inbox-body panel">
                        <div class="row">
                            <div class=" col-md-6" v-for="item in hasNotWriteMember">
                                <span style="color: #1caadc">{{item.name}}</span>
                                <span>({{item.department[0].name}})</span>
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
        props : ['selectId'],
        data(){
            return{
                hasNotWriteMember :[],
            }
        },
        watch : {
            selectId(val){
                if(val){
                    this.$http.get('index/Mission/showDetail/id/' + val).then((res) => {
                        this.hasNotWriteMember = res.data.data[0].hasNotWrite;
                    })
                }
            }
        },
    }
</script>
<style>
    .col-md-6 span{
        margin: 5px;
    }
</style>
