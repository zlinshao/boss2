<template>
    <div id="app" v-show="isShow">
        <section id="container">
            <!--header-->
            <HeaderVue :urlId="urlId" :Name="urlName" :Card="urlCard" :simulate="simulates" :isSuper="superManager"></HeaderVue>
            <!--router-->
            <section id="main-content">
                <section class="wrapper">
                    <router-view :urlId="urlId" :simulate="simulates" :isSuper="superManager"></router-view>
                </section>
            </section>
            <!--loading-->
            <loading v-show="loading"></loading>

            <div class="btn-group dropup" id="custom_service">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" style="opacity: .7;">
                    <span class="fa fa-question-circle-o"></span>
                    <span class="sr-only">咨询</span>
                </button>
                <ul class="dropdown-menu" style="left: -124px;">
                    <li data-toggle="modal" data-target="#contact">
                        <a href="#"><i class="fa fa-phone"></i>咨询电话</a>
                    </li>
                    <li data-toggle="modal" data-target="#suggest">
                        <a href="#"><i class="fa fa-edit"></i>建议反馈</a>
                    </li>
                    <li data-toggle="modal" data-target="#shortcut"
                        v-show="simulates.indexOf('Customer/customerList')>-1||simulates.indexOf('CustomerPool/customerPool')>-1
                         ||simulates.indexOf('Villa/receivedVillaList')>-1||simulates.indexOf('Villa/villaList')>-1
                         ||simulates.indexOf('User/searchUser')>-1||simulates.indexOf('Manager/index')>-1
                         ||simulates.indexOf('System/index')>-1||simulates.indexOf('Approval/index')>-1
                         ||simulates.indexOf('Remind/index')>-1||simulates.indexOf('Secretary/index')>-1
                         ||simulates.indexOf('Msessage/self_message')>-1||simulates.indexOf('Message/department_message')>-1
                         ||simulates.indexOf('Favourite/index')>-1||superManager">
                        <a href="#"><i class="fa fa-arrow-circle-o-left"></i>快捷入口</a>
                    </li>
                </ul>
            </div>
            <div class="btn-group" id="custom_ser">
                <a href="#" type="button" class="btn btn-default">
                    <span class="fa fa-arrow-up"></span>
                </a>
            </div>
        </section>
        <!--快捷入口-->
        <div class="modal fade bs-example-modal-sm" id="shortcut" tabindex="-1" role="dialog"
             aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">快捷入口</h4>
                    </div>
                    <div class="modal-body">
                        <section class="panel">
                            <div class="panel-body">
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/custom"
                                             v-show="simulates.indexOf('Customer/customerList')>-1||superManager">客户
                                </router-link>                    <!--客户-->
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/customerPool"
                                             v-show="simulates.indexOf('CustomerPool/customerPool')>-1||superManager">
                                    客户池
                                </router-link>            <!--客户池-->
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/OkCollect"
                                             v-show="simulates.indexOf('Villa/receivedVillaList')>-1||superManager">公司房源
                                </router-link>             <!--公司房源-->
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/noCollect"
                                             v-show="simulates.indexOf('Villa/villaList')>-1||superManager">待收房源
                                </router-link>             <!--待收房源-->
                                <!--<router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/reportedRenting">租房报备</router-link>       &lt;!&ndash;租房报备&ndash;&gt;-->
                                <!--<router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/reportedCollect">收房报备</router-link>       &lt;!&ndash;收房报备&ndash;&gt;-->
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/user"
                                             v-show="simulates.indexOf('User/searchUser')>-1||superManager">员工管理
                                </router-link>                  <!--用户管理-->
                                <!--<router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/periodicForGcompany">公司业绩</router-link>   &lt;!&ndash;公司业绩&ndash;&gt;-->
                                <!--<router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/periodicForGroup">小组业绩</router-link>      &lt;!&ndash;小组业绩&ndash;&gt;-->
                                <!--<router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/periodicForPeople">个人业绩</router-link>     &lt;!&ndash;个人业绩&ndash;&gt;-->
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/leadingOut"
                                             v-show="simulates.indexOf('Manager/index')>-1||superManager">客户导出
                                </router-link>            <!--客户导出-->
                                <router-link data-dismiss="modal" class="btn btn-link col-xs-6" to="/messageCenter"
                                             v-show="simulates.indexOf('System/index')>-1||simulates.indexOf('Approval/index')>-1
                                            ||simulates.indexOf('Remind/index')>-1||simulates.indexOf('Secretary/index')>-1
                                            ||simulates.indexOf('Msessage/self_message')>-1||simulates.indexOf('Message/department_message')>-1
                                            ||simulates.indexOf('Favourite/index')>-1||superManager">消息中心
                                </router-link>         <!--消息中心-->
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
        <!--咨询电话-->
        <div class="modal fade bs-example-modal-sm" id="contact" tabindex="-1" role="dialog"
             aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">咨询电话</h4>
                    </div>
                    <div class="modal-body">
                        <div>
                            <span>陆宣羽</span>
                            <span>15851899908</span>
                            <span>
                                <a href="tel:15851899908">电话</a>
                                <a href="sms:15851899908">发短信</a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--建议反馈-->
        <div class="modal fade bs-example-modal-sm" id="suggest" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="mySmallModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true" @click="clear">&times;</span></button>
                        <h4 class="modal-title">建议反馈</h4>
                    </div>
                    <div class="modal-body">
                        <div class="form-group clearFix">
                            <label class="col-sm-2 control-label">问题描述:</label>
                            <div class="col-sm-10">
                                <!--<input type="email" class="form-control" id="inputEmail3" placeholder="Email">-->
                                <textarea cols="30" rows="5" class="form-control"
                                          v-model="suggestMsg.problem"></textarea>
                            </div>
                        </div>
                        <div class="form-group clearFix">
                            <label class="col-sm-2 control-label">建议方案:</label>
                            <div class="col-sm-10">
                                <!--<input type="email" class="form-control" id="inputEmail3" placeholder="Email">-->
                                <textarea cols="30" rows="5" class="form-control"
                                          v-model="suggestMsg.suggest"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="clear">取消</button>
                        <button type="button" class="btn btn-primary" @click="sendSuggest">确定</button>
                    </div>
                </div>
            </div>
        </div>
        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Status from './compoments/common/status.vue';
    import HeaderVue from './compoments/header/header.vue'
    import {mapGetters, mapActions} from 'vuex'

    export default {
//        props: ['simulate','isSuper'],
        data (){
            return {
                isShow: false,
                simulates: [],
                superManager: false,

                urlName: '',
                urlId: '',
                urlCard: '',

                // 建议反馈
                suggestMsg: {
                    problem: '',
                    suggest: '',
                    feedback_url: ''
                },
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
            }
        },
        computed: mapGetters([
            'loading'
        ]),
        components: {
            HeaderVue,
            Status
        },
        created (){
            this.login_status();            //登陆状态
            this.lock_screen();             //锁屏
        },
        methods: {
//            锁屏
            lock_screen (){
                let url = window.location.href;
                let url_index = url.split("lock")[1];
                if (url_index !== 'Screen') {
                    this.$http.get('auth/auth/lock_status').then((res) => {
                        if (res.data.code === '80080018') {
                            this.$router.push({path: 'lockScreen'});
                        }
                    });
                }
            },
//            登陆状态/权限列表
            login_status (){
                this.$http.get('staff/info').then((res) => {
                    if (res.data.code === 80019) {
                        window.location.href = 'login.html';
                        this.isShow = false;
                    } else {
                        globalConfig.urlName = res.data.name;
                        this.isShow = true;
                        this.urlName = res.data.name;
                        this.urlId = res.data.id;
                        this.urlCard = res.data.avatar;
                        for (let i = 0; i < res.data.auth_all.length; i++) {
                            this.simulates.push(res.data.auth_all[i].name);
                        }
                        this.superManager = res.data.super_auth.indexOf(res.data.id) > -1;
                    }
                });
            },
//            帮助建议
            sendSuggest(){
                this.suggestMsg.feedback_url = this.$route.fullPath;
                this.$http.post('feedback/index', this.suggestMsg).then((res) => {
                    if (res.data.code === '10020') {
                        // 成功
                        $('#suggest').modal('hide');
                        this.clear();
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                    } else {
                        this.info.error = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = true;
                        //显示成功弹窗 ***
                        this.info.state_success = false;
                    }
                })
            },
//            清除建议
            clear(){
                this.suggestMsg = {
                    problem: '',
                    suggest: ''
                };
            }
        }
    }
</script>

<style scoped>
    #custom_ser {
        position: fixed;
        bottom: 60px;
        right: 10px;
        z-index: 100;
    }

    #custom_ser > a {
        opacity: .4;
        border: 0
    }

    #custom_service {
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 100;
    }

    #custom_service > button {
        width: 36px;
        height: 36px;
        border-radius: 6px;
        border: 0;
        background-color: #E7EAF1;
    }

    #custom_service > button > .fa-question-circle-o {
        font-size: 26px;
        margin-left: -5px;
        margin-top: 0;
        color: #9AABBE;
    }

    #contact .modal-body {
        padding: 0 30px;
    }

    #contact .modal-body div {
        text-align: center;
        font-size: 15px;
        padding: 30px 0;
    }

    #contact .modal-body div a {
        font-size: 13px;
    }

    #contact .modal-body div + div {
        border-top: 1px solid #ddd;
    }

    #suggest textarea {
        resize: none;
    }
</style>
