<template>
    <div>
        <ol class="breadcrumb">
            <li>定位签到</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <form class="form-inline clearFix" role="form">
                    <!--<div class="input-group bootstrap-timepicker" style="margin: 0 15px 0 0;">
                        <button class="btn btn-primary" type="button" @click="select">筛选员工</button>
                    </div>-->
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="点击选择部门"
                               v-model="departments" @click='selectDepartment' readonly>
                        <span class="input-group-btn">
                            <button class="btn btn-warning" type="button" @click="clearSelect(1)">清空</button>
                        </span>
                    </div>
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="点击选择员工"
                               v-model="staffs" @click='selectStaff' readonly>
                        <span class="input-group-btn">
                            <button class="btn btn-warning" type="button" @click="clearSelect(2)">清空</button>
                        </span>
                    </div>
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                    </div>

                </form>
            </div>
        </section>


        <!--列表-->
        <div class="row">
            <div class="col-md-5">
                <div class="checkInContainer clearFix">

                    <div class="checkInList" v-for="item in myData">
                        <div class="checkInItem">
                            <div class="person">
                                <div class="image">
                                    <img :src="item.avatar" alt="">
                                </div>
                                <div class="name">
                                    <a>{{item.name}}</a>
                                </div>
                            </div>
                            <div class="remark" v-show="item.remark!=''">
                                备注：{{item.remark}}
                            </div>
                            <div class="position">
                                <i class="fa fa-map-marker"></i>&nbsp;
                                {{item.detailPlace}}
                            </div>
                            <div class="time">
                                <i class="fa fa-clock-o"></i>&nbsp;
                                {{item.timestamp}}
                            </div>
                        </div>
                    </div>


                    <div class="noList" v-show="noData">
                        <i class="fa fa-exclamation-circle"></i>&nbsp;暂无签到记录
                    </div>


                    <div class="page pull-right">
                        <span>第 {{page}} 页</span>
                        <button class="btn btn-white" :disabled="this.page==1" @click="prev">上一页</button>
                        <button class="btn btn-white" :disabled="this.page==this.paging" @click="next">下一页</button>
                        <span>共 {{paging}} 页</span>
                    </div>

                </div>
            </div>

            <div class="col-md-7" v-show="isPc">
                <div id="mapContainer"></div>
            </div>
        </div>

        <!--提示信息-->
        <Status :state='info'></Status>
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>
    </div>
</template>

