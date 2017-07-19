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


            <!--<button id="custom_service" type="button"
                    class="btn btn-default"
                    data-toggle="tooltip"
                    data-placement="left"
                    title="陆宣羽(15851899908)蔡云杰(13327823182)">

                <i class="fa fa-phone"></i>
            </button>-->
            <div id="custom_service" @mouseenter="show" @mouseleave="hide">
                <img src="../src/assets/img/u1032.png" alt="">
                <ul>
                    <li data-toggle="modal" data-target="#contact">
                        <i class="fa fa-phone"></i>咨询电话
                    </li>
                    <li data-toggle="modal" data-target="#suggest">
                        <i class="fa fa-edit"></i>建议反馈
                    </li>
                </ul>
            </div>
        </section>

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
                        <div>
                            <span>蔡云杰</span>
                            <span>13327823182</span>
                            <span>
                                <a href="tel:13327823182">电话</a>
                                <a href="sms:13327823182">发短信</a>
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
                        <button type="button" class="btn btn-primary" @click="sendSuggest">确定</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="clear">取消</button>
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
                            window.location.href = 'lockScreen';
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
            show(){
                $('#custom_service ul').show()
            },
            hide(){
                $('#custom_service ul').hide()
            },
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
    #custom_service {

        position: fixed;
        bottom: 10px;
        right: 10px;
        font-size: 20px;
        /*background: #00C1DE;*/
        background-color: white;
        z-index: 100;
        border: 0;
        border-radius: 50%;
    }

    #custom_service img {
        width: 50px;
    }

    #custom_service ul {
        background-color: white;
        padding: 0 10px;
        margin: 0;
        position: absolute;
        top: -86px;
        right: 0;
        border-radius: 10px;
        border: 1px solid #000;
        font-size: 16px;
        display: none;
    }

    #custom_service ul li {
        padding: 10px 12px;
        text-align: center;
        width: 140px;
        cursor: pointer;
    }

    #custom_service ul li:hover {
        color: #000;
    }

    #custom_service ul li i {
        margin-right: 12px;
    }

    #custom_service ul li + li {
        border-top: 1px solid #ddd;
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
