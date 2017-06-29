<template>
    <div>
        <div id="dropzone">
            <form action="" class="dropzone form-horizontal">
                <div @click="uploadPic(result)" :id="result"></div>
                {{pics}}
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["result"],
        data () {
            return {
                pics:[]
            };
        },
        methods: {
            uploadPic(v){
                console.log(globalConfig.server);
                let _this = this;
                let myDropzone = new Dropzone('#' + v, {
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
                            let card = (JSON.parse(file.xhr.response).data);
                            _this.pics.push(card);
                            _this.$emit('fff',_this.pics);
                            //上传成功时触发的事件
                        });
                        this.on("addedfile", function (file) {
                            //上传文件时触发的事件
                        });
                        this.on("queuecomplete", function (file) {
                            //上传完成后触发的方法
                        });
                        this.on("removedfile", function (file) {
                            let card = (JSON.parse(file.xhr.response).data);
                                _this.$emit('llll',card);
                                console.log(card);
                            //删除文件时触发的方法
                        });
                    }
                });
            },

        }
    }
</script>


<style scoped>

</style>
