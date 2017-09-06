
<template>
    <div>
        <ol class="breadcrumb">
            <li>人资管理</li>
            <li class="active">组织架构</li>
        </ol>

        <section class="panel ">
            <!--未选中-->
            <div class="panel-body">
                <div class="row">
                    <div class="col-lg-3">
                        <div>
                            <div>
                                <h5>组织架构</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-9">
                        <div>
                            <div>
                                <h5>岗位管理</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>

</script>

<style scoped>
    h5 {
        font-size: 18px;
        color: #333333;
    }
    .row > div:first-child{
        padding-left: 10px;
        padding-right: 5px;
    }
    .row > div:last-child{
        padding-left: 5px;
        padding-right: 10px;
    }
    .row > div >div{
        border: 1px solid #dddddd;
        padding: 10px;
        border-radius: 5px;
    }
    .row > div > div>div{
        border-bottom: 2px solid #CCCCCC;
    }
</style>

