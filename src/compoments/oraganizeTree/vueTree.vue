<template>
	<div>
		<div class="ztree_content_wrap">
			<div class="zTreeDemoBackground left">
				<ul class="ztree">
					<ztreeItem v-for='(val,i) in treeDataSource' :key='i' :model.sync="val"
								:num.sync='i' root='0' :nodes.sync='treeDataSource.length' :callback='func'
								:expandfunc='expand' :cxtmenufunc='contextmenu' :trees.sync='treeDataSource'
							   	:simulate="simulate" :isSuper="isSuper">
					</ztreeItem>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
import Vue from 'vue'
import ztreeItem from './vueTreeChild.vue'
export default{
    components:{ztreeItem},
	data(){
       return {
       	  treeDataSource:[],
       }
	},
	props:{
		// 树数据
        list:{
       	  	type:Array,
       	  	twoWay:true
        },
        // 点击节点回调
		func:{
			type:Function,
//			default:null
		},
		// 点击展开回调
		expand:{
            type:Function,
//            default:null
		},
		// 右击事件
		contextmenu:{
            type:Function,
//            default:function(){
//            	console.log("defalt click contextmenu");
//            }
		},
		// 是否展开
		isOpen:{
			type:Boolean,
			twoWay:true,
//			default:false
		},
        simulate : {
            type:Array,
        },
        isSuper : {
            type:Boolean
		}
	},
	watch:{
        'list': {
            handler:function(){
            	this.initTreeData();
            },
            deep:true
        }
	},
    update(){
        this.initTreeData();
    },
    mounted(){
        Vue.nextTick(()=>{
            this.initTreeData();
        })
    },
	methods:{
        initTreeData(){
            let tempList = JSON.parse(JSON.stringify(this.list));
            // 递归操作，增加删除一些属性。比如: 展开/收起
            let recurrenceFunc = (data) => {
                data.forEach((val)=>{
                    val.clickNode = val.hasOwnProperty("clickNode") ? val.clickNode : false;
                    val.son = val.son || [];
	               	val.isFolder =  val.hasOwnProperty("open") ? val.open : this.isOpen;
	               	val.isExpand =  val.hasOwnProperty("open") ? val.open : this.isOpen;
	               	val.loadNode = 0;
	               	recurrenceFunc(val.son);
                })
            };

            recurrenceFunc(tempList);

            this.treeDataSource = tempList;
        },
	},
}
</script>

<style scoped>
	div.ztree_content_wrap div.left{float: left;width: 100%;}
	div.zTreeDemoBackground {width:100%;height:100%;text-align:left;}
</style>