<template>
    <div class="postArticle">
        <ol class="breadcrumb">
            <li>员工广场</li>
            <li>
                <router-link to="/article">发布文章</router-link>
            </li>
            <li>新增</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        新增
                    </h4>
                </header>

                <div class="postContainer col-lg-12">
                    <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">标题<sup class="required">*</sup>：</label>
                            <div class="col-lg-6">
                                <input class="form-control" placeholder="输入标题，50个字符以内">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">分类<sup class="required">*</sup>：</label>
                            <div class="col-lg-6">
                                <select class="form-control">
                                    <option value="">--请选择--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">内容<sup class="required">*</sup>：</label>
                            <div class="col-lg-8" id="editorContainer">
                                <Editor @editorContent="getUEContent"></Editor>
                                <!--<Vueditor></Vueditor>-->
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
                    <button class="btn btn-primary" :disabled="complete!='ok'">保存</button>
                </div>

            </div>
        </section>
        <Preview :title="title" :content="content" :classify="classify" :vedioArr="vedioArr"></Preview>
    </div>
</template>

<script>
    import Editor from './editor.vue'
    import Preview from './preview.vue'
    import UploadVedio from '../../common/uploadVedio.vue'
    export default{
        components: {Editor,Preview,UploadVedio},
        data(){
            return {
                title : 'dddddddd',
                classify : 'asdsa',
                content : '',

                vedioArr : [],

                vedio : {
                    idVedios : {},    //修改ID
                    idVedio : [],     //上传ID
                },
                complete : 'ok'
            }
        },
        mounted(){

        },
        methods: {
            getUEContent(val) {
//                let content = this.$refs.ue.getUEContent();
                /*this.$notify({
                    title: '获取成功，可在控制台查看！',
                    message: val,
                    type: 'success'
                });*/
                console.log(val);
                this.content = val;
            },
            cancel(){
                this.$router.back(-1)
            },
            preview(){
                $('.preview').show()
            },

            // 上传成功
            uploadSuccess(val){
                console.log(val);
                this.vedio.idVedio = [];
                this.vedio.idVedio = val;
            },
            // 上传完成
            uploadComplete(val){
                console.log(val);
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