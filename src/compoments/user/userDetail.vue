<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li><router-link to="/user">用户管理</router-link></li>
            <li>用户详情</li>
            <li class="pull-right"  v-show="typeof (params) === 'object'">
                <router-link :to="{path:'/user',query: {params:params,departmentName:departmentName}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步</router-link>
            </li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-user"></i>&nbsp;用户详情
                    </h4>
                </header>
                <div v-for="item in userDetailList">
                    <div class="panel-body table-responsive client_info">
                        <div >
                            <div class="title">
                                <span>个人信息</span>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">姓名：</span>
                                    <span>{{item.name}}</span>
                                </div>
                                <div><span class="text-primary">性别：</span>
                                    <span v-if="item.gender === 1">男</span>
                                    <span v-if="item.gender === 2">女</span>
                                </div>
                                <div><span class="text-primary">生日：</span><span>{{item.birthday}}</span></div>
                                <div><span class="text-primary">年龄：</span></div>
                                <div><span class="text-primary">手机号：</span><span>{{item.mobile}}</span></div>
                                <div><span class="text-primary">紧急联系电话：</span><span>{{item.emergency_call}}</span></div>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">身份证号：</span><span>{{item.id_num}}</span></div>
                                <div><span class="text-primary">籍贯：</span><span>{{item.origin_addr}}</span></div>
                                <div>
                                    <span class="text-primary">学历：</span>
                                    <span>{{dictionary.education[item.education]}}</span>
                                </div>
                                <div><span class="text-primary">专业：</span><span>{{item.major}}</span></div>
                                <div><span class="text-primary">毕业院校：</span><span>{{item.school}}</span></div>
                                <div><span class="text-primary">毕业时间：</span><span>{{item.graduation_time}}</span></div>
                            </div>
                            <div class="col-md-4">
                                <div>
                                    <span class="text-primary">家庭住址：</span>
                                    <span>{{item.home_addr}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">政治面貌：</span>
                                    <span>{{dictionary.political_status[item.political_status]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">婚姻状况：</span>
                                    <span>{{dictionary.marital_status[item.marital_status]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">生育状态：</span>
                                    <span>{{dictionary.fertility_status[item.fertility_status]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">银行卡号：</span>
                                    <span>{{item.bank_num}}</span>
                                </div>
                                <div class="text-primary">
                                    <span class="text-primary">照片：</span>
                                    <a v-for="(img,index) in item.album.id_pic"
                                       style="margin: 10px 10px 0 0;display: inline-block;">
                                        <img :src="img.small"  @click="showLargePic('id_pic',index)">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body table-responsive client_info">
                        <div >
                            <div class="title">
                                <span>工作信息</span>
                            </div>
                            <div class="col-md-4">
                                <div>
                                    <span class="text-primary">岗位部门：</span>
                                    <span>{{item.department[0].name}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">职务：</span>
                                    <span>{{item.position_id[0].vocation}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">等级：</span>
                                    <span>{{dictionary.level[item.level]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">岗位职责：</span>
                                    <span v-for="role in item.role">
                                        {{role.title}}
                                    </span>
                                </div>
                                <div><span class="text-primary">入职时间：</span><span>{{item.enroll_time}}</span></div>
                                <div><span class="text-primary">工资：</span><span>{{item.salary}}</span></div>
                            </div>
                            <div class="col-md-4">
                                <div><span class="text-primary">转正时间：</span><span>{{item.full_time}}</span></div>
                                <div><span class="text-primary">工龄：</span><span></span></div>
                                <div>
                                    <span class="text-primary">第一次签合同时间：</span>
                                    <span>{{item.agreement_first_time}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">结束时间：</span>
                                    <span>{{item.agreement_first_end_time}}</span>
                                </div>
                                <div><span class="text-primary">第二次签合同时间：</span>
                                    <span>{{item.agreement_second_time}}</span>
                                </div>
                                <div><span class="text-primary">结束时间：</span>
                                    <span>{{item.agreement_second_end_time}}</span>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div>
                                    <span class="text-primary">离职时间：</span>
                                    <span>{{item.dismiss_time}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">保险：</span>
                                    <span v-if="item.five_insurance">已交</span>
                                    <span v-if="!item.five_insurance">已交</span>
                                </div>
                                <!--<div>-->
                                    <!--<span class="text-primary">资料：</span>-->
                                    <!--<span></span>-->
                                <!--</div>-->
                                <div>
                                    <span class="text-primary">购车：</span>
                                    <span>{{dictionary.car[item.car]}}</span>
                                </div>
                                <div>
                                    <span class="text-primary">购房：</span>
                                    <span>{{dictionary.house[item.house]}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="panel-body table-responsive client_info">
                    <div >
                        <div class="title">
                            <span>入职轨迹</span>
                        </div>
                        <div v-for="item in growth_chart">
                            <span class="text-primary">{{item.create_time}} ：</span>
                            <span>{{item.content}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <PicModal :largePic="largePic"></PicModal>
    </div>
</template>

<script>
    import PicModal from '../common/largePic.vue'
    export default{
        components:{PicModal},
        data(){
            return{
                userId:'',
                userDetailList:[],
                largePic : [],
                levelList: [],
                dictionary : [],
                params : [],
                departmentName : '',
                growth_chart : [],
            }
        },
        mounted (){
            this.userId = this.$route.query.UserId;
            this.params = this.$route.query.params;
            this.departmentName = this.$route.query.departmentName;
            this.getDictionary();
        },
        methods:{
            getDictionary(){
                this.$http.get('manager/user/dict').then((res)=>{
                    this.dictionary=res.data.user;
                    console.log(this.dictionary)
                    this.userDetail();
                })
            },
            userDetail(){
                this.$http.post('manager/user/readUser/id/'+this.userId).then((res) => {
                    this.userDetailList.push(res.data.data.data);
                    this.growth_chart = res.data.data.growth_chart;
                    console.log(res.data.data)
                })
            },
            showLargePic(name,index){
                this.srcs = this.userDetailList[0].album[name];
                this.largePic = [{
                    src : this.srcs,
                    i : index
                }];
                $('#largePic').modal('show');
            },
        }

    }
</script>


<style scoped>

    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    .client_info > div > div > div,.client_ > div  {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary,.client_ > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        /*text-align: right;*/
        min-width: 120px;
    }
    .title{
        padding-left: 15px;
        margin-bottom: 10px;
        border-left: 5px solid #CCCCCC;
    }
    .title>span{
        font-size: 22px;
    }
</style>
