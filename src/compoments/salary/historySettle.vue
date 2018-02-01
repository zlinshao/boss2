<template>
    <div>
        <div>
            <ol class="breadcrumb">
                <li>
                    <router-link to="/personal">个人工资</router-link>
                </li>
                <li>历史未结清</li>
            </ol>
            <section class="panel">
                <div class="panel-body clearFix">
                    <div v-if="pitch.length == 0">
                        <form class="form-inline clearFix" role="form">
                            <div class="input-group">
                                <select class="form-control" @change="historySettle(1)" v-model="params.cate">
                                    <option value="">全部</option>
                                    <option value="1">收</option>
                                    <option value="2">租</option>
                                </select>
                            </div>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="姓名/地址" v-model="params.search"
                                       @keydown.enter.prevent="historySettle(1)">
                                <span class="input-group-btn">
                                <button class="btn btn-success" id="search" type="button"
                                        @click="historySettle(1)">搜索</button>
                            </span>
                            </div>
                        </form>
                    </div>
                    <div class="col-lg-12 remind" v-if="pitch.length > 0">
                        <ul>
                            <li>
                                <h5><a>已选中&nbsp;1&nbsp;项</a></h5>
                            </li>
                            <li>
                                <h5><a @click="already_salary">已发款项</a></h5>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="panel table table-responsive roll has-js" style="padding: 16px;">
                <table class="table table-advance table-hover">
                    <thead>
                    <tr>
                        <th></th>
                        <th class="text-center">收/租状态</th>
                        <th class="text-center">时间</th>
                        <th class="text-center">地址</th>
                        <th class="text-center">开单人</th>
                        <th class="text-center">负责人</th>
                        <th class="text-center">所属部门</th>
                    </tr>
                    </thead>
                    <tbody class="text-center">
                    <tr class="text-center" v-for="(item,index) in historyData">
                        <td>
                            <label :class="{'label_check':true,'c_on':pitch.indexOf(item.id) > -1,
                                    'c_off':pitch.indexOf(item.id)==-1}"
                                   @click.prevent="pitchId(item.id, $event, item.cells)">
                                <input type="checkbox" class="pull-left"
                                       :checked="pitch.indexOf(item.id) > -1">
                            </label>
                        </td>
                        <td>
                            <span v-if="item.proof_category == 1">收</span>
                            <span v-if="item.proof_category == 2">租</span>
                        </td>
                        <td>{{item.generate_date}}</td>
                        <td>{{item.address}}</td>
                        <td>{{item.staff_name}}</td>
                        <td>{{item.leader_name}}</td>
                        <td>{{item.department_name}}</td>
                    </tr>
                    <tr class="text-center" style="font-size: 18px;" v-if="isShow">
                        <td colspan="7">暂无数据......</td>
                    </tr>
                    </tbody>
                </table>
            </section>
            <!--已发工资-->
            <div role="dialog" class="modal fade bs-example-modal-sm" id="already_salary">
                <div class="modal-dialog ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">
                                <span>&times;</span>
                            </button>
                            <h4 class="modal-title" style="border: 0;">提示信息</h4>
                        </div>
                        <div class="modal-body has-js clearfix">
                            <div v-for="item in simple_cells" class="pull-left" v-if="simple_cells.length != 0"
                                 style="margin-right: 15px;">
                                <label :class="{'label_check':true,'c_on':cell_pitch.indexOf(item.id) > -1,
                                    'c_off':cell_pitch.indexOf(item.id)==-1}"
                                       @click.prevent="cell_pitchId(item.id, $event)">
                                    <input type="checkbox" class="pull-left"
                                           :checked="cell_pitch.indexOf(item.id) > -1">{{dict.cell_category[item.category]}}
                                </label>
                            </div>
                            <div v-if="simple_cells.length == 0" style="font-size: 16px;">
                                无未发详情
                            </div>
                        </div>
                        <div class="modal-footer text-right">
                            <button data-dismiss="modal" class="btn btn-default btn-md">取消</button>
                            <button class="btn btn-primary btn-md" @click="cell_ok">确认</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--分页-->
            <Page @pag="historySettle" :pg="paging" :beforePage="params.page"></Page>

            <Status :state='info'></Status>
        </div>
    </div>
</template>

<script>
    import Page from '../common/page.vue'
    import Status from '../common/status.vue';              //提示信息
    export default {
        name: "history-settle",
        components: {Page, Status},
        data() {
            return {
                pitch: [],
                dict: {},
                isShow: false,
                paging: '',
                params: {
                    search: '',
                    cate: '',
                    page: 1,
                },
                simple_cells: [],
                cell_pitch: [],
                cell_pitch_off: [],

                historyData: [],
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
        mounted() {
            this.historySettle(1);
            this.$http.get('salary/Commission/dict').then((res) => {
                this.dict = res.data;
            });
        },
        watch: {},
        methods: {
//            已发工资
            already_salary() {
                this.cell_pitch = [];
                this.cell_pitch_off = [];
                for (let i = 0; i < this.simple_cells.length; i++) {
                    if (this.simple_cells[i].status === 1) {
                        this.cell_pitch.push(this.simple_cells[i].id);
                    } else if (this.simple_cells[i].status === 2) {
                        this.cell_pitch_off.push(this.simple_cells[i].id);
                    }
                }
                $('#already_salary').modal({backdrop: 'static',});
            },

            historySettle(val) {
                this.historyData = [];
                this.params.page = val;
                this.$http.get('salary/view/history', {
                    params: this.params,
                }).then((res) => {
                    if (res.data.code === '70010') {
                        this.historyData = res.data.data;
                        this.isShow = false;
                    } else {
                        this.historyData = [];
                        this.paging = '';
                        this.isShow = true;
                    }
                })
            },
            //            选中
            pitchId(rul, ev, cell) {
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
                this.simple_cells = cell;
            },
            //            已发选中
            cell_pitchId(rul, ev) {
                let evInput = ev.target.getElementsByTagName('input')[0];
                evInput.checked = !evInput.checked;
                if (evInput.checked) {
                    let index = this.cell_pitch_off.indexOf(rul);
                    if (index > -1) {
                        this.cell_pitch_off.splice(index, 1);
                    }
                    this.cell_pitch.push(rul);
                } else {
                    let index = this.cell_pitch.indexOf(rul);
                    if (index > -1) {
                        this.cell_pitch.splice(index, 1);
                    }
                    this.cell_pitch_off.push(rul);
                }
            },
//            确定已发
            cell_ok() {
                this.$http.post('achv/cell/history/' + this.pitch, {
                    on: this.cell_pitch,
                    off: this.cell_pitch_off,
                }).then((res) => {
                    if (res.data.code === '70000') {
                        $('#already_salary').modal('hide');
                        this.personal(this.personal_id, this.tabs);
                        this.pitch = [];
                        this.successMsg(res.data.msg);
                    } else {
                        this.errorMsg(res.data.msg);
                    }
                })
            },
            successMsg(msg) {    //成功提示信息
                this.info.success = msg;
                //显示成功弹窗 ***
                this.info.state_success = true;
            },
            errorMsg(msg) {      //失败提示信息
                this.info.error = msg;
                //显示成功弹窗 ***
                this.info.state_error = true;
            },
            // search() {
            //     this.historySettle(this.params.page)
            // }
        },
    }
</script>

<style scoped>

</style>