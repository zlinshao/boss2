<template>
    <div>
        <div class="dropzone form-horizontal">
            <div @click="uploadPic(result)" :id="result">
                <div v-for="(p, index) in idPhotos.cus_idPhotos"
                     class="dz-preview dz-processing dz-image-preview dz-success dz-complete"
                     v-if="p != '' && p.small !== null">
                    <div class="dz-image">
                        <img v-if="p.small" data-dz-thumbnail="" alt="" :src="p.small">
                        <!--<img v-else="" data-dz-thumbnail="" alt="" src="../../assets/img/head.png">-->
                    </div>
                    <a class="dz-remove" @click="rules(index)">删除文件</a>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['result', 'idPhotos'],
        data () {
            return {
                pics: [],
                is_property : 1000,
            };
        },
        updated (){
            this.uploadPic(this.result);
        },
        methods: {
            rules (rul){
                let index = this.pics.indexOf(rul);
                if (index > -1) {
                    this.pics.splice(index, 1);
                }
                this.$emit('delete', rul);
                this.$delete(this.idPhotos.cus_idPhotos, rul);
            },
            uploadPic (res){
                this.pics = this.idPhotos.cus_idPhoto;

                if(this.idPhotos.type === 'property'){
                    this.is_property = 4000;
                }else {
                    this.is_property = 1000;
                }
                let _this = this;
                let myDropzone = new Dropzone('#' + res, {
                    url: globalConfig.pic_address,
                    addRemoveLinks: true,
                    dictRemoveLinks: "x",
                    dictCancelUpload: "正在上传",
                    maxFiles: 60,       //一次性上传的文件数量上限
                    maxFilesize: 20,    //MB
                    resizeWidth: _this.is_property,
                    acceptedFiles: ".jpg,.jpeg,.gif,.png,.bmp,.doc,.docx,.xls,.xlsx,.pdf,",
                    dictResponseError: "当前网络连接不稳定请稍后再试",
                    dictMaxFilesExceeded: "您最多只能上传60个文件！",
                    dictFileTooBig: "文件过大上传文件最大支持.",
                    withCredentials: "yes",
                    init: function () {
                        this.on("success", function (file) {
                            let card = (JSON.parse(file.xhr.response).data);
//                            console.log(file);
                            _this.pics.push(card);
                            _this.$emit('photo', _this.pics);
                            //上传成功时触发的事件
                        });
                        this.on("addedfile", function (file) {
//                            console.log(file);.
                            _this.$emit('complete','no');
                            //上传文件时触发的事件
                            $(file._removeLink.offsetParent).addClass('rem_div');
                        });
                        this.on("queuecomplete", function (file) {
                            _this.$emit('complete','ok');
                            //上传完成后触发的方法
                        });
                        this.on("removedfile", function (file) {
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
