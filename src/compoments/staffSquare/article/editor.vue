<template>
    <div>
        <vue-editor
                useCustomImageHandler
                @imageAdded="handleImageAdded" v-model="content" @blur="sendData">
        </vue-editor>
    </div>
</template>

<script>
    import { VueEditor } from 'vue2-editor'
    export default{
        components: {VueEditor},
        data(){
            return {
                content: '',
            }
        },
        mounted(){
//            let vueEditor = document.getElementById('quill-container');
            let _this = this;
            let vueEditor = document.getElementsByClassName('quillWrapper ')[0]
//            console.log(vueEditor);
            $('body').bind('click',function (e) {
                if (!(e.target==vueEditor || vueEditor.contains(e.target))){
                    _this.saveContent();
                }
            })
        },
        methods: {
            saveContent: function() {
                // You have the content to save
//                console.log(this.content);
                if (this.content!=''){
                    this.$emit('editorContent',this.content);
                }
            },
            handleImageAdded: function(file, Editor, cursorLocation) {
                // An example of using FormData
                // NOTE: Your key could be different such as:
                // formData.append('file', file)

                var formData = new FormData();
                formData.append('image', file)

                this.$http.post('http://test.v2.api.boss.lejias.cn/picture/upload',formData).then((res)=>{
//                    console.log(res.data.data)
                    let picId = res.data.data;
                    this.$http.post('http://test.v2.api.boss.lejias.cn/picture/'+picId).then((res)=>{
                        let url = res.data.data; // Get url from response
                        Editor.insertEmbed(cursorLocation, 'image', url);
                    })

                })
            },
            sendData(){
                alert(1)
            }
        }
    }
</script>
<style scoped>

</style>