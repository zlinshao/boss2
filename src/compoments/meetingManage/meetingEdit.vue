<template>
    <div>
        <div class="modal fade full-width-modal-right" id="meetingEdit" tabindex="-1" role="dialog" aria-hidden="true" data-backdrop="static" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" @click="closeModal">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 class="modal-title">修改会议</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body">
                            <form class="form-horizontal">
                                <div class="row">
                                    <label class="col-md-2 control-label">会议名称 <span class="star">*</span>：</label>
                                    <div class="col-md-10">
                                        <input type="text" placeholder="会议名称" class="form-control" v-model="params.title">
                                    </div>
                                </div>
                                <div class="row" style="margin-bottom: 15px">
                                    <label class="col-md-2 control-label">会议时间 <span class="star">*</span>：</label>
                                    <div class="col-md-4">
                                        <DatePicker :dateConfigure="dateConfigure" :idName="'start_time'"
                                                    :currentDate="[params.start_time]"                                                                                                                                    :placeholder="'开始时间'"@sendDate="getStartTime">
                                        </DatePicker>
                                    </div>
                                    <label class="col-md-1 control-label">至</label>
                                    <div class="col-md-4">
                                        <DatePicker :dateConfigure="dateConfigure" :idName="'end_time'"
                                                    :currentDate="[params.end_time]"                                                                                                                                    :placeholder="'结束时间'"@sendDate="getEndTime">
                                        </DatePicker>
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-md-2 control-label">会议类型 <span class="star">*</span>：</label>
                                    <div class="col-md-4">
                                        <select class="form-control" v-model="params.type">
                                            <option value="">请选择会议类型</option>
                                            <option v-for="(value,key) in dictionary.type" :value="key">
                                                {{value}}
                                            </option>
                                        </select>
                                    </div>
                                    <label class="col-md-2 control-label">主持人 <span class="star">*</span>：</label>
                                    <div class="col-md-4">
                                        <input type="text"  class="form-control" v-model="compere_name"
                                               placeholder="点击选择" readonly @click="selectStaff('compere')">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-md-2 control-label">倒计时 <span class="star">*</span>：</label>
                                    <div class="col-md-4">
                                        <select class="form-control" v-model="params.count_down">
                                            <option value="">请选择倒计时时间</option>
                                            <option v-for="(value,key) in dictionary.count_down" :value="key">
                                                {{value}}
                                            </option>
                                        </select>
                                    </div>
                                    <label class="col-md-2 control-label">会议地点 <span class="star">*</span>：</label>
                                    <div class="col-md-4">
                                        <input type="text" class="form-control" placeholder="会议地点" v-model="params.address">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-md-2 control-label">参会人数 <span class="star">*</span>：</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" maxlength="3"
                                               placeholder="选择范围0~999" v-model="params.attendee_num">
                                    </div>
                                </div>
                                <div class="row">
                                    <label class="col-md-2 control-label">会议记录人 <span class="star">*</span>：</label>
                                    <div class="col-md-10">
                                        <input type="text" class="form-control" readonly placeholder="会议记录人"
                                               @click="selectStaff('recorder')" v-model="recorder_name">
                                    </div>
                                </div>

                                <div class="row">
                                    <label class="col-md-2 control-label">消息内容 ：</label>
                                    <div class="col-md-10">
                                        <textarea style="resize: vertical;margin-bottom: 18px" v-model="params.content" placeholder="钉钉推送正文内容"
                                                  class="form-control" rows="2"></textarea>
                                    </div>
                                </div>

                                <div class="row" v-for="(item,index) in amount">
                                    <label class="col-md-2 control-label">参会人员 <span class="star">*</span>：</label>
                                    <div class="col-md-4">
                                        <input type="text" v-model="itemArray[index]" placeholder="点击选择"
                                               class="form-control" readonly @click="selectStaff(index)">
                                    </div>
                                    <label class="col-md-2 control-label">座位号：</label>
                                    <div class="col-md-2">
                                        <input type="text" v-model="seatArray[index]" placeholder="座位号" class="form-control">
                                    </div>
                                    <div class="col-sm-2" style="display: flex;align-items: center;margin-top: 4px">
                                        <input type="checkbox" v-model="is_leader[index]" :checked='false'>
                                        <span >领导</span>
                                    </div>
                                    <div class="col-md-12" style="padding: 0;margin-bottom: 18px" v-show="is_leader[index]">
                                        <label class="col-md-2 control-label">领导排序：</label>
                                        <div class="col-md-10">
                                            <input type="number" v-model="leader_sort[index]" min="1"
                                                   placeholder="领导顺序，最小值1（数字越小越靠前）" class="form-control">
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" @click="closeModal">取消</button>
                        <button type="button" class="btn btn-primary" @click="confirmAdd(1,2)">草稿</button>
                        <button type="button" class="btn btn-success" @click="confirmAdd(2,2)">保存</button>
                        <button type="button" class="btn btn-success" @click="confirmAdd(2,1)">发布</button>
                    </div>
                </div>
            </div>
        </div>
        <Status :state='info'></Status>
        <Staff :configure='configure' @Staff="getStaff"></Staff>
    </div>
</template>

