<template>
    <button @click="submit">提交</button>
</template>
<script>
    export default {
        methods: {
            submit: function () {
                // 子组件中触发父组件方法ee并传值cc12345
                this.$emit('ee', 'cc12345')
            }
        }
    }
</script>