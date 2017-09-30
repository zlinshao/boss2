<template>
    <div>
        <div class="modal fade" id="myModalAuthority">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">岗位授权</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <div class="col-md-12">
                                    <section class="panel roll" v-if="dict.role!=undefined">
                                        <header class="panel-heading tab-bg-dark-navy-blue">
                                            <ul class="nav nav-tabs ">
                                                <li :class="{'active':index==0}" v-for="(key,value,index) in dict.role.module">
                                                    <a data-toggle="tab" :href="'#'+value">
                                                        {{key}}
                                                    </a>
                                                </li>

                                            </ul>
                                        </header>
                                        <div class="panel-body">
                                            <div class="tab-content tasi-tab has-js">
                                                <!--<div id="description" class="tab-pane active">
                                                    但是开单幅懒得看浪费
                                                </div>-->
                                                <div :id="value" :class="{'tab-pane':true,'active':index==0}" v-for="(key,value,index) in dict.role.module">
                                                    <div class="classify" v-for="(key1,value1) in dict.role.child_module" v-if="value1==value">
                                                        <div v-for="(key2,value2) in key1">
                                                            <h4 style="line-height: 30px;">{{key2}}</h4>
                                                            <label :class="{'label_check':true,'c_on':authorityArr.indexOf(item.id) > -1,'c_off':authorityArr.indexOf(item.id) == -1}"
                                                                   v-for="item in allModules" v-if="item.module==value&&item.child_module==value2"
                                                                   @click.prevent="pitch($event,item.id)"
                                                                   style="display: inline-block;width: 180px">
                                                                <input type="checkbox" :value="item.id" :checked="authorityArr.indexOf(item.id) > -1">
                                                                {{item.role}}
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" @click="sure">确定</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    export default{
        props : ['authorityId'],
        components: {Status},
        data(){
            return {
                dict : {},
                allModules : [],

                authorityArr : [],
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },

            }
        },
        mounted(){
            this.$http.get('manager/department/dict').then((res)=>{
//                console.log(res.data);
                this.dict = res.data;
            });
            this.$http.post('manager/department/searchRoless').then((res)=>{
                this.allModules = res.data.data;
//                console.log(this.allModules);
            });
            /*$('#myModalAuthority').on('hidden.bs.modal', function (e) {
                // do something...
                this.authorityArr = [];
            })*/
        },
        watch:{
            authorityId(val){
                this.getAlready();
//                console.log(val)
            }
        },
        methods: {
            getAlready(){
                this.authorityArr = [];
                this.$http.post('manager/department/position_role',{
                    position_id : this.authorityId
                }).then((res)=>{
//                    console.log(res.data);
                    if (res.data.code==10070){
                        // 成功
                        this.authorityArr = res.data.data;
                    }
                })
            },
            sure(){
                console.log(this.authorityArr);
                this.$http.post('manager/department/role',{
                    position_id : this.authorityId,
                    id : this.authorityArr
                }).then((res)=>{
                    console.log(res.data);
                    if (res.data.code==10060){
                        // 成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        $('#myModalAuthority').modal('hide');
                    } else {
                        // 失败
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                })
            },
            pitch(ev,id){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.authorityArr.push(id);
                } else {
                    let index = this.authorityArr.indexOf(id);
                    if (index > -1) {
                        this.authorityArr.splice(index, 1);
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .modal{
        z-index: 1049;
    }
</style>