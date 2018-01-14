<template>
    <div>
        <ol class="breadcrumb">
            <li>喜报</li>
            <li>收房喜报</li>
        </ol>
        <section class="panel">
            <div class="panel-body">
                <div v-show="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">

                        <div class="input-group">
                            <select class="form-control" v-model="params.status1" @change="search(1)">
                                <option value="">全部</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <select class="form-control" v-model="params.status2" @change="search(1)">
                                <option value="">全部</option>
                            </select>
                        </div>

                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门/员工"
                                   v-model="selected" @click='select' readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-warning" type="button" @click="clearSelect">清空</button>
                            </span>
                        </div>

                        <div class="padd">
                            <DatePicker :dateConfigure="dateConfigure" :currentDate="currentDate"
                                        @sendDate="getDate"></DatePicker>
                        </div>

                        <div class="input-group">
                            <label class="sr-only" for="search_info">搜索</label>
                            <input type="text" class="form-control" id="search_info" placeholder="地址/开单人"
                                   v-model="params.search" @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>

                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="close_()">重置</a>
                        </div>

                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="leading_out">导出</a>
                        </div>
                    </form>
                </div>

                <div v-show="pitch.length > 0" class="col-lg-12 remind">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;{{pitch.length}}&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-book"></i>&nbsp;增加备注</a></h5>
                        </li>
                        <li>
                            <h5><a><i class="fa fa-pencil"></i>&nbsp;标记</a></h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <div class="row has-js">
            <div class="col-lg-12">
                <section class="panel table table-responsive roll">
                    <table class="table table-advance">
                        <thead>
                        <tr>
                            <th></th>
                            <!--<th class="text-center">-->
                            <!--<label :class="{'label_check':true,'c_on':pitch.length == 12,'c_off':pitch.length != 12}"-->
                            <!--style="margin: 0;" @click.prevent="chooseAll($event)">-->
                            <!--<input type="checkbox" class="pull-left" :checked="pitch.length == 12">-->
                            <!--</label>-->
                            <!--</th>-->
                            <th class="text-center width100">喜报时间</th>
                            <th class="text-center width80">收房状态</th>
                            <th class="text-center width100">地址</th>
                            <th class="text-center width100">房型</th>
                            <th class="text-center width80">收房类型</th>
                            <th class="text-center width80">收房月数</th>
                            <th class="text-center width80">空置期</th>
                            <th class="text-center width80">付款方式</th>
                            <th class="text-center width80">押金</th>
                            <th class="text-center width80">月单价</th>
                            <th class="text-center width100">第一次付款时间</th>
                            <th class="text-center width80">付款方式</th>
                            <th class="text-center width100">收款人户名</th>
                            <th class="text-center width150">账户</th>
                            <th class="text-center width80">开单人</th>
                            <th class="text-center width80">所属部门</th>
                            <th class="text-center width80">备注</th>
                            <th class="text-center width50">详情</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="text-center" v-for="(item,index) in bulletin">
                            <td>
                                <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1, 'c_off':pitch.indexOf(item.id) == -1}"
                                       @click.prevent="changeIndex($event,item.id)">
                                    <input type="checkbox" :checked="pitch.indexOf(item.id) > -1">
                                </label>
                            </td>
                            <td>2017-01-01</td>
                            <td>收房</td>
                            <td class="detail">
                                <div>积善公寓2-302
                                    <span @click="friedBill(1)">炸</span>
                                    <span @click="friedBill(2)">充</span>
                                    <span @click="friedBill(3)">款</span>
                                </div>
                            </td>
                            <td>三室一厅一卫</td>
                            <td>整租</td>
                            <td>12</td>
                            <td>20</td>
                            <td>月付</td>
                            <td>2000</td>
                            <td>2000</td>
                            <td>2017-01-01</td>
                            <td>银行卡</td>
                            <td>盖聂</td>
                            <td>999999999999999999</td>
                            <td>解兆飞</td>
                            <td>南京一区一组</td>
                            <td>备注</td>
                            <td>
                                <router-link :to="{path:'/collectBulletinDetail'}">
                                详情
                                </router-link>
                            </td>
                        </tr>
                        <tr class="text-center" v-show="isShow">
                            <td colspan="19" class="text-center text-muted">
                                <h4>暂无数据....</h4>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>

        <Page :pg="paging" @pag="search" :beforePage="params.page"></Page>

        <Status :state='info'></Status>

        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--炸单详情-->
        <FriedBill :dict="dict" :title="titles"></FriedBill>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';
    import STAFF from  '../common/oraganization.vue'
    import DatePicker from '../common/datePicker.vue'

    import FriedBill from './detailed/friedBill.vue'            //炸单详情
    export default {
        components: {Page, Status, STAFF, DatePicker, FriedBill},
        data(){
            return {
                titles: '',                 //炸单/充公详情
                dict: {},                   //字典
                pitch: [],                  //ID
                paging: '',                 //总页数
                isShow: false,              //暂无数据
                params: {
                    search: '',
                    department_id: [],
                    staff_id: [],
                    range: '',
                    page: 1,
                    status1: '',
                    status2: '',
                },
                selected: [],               //部门名称
                configure: {},              //部门筛选条件

                dateConfigure: [
                    {                       //日期
                        range: true,
                        needHour: true
                    }
                ],
                currentDate: [],

                bulletin: [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}, {id: 9}, {id: 10}, {id: 11}, {id: 12}],               //收房喜报

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
            }
        },
        mounted (){
            this.$http.get('core/customer/dict').then((res) => {
                this.dict = res.data;
            })
        },
        methods: {
            search(val){

            },
//            日期筛选
            getDate (date){
                this.params.range = date;
            },
//            部门搜索
            select(){
                $('.selectCustom:eq(0)').modal('show');
                this.configure = {type: 'department', length: 1};
            },
//            部门搜索
            selectDateSend(val){
                for (let i = 0; i < val.department.length; i++) {
                    this.selected.push(val.department[i].name);
                    this.params.department_id.push(val.department[i].id)
                }
                for (let j = 0; j < val.staff.length; j++) {
                    this.selected.push(val.staff[j].name);
                    this.params.staff_id.push(val.staff[j].id)
                }
                this.search(1);
            },
//            清空部门
            clearSelect(){
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },

//            导出
            leading_out (){
                this.$http.get('', {
                    params: this.params
                }).then((res) => {
                    if (res.data.code === '18410') {
                    }
                })
            },
//            重置
            close_ (){
                this.params.search = '';
                this.params.department_id = '';
                this.params.staff_id = '';
                this.params.page = '';
                this.params.status1 = '';
                this.params.status2 = '';
                this.selected = [];
                this.currentDate = [];
                this.pitch = [];
                this.search(1);
            },

//             全选
            chooseAll(ev){
                this.pitch = [];
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    for (let i = 0; i < this.bulletin.length; i++) {
                        this.pitch.push(this.bulletin[i].id);
                    }
                }
            },
//            复选框
            changeIndex(ev, id){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    this.pitch.push(id);
                } else {
                    let index = this.pitch.indexOf(id);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
//            炸单
            friedBill (val){
                if (val === 1) {
                    this.titles = '炸单详情';
                } else if (val === 2) {
                    this.titles = '充公详情';
                } else {
                    this.titles = '款项详情';
                }
                $('#friedBill').modal({backdrop: 'static'});
            },
            successMsg(msg){    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg){      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
        }
    }
</script>

<style scoped>
    .detail span {
        cursor: pointer;
        display: inline-block;
        padding: 2px 4px;
        -webkit-border-radius: 24%;
        -moz-border-radius: 24%;
        border-radius: 24%;
        color: #ffffff;
        margin:0 0 3px 3px;
    }

    .detail div span:first-of-type {
        background: #FF0000;
    }
    .detail div span:nth-of-type(2) {
        background: #0099CC;
    }
    .detail div span:nth-of-type(3) {
        background: #009933;
    }
    .detail div span:last-of-type {
        background: #FF9933;
    }
</style>
