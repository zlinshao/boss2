<template>
    <div>
        <ol class="breadcrumb">
            <li>日志管理</li>
            <li class="active">操作记录{{page}}</li>
        </ol>

        <div class="panel col-lg-12 clearFix">
            <form class="form-inline clearFix" role="form">

                <div class="dropdown form-group">
                    <!--<label>操作模块</label>-->
                    <select class="form-control" v-model="params.module">
                        <option value="0">全部操作模块</option>
                        <option v-for="(value,key) in myModules" :value="key">{{value}}</option>
                    </select>
                </div>

                <div class="dropdown form-group">
                    <!--<label>操作类型</label>-->
                    <select class="form-control" v-model="params.operation">
                        <option value="0">全部操作类型</option>
                        <option  v-for="(value,key) in dictionary.operation" :value="key">{{value}}</option>
                    </select>
                </div>

                <div class="form-group datetime">
                    <label>
                        <input @click="remindData" readonly placeholder="开始时间" v-model="params.start_time" class="form-control form_datetime">
                    </label>
                    <label>
                        <input @click="remindData" readonly placeholder="结束时间" v-model="params.end_time" class="form-control form_datetime">
                    </label>
                </div>
                <div class="input-group bootstrap-timepicker">
                    <input type="text" class="form-control" id="search_info" placeholder="请点击选择操作人" readonly
                           v-model="user_name"  @click="selete">
                    <span class="input-group-btn">
                        <button class="btn btn-success" id="search" type="button" @click="search">搜索</button>
                    </span>
                </div>
                <div class="input-group reset" >
                    <button class="btn btn-success" type="button" @click="reset">重置</button>
                </div>
            </form>
        </div>

        <!--表格-->
        <div>
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th class="text-center">操作人</th>
                            <th class="text-center">所在部门</th>
                            <th class="text-center">操作时间</th>
                            <th class="text-center">操作平台</th>
                            <th class="text-center">IP地址</th>
                            <th class="text-center">操作浏览器</th>
                            <th class="text-center">操作模块</th>
                            <th class="text-center">操作类型</th>
                            <th class="text-center">操作结果</th>
                            <th class="text-center">操作描述</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in searchList">
                            <td class="text-center">{{item.staff_name}}</td>
                            <td class="text-center">{{item.department_name}}</td>
                            <td class="text-center">{{item.create_time}}</td>
                            <td class="text-center">{{item.system}}</td>
                            <td class="text-center">{{item.ip}}</td>
                            <td class="text-center">{{item.browser}}</td>
                            <td class="text-center">{{item.module}}</td>
                            <td class="text-center">{{dictionary.operation[item.operation]}}</td>
                            <td class="text-center">{{dictionary.results[item.results]}}</td>
                            <td class="text-center" v-html="item.description"></td>
                            <!--<td class="text-center">-->
                                <!--<button class="btn btn-default detail" data-toggle="popover" data-html="true"-->
                                        <!--data-placement="bottom" :data-content='item.description' @mouseenter="detail">-->
                                    <!--点我-->
                                <!--</button>-->
                            <!--</td>-->
                        </tr>
                        <tr v-if="isShow">
                            <td colspan="10" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <!--分页-->
        <Page :pg="pages" @pag="getData" :beforePage="currentPage"></Page>
        <Staff :configure='configure' @Staff="staffSeleted"></Staff>
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Staff from '../common/organization/selectStaff.vue'
    import Status from '../common/status.vue';                          //提示信息
    export default{
        components: {Page,Staff,Status},
        data(){
            return {
                pages: 1,     //总页数
                page : 1,      // 当前页数
                params : {
                    module : 0,
                    operation : 0,
                    start_time : '',
                    end_time : '',
                    staff_id : '',
                    page:1
                },
                configure:'',
                searchList:[],
                dictionary:[],
                user_name:'',
                myModules:[],
                currentPage:1,
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
                isShow:false,
            }
        },
        mounted(){
            this.getDictionary();
        },
        updated(){
            this.remindData ();
        },
        methods: {
            getDictionary(){
              this.$http.get('log/log/dict').then((res)=>{
                  this.dictionary=res.data;
                  this.search();
              })
            },
            search(){
                this.params.page = 1
                this.getList();
            },
            getList(){
                this.currentPage=this.params.page;
                this.$http.post('log/log',this.params).then((res)=>{
                    if(res.data.code==='90000'){
                        this.searchList=res.data.data.data;
                        this.pages=res.data.data.pages;
                        this.myModules=res.data.data.modules;
                        this.isShow = false;
                        this.info.success = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    }else {
                        this.searchList=[];
                        this.pages=1;
                        this.myModules=res.data.data.modules;
                        this.isShow = true;
                        this.info.error = res.data.msg;
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                    }

                })
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",   //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                }).on('changeDate', ev => {
                    if (ev.target.placeholder === '开始时间'){
                        this.params.start_time = ev.target.value;
                    } else {
                        this.params.end_time = ev.target.value;
                    }
                });
            },
            selete(){
                $('#selectCustom').modal('show');
                this.configure={length:1,class:'amount'};
            },
            getData(data){
                this.params.page = data;
                this.getList();
            },
            staffSeleted(val){
                if(val.staff.length){
                    this.params.staff_id=val.staff[0].id;
                    this.user_name=val.staff[0].name;
                }

            },
//            detail(){
//                $('.detail').popover();
//            }
            reset(){
                this.user_name='';
                this.params.module=0;
                this.params.operation=0;
                this.params.start_time='';
                this.params.end_time='';
                this.params.staff_id='';
                this.params.page=1;
                this.search();
            }
        }
    }
</script>

<style scoped>
    @media (min-width : 1024px) {
        tbody>tr>td:last-child{
            max-width: 300px;
        }
    }
    @media (min-width : 768px) {
        .reset{
            margin-top: -18px;
            margin-left: 15px;
        }
    }
</style>