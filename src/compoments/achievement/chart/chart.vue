<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li class="active">公司业绩汇总</li>
        </ol>

        <div class="clearFix">
            <div class="col-lg-12">
                <form class="form-inline clearFix" role="form">

                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="0">全部</option>
                            <option value="1">南京</option>
                            <option value="2">苏州</option>
                        </select>
                    </div>

                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">玄武</option>
                            <option value="">栖霞</option>
                        </select>
                    </div>
                    <div class="dropdown form-group">
                        <select name="" class="form-control">
                            <option value="">组员</option>
                            <option value="">组员</option>
                            <option value="">组员</option>
                        </select>
                    </div>
                    <div class="dropdown form-group">
                        <select name="" class="form-control" v-model="year">
                            <option value="2017">2017年</option>
                        </select>
                    </div>
                    <div class="dropdown form-group">
                        <select name="" class="form-control" v-model="month">
                            <option v-for="item in months" :value="item">{{item}}月</option>
                        </select>
                    </div>
                    <div class="input-group bootstrap-timepicker">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="组长/区长/业务员" @keydown.enter.prevent="">
                        <span class="input-group-btn">
                            <button class="btn btn-success" id="search" type="button"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </form>
            </div>
        </div>

        <div class="tipContainer">
            <h3>{{year}}年{{month}}月</h3>
            <div class="tips clearFix">
                <div class="col-lg-2">收房套数：<span>230</span></div>
                <div class="col-lg-2">租房套数：<span>2300</span></div>
                <div class="col-lg-2">当前业绩：<span>200</span></div>
                <div class="col-lg-2">目标业绩：<span>2330</span></div>
                <div class="col-lg-2">未完成业绩：<span>23000</span></div>
            </div>
        </div>



        <Chart></Chart>

    </div>
</template>
<style scoped>
    .tipContainer{
        background-color: white;
        border-radius: 5px;
        padding-top: 5px;
    }
    .tipContainer h3{
        text-align: center;
        font-weight: 500;
        font-size: 30px;
        margin-bottom: 20px;
        color: #2A3542;
        letter-spacing: 2px;
    }
    .tips{
        text-align: center;

        line-height: 50px;
        font-size: 16px;
        color: #333;
        margin: auto;
    }
    .tips div{
        margin-left: 2.5%;
    }
    .tips span{
        font-size: 18px;
        color: #FF6C60;
        font-weight: bold;
    }


</style>
<script>
    import Chart from './showChart.vue'
    export default{
        data(){
            return {
                months : [1,2,3,4,5,6,7,8,9,10,11,12],
                month : '',       // 当前月
                year : ''        // 当前年
            }
        },
        components: {
            Chart
        },
        created : function () {
            this.getCurrentYear();
            this.getCurrentMonth();
        },
        methods : {
            getCurrentYear(){
                // 获取当前年份
                this.year = new Date().getFullYear();
            },
            getCurrentMonth(){
                // 获取当前月
                this.month = new Date().getMonth()+1;
//                console.log(date.getMonth());
            }
        }
    }
</script>