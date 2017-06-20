<template>
    <div>
        <div class="panel-body">
            <form class="form-inline" role="form">
                <div class="dropdown form-group">
                    <select name="area" id="area" class="form-control" @change="chooseArea" v-model="areaId">
                        <option :value="item.id" v-for="item in regions">{{item.area_name}}</option>
                    </select>
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="小组名称" v-model="areaName">
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="办公地址" v-model="areaAddr" @keyup.enter="addNewGroup">
                </div>

                <div class="form-group">
                    <button type="button" class="btn btn-success" @click="addNewGroup">
                        确定
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue',
                regions :'',
                areaId:this.$route.query.regionId,
                areaName : '',
                areaAddr : ''
            }
        },
        created: function () {
            this.getRegions();
        },
        methods:{
            getRegions(){
                this.$http.get('http://test.api.boss.lejias.cn/manager/Area/areaList')
                    .then(
                        res => this.regions=res.data.data
                    );
            },
            chooseArea(){
                alert(this.areaId);
            },
            addNewGroup(){
                alert(1);
                this.$http.post('http://test.api.boss.lejias.cn/manager/Groups/saveGroup' , {
                    "groups": this.areaName, //小组名称
                    "address": this.areaAddr,//办公地点
                    "region_id": this.areaId//所属区域id   select框选择区域名称
                }).then(function (res) {
                    alert('success');
                })
            }
        }
    }
</script>