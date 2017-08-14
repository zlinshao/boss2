<template>
    <div id="app">
        <section id="container">
            <!--header-->
            <HeaderVue :Name="urlName" :Card="urlCard"></HeaderVue>
            <!--router-->
            <section id="main-content">
                <section class="wrapper">
                    <router-view></router-view>
                </section>
            </section>
            <!--loading-->
            <loading v-show="loading"></loading>

            <div class="btn-group dropup" id="custom_service">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                    <li data-toggle="modal" data-target="#shortcut">
                        <a href="#"><i class="fa fa-arrow-circle-o-left"></i>快捷入口</a>
                    </li>
                </ul>
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
                                <router-link class="btn btn-link col-xs-6" to="/custom">客户</router-link>  <!--客户-->
                                <router-link class="btn btn-link col-xs-6" to="/customerPool">客户池</router-link>  <!--客户池-->
                                <router-link class="btn btn-link col-xs-6" to="/OkCollect">公司房源</router-link>  <!--公司房源-->
                                <router-link class="btn btn-link col-xs-6" to="/noCollect">待收房源</router-link>  <!--待收房源-->
                                <router-link class="btn btn-link col-xs-6" to="/reportedRenting">租房报备</router-link>  <!--租房报备-->
                                <router-link class="btn btn-link col-xs-6" to="/reportedCollect">收房报备</router-link>  <!--收房报备-->
                                <router-link class="btn btn-link col-xs-6" to="/user">员工管理</router-link>  <!--用户管理-->
                                <router-link class="btn btn-link col-xs-6" to="/periodicForGcompany">公司业绩</router-link>  <!--公司业绩-->
                                <router-link class="btn btn-link col-xs-6" to="/periodicForGroup">小组业绩</router-link>  <!--小组业绩-->
                                <router-link class="btn btn-link col-xs-6" to="/periodicForPeople">个人业绩</router-link>  <!--个人业绩-->
                                <router-link class="btn btn-link col-xs-6" to="/leadingOut">客户导出</router-link>  <!--客户导出-->
                                <router-link class="btn btn-link col-xs-6" to="/messageCenter">消息中心</router-link>  <!--消息中心-->
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
        data (){
            return {
                urlName: '',
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
                if (url_index != 'Screen') {
                    this.$http.get('auth/auth/lock_status').then((res) => {
                        if (res.data.code === '80080018') {
                            this.$router.push({ path: 'lockScreen' });
                        }
                    });
                }
            },
//            登陆状态
            login_status (){
                this.$http.get('staff/info').then((res) => {
                    if (res.data.code === 80019) {
                        window.location.href = 'login.html'
                    } else {
                        globalConfig.urlName = res.data.name;
                        this.urlName = res.data.name;
                        this.urlCard = res.data.avatar;
                    }
                });
            },
//            show(){
//                $('#custom_service ul').show()
//            },
//            hide(){
//                $('#custom_service ul').hide()
//            },
            sendSuggest(){
//                console.log(this.$route.name);
                this.suggestMsg.feedback_url = this.$route.fullPath;
//                console.log(this.suggestMsg);
                this.$http.post('feedback/index', this.suggestMsg)
                    .then(
                        (res) => {
                            if (res.data.code == 10020) {
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
                        }
                    )
//                $('#suggest').modal('hide');
            },
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
    #custom_service{
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 100;
    }
    #custom_service > button{
        width: 36px;
        height: 36px;
        border-radius: 6px;
        border: 0;
        background-color: #E7EAF1;
    }
    #custom_service > button > .fa-question-circle-o{
        font-size: 26px;
        margin-left: -5px;
        margin-top: 0;
        color: #9AABBE;
    }
    /*#custom_service {*/
        /*position: fixed;*/
        /*bottom: 10px;*/
        /*right: 10px;*/
        /*font-size: 20px;*/
        /*width: 50px;*/
        /*height: 50px;*/
        /*!*background: #00C1DE;*!*/
        /*background-color: white;*/
        /*z-index: 100;*/
        /*border: 0;*/
        /*border-radius: 50%;*/
        /*text-align: center;*/
    /*}*/

    /*#custom_service i{*/
        /*line-height: 50px;*/
        /*font-size: 30px;*/
    /*}*/

    /*#custom_service ul {*/
        /*background-color: white;*/
        /*padding: 0 10px;*/
        /*margin: 0;*/
        /*position: absolute;*/
        /*top: -86px;*/
        /*right: 0;*/
        /*border-radius: 5px;*/
        /*border: 1px solid #000;*/
        /*font-size: 16px;*/
        /*display: none;*/
    /*}*/

    /*#custom_service ul li {*/
        /*padding: 10px 12px;*/
        /*text-align: center;*/
        /*width: 140px;*/
        /*cursor: pointer;*/
    /*}*/

    /*#custom_service ul li:hover {*/
        /*color: #000;*/
    /*}*/

    /*#custom_service ul li i {*/
        /*margin-right: 12px;*/
    /*}*/

    /*#custom_service ul li + li {*/
        /*border-top: 1px solid #ddd;*/
    /*}*/

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
