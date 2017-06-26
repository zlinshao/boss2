<template>
    <div>
        <div id="login">
            <header @click="clickMe">
                <span v-if="state">扫码登陆</span>
                <img v-if="state" src="./diannao.png" alt="pc">

                <span v-if="!state">短信登陆</span>
                <img v-if="!state" src="./erweima.png" alt="iphone">
            </header>

            <!--短信登陆-->
            <div class="login-wrap" v-if="!state">
                <div class="form-group">
                    <div class="col-sm-7">
                        <input type="text" class="form-control" placeholder="手机号" autofocus>
                    </div>
                    <div class="col-sm-5">
                        <input type="button" class="form-control btn btn-default" value="获取验证码" @click="gain">
                    </div>
                </div>
                <div class="form-group col-xs-12">
                    <input type="text" class="form-control" placeholder="请输入验证码" v-if="code">
                    <button class="btn btn-lg btn-login btn-block" type="submit">登陆</button>
                </div>
            </div>

            <!--扫码登陆-->
            <div v-show="state" class="login-wrap">
                <div id="login_container"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                state: true,
                code: false
            }
        },
        mounted (){
            !function (window, document) {
                function d(a) {
                    let e, c = document.createElement("iframe"),
                        d = "https://login.dingtalk.com/login/qrcode.htm?goto=" + a.goto;
                    d += a.style ? "&style=" + a.style : "";
                    d += a.href ? "&href=" + a.href : "";
                    c.src = d;
                    c.frameBorder = "0";
                    c.allowTransparency = "true";
                    c.scrolling = "no";
                    c.width = "365px";
                    c.height = "400px";
                    e = document.getElementById(a.id);
                    e.innerHTML = "";
                    e.appendChild(c)
                }

                window.DDLogin = d
            }(window, document);
            let obj = DDLogin({
                id: "login_container",//这里需要你在自己的页面定义一个HTML标签并设置id，例如<div id="login_container"></div>或<span id="login_container"></span>
                goto: encodeURIComponent("https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoa6pqll6sfxta66zjq&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://test.v2.api.boss.lejias.cn/staff/fromqr"),
                style: "",
                href: "",
                width: "300px",
                height: "300px"
            });
        },
        updated (){
            let hanndleMessage = function (event) {
                let loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
                let origin = event.origin;
                window.location.href = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoa6pqll6sfxta66zjq&response_type=code&scope=snsapi_login&state=STATE&redirect_urihttp://test.v2.api.boss.lejias.cn/staff/fromqr&loginTmpCode=' + loginTmpCode;
                console.log(event);
            };
            if (typeof window.addEventListener != 'undefined') {
                window.addEventListener('message', hanndleMessage, false);
            } else if (typeof window.attachEvent != 'undefined') {
                window.attachEvent('onmessage', hanndleMessage);
            }
        },
        methods: {
            clickMe (){
                this.state = !this.state;
            },

            gain (){
                this.code = true;
            },
        }
    }
</script>


<style scoped>

    #login {
        position: absolute;
        top: 66%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        padding: 16px;
        width: 400px;
        height: 400px;
        text-align: right;
    }

    header {
        border-bottom: 1px solid #CCCCCC;
        padding-bottom: 10px;
    }

    header span {
        display: inline-block;
        margin-right: 200px;
        font-size: 18px;
        color: #777777;
    }

    .login-wrap {
        margin-top: 20px;
        height: 270px;
    }

</style>
