<template>
    <div>
        <p>
            {{pics}}
        </p>
        <div v-if="ok">
            <dropzone style="padding: 0;" ref="myVueDropzone" id="dropzone"
                      url="http://test.v2.api.boss.lejias.cn/picture/upload"
                      @vdropzone-success="showSuccess"
                      @vdropzone-removed-file="removeSuccess"
                      @vdropzone-files-added="added"
                      :dropzone-options="dropzoneOptions">
            </dropzone>
            <button @click="process">Process</button>
        </div>
    </div>
</template>

<script>
    import Dropzones from 'vue2-dropzone'
    import Dropzone from './2.vue'
    export default {
        components: { Dropzones, Dropzone },
        data () {
            return {
                pics: [],
                ok: true,
                dropzoneOptions: {
                    autoProcessQueue: true,         //自动上传
                    uploadMultiple: false,          //发送多个文件
                    parallelUploads: 10,            //并行处理多少文件上传

                },
            }
        },
        methods: {
            removeSuccess (val){
                let index = this.pics.indexOf(val);
                if (index > -1) {
                    this.pics.splice(index, 1);
                }
            },
            showSuccess (file, response) {
                this.pics.push(response.data);
            },
            added (){
            },
            process () {
//                console.log(this.$refs.myVueDropzone);
//                 this.$refs.myVueDropzone.setOption('maxFiles', this.$refs.myVueDropzone.dropzone.options.maxFiles + 1);
                let file = {size: 123000, name: "hhhhh"};
                let url = "src/111222.jpg";
                this.$refs.myVueDropzone.manuallyAddFile(file, url);
//                console.log(this.$refs.myVueDropzone.dropzone.options.url);
            }
        }
    }
</script>

<style scoped>

</style>