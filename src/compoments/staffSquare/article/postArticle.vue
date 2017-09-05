<template>
    <div>
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
                            <label class="col-lg-2 col-sm-2 control-label">标题：</label>
                            <div class="col-lg-6">
                                <input class="form-control" placeholder="再次输入标题，50个字符以内">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">分类：</label>
                            <div class="col-lg-6">
                                <select class="form-control">
                                    <option value="">--请选择--</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-2 col-sm-2 control-label">内容：</label>
                            <div class="col-lg-8" id="editorContainer">
                                <!--<UE :defaultMsg=defaultMsg :config=config ref="ue" @editorContext="getUEContent"></UE>-->
                                <Vueditor></Vueditor>
                            </div>
                        </div>
                    </form>
                </div>
                <div style="clear: both"></div>

                <div class="buttons">
                    <button class="btn btn-default">取消</button>
                    <button class="btn btn-warning">预览</button>
                    <button class="btn btn-primary">保存</button>
                </div>

            </div>
        </section>

    </div>
</template>

<script>
    import UE from './ueditor.vue'
    export default{
        components: {UE},
        data(){
            return {
                defaultMsg: 'ada',
                config: {
                    initialFrameWidth: null,
                    initialFrameHeight: 350
                }
            }
        },
        mounted(){
            let parent = new Vue({
                el: '#editorContainer'
            });
            let inst = parent.$children[0];
            inst.setContent('your content here');
            inst.getContent();
        },
        methods: {
            getUEContent(val) {
//                let content = this.$refs.ue.getUEContent();
                /*this.$notify({
                    title: '获取成功，可在控制台查看！',
                    message: val,
                    type: 'success'
                });*/
                console.log(val)
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
</style>