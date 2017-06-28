<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">小组</li>
        </ol>

        <div class="col-lg-12">
            <form class="form-inline clearFix" role="form">

                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="0">所有城市</option>
                        <option value="1">南京</option>
                        <option value="2">苏州</option>
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
                        <th class="text-center">实际业绩</th>
                        <th class="text-center">应完成业绩</th>
                        <th class="text-center">差额</th>
                        <th class="text-center">收房/套</th>
                        <th class="text-center">租房/套</th>
                        <th class="text-center">组长</th>
                    </tr>
                    </thead>
                    <tbody id="rentingId">
                    <tr class="text-center">
                        <td>铁心桥一组</td>
                        <td>6000</td>
                        <td>3000</td>
                        <td>3000</td>
                        <td>100</td>
                        <td>100</td>
                        <td>马金鑫</td>
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