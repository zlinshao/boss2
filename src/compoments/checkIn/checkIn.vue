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
                    <div class="input-group bootstrap-timepicker" style="margin: 0 15px 0 0;">
                        <button class="btn btn-primary" type="button" @click="select">筛选部门及员工</button>
                    </div>
                    <div class="padd">
                        <DatePicker :dateConfigure="dateConfigure" @sendDate="getDate"></DatePicker>
                    </div>

                </form>
                <div class="tagsinput" v-show="filtrate.departmentList.length!=0">
                    <h4>部门</h4>
                    <span class="tag" v-for="item in filtrate.departmentList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteDepartment(item)"></a>
                    </span>
                </div>
                <div class="tagsinput " v-show="filtrate.staffList.length!=0">
                    <h4>员工</h4>
                    <span class="tag" v-for="item in filtrate.staffList">
                        <span >{{item.name}}&nbsp;&nbsp;</span>
                        <a class="tagsinput-remove-link" @click="deleteStaff(item)"></a>
                    </span>
                </div>
            </div>
        </section>


        <!--列表-->
        <div class="row">
            <div class="col-md-3">
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
                            <div class="position">
                                <i class="fa fa-map-marker"></i>&nbsp;
                                {{item.province}}{{item.city}}{{item.district}}{{item.street}}{{item.township}}{{item.streetNumber}}
                            </div>
                            <div class="time">
                                <i class="fa fa-clock-o"></i>&nbsp;
                                {{item.create_time}}
                            </div>
                        </div>
                    </div>


                    <div class="noList" v-show="noData">
                        <i class="fa fa-exclamation-circle"></i>&nbsp;暂无签到记录
                    </div>


                    <div class="page pull-right" v-show="paging!=''">
                        <button class="btn btn-white" :disabled="page==1" @click="prev">上一页</button>
                        <button class="btn btn-white" :disabled="page==paging" @click="next">下一页</button>
                    </div>

                </div>
            </div>

            <div class="col-md-9" v-show="isPc">
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
                paging : '',
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
                filtrate : {
                    departmentList:[],
                    staffList:[]
                },
                params :{
                    department_id : [],
                    staff_id : [],
                    date_range : '',
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
                this.$http.post('amap/signin/index')
                    .then(
                        (res) => {
//                            console.log(res);

                            if (res.data.code=='20011'){
                                this.noData = true;
                                this.paging = 0;
                            } else {
                                this.myData = res.data.data.data;
                                this.paging = res.data.data.pages;
                                this.noData = false;
                            }
                        }
                    )
            },
            search(){
                this.page = 1;
                this.$http.post('amap/signin/search?page=1',this.params)
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

            },
            getDate(data){
                // 时间
                console.log(data);
                this.params.date_range = data;
                this.search();
            },
            select(){
                this.configure = {type: 'all', class: 'selectType'};
                $('#selectCustom').modal('show');
//                this.configure={id:[],class:'department'};
//                this.configure={length:2,class:'amount'};
            },
            selectDateSend(val){
//                console.log(val);
                for (let j = 0; j < val.department.length; j++) {
                    if ($.inArray(val.department[j].id, this.params.department_id) === -1) {
                        this.filtrate.departmentList.push(val.department[j]);
                        this.params.department_id.push(val.department[j].id)
                    } else {
                        this.info.error = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }

                }
                for (let i = 0; i < val.staff.length; i++) {
                    if ($.inArray(val.staff[i].id, this.params.staff_id) === -1) {
                        this.filtrate.staffList.push(val.staff[i]);
                        this.params.staff_id.push(val.staff[i].id)
                    } else {
                        this.info.error = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_error = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_error = false;
                        }, 2000);
                    }

                }
                this.search();
//                this.filtrate.departmentList = val.department;
//                this.filtrate.staffList = val.staff;

            },
            deleteStaff(item){
                this.filtrate.staffList = this.filtrate.staffList.filter((x) => x !== item);
                this.params.staff_id = this.params.staff_id.filter((x) => x != item.id);
                this.search();
            },
            deleteDepartment(item){
                this.filtrate.departmentList = this.filtrate.departmentList.filter((x) => x !== item);
                this.params.department_id = this.params.department_id.filter((x) => x != item.id);
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
                        'position' : this.myData[i].location.split(',')
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
            prev(){
                // 上一页
                this.page--;
                this.searchByPage();
            },
            next(){
                // 下一页
//                console.log(this.paging);
//                console.log(this.page)
                this.page++;
                this.searchByPage();
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
        padding: 0 15px 0 0;
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

    .checkInItem .position,.checkInItem .time{
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
</style>