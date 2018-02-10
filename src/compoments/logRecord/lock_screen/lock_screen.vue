<template>
    <div class="lock-screen">
        <div class="lock-wrapper">

            <div id="time"></div>

            <div class="lock-box text-center">

                <img :src="head_sculpture" alt="lock avatar" style="width: 85px;height: 85px;border-radius: 50%;left: 37%;"/>

                <h1>{{name_debLocking}}</h1>
                <span class="locked">已锁定</span>
                <div class="form-group col-lg-12">
                    <input type="password" placeholder="输入解锁密码" v-model="debLocking" @keyup.enter.prevent="deblock"
                           class="form-control lock-input">
                    <button class="btn btn-lock" type="button" @click="deblock">
                        <i class="fa fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

        <Status :state='info'></Status>

    </div>
</template>

<script>
    import Status from '../../common/status.vue';
    export default {
        components: {Status},
        data (){
            return {
                debLocking: '',                 //解锁密码
                head_sculpture: '',             //头像
                name_debLocking: '',            //用户名
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },

        mounted(){
            this.startTime();
            this.$http.get('staff/info').then((res) => {
                this.head_sculpture = res.data.avatar;
                this.name_debLocking = res.data.name;
            });
        },
        methods: {
//             解锁
            deblock (){
                this.$http.post('auth/auth/unlock_screen', {
                    pwd_lock: this.debLocking,          //解锁密码
                }).then((res) => {
                    this.debLocking = '';
                    if (res.data.code === '80032') {
//                        解锁成功
                        this.info.success = res.data.msg;
                        //关闭失败弹窗 ***
                        this.info.state_error = false;
                        //显示成功弹窗 ***
                        this.info.state_success = true;

                        this.$router.replace({ path: '/'});
                    } else {
                        //关闭成功信息(可选)
                        this.info.state_success = false;
                        //失败信息 ***
                        this.info.error = res.data.msg;
                        //显示失败弹窗 ***
                        this.info.state_error = true;
                    }
                });
            },
            startTime (){
                let today = new Date();
                let h = today.getHours();
                let m = today.getMinutes();
                let s = today.getSeconds();
                // add a zero in front of numbers<10
                m = this.checkTime(m);
                s = this.checkTime(s);
                document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
                setTimeout(function () {
                    this.startTime();
                }.bind(this), 500);
            },
            checkTime (i){
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        }
    }
</script>


<style scoped>
    .lock-screen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
    }
</style>
