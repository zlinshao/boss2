<template>
    <div class="postArticle">
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>
                <router-link to="/article">发布文章</router-link>
            </li>
            <li>编辑</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        编辑
                    </h4>
                </header>

                <div class="postContainer col-lg-12">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">标题<sup class="required">*</sup>：</label>
                            <div class="col-lg-6">
                                <input class="form-control" placeholder="输入标题，50个字符以内" v-model="formData.title">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">分类<sup class="required">*</sup>：</label>
                            <div class="col-lg-6">
                                <select class="form-control" v-model="formData.type">
                                    <option value="">--请选择--</option>
                                    <option :value="value" v-for="(key,value) in dict.article_type">{{key}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">内容<sup class="required">*</sup>：</label>
                            <div class="col-lg-8" id="editorContainer">
                                <Editor @editorContent="getUEContent" :modifyContent="formData.content"></Editor>
                                <!--<Vueditor></Vueditor>-->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">封面图片<sup class="required">*</sup>：</label>
                            <div class="col-lg-8">
                                <upLoad @photo="coverPicId" @delete="picDelete" @complete="completePic"
                                        :result="'coverPic'" :idPhotos="coverPic"></upLoad>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">视频(仅MP4格式)：</label>
                            <div class="col-lg-8">
                                <UploadVedio :result="'vedio'" :idVedio="vedio"
                                             @vedio="uploadSuccess" @complete="uploadComplete" @delete="deleteVedio"></UploadVedio>
                            </div>
                        </div>
                    </form>
                </div>
                <div style="clear: both"></div>

                <div class="buttons">
                    <button class="btn btn-default" @click="cancel">取消</button>
                    <button class="btn btn-warning" @click="preview" :disabled="complete!='ok'">预览</button>
                    <button class="btn btn-primary" :disabled="complete!='ok'" @click="saveArticle(2)">保存</button>
                    <button class="btn btn-primary" :disabled="complete!='ok'" @click="saveArticle(1)">发布</button>
                </div>

            </div>
        </section>
        <Preview :title="formData.title" :content="formData.content" :type="formData.type" :vedioArr="vedioArr"></Preview>
        <!--提示信息-->
        <Status :state='info'></Status>
    </div>
</template>

<script>
    import Editor from './editor.vue'
    import Preview from './preview.vue'
    import UploadVedio from '../../common/uploadVedio.vue'
    import Status from '../../common/status.vue';
    import upLoad from '../../common/upload.vue'

    export default{
        components: {Editor,Preview,UploadVedio,Status,upLoad},
        data(){
            return {
                dict : {},
                articleId : 0,

                formData :{
                    title : '',
                    type : '',
                    content : '',

                },
                vedioArr : [],

                vedio : {
                    idVedios : {},    //修改ID
                    idVedio : [],     //上传ID
                },
                coverPic : {
                    cus_idPhotos : {},    //修改ID
                    cus_idPhoto : [],     //上传ID
                },

                complete : 'ok',
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
        mounted(){
            this.articleId = this.$route.query.articleId;
            this.$http.get('code/Staff_Square/dict').then((res)=>{
//                console.log(res.data);
                this.dict = res.data;
                this.getDeatils();
            });
        },
        methods: {
            getDeatils(){
                this.$http.get('code/Staff_Square/showDetails?id='+this.articleId).then((res)=>{
//                    console.log(res.data);
                    let msg = res.data.data[0];
//                    console.log(msg);
                    this.formData.title = msg.title;
                    this.formData.type = msg.type;
                    this.formData.content = msg.content;

                    this.vedio.idVedios = res.data.data[0].album.vedio_pic;
                    for (let i in this.vedio.idVedios) {
                        this.vedio.idVedio.push(i);
                    }
                    this.coverPic.cus_idPhotos = res.data.data[0].album.staff_pic;                            //修改图片ID
                    for (let i in this.coverPic.cus_idPhotos) {
                        this.coverPic.cus_idPhoto.push(i);
                    }
//                    console.log(this.vedio.idVedios)
                })
            },
            getUEContent(val) {
//                let content = this.$refs.ue.getUEContent();
                /*this.$notify({
                 title: '获取成功，可在控制台查看！',
                 message: val,
                 type: 'success'
                 });*/
//                console.log(val);
                this.formData.content = val;
            },
            cancel(){
                this.$router.back(-1)
            },
            preview(){
                $('.preview').show()
            },

            // 上传成功
            uploadSuccess(val){
//                console.log(val);
                this.vedio.idVedio = val;
            },
            // 上传完成
            uploadComplete(val){
//                console.log(val);
                this.complete = val;
                let _this = this;
                if (this.complete=='ok'){
                    this.vedioArr = [];
                    for (let i = 0 ; i<this.vedio.idVedio.length;i++){
                        this.$http.post('/picture/'+_this.vedio.idVedio[i]).then((res)=>{
                            console.log(res.data.data);
                            _this.vedioArr.push(res.data.data);
                        })
                    }
                }
            },
            // 删除
            deleteVedio(val){
                console.log(val);
                let index = this.vedio.idVedio.indexOf('val');
                if (index > -1) {
                    this.vedio.idVedio.splice(index, 1);
                }
                let vedioLink = '';
                this.$http.post('/picture/'+val).then((res)=>{
                    vedioLink = res.data.data;
                });
                let flag = this.vedioArr.indexOf(vedioLink);
                if (flag > -1){
                    this.vedioArr.splice(flag,1);
                }
            },
//            上传封面
            coverPicId(val){
//                console.log(val);
                this.coverPic.cus_idPhoto = val;
            },
            picDelete(val){
                let index = this.coverPic.cus_idPhoto.indexOf(val);
                if (index > -1) {
                    this.coverPic.cus_idPhoto.splice(index, 1);
                }
            },
            completePic(val){
                this.complete = val;
            },

            // 保存
            saveArticle(num){
                this.formData.vedio_pic = this.vedio.idVedio;
                this.formData.staff_pic = this.coverPic.cus_idPhoto;
//                console.log(this.vedio)
//                console.log(this.formData);

                if (this.formData.title==''||this.formData.type==''||this.formData.content==''||this.formData.staff_pic.length==0){
                    this.info.error = "请填写必要信息";
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                    return;
                }
                if (this.formData.staff_pic.length>1){
                    this.info.error = "只能上传一张封面图片";
                    //显示失败弹窗 ***
                    this.info.state_error = true;
                    return;
                }
                let _this = this;
                setTimeout(function () {
//                    alert(_this.formData.content)
                    _this.$http.post('code/Staff_Square/editArticle?id='+_this.articleId+'&is_public='+num,_this.formData).then((res)=>{
//                        console.log(res.data);
                        if (res.data.code==30014||res.data.code==30022){
                            // 成功
                            _this.info.success = res.data.msg;
                            //关闭失败弹窗 ***
                            _this.info.state_error = false;
                            //显示成功弹窗 ***
                            _this.info.state_success = true;
                            _this.$router.replace({ path: '/articleDetail',query:{articleId:_this.articleId}});
                        } else {
                            // 失败
                            _this.info.error = res.data.msg;
                            //显示失败弹窗 ***
                            _this.info.state_error = true;
                        }
                    })
                },10)
            }
        }
    }
</script>
<style scoped>
    .panel-body header h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 8px 4px;
    }

    .postContainer{
        padding-bottom: 20px;
        border-bottom: 1px solid #aaaaaa;
    }
    .buttons{
        text-align: center;
        padding-top: 12px;
    }
    .postArticle{
        position: relative;
    }
</style>