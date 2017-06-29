<template>
    <div id="dropzone">
        <form action="" class="dropzone form-horizontal">
            <div @click="aaa" id="pic"></div>
        </form>
        {{aaa}}
    </div>
    <!--<div>-->
    <!--<switchbtn :result="result" @on-result-change="onResultChange"></switchbtn>-->
    <!--<input type="button" value="change" @click="change">-->
    <!--</div>-->
</template>

<script>
    export default {
        data() {
            return {
                aaa: ''
            }
        },
        mounted (){
            this.aaa = globalConfig.urlName;
        },
        methods: {
            aaa(){
                let myDropzone = new Dropzone('div#pic', {
                    url: globalConfig.pic_address,
                    addRemoveLinks: true,
                    dictRemoveLinks: "x",
                    dictCancelUpload: "正在上传",
                    maxFiles: 10,       //一次性上传的文件数量上限
                    maxFilesize: 20,    //MB
                    acceptedFiles: ".jpg,.jpeg,.gif,.png,.bmp",
                    dictMaxFilesExceeded: "您最多只能上传10个文件！",
                    dictFileTooBig: "文件过大上传文件最大支持.",
                    withCredentials: "yes",
                    init: function () {
                        this.on("success", function (file) {
                            //上传成功时触发的事件
                        });
                        this.on("addedfile", function (file) {
                            //上传文件时触发的事件
                        });
                        this.on("queuecomplete", function (file) {
                            alert(11111111)
                            //上传完成后触发的方法
                        });
                        this.on("removedfile", function (file) {
                            //删除文件时触发的方法
                        });
                    }
                });
            }
        }
    }


    //    let hhh = document.getElementById('pic');

    //    import switchbtn from './2.vue'
    //    export default {
    //        components: {switchbtn},
    //        data() {
    //            return {
    //                result: true
    //            }
    //        },
    //        methods: {
    //            change() {
    //                this.result = !this.result;
    //            },
    //            onResultChange(val){
    //                this.result = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    //            }
    //        }
    //    }
</script>


<style scoped>

</style>
