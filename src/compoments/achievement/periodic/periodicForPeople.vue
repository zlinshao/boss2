<template>
    <div>

        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>周期表</li>
            <li class="active">个人</li>
        </ol>

        <div class="panel col-lg-12">
            <form class="form-inline clearFix" role="form">
                <div class="dropdown form-group">
                    <select name="" class="form-control" v-model="params.city">
                        <option value="">所有城市</option>
                        <option value="1">南京</option>
                        <option value="2">苏州</option>
                    </select>
                </div>

                <div class="dropdown form-group">
                    <select name="" class="form-control" v-model="params.region">
                        <option value="">全部区域</option>
                        <option value="1">玄武</option>
                        <option value="2">栖霞</option>
                    </select>
                </div>
                <div class="dropdown form-group">
                    <select name="" class="form-control" v-model="params.people">
                        <option value="">所有组员</option>
                        <option value="1">组员</option>
                        <option value="2">组员</option>
                    </select>
                </div>


                <div class="dropdown form-group">
                    <select name="" class="form-control">
                        <option value="">全部</option>
                        <option value="1">鸡腿</option>
                        <option value="2">梦想</option>
                    </select>
                </div>

                <div class="form-group datetime">
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="开始时间" class="form-control form_datetime">
                    </label>
                    <label>
                        <input @click="remindData" type="text" name="addtime" value="" placeholder="结束时间" class="form-control form_datetime">
                    </label>
                </div>
                <div class="input-group" style="margin-bottom: 18px;" @click="search">
                    <button type="button" class="btn btn-success">搜索</button>
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
                    <tr class="text-center" v-for="item in myData">
                        <td>{{item.region.name}}</td>
                        <td>{{item.headman}}</td>
                        <td>{{item.people}}</td>
                        <td>{{item.realAchieve}}</td>
                        <td>{{item.moreAchieve}}</td>
                        <td>{{item.collect}}</td>
                        <td>{{item.renting}}</td>
                        <td>{{item.ranking}}</td>
                        <td>{{item.achievePackage.name}}</td>
                    </tr>


                    </tbody>
                </table>
            </section>
        </div>
        <!--分页-->
        <Page :pg="paging" @pag="getData"></Page>
    </div>
</template>
<style scoped>

</style>
<script>
    import Page from '../../common/page.vue'

    export default{
        data(){
            return {
                params : {
                    city : '',
                    region : '',
                    people : '',
                    startDataTime : '',
                    finishDataTime : ''
                },
                myData : [],
                paging : ''
            }
        },
        created (){
            this.perPersonList();
        },
        updated (){
//            时间选择
            this.remindData();
        },
        components: {Page},
        methods : {
            perPersonList (){
                this.$http.get('json/periodicPerson.json').then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                    this.myData = res.data.data.person;
                    console.log(res.data);
                    this.paging = res.data.data.pages;
                })
            },
            remindData (){
                $('.form_datetime').datetimepicker({
                    minView: "month",                     //选择日期后，不会再跳转去选择时分秒
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd',
                    todayBtn: 1,
                    autoclose: 1,
//                    clearBtn: true,                     //清除按钮
                }).on('changeDate', function (ev) {
//                    console.log($(ev.target).attr('placeholder'));
//                    console.log(ev.target.placeholder);
                    if (ev.target.placeholder == '开始时间'){
                        this.params.startDataTime = ev.target.value;
                    } else {
                        this.params.finishDataTime = ev.target.value;
                    }
//                    console.log(this.startDataTime);
                }.bind(this));
            },
            getData(data){
                // 页数
                console.log(data);
            },
            search(){
                console.log(this.params);
            }
        }
    }
</script>