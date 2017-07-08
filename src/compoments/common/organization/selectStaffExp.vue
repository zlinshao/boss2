<template>
    <div>
       <div>
           <div class="tagsinput" v-show="departmentList.length!=0" >
               <h4>部门</h4>
                <span class="tag" v-for="item in departmentList" v-if="departmentList!=''">
                    <span >{{item.name}}&nbsp;&nbsp;</span>
                    <a class="tagsinput-remove-link" @click="deleteDepartment(item)"></a>
                </span>
           </div>
           <div class="tagsinput" v-show="staffList.length!=0" >
               <h4>员工</h4>
                <span class="tag" v-for="item in staffList" v-if="staffList!=''">
                    <span >{{item.name}}&nbsp;&nbsp;</span>
                    <a class="tagsinput-remove-link" @click="deleteStaff(item)"></a>
                </span>
           </div>
       </div>
        <Select :configure="configure" @Staff="receive"></Select>
        <Status :state='info'></Status>
    </div>

</template>

<script>
    import Select from './selectStaff.vue'
    import Status from '../status.vue'
    export default {
        components:{Select,Status},
        props:['configures'],
        data(){
            return{
                departmentList:[],
                staffList:[],
                configure:[],
                idArray:{departmentId:[],staffId:[]},
                info:{
                    //成功状态 ***
                    state_success: false,
                    //失败状态 ***
                    state_error: false,
                    //成功信息 ***
                    success: '',
                    //失败信息 ***
                    error: ''
                }
            }
        },
        watch:{
            configures(val){
                console.log(val)
                this.configure=val;
            },
            'idArray':{
                deep:true,
                handler: function (val, oldVal){
                    this.$emit('Select',val);
                },

            }
        },
        methods:{
            receive(val){
                for(let j=0;j<val.department.length;j++){
                    if($.inArray(val.department[j].id,this.idArray.departmentId)===-1){
                        this.departmentList.push(val.department[j]);
                        this.idArray.departmentId.push(val.department[j].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
                for(let i=0;i<val.staff.length;i++){
                    if($.inArray(val.staff[i].id,this.idArray.staffId)===-1){
                        this.staffList.push(val.staff[i]);
                        this.idArray.staffId.push(val.staff[i].id)
                    }else {
                        this.info.success = '成员已经存在';
                        //显示成功弹窗 ***
                        this.info.state_success = true;
                        //一秒自动关闭成功信息弹窗 ***
                        setTimeout(() => {
                            this.info.state_success = false;
                        },2000);
                    }

                }
            },
            deleteStaff(item){
                this.staffList=this.staffList.filter((x)=>x!==item);
                this.idArray.staffId=this.idArray.staffId.filter((x)=>x!=item.id)
            },
            deleteDepartment(item){
                this.departmentList=this.departmentList.filter((x)=>x!==item);
                this.idArray.departmentId=this.idArray.departmentId.filter((x)=>x!=item.id)
            }
        }
    }

</script>


<style scoped>
    .tagsinput{
        border:none;
    }
    h4{
        display: inline-block;
        margin: 0;
    }
</style>