<script>
    import Status from '../common/status.vue';
    import Staff from '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'
    export default{
        components : {Status,Staff,DatePicker},
        props:['isEdit','edit'],
        data(){
            return{
                dictionary : [],
                configure :[],
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                },
                index:'',
                itemArray:[],
                seatArray:[],
                itemIdArray:[],
                is_leader:[],
                leader_sort:[],
                dateConfigure : [
                    {
                        range : false,
                        needHour : true,
                    }
                ],
                params:{
                    id:'',
                    status:'',
                    title:'',
                    start_time:'',
                    end_time:'',
                    address: '',
                    type : '',
                    compere: '',
                    recorder: '',
                    count_down: '',
                    attendee_num: '',
                    content:'',
                    attendee:[],
                },
                compere_name:'',
                recorder_name:'',
            }
        },
        mounted(){
            this.getDictionary();
        },
        computed:{
            amount(){
                return Number(this.params.attendee_num);
            }
        },
        watch:{
            isEdit(val){
                if(val){
                    this.getEditInfo();
                    this.params.id = this.edit;
                }
            },
            amount(val,oldVal){
                if(val<oldVal){
                    this.itemArray.splice(val,val);
                    this.seatArray.splice(val,val);
                    this.itemIdArray.splice(val,val);
                    this.is_leader.splice(val,val);
                    this.leader_sort.splice(val,oldVal);
                }
                if(!val){
                    this.itemArray=[];
                    this.seatArray=[];
                    this.itemIdArray=[];
                    this.is_leader=[];
                    this.leader_sort = [];
                }
            }
        },
        methods:{
            getEditInfo(){
                this.$http.get('oa/conference/conferenceread/id/'+this.edit).then((res) => {
                    if(res.data.code === '50020'){
                        let editInfo = res.data.data;
                        this.params.title = editInfo.title;
                        this.params.start_time = editInfo.start_time;
                        this.params.end_time = editInfo.end_time;
                        this.params.type = editInfo.type;
                        this.params.compere = editInfo.compere;
                        this.params.recorder = editInfo.recorder;
                        this.params.count_down = editInfo.count_down;
                        this.params.attendee_num = editInfo.attendee_num;
                        this.params.content = editInfo.content;
                        this.params.address = editInfo.address;
                        this.compere_name = editInfo.compere_name;
                        this.recorder_name = editInfo.recorder_name;
                        if(editInfo.attendee){
                            editInfo.attendee.forEach((item) =>{
                                this.itemArray.push(item.staff_name);
                                this.seatArray.push(item.seat_number);
                                this.itemIdArray.push(item.staff_id);
                                this.leader_sort.push(item.leader_sort);
                                console.log(this.leader_sort)
                                if(item.is_leader === 1){
                                    this.is_leader.push(true);
                                }else {
                                    this.is_leader.push(false);
                                }
                            })
                        }
                    }
                });
            },
            getDictionary(){
                this.$http.get('oa/conference/dict').then((res) => {
                    this.dictionary = res.data.conference;
                })
            },

            getStartTime(val){this.params.start_time = val;},
            getEndTime(val){this.params.end_time = val},
            selectStaff(index){
                this.configure = {type:'staff',length: 1};
                $('.selectCustom:eq(0)').modal('show');
                this.index = index;
            },
            getStaff(val){
                if(val.staff.length>0){
                    if(this.index ==='compere'){
                        this.params.compere = val.staff[0].id;
                        this.compere_name = val.staff[0].name;
                    }else if(this.index ==='recorder'){
                        this.params.recorder = val.staff[0].id;
                        this.recorder_name = val.staff[0].name;
                    } else {
                        this.itemArray.splice(this.index,1,val.staff[0].name);
                        this.itemIdArray.splice(this.index,1,val.staff[0].id);
                    }
                }
            },
            confirmAdd(status,message){   //确认提交
                if(this.itemIdArray.length<this.params.attendee_num){
                    this.info.error = '您还有参会人员尚未选择';
                    this.info.state_error = true;
                }else {
                    let attendeeItem = {};
                    this.params.attendee = [];
                    for (let i = 0; i < this.itemIdArray.length; i++) {
                        attendeeItem.staff_id = this.itemIdArray[i] ? this.itemIdArray[i] : '';
                        attendeeItem.seat_number = this.seatArray[i] ? this.seatArray[i] : '';
                        attendeeItem.is_leader = this.is_leader[i] ? 1 : 2;
                        attendeeItem.leader_sort = this.leader_sort[i];
                        this.params.attendee.push(attendeeItem);
                        attendeeItem = {};
                    }
                    this.params.status = status;
                    this.params.message = message;
                    this.$http.put('oa/conference/conferenceupdate', this.params).then((res) => {
                        if (res.data.code === '50030') {
                            this.info.success = res.data.msg;
                            this.info.state_success = true;
                            this.closeModal();
                            this.$emit('successEdit')
                        } else {
                            this.info.error = res.data.msg;
                            this.info.state_error = true;
                        }

                    })
                }
            },
            closeModal(){
                this.$emit('closeEdit');
                $('#meetingEdit').modal('hide');
                this.params={
                    title:'',
                    start_time:'',
                    end_time:'',
                    address: '',
                    type : '',
                    compere: '',
                    recorder: '',
                    count_down: '',
                    attendee_num: '',
                    content:'',
                    attendee:[],
                };
                this.index='';
                this.itemArray=[];
                this.seatArray=[];
                this.itemIdArray=[];
                this.compere_name = '';
                this.recorder_name = '';
                this.is_leader=[];
                this. leader_sort=[];
            },

        }
    }
</script>

<style scoped>
    .flexBox i{
        line-height: 34px;
        font-size: 20px;
        color: #ddd;
        cursor: pointer;
    }
    .flexBox i+i{
        margin-left: 5px;
    }
    .flexBox i:hover{
        color: #999;
    }
    .col-md-2{
        padding-left: 0;
        padding-right: 0;
    }
    .star{
        color: #e8403f;
    }
    input[type='checkbox']{
        width: 17px;
        height: 17px;
    }
</style>
