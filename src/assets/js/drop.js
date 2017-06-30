/**
 * Created by linshao on 2017/6/29.
 */

Dropzone.autoDiscover = false;

let dddd = [];

function upload() {
    $("#pic").dropzone( {
        url: "http://test.api.boss.lejias.cn/picture/upload",
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
                dddd.push(card);
                //上传成功时触发的事件
            });
            this.on("addedfile", function(file) {
                //上传文件时触发的事件
            });
            this.on("queuecomplete",function(file) {
                //上传完成后触发的方法
            });
            this.on("removedfile", function (file) {
                //删除文件时触发的方法
            });
        }
    });
}


