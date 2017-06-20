<template>
    <editor id="editor" class="editor" @ee="cc"></editor>
</template>
<script>
    import editor from './2.vue'
    export default {
        methods: {
            cc: function (str) {
                alert(str)
            }
        },
        components:{
            editor
        }
    }
</script>