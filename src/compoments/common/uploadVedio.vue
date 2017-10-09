<template>
    <div>
        <div class="dropzone form-horizontal">
            <div @click="uploadVedio(result)" :id="result">
                <div v-for="(p, index) in idVedio.idVedios"
                     class="dz-preview dz-processing dz-file-preview dz-image-preview dz-success dz-complete">
                    <div class="dz-image" style="z-index: 0">
                        <!--<img data-dz-thumbnail="" alt="" :src="p.small">-->
                    </div>
                    <a class="dz-remove" @click="dele(index)">删除视频</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['result', 'idVedio'],
        data () {
            return {
                vedios: [],
            };
        },
        updated (){
            this.uploadVedio(this.result);
        },
        methods: {
            dele (rul){
                let index = this.vedios.indexOf(rul);
                if (index > -1) {
                    this.vedios.splice(index, 1);
                }
                this.$emit('delete', rul);
                this.$delete(this.idVedio.idVedios, rul);
            },
            uploadVedio (res){
                this.vedios = this.idVedio.idVedio;
                let _this = this;
                let myDropzone = new Dropzone('#' + res, {
                    url: globalConfig.vedio_address,
                    addRemoveLinks: true,
                    dictRemoveLinks: "x",
                    dictCancelUpload: "正在上传",
                    maxFiles: 50,       //一次性上传的文件数量上限
                    maxFilesize: 2048,    //MB
//                    acceptedFiles: ".jpg,.jpeg,.gif,.png,.bmp",
                    acceptedFiles: ".mp4",
                    dictMaxFilesExceeded: "您最多只能上传1个文件！",
                    dictFileTooBig: "文件过大上传文件最大支持.",
                    withCredentials: "yes",
                    dictRemoveFile : "删除视频",
                    init: function () {
                        this.on("success", function (file) {
                            let card = (JSON.parse(file.xhr.response).data);
//                            console.log(file);
                            _this.vedios.push(card);
                            _this.$emit('vedio', _this.vedios);
                            //上传成功时触发的事件
                        });
                        /*this.on("maxfilesreached", function (file) {
                            console.log(file);
                            alert(1)
//                            _this.$emit('complete','no');
                            //当文件数量达到最大时发生
//                            $(file._removeLink.offsetParent).addClass('rem_div');
                        });*/
                        this.on("canceled", function (file) {
                            console.log(file);
//                            _this.$emit('complete','no');
                            //当文件在上传时被取消的时候发生
//                            $(file._removeLink.offsetParent).addClass('rem_div');
                        });
                        this.on("addedfile", function (file) {
//                            console.log(file);
                            _this.$emit('complete','no');
                            //上传文件时触发的事件
                            $(file._removeLink.offsetParent).addClass('rem_div');
                        });
                        this.on("queuecomplete", function (file) {
                            _this.$emit('complete','ok');
                            //上传完成后触发的方法

                        });
                        this.on("removedfile", function (file) {
                            console.log(file);
                            let card = (JSON.parse(file.xhr.response).data);
                            _this.$emit('delete', card);
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
