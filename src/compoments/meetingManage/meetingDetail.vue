<template>
    <div>
        <ol class="breadcrumb">
            <li><router-link to="/meetingList">会议列表</router-link></li>
            <li class="active">会议详情</li>

            <li class="pull-right" v-show="typeof (this.$route.query.params) === 'object'">
                <router-link :to="{path:'/meetingList',query: {params:this.$route.query.params}}">
                    <i class="fa fa-angle-double-left"></i>返回上一步</router-link>
            </li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <header>
                    <h4>
                        <i class="fa fa-home"></i>&nbsp;{{detailInfo.title}}
                        <a class="pull-right" @click="editMeeting"  v-show="simulate.indexOf('Conference/conferenceUpdate') > -1||isSuper">
                            <i class="fa fa-edit"></i>
                        </a>
                    </h4>
                </header>

                <div class="mainContent">
                    <div class="panel-body table-responsive client_info">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="item">
                                    <span class="col-md-4">会议时间：</span>
                                    <span class="col-md-8">{{detailInfo.start_time}} 至 {{detailInfo.end_time}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">会议地点：</span>
                                    <span class="col-md-8">{{detailInfo.address}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">会议类型：</span>
                                    <span class="col-md-8" v-if="detailInfo.type!==undefined">
                                        {{dictionary.type[detailInfo.type]}}
                                    </span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">会议纪要：</span>
                                    <span class="col-md-8" v-if="detailInfo.type!==undefined">
                                        {{recordInfo.filename}}
                                    </span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">会议纪要上传人：</span>
                                    <span class="col-md-8" v-if="detailInfo.type!==undefined">
                                        {{recordInfo.uploader_name}}
                                    </span>
                                </div>
                            </div>

                            <div class="col-md-5">
                                <div class="item">
                                    <span class="col-md-4">主持人：</span>
                                    <span class="col-md-8">{{detailInfo.compere_name}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">会议记录人：</span>
                                    <span class="col-md-8">{{detailInfo.recorder_name}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">参会人数：</span>
                                    <span class="col-md-8">{{detailInfo.attendee_num}}</span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">可查看范围：</span>
                                    <span class="col-md-8">
                                        <span  v-for="item in itemArray"> {{item}}</span>
                                    </span>
                                </div>
                                <div class="item">
                                    <span class="col-md-4">上传时间：</span>
                                    <span class="col-md-8">{{recordInfo.upload_time}}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section class="panel table table-responsive roll">
                        <table class="table table-striped table-advance table-hover">
                            <thead>
                            <tr>
                                <th class="text-center">与会人</th>
                                <th class="text-center">部门</th>
                                <th class="text-center">职位</th>
                                <th class="text-center">座位号</th>
                                <th class="text-center">签到时间</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="text-center" v-for="(item,index) in detailInfo.attendee">
                                <td>{{item.staff_name}}</td>
                                <td>{{item.staff_department}}</td>
                                <td>{{item.staff_position}}</td>
                                <td>{{item.seat_number}}</td>
                                <td>{{item.qrcode_time}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </div>
        </section>
        <Edit :edit="this.$route.query.meetingId" :isEdit="isEdit" @successEdit="successEdit" @closeEdit="closeEdit"></Edit>
    </div>
</template>

<script>
    import Edit from './meetingEdit.vue'
    export default{
        components:{Edit},
        props: [ 'simulate', 'isSuper'],
        data(){
            return{
                dictionary:[],
                detailInfo:{},
                recordInfo:{},
                itemArray:[],
                isEdit:false,
            }
        },
        mounted(){
            this.getDictionary();
        },
        methods:{
            getDictionary(){
                this.$http.get('oa/conference/dict').then((res) => {
                    this.dictionary = res.data.conference;
                    this.getMeetingDetail();
                })
            },
            getMeetingDetail(){
                this.$http.get('oa/conference/conferenceread/id/'+this.$route.query.meetingId).then((res) => {
                    if(res.data.code === '50020'){
                        this.detailInfo = res.data.data;
                    }
                });
                this.$http.get('oa/conference/conferenceRecordRead/id/' + this.$route.query.meetingId).then((res) => {
                    if(res.data.code === '50060'){
                        this.recordInfo = res.data.data;

                        if(this.recordInfo.visible_range.staff.length>0){
                            this.recordInfo.visible_range.staff.forEach((item) =>{
                                this.itemArray.push(item.staff_name);
                            })
                        }
                        if(this.recordInfo.visible_range.department.length>0){
                            this.recordInfo.visible_range.department.forEach((item) =>{
                                this.itemArray.push(item.name);
                            })
                        }
                    }
                })
            },
            editMeeting(){
                $('#meetingEdit').modal('show');
                this.isEdit = true;
            },
            successEdit(){
                this.isEdit = false;
                this.getMeetingDetail();
            },
            closeEdit(){
                this.isEdit = false;
            }
        }

    }
</script>

<style scoped>
    header h4 {
        font-weight: bold;
        border-bottom: 1px solid #aaaaaa;
        padding: 0 15px 8px;
    }
    h4 {
        font-weight: bold;
    }
    .item span{
        font-size: 14px;
        padding: 15px 0 5px 0;
        min-height: 41px;
    }
    .item >span:first-child{
        color:#59ace2
    }
    .mainContent{
        min-height: 700px;
    }

    .breadcrumb > li:last-child:before {
        padding: 0 5px;
        color: #ccc;
        content: "";
    }
</style>