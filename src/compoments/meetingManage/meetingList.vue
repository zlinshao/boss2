<template>
    <div>
        <ol class="breadcrumb">
            <li>会议记录</li>
            <li class="active">会议列表</li>
        </ol>

        <section class="panel">
            <div class="panel-body">
                <div class="form-inline clearFix" v-if="selectId <1">
                    <div class="form-group">
                        <DatePicker :dateConfigure="dateConfigure" :idName="'graduation_time'"
                                    :currentDate="[params.time]" :placeholder="'会议时间'" @sendDate="getGraduateDate">
                        </DatePicker>
                    </div>
                    <div class="form-group">
                        <select class="form-control" v-model="params.type" @change="search">
                            <option value="">选择会议类型</option>
                            <option v-for="(value,key) in dictionary.type" :value="key">
                                {{value}}
                            </option>
                        </select>
                    </div>

                    <div class="input-group">
                        <input type="text" class="form-control" v-model="params.keywords" @keyup.enter="search"
                               placeholder="会议名称/会议地点/主持人">
                        <span class="input-group-btn">
                            <button class="btn btn-success" @click="search" v-model="params.keywords"
                                    type="button">搜索</button>
                        </span>
                    </div>

                    <div v-show="simulate.indexOf('Conference/conferenceSave') > -1||isSuper" class="input-group pull-right" @click="addMeeting">
                        <button class="btn btn-primary">新建会议</button>
                    </div>
                </div>

                <div class="remind" v-if="selectId >0">
                    <ul style="margin-bottom: 0">
                        <li><h5><a>已选中&nbsp;1&nbsp;项</a></h5></li>
                        <li @click="deleteMeeting" v-show="simulate.indexOf('Conference/conferenceDelete') > -1||isSuper">
                            <h5>
                                <a><i class="fa fa-times-circle-o"></i> 删除</a>
                            </h5>
                        </li>
                        <li @click="upload" v-show="simulate.indexOf('Conference/conferenceRecordSave') > -1||isSuper">
                            <h5>
                                <a><i class="fa fa-cloud-upload"></i> 上传会议记录</a>
                            </h5>
                        </li>
                        <li @click="reUpload" v-show="simulate.indexOf('Conference/conferenceSave') > -1||isSuper">
                            <h5>
                                <a><i class="fa fa-retweet"></i> 重新发布</a>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <!--表格-->
        <div class="has-js">
            <section class="panel table table-responsive roll">
                <table class="table table-striped table-advance table-hover">
                    <thead>
                    <tr>
                        <th class="text-center"></th>
                        <th class="text-center">会议名称</th>
                        <th class="text-center">会议时间</th>
                        <th class="text-center">会议地点</th>
                        <th class="text-center">参会人数</th>
                        <th class="text-center">会议类型</th>
                        <th class="text-center">主持人</th>
                        <th class="text-center">会议状态</th>
                        <th class="text-center">会议纪要</th>
                        <th class="text-center" v-show="simulate.indexOf('Conference/conferenceRead') > -1||isSuper">详情</th>
                        <th class="text-center" v-show="simulate.indexOf('Conference/conferenceRead_scan') > -1||isSuper">二维码展示页</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="text-center" v-for="(item,index) in meetingInfo">
                        <td style="width: 50px">
                            <label :class="{'label_check':true,'c_on':selectId == item.id,'c_off':selectId != item.id}"
                                   @click.prevent="picked(item,$event)">
                                <input type="checkbox" :value="item.id" :checked="selectId === item.id">
                            </label>
                        </td>
                        <td>{{item.title}}</td>
                        <td>{{item.start_time}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.attendee_num}}</td>
                        <td>{{dictionary.type[item.type]}}</td>
                        <td>{{item.compere_name}}</td>
                        <td>
                            <!--<i :class="item.status ===1? 'roughDraft':'publish'"></i>-->
                            <span class="label label-default" style="display:inline-block;width: 60px; " v-if="item.status ===1">
                                草稿
                            </span>
                            <span class="label label-primary" style="display:inline-block;width: 60px; " v-if="item.status ===2">
                                已发布
                            </span>
                        </td>
                        <td>
                            <a v-if="item.albums" :href="item.albums" class="fa fa-cloud-download"></a>
                            <span v-if="!item.albums">暂无</span>
                        </td>
                        <td v-show="simulate.indexOf('Conference/conferenceRead') > -1||isSuper">
                            <router-link :to="{path:'/meetingDetail',query:{meetingId : item.id,params:params}}">
                                详情
                            </router-link>
                        </td>
                        <td v-show="simulate.indexOf('Conference/conferenceRead_scan') > -1||isSuper">
                            <router-link target="_blank" :to="{path:'/meeting',query:{meetingId : item.id}}">
                                二维码展示页
                            </router-link>
                        </td>
                    </tr>
                    <tr v-if="isShow">
                        <td colspan="11" class="text-center text-muted">
                            <h4>暂无数据....</h4>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </section>
        </div>

        <!--分页-->
        <AddMeeting @successAdd="refurbish" @closeAdd="closeAdd" :selectId="selectId"
                    :isReUpload="isReUpload"></AddMeeting>
        <Confirm :msg="confirmMsg" @yes="getConfirm"></Confirm>
        <Page :pg="pages" @pag="getData" :beforePage="params.pages"></Page>
        <Staff></Staff>
        <Status :state='info'></Status>
        <MeetingUpload :selectId="selectId" :isUp="isUp" @success="successUp" @close="closeUp"></MeetingUpload>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Staff from '../common/oraganization.vue'
    import Status from '../common/status.vue'
    import DatePicker from '../common/datePicker.vue'
    import Confirm from '../common/confirm.vue'
    import AddMeeting from './meetingAdd.vue'
    import MeetingUpload from './meetingUpLoad.vue'
    export default{
        components: {Page, Staff, Status, AddMeeting, DatePicker, Confirm, MeetingUpload},
        props: [ 'simulate', 'isSuper'],
        data(){
            return {
                pages: 1,     //总页数
                currentPage: 1,
                dictionary: [],
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
                isShow: false,
                meetingInfo: [],
                dateConfigure: [
                    {
                        range: true,
                        needHour: true,
                    }
                ],
                params: {
                    time: '',
                    type: '',
                    keywords: '',
                    pages: 1,
                },
                selectId: '',
                confirmMsg: [],
                isUp: false,
                isReUpload: false,
            }
        },
        mounted(){
            this.getDictionary();

        },

        watch: {},
        methods: {
            getDictionary(){
                this.$http.get('oa/conference/dict').then((res) => {
                    this.dictionary = res.data.conference;
                    //接收返回上一级参数
                    if (this.$route.query.params !== undefined && this.$route.query.params.keywords !== undefined) {
                        this.params = this.$route.query.params;
                    }
                    this.getMeetingList();
                })
            },
            getMeetingList(){
                this.$http.get('oa/conference/conferencelist', {params: this.params}).then((res) => {
                    if (res.data.code === '50000') {
                        this.meetingInfo = res.data.data.list;
                        this.pages = res.data.data.pages;
                        this.isShow = false;
                    } else {
                        this.meetingInfo = [];
                        this.pages = 1;
                        this.isShow = true;
                    }
                })
            },
            picked(item, e){
                let evInput = e.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.selectId = item.id;
                } else {
                    this.selectId = '';
                }
            },
            search(){
                this.params.pages = 1;
                this.getMeetingList();
            },
            getData(val){
                this.params.pages =val;
                this.getMeetingList()
            },
            addMeeting(){
                $('#meetingAdd').modal('show');
            },
            getGraduateDate(val){
                this.params.time = val;
                this.search();
            },
            refurbish(){
                this.params = {
                    time: '',
                    type: '',
                    keywords: '',
                    pages: 1,
                };
                this.selectId = '';
                this.isReUpload = false;
                this.getMeetingList();
            },
            closeAdd(){
                this.isReUpload = false;
            },
            deleteMeeting(){
                this.confirmMsg = {msg: '您确定删除吗'};
                $('#confirm').modal('show');
            },
            getConfirm(){
                this.$http.get('oa/conference/conferencedelete/id/' + this.selectId).then((res) => {
                    if (res.data.code === '50040') {
                        this.info.success = res.data.msg;
                        this.info.state_success = true;
                        this.search();
                        this.selectId = '';
                    } else {
                        this.info.error = res.data.msg;
                        this.info.state_error = true;
                    }
                })
            },
            upload(){
                $('.rem_div').remove();
                this.isUp = true;
                $('#meetingUpload').modal('show');
            },
            successUp(){
                this.search();
                this.isUp = false;
                this.selectId = '';
            },
            closeUp(){
                this.isUp = false;
            },
            reUpload(){
                $('#meetingAdd').modal('show');
                this.isReUpload = true
            },
        }
    }
</script>

<style scoped>
    @media (min-width: 1024px) {
        tbody > tr > td:last-child {
            max-width: 340px;
        }
    }

    @media (min-width: 768px) {
        .reset {
            margin-left: 15px;
        }
    }

    .clearFix input, .clearFix select {
        margin-bottom: 0;
    }
    .publish{
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/已发布.svg") ;
        background-size: 100% 100%;
    }
    .roughDraft{
        display: inline-block;
        width: 24px;
        height: 24px;
        background-image: url("../../assets/img/草稿.svg") ;
        background-size: 100% 100%;
    }
</style>