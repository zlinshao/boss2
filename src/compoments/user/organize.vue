<template>
    <div>
        <button type="button" class="btn btn-primary " data-toggle="modal" data-target="#myModal2">
            组织架构
        </button>
        <!--<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">-->
        <!--Launch demo modal-->
        <!--</button>-->

        <!--右侧栏-->
        <!--新增模态框-->
        <div class="modal fade full-width-modal-right" id="myModal2" tabindex="-1" role="dialog"
             aria-labelledby="myModal2" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content-wrap">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title text-center">任务详情</h4>
                        </div>
                        <div class="modal-body">
                            <div data-toggle="modal" data-target="#myModal" class="alert alert-block alert-success fade in" @click="getBranch">
                            <span>click</span>
                            <span v-for="item in showMember" style="padding: 5px">{{item}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">组织架构</h4>
                    </div>
                    <div class="modal-body" style="height: 400px">
                        <div class="col-lg-6">
                            <div style="border: 1px solid #aaa;overflow: auto;height: 366px">
                                <div id="tagsinput_tagsinput" class="tagsinput " style="height: 100%;">
                                    <span class="tag" v-for="item in member" v-if="member!=''">
                                        <span >{{item}}&nbsp;&nbsp;</span>
                                        <a class="tagsinput-remove-link" @click="deleteName(item)"></a>
                                    </span>
                                    <input value="" @keyup="search()" v-model="keywords" style="color: rgb(102, 102, 102); width: 90%;">
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-5" style="border: 1px solid #aaa;overflow: auto;height: 366px">
                            <div style="text-align: center;">南京乐嘉商业管理有限公司</div>
                            <div>
                                <a @click="getBranch">南京乐嘉商业管理有限公司</a>
                                <a v-if='isBranch' @click="getUser(reuserId,role)"> &gt; {{role}}</a>
                            </div>
                            <div class="checkbox" style="border-bottom: 1px solid #aaaaaa;">
                                <label><input type="checkbox" @check="">全选</label>
                            </div>
                            <div style="border-bottom: 1px solid #aaaaaa;" v-for="item in branchList" v-if="type==1"
                                  @click.stop="getUser(item.id,item.name)">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox">{{item.name}}
                                    </label>
                                </div>
                            </div>
                            <div style="border-bottom: 1px solid #aaaaaa; padding: 10px;" v-for="(item,index) in userList" v-if="type==2"
                                 @click="select(item.name)" >
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="new_add btn btn-success " @click="addNew" data-dismiss="modal"
                                aria-label="Close">新增
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        data(){
            return {
                branchList: [],
                userList: [],
                name: '',
                type: '',
                reuserId: '',
                member: [],
                isBranch: '',
                role: "",
                showMember: [],
                keywords:'',
                searchName:[]
            }
        },
        mounted(){

        },
        methods: {
            getBranch(){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/searchBranch').then((res) => {
                    this.branchList = res.data.data;
                    this.type = 1;
                    this.member=[];
                    this.isBranch = false;
                })
            },
            getUser(userId, name){
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/userListBr/id/' + userId).then((res) => {
                    console.log(res)
                    this.userList = res.data.data;
                    this.type = 2;
                    this.isBranch = true;
                    this.role = name;
                    this.reuserId = userId;
                })
            },
            search(){
                console.log(decodeURI(this.keywords))
                this.$http.get('http://test.v2.api.boss.lejias.cn/manager/user/searchUser/user_mobile/' + decodeURI(this.keywords)).then((res) => {
                    console.log(res)
                    this.userList = res.data.data;
                })
            },
            select(name){
                if($.inArray(name, this.member)==-1){
                    this.member.push(name);
                }
            },
            deleteName(name){
                this.member=this.member.filter((x)=>x!=name);
            },
            addNew(){
                this.showMember = this.member
            },
            empty(){
                this.showMember = [];
                this.member = [];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
