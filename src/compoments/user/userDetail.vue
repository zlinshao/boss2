<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li><router-link to="/user">用户管理</router-link></li>
            <li>用户详情</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-user"></i>&nbsp;用户详情
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info" v-for="item in userDetailList">
                    <div >
                        <div class="col-md-4">
                            <div><span class="text-primary">用户名：</span>
                                <span>{{item.name}}</span></div>
                            <div>
                                <span class="text-primary">真实姓名：</span>
                                <span>{{item.real_name}}</span>
                            </div>
                            <div><span class="text-primary">性别：</span>
                                <span v-if="item.gender === 1">男</span>
                                <span v-if="item.gender === 2">女</span>
                            </div>
                            <div><span class="text-primary">生日：</span><span>{{item.birthday}}</span></div>
                            <div><span class="text-primary">手机号：</span><span>{{item.mobile}}</span></div>
                            <div><span class="text-primary">紧急联系电话：</span><span>{{item.emergency_call}}</span></div>
                            <div><span class="text-primary">身份证号：</span><span>{{item.id_num}}</span></div>
                            <div>
                                <span class="text-primary">银行卡号：</span>
                                <span>{{item.bank_num}}</span>
                            </div>

                        </div>
                        <div class="col-md-8">
                            <div><span class="text-primary">入职时间：</span><span>{{item.enroll_time}} </span></div>
                            <div><span class="text-primary">部门：</span><span>{{item.department[0].name}}</span></div>
                            <div><span class="text-primary">职务：</span><span>{{item.position_id[0].vocation}}</span></div>
                            <div><span class="text-primary">用户组：</span><span>{{item.role[0].title}}</span></div>
                            <div>
                                <span class="text-primary">等级：</span>
                                <span>{{levelList[item.level]}}&nbsp; &nbsp;</span>
                            </div>
                            <div><span class="text-primary">用户状态：</span>
                                <span v-if="item.status === 1">在职</span>
                                <span v-if="item.status === 2">离职</span>
                            </div>
                        </div>
                    </div>
                    <div class="client_ col-xs-12">
                        <div>
                            <span class="text-primary">照片：</span>
                            <a v-for="(img,index) in item.album.id_pic"
                               style="margin: 10px 10px 0 0;display: inline-block;">
                                <img :src="img.small"  @click="showLargePic('id_pic',index)">
                            </a>
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
            }
        },
        mounted (){
            this.userId = this.$route.query.UserId;
            this.userDetail();
            this.getLevel();
        },
        methods:{
            userDetail(){
                this.$http.get('manager/user/readUser/id/'+this.userId).then((res) => {
                    this.userDetailList.push(res.data.data);
                    console.log(this.userDetailList)
                })
            },
            getLevel(){
                this.$http.get('manager/user/level').then((res)=>{
                    this.levelList=res.data.data;
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

    .panel-body:not(:last-child) {
        border-bottom: 1px solid #aaaaaa;
    }

    .client_info > div > div > div,.client_ > div  {
        margin-bottom: 20px;
    }

    .client_info > div > div > div span.text-primary,.client_ > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

</style>
