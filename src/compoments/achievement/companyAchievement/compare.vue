<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>公司业绩</li>
            <li class="active">收租房对比</li>
        </ol>

        <h4>
            <i class="fa fa-map-marker"></i>
            北苑二村18-203
        </h4>

        <div class="col-lg-12 compareContainer">
            <div class="col-lg-6 renting">
                <h5>租房信息</h5>

                <div class="col-lg-6">
                    <div class="compareList">
                        <span class="col-lg-6">喜报日期:</span>
                        <span>2016-12-03</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租房片区:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租房签约人:</span>
                        <span>哈哈哈</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租房情况:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">房屋地址:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">房屋类型:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">付款方式:</span>
                        <span>啊啊啊</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="compareList">
                        <span class="col-lg-6">租房价格:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">已收类型:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">已收金额:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">是否中介:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租实际业绩:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租溢出业绩:</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">总业绩:</span>
                        <span>啊啊啊</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-6 collect">
                <h5>收房信息</h5>
                <div class="col-lg-6">
                    <div class="compareList">
                        <span class="col-lg-6">喜报日期:</span>
                        <span>2016-12-03</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">收房片区:</span>
                        <span>是是是</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">收房签约人:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">房屋地址:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">空置期:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">房屋类型:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">年限:</span>
                        <span>对对对</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="compareList">
                        <span class="col-lg-6">付款方式:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">收房价格:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">是否中介:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租实际业绩:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">租溢出业绩:</span>
                        <span>对对对</span>
                    </div>
                    <div class="compareList">
                        <span class="col-lg-6">总业绩:</span>
                        <span>对对对</span>
                    </div>
                </div>


            </div>
        </div>

        <a class="pull-right" @click="$router.back(-1)">
            <button class="btn btn-success">返回</button>
        </a>
    </div>
</template>
<style scoped>
    h4{
        font-weight: bold;
        background-color: white;
        border-radius: 5px;
    }
    h4 i{
        display: inline-block;
        padding: 12px 17px;
        border-radius: 3px;
        vertical-align: middle;
        background-color: #8BC34B;
        color: white;
    }
    h5{
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
    }
    .compareList span:nth-of-type(1){
        color: #999;
        font-weight: bold;
    }
    .compareList span:nth-of-type(2){
         color: #666;
     }
    .compareList{
        font-size: 15px;
        line-height: 40px;
    }
    .renting{
        border-right: 2px dashed #ddd;
    }
    .compareContainer{
        background-color: white;
        border-radius: 10px;
        padding: 30px 0;
        margin-bottom: 20px;
    }
</style>
<script>
    export default{
        data(){
            return {
                id : ''
            }
        },
        components: {},
        created : function () {
            this.id = this.$route.query.id;
        }
    }
</script>