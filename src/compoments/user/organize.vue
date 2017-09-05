<template>
    <div>
        <div>
            <vue-ztree :list.sync='ztreeDataSource' :func='nodeClick' :expand='expandClick'
                       :contextmenu='contextmenuClick' :is-open='true'>
            </vue-ztree>
        </div>
    </div>
</template>

<script>
    import vueZtree from '../../compoments/ztree/vue-ztree.vue'
    export default {
        components:{
            vueZtree
        },
        data () {
            return {
                ztreeDataSource :[]
            }
        },
        created(){
            this.getDepartementList();
        },
        methods:{
            getDepartementList(){
                this.$http.post('manager/department/department_all').then((res)=>{
//                    console.log(res.data.data)
                    this.ztreeDataSource =res.data.data.data;
                })
            },
            // 点击节点
            nodeClick:function(m){
//                console.log(JSON.parse(JSON.stringify(m)));
            },
            // 右击事件
            contextmenuClick:function(){
//                console.log("触发了自定义的contextmenuClick事件");
            },
            // 点击展开收起
            expandClick:function(m){
//                console.log(JSON.parse(JSON.stringify(m)));
                // 点击异步加载
//                if(m.isExpand) {
//                    // 动态加载子节点, 模拟ajax请求数据
//                    // 请注意 id 不能重复哦。
//                    if(m.hasOwnProperty("children")){
//
//                        m.loadNode = 1; // 正在加载节点
//
//                        setTimeout(()=>{
//
//                            m.loadNode = 2; // 节点加载完毕
//
//                            m.isFolder = !m.isFolder;
//
//                            m.children.push({
//                                id:+new Date(),
//                                name:"动态加载节点1",
//                                path:"",
//                                clickNode:false,
//                                isFolder:false,
//                                isExpand:false,
//                                loadNode:0,
//                                children:[{
//                                    id:+new Date()+1,
//                                    name:"动态加载末节点",
//                                    path:"",
//                                    clickNode:false,
//                                    isExpand:false,
//                                    isFolder:false,
//                                    loadNode:0
//                                }]
//                            })
//                        },1000)
//
//                    }
////                }
            }
        },

    }
</script>