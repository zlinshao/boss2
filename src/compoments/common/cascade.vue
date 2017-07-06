<template>
    <div class="cascade">
        <div class="dropdown form-group">
            <select name="" class="form-control" v-model="send.city" @change="sendData('city')">
                <option value="0">全部城市</option>
                <option :value="item.id" v-for="item in cities">{{item.name}}</option>
            </select>
        </div>

        <div class="dropdown form-group" v-show="regions.length!=0">
            <select name="" class="form-control" v-model="send.region" @change="sendData('region')">
                <option value="0" selected>全部区域</option>
                <option :value="item.id" v-for="item in regions">{{item.name}}</option>
            </select>
        </div>

        <div class="dropdown form-group" v-show="groups.length!=0">
            <select name="" class="form-control" v-model="send.group" @change="sendData('group')">
                <option value="0">全部小组</option>
                <option :value="item.id" v-for="item in groups">{{item.name}}</option>
            </select>
        </div>

        <!--<div class="dropdown form-group" v-show="peoples.length!=0">
            <select name="" class="form-control" v-model="send.people" @change="sendData('people')">
                <option value="0">全部组员</option>
                <option value="1">组员</option>
                <option value="2">组员</option>
            </select>
        </div>-->
    </div>
</template>
<style scoped>
    .cascade{
        display: inline-block;
    }
</style>
<script>
    export default{
        data(){
            return {
                cities : [],
                regions : [],
                groups : [],
                peoples : [],
                send : {
                    city : 0,
                    region : 0,
                    group : 0,
                    people : 0
                }

            }
        },
        created () {
            this.getCity();
        },
        methods : {
            getCity(){
                this.$http.get('dict/static')
                    .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res.data);
                    this.cities = res.data.cities;
                })
            },
            sendData(data){
//                let that = this;
                if (data === 'city'){
                    /*this.send.region = 0;
                    this.send.group = 0;
                    this.send.people = 0;*/
                    console.log(this.city);
                    if (this.send.city != 0){
                        this.$http.get('dict/subdpmt?city='+this.send.city)
                            .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
                                console.log(res.data);
                                this.regions = res.data;
                            });
                    } else {
                        this.regions = [];
                        this.groups = [];
                        console.log(this.regions.length);
                        console.log(this.groups.length);

                    }
//                    console.log(this.send);
                } else if (data === 'region'){
                    // 根据区域获取所有片区
                    /*this.send.group = 0;
                    this.send.people = 0;*/
                    if (this.send.region != 0){
                        this.$http.get('dict/subdpmt?region='+this.send.region)
                            .then((res) => {
//                    this.collectList = res.data.data.gleeFulCollect;
//                    console.log(res.data);
                                this.groups = res.data;
                            });
                    } else {
//                        this.regions = [];
                        this.groups = [];
                        console.log(this.groups.length);
                    }

//                    console.log(this.send);
                } else  if (data === 'group'){
                    // 根据片区获取所有组员
                    this.send.people = 0;
                }
                this.$emit("change" , this.send);
            }
        }
    }
</script>