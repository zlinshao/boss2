<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <div class="pro-sort">
                    <input @click="remindTime()" type="text" placeholder="选择日期"
                           v-model="Times" class="form-control remindTimes" readonly>
                </div>
                <div class="pro-sort">
                    <a class="btn btn-success">
                        <i class="fa fa-plus-square"></i>&nbsp;新增备忘录
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        data (){
            return {
                Times: '',
            }
        },
        updated (){
            this.remindTime();
        },
        methods: {
//            选择日期
            remindTime (){
                $('.remindTimes').datetimepicker({
                    minView: 'month',                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
                    initialDate: new Date(),
                    pickerPosition: 'bottom-left',
                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
                    this.Times = ev.target.value;
                }.bind(this));
            },
        }
    }
</script>


<style scoped>
    input {
        margin-bottom: 0;
    }

    .pro-sort {
        margin-right: 20px;
    }
</style>
