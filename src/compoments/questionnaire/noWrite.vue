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
                    <div class="modal-body inbox-body panel roll">
                        <div class="row">
                            <div class=" col-md-6" v-for="item in hasNotWriteMember">
                                <div>
                                    <div class="item col-sm-12 " style="color: #777">
                                        <img :src="item.avatar" v-if="item.avatar !== '' ">
                                        <img src="../../assets/img/head.png" v-if="item.avatar === '' ">
                                        <span style="display: inline-block;width: 55px;">{{item.name}}</span>
                                        <span v-if="item.department.length > 0">
                                            ({{item.department[0].name}})
                                        </span>
                                    </div>
                                </div>
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
                        console.log(this.hasNotWriteMember)
                    })
                }
            }
        },
    }
</script>
<style scoped>
    .col-md-6 span{
        margin: 5px;
    }
    .inbox-body{
        max-height: 500px;
        overflow: auto;
    }
    @media (min-width: 768px) {
        .modal-dialog{
            width: 767px;
        }
    }
    .item{
        margin: 5px;
    }
    .item2{
        margin: -5px 5px 5px 5px;
    }
    img {
        display: inline-block;width: 30px;height: 30px;border-radius: 50%;background: #aaaaaa;
    }
</style>
