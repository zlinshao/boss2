<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/periodicFor">周期表</router-link>
            </li>
            <li>详情</li>
        </ol>
        <section class="panel">
            <div class="panel-body clearFix">

                <div v-if="pitch.length == 0">
                    <form class="form-inline clearFix" role="form">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="点击选择部门"
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
                            <input type="text" class="form-control" placeholder="业务员姓名" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                        <div class="form-group">
                            <a class="btn btn-success" type="button" @click="selectHouse">选择地址搜索</a>
                        </div>
                    </form>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li>
                            <h5 @click="add_remark"><a>增加备注</a></h5>
                        </li>
                        <li>
                            <h5 @click="periodic_rev"><a>炸单</a></h5>
                        </li>
                        <li>
                            <h5 @click="periodic_rev"><a>充公选择</a></h5>
                        </li>

                    </ul>
                </div>
            </div>
        </section>
        <div class="col-xs-12" style="padding: 0;margin: 15px 0;">
            <section class="panel">
                <div class="panel-body">
                    <div class="tab-content">
                        <div id="company" class="tab-pane active">
                            <!--公司-->
                            <section class="panel table table-responsive roll has-js">
                                <table class="table table-advance table-hover">
                                    <tbody class="text-center">
                                    <tr class="text-center">
                                        <th></th>
                                        <th class="text-center width100">发喜报日期</th>
                                        <th class="text-center width100">房屋地址</th>
                                        <th class="text-center width80">收房状态</th>
                                        <th class="text-center width80">付款方式</th>
                                        <th class="text-center width50">年限</th>
                                        <th class="text-center width80">单价</th>
                                        <th class="text-center width100">总金额</th>
                                        <th class="text-center width80">空置期</th>
                                        <th class="text-center width80">中介费</th>
                                        <th class="text-center width80">实际业绩</th>
                                        <th class="text-center width120">溢出业绩</th>
                                        <th class="text-center width80">名称</th>
                                        <th class="text-center width100">所属部门</th>
                                        <th class="text-center width80">负责人</th>
                                        <th class="text-center width50">备注</th>
                                    </tr>
                                    <tr class="text-center" v-for="item in 4">
                                        <td>
                                            <label :class="{'label_check':true,'c_on':pitch.indexOf(item) > -1,
                                            'c_off':pitch.indexOf(item)==-1}" @click.prevent="checked_id(item, $event)">
                                                <input type="checkbox" class="pull-left"
                                                       :checked="pitch.indexOf(item) > -1">
                                            </label>
                                        </td>
                                        <td>2017.05.10</td>
                                        <td>金陵府邸3-1000</td>
                                        <td>收房</td>
                                        <td>月付</td>
                                        <td>3</td>
                                        <td>2400</td>
                                        <td>1500000</td>
                                        <td>20</td>
                                        <td>2000</td>
                                        <td>2000</td>
                                        <td>
                                            <span @click="able_show(item)"
                                                  v-if="isActive !== item"
                                                  style="cursor: pointer;">
                                                溢出业绩
                                            </span>
                                            <span v-if="isActive === item">
                                                <input type="text" class="form-control" v-model="spill_over"
                                                       style="margin-bottom: 5px;">
                                                <a class="btn btn-default btn-sm" @click="able_show('','')">取消</a>
                                                <a class="btn btn-success btn-sm" @click="able_save(item)">保存</a>
                                            </span>
                                        </td>
                                        <td>马宁</td>
                                        <td>南京分部</td>
                                        <td>施坤</td>
                                        <td>
                                            <i class="fa fa-book" @click="lookRemark()"></i>
                                        </td>
                                    </tr>
                                    <tr class="text-center">
                                        <td colspan="17" style="font-size: 22px;">暂无数据......</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!--分页-->
        <Page @pag="search" :pg="paging" :beforePage="beforePage"></Page>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--充公选择-->
        <PeriodicRevise></PeriodicRevise>

        <!--房屋地址搜索-->
        <SelectHouse @House="getHouse" :house_status="'1'"></SelectHouse>

        <!--查看备注-->
        <lookRemark :msg="addRemark" :personal="personalRem" :look="lookRem"></lookRemark>

    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import SelectHouse from '../common/selectPayHouse.vue'
    import PeriodicRevise from './periodicRevise.vue'       //充公
    import Page from '../common/page.vue'
    import lookRemark from '../salary/lookRemark.vue'
    import STAFF from  '../common/oraganization.vue'        //部门搜索
    import Confirm from '../common/confirm.vue'
    export default {
        components: {DatePicker, STAFF, Page, SelectHouse, lookRemark, PeriodicRevise},
        data (){
            return {
                pitch: [],
                isActive: '',                       //class状态
                spill_over: '',                     //溢出业绩
                dateConfigure: [
                    {
                        range: true,            //日期组件参数
                        needHour: false
                    }
                ],
                configure: {},                  //部门组件参数
                selected: [],                   //部门搜索
                currentDate: [],                //日期组件参数
                params: {
                    department_id: [],
                    staff_id: [],
                    range: '',
                    search: '',
                },
                paging: 3,                      //总页数
                beforePage: 1,                  //当前页
                addRemark: '',                  //增加备注
                personalRem: '',                //备注对象
                lookRem: '',                    //备注内容
            }
        },
        mounted (){
            this.personalList(1);
        },
        methods: {
//            切换标签页清空
            changing_over (){
                this.pitch = [];
            },
//            充公
            periodic_rev (){
                $('#periodicRevise').modal({backdrop: 'static',});
            },
//            列表
            personalList (val){
                this.beforePage = val;
//                this.paging = '';
                this.pitch = [];
//                this.$http.get('').then((res) => {
//
//                })
            },
//            查看备注
            lookRemark (){
                this.addRemark = '1';
                $('#lookRemark').modal({backdrop: 'static',});
            },
//            增加备注
            add_remark (){
                this.addRemark = 'add';
                $('#lookRemark').modal({backdrop: 'static',});
            },
//            搜索
            search (val){
                this.personalList(val);
            },

//            日期搜索
            getDate(data){
                this.params.range = data;
                this.search(1);
            },

//            部门搜索
            select(){
                $('.selectCustom:eq(0)').modal({backdrop: 'static',});
                this.configure = {type: 'department'};
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
//              选择房屋
            selectHouse(){
                $('.selectHouse:eq(0)').modal('show');
            },
//              房屋信息
            getHouse(data){
                this.params.search = data.address;
                this.search(1);
            },
//            重置部门搜索
            clearSelect(){
                if (this.selected.length === 0) {
                    return;
                }
                this.params.department_id = [];
                this.params.staff_id = [];
                this.selected = [];
                this.search(1);
            },
//            选中
            checked_id (rul, ev){
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                this.pitch = [];
                if (evInput.checked) {
                    this.pitch.push(rul);
                } else {
                    let index = this.pitch.indexOf(rul);
                    if (index > -1) {
                        this.pitch.splice(index, 1);
                    }
                }
            },
//            溢出业绩修改
            able_save (val){
                this.isActive = val;
            },
//            溢出业绩修改
            able_show (val, spill){
                this.isActive = val;
                this.spill_over = spill;
            }
        }
    }
</script>

<style scoped>
    .panel, .table {
        margin-bottom: 0;
    }
</style>
