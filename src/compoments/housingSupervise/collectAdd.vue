<template>
    <div>
        <!-- 房屋 新增/编辑-->
        <div class="modal fade full-width-modal-right" id="collectAdd" tabindex="-1" role="dialog"
             aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog modal-md">
                <div class="modal-content-wrap">
                    <div class="modal-content">

                        <!--新增-->
                        <div v-if="msg.newState" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">新增房屋</h4>
                        </div>

                        <!--修改-->
                        <div v-if="!msg.newState" class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 class="modal-title">修改房屋</h4>
                        </div>

                        <!--新增/编辑-->
                        <div class="modal-body">
                            <form class="form-horizontal" role="form">
                                <h3 style="margin-bottom: 22px">基本信息</h3>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋地址</label>
                                        <div class="col-sm-3">
                                            <select class="form-control">
                                                <option value="1">1</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3">
                                            <select class="form-control">
                                                <option value="2">2</option>
                                            </select>
                                        </div>
                                        <div class="col-sm-3">
                                            <select class="form-control">
                                                <option value="3">3</option>
                                            </select>
                                        </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房型</label>

                                    <div class="col-sm-3">
                                        <select class="form-control">
                                            <option value="1">室</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-3">
                                        <select class="form-control">
                                            <option value="2">厅</option>
                                        </select>

                                    </div>
                                    <div class="col-sm-3">
                                        <select class="form-control">
                                            <option value="3">卫</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-xs-2 col-lg-2 col-sm-2 control-label" style="padding-top: 7px;">面积</label>
                                    <div class="col-xs-8 col-sm-8">
                                        <input type="text" class="form-control" placeholder="请输入面积">
                                    </div>
                                    <span class="col-xs-2 col-sm-2" style="font-size: 20px;padding-left: 0;">㎡</span>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">装修</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">精装修</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">配套设施</label>
                                    <div class="col-lg-10">
                                        <label class="check" v-for="a in 12"><input type="checkbox" class="pull-left">商业配套</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">所属小区</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">小区名</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">楼层</label>
                                    <div class="col-lg-10">
                                        <div class="col-xs-5 col-sm-4 col-lg-5">
                                            <input type="text" class="form-control" placeholder="">
                                        </div>
                                        <label class="col-xs-1" style="font-size: 20px">/</label>
                                        <div class="col-xs-5 col-sm-4 col-lg-5">
                                            <input type="text" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋类型</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">住宅</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋特色</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">特价房</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">建筑楼层</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">多层</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">个人/中介</label>
                                    <div class="col-lg-10">
                                        <select class="form-control">
                                            <option value="1">个人</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">房屋照片</label>
                                    <div class="col-lg-10">
                                        <input type="text" class="form-control" placeholder="房屋照片">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-lg-2 col-sm-2 control-label">负责人</label>
                                    <div class="col-lg-10">
                                        <input type="text" disabled class="form-control" placeholder="">
                                    </div>
                                </div>
                                <hr>

                                <!--其他信息-->

                                <h3 style="margin-bottom: 22px">其他信息</h3>

                                <!--未收 新增/编辑 房屋-->
                                <div v-if="msg.sss">
                                    <div class="form-group" style="position: relative;">
                                        <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                        <div class="col-lg-10">
                                            <input type="text" v-model="member" @click="selectCustom"
                                                   class="form-control" placeholder="客户姓名">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">来源</label>
                                        <div class="col-lg-10">
                                            <select class="form-control">
                                                <option value="1">推荐客户</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                        <div class="col-lg-10">
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <!--已收 房屋-->
                                <div v-if="!msg.sss">
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">客户姓名</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="客户姓名" >
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">身份照片</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">来源</label>
                                        <div class="col-lg-10">
                                            <select class="form-control">
                                                <option value="1">推荐客户</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">参考租金</label>
                                        <div class="col-lg-10">
                                            <input type="text" class="form-control" disabled placeholder="">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-lg-2 col-sm-2 control-label">备注</label>
                                        <div class="col-lg-10">
                                            <textarea class="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div class="modal-footer">
                            <button data-dismiss="modal" class="btn btn-default" type="button">取消</button>
                            <button class="btn btn-success" type="button">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SelectCustom @Staff="selectMember"></SelectCustom>
    </div>
</template>

<script>
    import SelectCustom from '../common/selectStaff.vue'
    export default {
        components:{SelectCustom},
        props: ['msg'],
        data (){
            return {
                inter_state: false,             //中介
                stat: true,
                member:'',
            }
        },
        methods: {
            pitchOn (val){
                this.customer = val;
                this.stat = false;
            },
            selectCustom(){
                $('#selectCustom').modal('show');
            },
            selectMember(val){
                this.member=val[0]
            }
        }
    }
</script>


<style scoped>
    input[type=checkbox], input[type=radio] {
        margin-right: 4px;
        margin-top: 1px;
        width: 17px;
        height: 17px;
    }

    label.check {
        margin-right: 18px;
        margin-bottom: 16px;
    }

    .status label {
        margin-right: 20px;
    }

    .modal-content {
        overflow: auto;
    }

    .street select {
        margin-bottom: 10px;
    }

    .search_info {
        position: absolute;
        padding: 0;
        top: 34px;
        left: 98px;
        height: 230px;
        overflow: auto;
        background: #ffffff;
        border: 1px solid #517397;
        z-index: 1;
        border-radius: 3px;
    }

    @media screen and (max-width: 767px) {
        .search_info {
            width: 94%;
            top: 59px;
            left: 4px;
        }
    }

    .search_info > li {
        padding: 10px 16px;
    }

    .search_info span {
        padding: 0 6px;
    }

    .search_info > li:hover {

        background: #CCCCCC;
    }
</style>
