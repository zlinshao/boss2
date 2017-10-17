<template>
    <div>
        <div class="modal fade allNoWrite bs-example-modal-md" id="allNoWrite" data-backdrop="static">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">您有未填写的问卷/投票</h4>
                    </div>
                    <div class="modal-body inbox-body panel roll">
                        <ul>
                            <li v-for="(item,index) in list" @click="showQuestionnaire(item.id,index)"><a>{{item.title}}</a></li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <Question :questionId='questionId' @success="successVote"></Question>
    </div>
</template>
<script>
    import Question from './questionnaire.vue'
    import Status from '../common/status.vue';              //提示信息
    export default {
        props:['allNoWriteList'],
        components: {Question,Status},
        data() {
            return {
                list : [],

                questionId: '',
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                index : ''
            }
        },
        watch : {
            allNoWriteList(val){
                this.list = val;
            }
        },
        methods: {
            showQuestionnaire(id,i){
                this.questionId = id;
                this.index = i;
                $('.questionnaire:eq(1)').modal('show');
            },
            successVote(val){
                this.info.success = val;
                //显示成功弹窗 ***
                this.info.state_success = true;
                this.list.splice(this.index,1);
                if (this.list.length==0){
                    $('#allNoWrite').modal('hide');
                }
            },
        }
    }
</script>
<style scoped>
    .modal-body ul{
        padding: 20px;
    }
    .modal-body ul li{
        padding-left: 12px;
        font-size: 16px;
        list-style: disc;
    }
    .modal-body ul li+li{
        margin-top: 18px;
    }
</style>