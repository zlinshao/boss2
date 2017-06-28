<template>
    <div>
        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        客户信息
                        <a data-toggle="modal" class="pull-right" href="#collectAdd">编辑</a>
                    </h4>
                </header>
                <div class="panel-body table-responsive client_info">
                    <div class="col-md-12">
                        <div class="col-md-4">
                            <div><span class="text-primary">房屋地址：</span><span>积善公寓2-302</span></div>
                            <div><span class="text-primary">房型：</span><span>三室一厅一卫</span></div>
                            <div><span class="text-primary">面积：</span><span>120㎡</span></div>
                            <div><span class="text-primary">装修：</span><span>精装</span></div>
                            <div><span class="text-primary">配套设施：</span><span>空调，家具</span></div>
                            <div><span class="text-primary">房屋类型：</span><span>住宅</span></div>
                            <div><span class="text-primary">楼层：</span><span>5/11</span></div>
                            <div><span class="text-primary">建筑楼层：</span><span>多层</span></div>
                        </div>
                        <div class="col-md-8">
                            <div><span class="text-primary">所属小区：</span><span>积善公寓</span></div>
                            <div><span class="text-primary">房屋特色：</span><span>地铁沿线</span></div>
                            <div><span class="text-primary">个人/中介：</span><span>个人</span></div>
                            <div><span class="text-primary">房东姓名：</span><span>123479847398</span></div>
                            <div><span class="text-primary">手机号：</span><span>待出租</span></div>
                            <div><span class="text-primary">来源：</span><span>365收房网</span></div>
                            <div><span class="text-primary">负责人：</span><span>诸葛孔明</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!--房屋 编辑-->
        <CollectAdd :msg="noColl"></CollectAdd>
    </div>
</template>

<script>
    import CollectAdd from './collect_add.vue'
    export default {
        components: {CollectAdd},
        data (){
            return {
                noColl: {
                    newState: false,              //编辑房屋
                    sss: true
                }
            }
        },
        methods: {},

    }
</script>


<style scoped>

    h4 {
        border-bottom: 1px solid #aaaaaa;
        padding: 0 30px 8px;
    }

    .panel-body:not(:last-child) {
        border-bottom: 1px solid #aaaaaa;
    }

    .client_info > div > div > div {
        margin-bottom: 20px;
    }

    .client_info > div > div > > div span.text-primary {
        display: inline-block;
        padding-right: 20px;
        text-align: right;
        min-width: 100px;
    }

</style>
