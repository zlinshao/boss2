<template>
    <div>
        <div id="editor" type="text/plain"></div>
    </div>
</template>

<script>
    import '../../../UE/ueditor.config'
    import '../../../UE/ueditor.all.min'
    import '../../../UE/lang/zh-cn/zh-cn'
    import '../../../UE/ueditor.parse.min'

    export default{
        name : 'UE',
        props : {
            defaultMsg: {
                type: String
            },
            config: {
                type: Object
            }
        },
        components: {},
        mounted() {
            const _this = this;
            this.editor = UE.getEditor('editor', this.config); // 初始化UE
            this.editor.addListener("ready", function () {
                _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
            });
            /*UE.getEditor('content').addListener('selectionchange',function(editor){
                alert(1)
                console.log(_this.getUEContent());
            });*/
            this.editor.addListener('blur',function () {
//                alert(1)
                _this.getUEContent();
            })
            /*$('body').bind('click',function (e) {
                let editor = document.getElementById('editor');
//                console.log(editor)
                if (editor!=null){
                    if (!(e.target==editor || editor.contains(e.target))){
                        _this.getUEContent();
                    }
                }


            })*/
        },
        data(){
            return {
                editor : null
            }
        },
        destroyed() {
            this.editor.destroy();
        },
        methods: {
            getUEContent() { // 获取内容方法
//                alert(UE.getEditor('editor').getContent())
                this.$emit('editorContext',UE.getEditor('editor').getContent())
//                console.log(UE.getEditor('editor').getContent())
//                return UE.getEditor('editor').getContent();
            }
        }
    }
</script>
<style scoped>

</style>