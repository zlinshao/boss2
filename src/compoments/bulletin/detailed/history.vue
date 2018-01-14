<template>
    <div>
        <!--炸单-->
        <div role="dialog" class="modal fade bs-example-modal-sm has-js" id="history">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">历史记录</h4>
                    </div>
                    <div class="modal-body">
                        <div v-for="(key,index) in 10">
                            <router-link :to="{path: '/',query: {time: 1}}">2017-01-01</router-link>
                        </div>
                    </div>
                    <div class="modal-footer text-right">
                        <button data-dismiss="modal" class="btn btn-primary btn-md">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: ['urls'],
        methods: {}
    }
</script>

<style scoped>
    .modal-body {
        display: flex;
        display: -webkit-flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .modal-body > div {
        text-align: center;
        margin: 10px 0;
        width: 33.3333%;
    }

    .modal-body > div > a {
        cursor: pointer;
    }
</style>
