<template>
    <div>
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
                        <option value="0">全部</option>
                        <option value="1">仙林一组</option>
                        <option value="2">河西一组</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">全部</option>
                        <option value="1">啊啊啊</option>
                        <option value="2">对对对</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">全部</option>
                        <option value="1">鸡腿</option>
                        <option value="2">梦想</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="sr-only" for="star_time">开始时间</label>
                    <input type="date" class="form-control" id="star_time" placeholder="开始时间">
                </div>
                <div class="form-group">
                    <label class="sr-only" for="end_time">结束时间</label>
                    <input type="date" class="form-control" id="end_time" placeholder="结束时间">
                </div>
            </form>

        </div>

        <!--表格-->
        <div class="col-lg-12">
            <section class="panel table table-responsive">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center">片区名称</th>
                        <th class="text-center">组长</th>
                        <th class="text-center">组员</th>
                        <th class="text-center">实际业绩</th>
                        <th class="text-center">溢出业绩</th>
                        <th class="text-center">收房/套</th>
                        <th class="text-center">租房/套</th>
                        <th class="text-center">业绩排名</th>
                        <th class="text-center">绩效套餐</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr class="text-center">
                        <td>铁心桥一组</td>
                        <td>马金鑫</td>
                        <td>啊啊啊</td>
                        <td>3000</td>
                        <td>3000</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                    </tr>


                    </tbody>
                </table>
            </section>
        </div>
    </div>
</template>
<style scoped>

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