<script>
    import STAFF from  '../common/organization/selectStaff.vue'
    import DatePicker from '../common/datePicker.vue'
    import Status from '../common/status.vue';
    export default{
        components: {DatePicker,STAFF,Status},
        data(){
            return {
                paging : 1,
                page : 1,

                isPc : true,
                noData : false,
                dateConfigure : [
                    {
                        range : true,
                        needHour : true
                    }
                ],
                configure : {},

                departments : [],
                staffs : [],

                selectType : 0,
                params :{
                    department_id : '',
                    staff_id : '',
                    start_time :'',
                    end_time : '',
//                    offset : 0,
//                    size : 5,
//                    order : 'asc'
                },
                info: {
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                myData : []
            }
        },
        mounted(){
            this.getCheckInList();
            this.isPc = this.IsPC();
            if (this.isPc){
//                setTimeout(() => this.getMap,1000);
                setTimeout(this.getMap,1000)
            }
        },
        methods: {
            getCheckInList(){
                this.$http.post('clock/sign/index?pages='+this.page,this.params)
                    .then(
                        (res) => {
//                            console.log(res);

                            if (res.data.code=='30010'){
//                                console.log(res.data.data);
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.noData = false;
                                if (this.isPc){
                                    setTimeout(this.getMap,1000)
                                }
                            } else {
                                this.myData = [];
                                this.noData = true;
//                                this.paging = 0;

                            }
                        }
                    )
            },

            prev(){
                // 上一页
                /*if (this.page==1){
                    return;
                }*/
                this.page--;
                this.getCheckInList();
            },
            next(){
                // 下一页
//                console.log(this.paging);
                /*if (this.page==this.paging){
                    return;
                }*/
                this.page++;
//                console.log(this.params.offset)
//                console.log(this.params)
                this.getCheckInList();
            },

            search(){
                this.page = 1;
                this.getCheckInList();
                /*this.$http.post('amap/signin/search?page=1',this.params)
                    .then(
                        (res) => {
//                                console.log(res);
                            if (res.data.code=='20010'){
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.noData = false;

                                if (res.data.data.data.length==0){
                                    this.noData = true;
                                    this.myData = [];
                                    this.paging = 1;
                                    this.page = 1
                                }
                                if (this.isPc){
                                    setTimeout(this.getMap,1000)
                                }

                            } else {
                                this.noData = true;
                                this.myData = [];
                                this.paging = 1;
                                this.page = 1
                            }
                        }
                    )*/

            },
            getDate(data){
                // 时间
                console.log(data);
//                alert(1)
//                if (data!=this.params.date_range){
//                    alert(1)
//                }
                this.params.start_time = data.split('to')[0];
                this.params.end_time = data.split('to')[1];
                this.search();
            },
            selectDepartment(){

                this.selectType = 1;
//                this.configure = {type: 'all', class: 'selectType'};
                this.configure={type:'department',class:'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectStaff(){
                this.selectType = 2;
                this.configure={type:'staff',class:'selectType'};
                $('#selectCustom').modal('show');
            },
            selectDateSend(val){
//                console.log(val);
                this.selected = [];
                if (this.selectType == 1){
                    this.params.department_id = val.department[0].id;
                    this.departments.push(val.department[0].name);
                } else {
                    this.params.staff_id = val.staff[0].id;
                    this.staffs.push(val.staff[0].name);
                }
                this.search();
//                console.log(this.params)
            },

            clearSelect(num){
                if (num==1){
                    if (this.departments.length==0){
                        return
                    }
                    this.params.department_id = '';
                    this.departments = [];
                } else {
                    if (this.staffs.length==0){
                        return
                    }
                    this.params.staff_id = '';
                    this.staffs = [];
                }

                this.search();
            },


            getMap(){
                let map = new AMap.Map('mapContainer', {
                    resizeEnable: true,
//                    zoom: 13
                });
                map.clearMap();  // 清除地图覆盖物

                let markers = [];
//                console.log(this.myData);
//                let datas = this.myData

                for (let i =0;i<this.myData.length;i++){
                    markers.push({
                        'icon' : this.myData[i].avatar,
                        'position' : [this.myData[i].longitude,this.myData[i].latitude]
                    })
                }
//                console.log(markers)
                // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
                markers.forEach(function(marker) {
                    new AMap.Marker({
                        map: map,
//                        icon: marker.icon,
                        icon: new AMap.Icon({
                            image: marker.icon,
                            size: new AMap.Size(128, 128),  //图标大小
                            imageSize: new AMap.Size(50,50)
                        }),
                        position: [marker.position[0], marker.position[1]],
                        offset: new AMap.Pixel(-12, -36)
                    });
                });
            },

            IsPC(){
                let userAgentInfo = navigator.userAgent;
                let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
                let flag = true;
                for (let v = 0; v < Agents.length; v++) {
                    if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
                }
                return flag;
            },
            searchByPage(){
                this.$http.post('amap/signin/search?page='+this.page,this.params)
                    .then(
                        (res) => {
                            if (res.data.code=='20010'){
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.noData = false;

                                if (res.data.data.data.length==0){
                                    this.noData = true;
                                    this.myData = [];
                                    this.paging = '';
                                    this.page = 1
                                }
                                if (this.isPc){
                                    setTimeout(this.getMap,1000)
                                }

                            } else {
                                this.noData = true;
                                this.myData = [];
                                this.paging = '';
                                this.page = 1
                            }
                        }
                    )
            }
        }
    }
</script>

<style scoped>
    div.padd {
        display: inline-block;
        /*padding: 0 15px 0 0;*/
    }
    select{
        margin-bottom: 0;
    }
    .tagsinput {
        border: none;
    }

    .tagsinput h4 {
        display: inline-block;
        margin: 0;
    }

    .checkInContainer{
        background-color: white;
    }
    @media(min-width: 799px) {
        .checkInContainer{
            height: 650px;
            overflow-y: auto;
        }
    }

    #mapContainer{
        height: 650px;
        border: 1px solid #ccc;
    }
    .checkInContainer::-webkit-scrollbar {
        width:8px;
        height:300px;
    }
    .checkInContainer::-webkit-scrollbar-button    {
        background-color:#f0f0f8;
    }
    .checkInContainer::-webkit-scrollbar-track     {
        background:#f0f0f8;
    }
    .checkInContainer::-webkit-scrollbar-thumb{
        background:rgba(121,121,121,.2);
        border-radius:4px;
    }

    .checkInList{
        width: 90%;
        margin: auto;
    }
    .checkInItem{
        padding: 10px;
        border-bottom: 1px dashed #ccc;
    }
    .checkInItem .person{
        cursor: pointer;
    }
    .checkInItem .person .image {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        display: inline-block;
        vertical-align: middle;

    }
    .checkInItem .person .image img{
        width: 100%;
    }
    .checkInItem .person .name{
        display: inline-block;
        vertical-align: middle;
    }

    .checkInItem .position,.checkInItem .time,.checkInItem .remark{
        color: #667A8F;
        margin-top: 14px;
    }

    .noList{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #CCCCCC;
        line-height: 40px;
    }


    .page{
        margin: 12px ;
    }

    .amap-markers .amap-marker .amap-icon img{
        border-radius: 50%;
    }
    .page span{
        color: #999;
        margin: 0 3px;
    }
    @media (max-width: 798px) {
        .panel-body .form-inline .input-group{
            margin-bottom: 5px;
        }
    }
</style>