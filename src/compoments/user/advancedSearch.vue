<template>
    <div>
        <!-- Button trigger modal -->
        <div class="modal fade" id="advancedSearch">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="cancel">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">高级搜索</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div>
                                    <div class="pro-sort padd">
                                        <!--<label>-->
                                        <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                                    @sendDate="getDate"></DatePicker>
                                        <!--</label>-->
                                    </div>
                                    <div class="pro-sort">
                                        <label>
                                            <select class="form-control" v-model="advanceContent.key">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in dictionary.search">
                                                    {{value}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="pro-sort" v-if="advanceContent.key!=''&&
                                            dictionary[advanceContent.key]!==undefined">
                                        <label>
                                            <select class="form-control" v-model="advanceContent.key_next">
                                                <option value="">请选择</option>
                                                <option :value="key" v-for="(value,key) in dictionary[advanceContent.key]">
                                                    {{value}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="cancel">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmSelect" >确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>

    </div>
</template>
<script>
    import Status from '../common/status.vue'
    import DatePicker from '../common/datePicker.vue'
    export default {
        components : {DatePicker,Status},
        data(){
            return{
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
                dateConfigure: [{
                    range: true, // 是否选择范围
                    needHour: false // 是否需要选择小时
                }],
                currentDate: [],    //时间控件
                dictionary : [],
                advanceContent : {
                    time : '',
                    key : '',
                    key_next : ''
                }
            }
        },
        created(){
            this.getDictionary();
        },
        methods : {
            getDictionary(){
                this.$http.get('manager/user/dict').then((res)=>{
                    this.dictionary=res.data.user;
                })
            },
            getDate(val){
                this.advanceContent.time = val;
            },
            cancel(){
                this.advanceContent = {time : '', key : '', key_next : ''};
                this.currentDate = [];
                $('#advancedSearch').modal('hide');
            },
            confirmSelect(){
                this.$emit('Confirm',this.advanceContent);
                console.log(this.advanceContent);
                this.cancel();
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .modal-body {
        position: relative;
        padding-top: 30px;
        padding-bottom: 0px;
    }
</style>