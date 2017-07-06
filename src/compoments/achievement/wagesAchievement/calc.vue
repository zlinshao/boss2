<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>工资业绩</li>
            <li class="active">计算详情</li>
        </ol>

        <h4>
            <i class="fa fa-map-marker"></i>
            北苑二村18-203
        </h4>

        <div class="clearFix calcContainer">
            <div class="col-lg-6 renting">
                <h3>租房</h3>
                <div class="col-lg-6">
                    <div class="calc">
                        <span class="col-lg-7">租房人：</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">租房合同编号：</span>
                        <span>LJS001226</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">租房付款方式：</span>
                        <span>一年付</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">收房价格：</span>
                        <span>1000</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="calc">
                        <span class="col-lg-7">所属片区：</span>
                        <span>马群一组</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">上传时间：</span>
                        <span>2017/12/12</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">租房价格：</span>
                        <span>680</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">收房年限：</span>
                        <span>2年</span>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="calc">
                        <span class="col-lg-6">总业绩：</span>
                        <span>680*12</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-6">租房人实际业绩：</span>
                        <span>(680*12)/2</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-6">收房人实际业绩：</span>
                        <span>(680*12)/2</span>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 collect">
                <h3>收房</h3>
                <div class="col-lg-6">
                    <div class="calc">
                        <span class="col-lg-7">收房人：</span>
                        <span>啊啊啊</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">收房合同编号：</span>
                        <span>马群一组</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">价格差：</span>
                        <span>20</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">付款方式：</span>
                        <span>2月付</span>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="calc">
                        <span class="col-lg-7">所属片区：</span>
                        <span>马群一组</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">上传时间：</span>
                        <span>2017/12/12</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">租房中介费：</span>
                        <span>0</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-7">收房中介费：</span>
                        <span>0</span>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="calc">
                        <span class="col-lg-6">价格差额比：</span>
                        <span>1-10%</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-6">租溢出业绩：</span>
                        <span>[(680*12)/2]*(1-10%)</span>
                    </div>
                    <div class="calc">
                        <span class="col-lg-6">收溢出业绩：</span>
                        <span>(680*12)*45%*(1-10%)</span>
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
        /*line-height: 50px;*/
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
    .calc span:nth-of-type(1){
        color: #999;
        font-weight: bold;
        /*text-align: right;*/
    }
    .calc span:nth-of-type(2){
        color: #666;
    }
    .calc{
        font-size: 15px;
        line-height: 40px;
    }
    .calcContainer{
        background-color: white;
        border-radius: 10px;
        padding: 30px 0;
        margin-bottom: 20px;
    }
    .collect,.renting{
        padding: 20px 0;
    }
    @media (min-width: 1200px){
        .collect{
            border-left: 2px dashed #ddd;
        }
    }
    @media (max-width: 1199px){
        .collect{
            border-top: 2px dashed #ddd;
        }
    }
    .collect .col-lg-6:nth-of-type(2),.renting .col-lg-6:nth-of-type(2){
        margin-bottom: 12px ;
    }
    .collect .col-lg-12 span:nth-of-type(1),.renting .col-lg-12 span:nth-of-type(1){
        text-align: right;
    }
    .collect h3,.renting h3{
        text-align: center;
        margin-bottom: 25px;
    }
</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {}
    }
</script>