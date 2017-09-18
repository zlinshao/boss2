<template>
    <div>
        <ol class="breadcrumb">
            <li>业绩管理</li>
            <li>个人工资</li>
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
                            <input type="text" class="form-control" placeholder="签收人/房屋地址/价格" v-model="params.search"
                                   @keydown.enter.prevent="search(1)">
                            <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button" @click="search(1)">搜索</button>
                            </span>
                        </div>
                    </form>
                </div>

                <!--选中-->
                <div class="col-lg-12 remind" v-if="pitch.length > 0">
                    <ul>
                        <li>
                            <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                        </li>
                        <li><h5><a @click="personal_rev">编辑</a></h5></li>
                        <li>
                            <h5>
                                <router-link :to="{path:'/personalDetail',query: {nameId: 1}}">
                                    查看详情
                                </router-link>
                            </h5>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="panel table table-responsive roll has-js" style="padding: 16px;">
            <table class="table table-advance table-hover" v-for="item in 4">
                <tbody class="text-center">
                <tr class="text-center">
                    <td rowspan="2">
                        <label :class="{'label_check':true,'c_on':pitch.indexOf(item) > -1,
                        'c_off':pitch.indexOf(item)==-1}" @click.prevent="pitchId(item, $event)">
                            <input type="checkbox" class="pull-left"
                                   :checked="pitch.indexOf(item) > -1">
                        </label>
                    </td>
                    <td class="width100">{{item}}月工资</td>
                    <td class="width100">底薪</td>
                    <td class="width80">补助</td>
                    <td class="width80">业绩提成</td>
                    <td class="width100">空置期奖励</td>
                    <td class="width100">价格差奖励</td>
                    <td class="width80">年限奖励</td>
                    <td class="width80">套餐类型</td>
                    <td class="width80">共计</td>
                    <td class="width50">备注</td>
                </tr>
                <tr class="text-center">
                    <td>
                        <div>吕哲哲</div>
                        <div>组长</div>
                        <div>苏州一区二组</div>
                    </td>
                    <td>3000</td>
                    <td>/</td>
                    <td>1000</td>
                    <td>/</td>
                    <td>/</td>
                    <td>/</td>
                    <td>鸡腿包</td>
                    <td>4900</td>
                    <td>
                        <i class="fa fa-book" @click="lookRemark()"></i>
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="table table-advance table-hover" style="border: 0;">
                <tbody class="text-center">
                <tr class="text-center" style="font-size: 24px;">
                    暂无数据......
                </tr>
                </tbody>
            </table>
        </section>

        <!--分页-->
        <Page @pag="search" :pg="paging" :beforePage="beforePage"></Page>

        <!--部门搜索-->
        <STAFF :configure="configure" @Staff="selectDateSend"></STAFF>

        <!--编辑-->
        <personalRevise></personalRevise>

        <!--查看备注-->
        <lookRemark :personal="personalRem" :look="lookRem"></lookRemark>
    </div>
</template>

<script>
    import DatePicker from '../common/datePicker.vue'
    import Page from '../common/page.vue'
    import lookRemark from './lookRemark.vue'
    import STAFF from  '../common/oraganization.vue'     //部门搜索
    import personalRevise from  './personalRevise.vue'   //个人工资编辑
    export default {
        components: {DatePicker, STAFF, personalRevise, lookRemark, Page},
        data (){
            return {
                pitch: [],
                isShow: true,
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
                addRemark: '',                  //新增备注
                personalRem: '',                //备注对象
                lookRem: '',                    //备注内容
            }
        },
        mounted (){
            this.personalList(1);
        },
        methods: {
//            列表
            personalList (val){
                this.beforePage = val;
//                this.paging = '';
                this.pitch = [];
//                this.$http.get('').then((res) => {
//
//                })
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
            pitchId (rul, ev){
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

//            编辑
            personal_rev (){
                $('#personalModel').modal({backdrop: 'static',});
            },

//            查看备注
            lookRemark (){
                $('#lookRemark').modal({backdrop: 'static',});
            }
        }
    }
</script>

<style scoped>
    td, table {
        border: 1px solid #DDDDDD;
    }

    .panel > table + table {
        margin-top: 18px;
    }

    .input-group-btn {
        vertical-align: top;
    }

    .form-group, .input-group {
        margin-bottom: 0;
        height: 39px;
    }

</style>
