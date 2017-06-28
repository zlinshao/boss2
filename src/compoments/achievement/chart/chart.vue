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
                        <select name="" class="form-control">
                            <option value="2017">2017年</option>
                        </select>
                    </div>
                    <div class="dropdown form-group">
                        <select name="" class="form-control" v-model="currentMonth">
                            <option v-for="item in months" :value="item">{{item}}月</option>
                        </select>
                    </div>
                    <div class="input-group bootstrap-timepicker">
                        <label class="sr-only" for="search_info">搜索</label>
                        <input type="text" class="form-control" id="search_info" placeholder="组长/区长/业务员">
                        <span class="input-group-btn">
                            <button class="btn btn-success" id="search" type="button"><i class="fa fa-search"></i></button>
                        </span>
                    </div>
                </form>
            </div>
        </div>


        <div class="tips clearFix">
            <div class="col-lg-2">当前收房套数：<span>23340000</span></div>
            <div class="col-lg-2">当前租房套数：<span>23340000</span></div>
            <div class="col-lg-2">当月当前业绩：<span>23340000</span></div>
            <div class="col-lg-2">当月目标业绩：<span>23340000</span></div>
            <div class="col-lg-2">当月未完成业绩：<span>23340000</span></div>
        </div>


        <Chart></Chart>

    </div>
</template>
<style scoped>
    .tips{
        text-align: center;
        background-color: white;
        border-radius: 5px;
        line-height: 50px;
        font-size: 14px;
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
                currentMonth : '',       // 当前月
//                currentYear : ''        // 当前年
            }
        },
        components: {
            Chart
        },
        created : function () {
//            this.getCurrentYear();
            this.getCurrentMonth();
        },
        methods : {
            /*getCurrentYear(){
                // 获取当前年份
                this.currentYear = new Date().getFullYear();
            },*/
            getCurrentMonth(){
                // 获取当前月
                this.currentMonth = new Date().getMonth()+1;
//                console.log(date.getMonth());
            }
        }
    }
</script>