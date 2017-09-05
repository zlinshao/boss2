<template>
	<div>
		<div class="ztree_content_wrap">
			<div class="zTreeDemoBackground left">
				<ul class="ztree">
					<ztreeItem v-for='(val,i) in treeDataSource' :key='i' :model.sync="val"
								:num.sync='i' root='0' :nodes.sync='treeDataSource.length' :callback='func'
								:expandfunc='expand' :cxtmenufunc='contextmenu' :trees.sync='treeDataSource'>
					</ztreeItem>
				</ul>
			</div>
		</div>

	</div>
</template>

<script>
import Vue from 'vue'
import ztreeItem from './vue-ztree-child.vue'
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
			default:null
		},
		// 点击展开回调
		expand:{
            type:Function,
            default:null
		},
		// 右击事件
		contextmenu:{
            type:Function,
            default:function(){
            	console.log("defalt click contextmenu");
            }
		},
		// 是否展开
		isOpen:{
			type:Boolean,
			twoWay:true,
			default:false
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
            var tempList = JSON.parse(JSON.stringify(this.list));
            // 递归操作，增加删除一些属性。比如: 展开/收起
            var recurrenceFunc = (data) => {
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
//	components:{
//		// 组件
//        editDpm,
//        ztreeItem:{
//        	name: 'ztreeItem',
//        	props: {
//        		model:{
//        			type:Object,
//        			twoWay:true
//        		},
//        		num:{
//                    type:Number,
//                    twoWay:true
//        		},
//        		nodes:{
//                    type:Number,
//                    twoWay:true,
//                    default:0
//        		},
//        		trees:{
//		       	  	type:Array,
//		       	  	twoWay:true,
//		       	  	default:[]
//		        },
//        		root:{
//                    type:String,
//                    twoWay:true
//        		},
//        		callback:{
//					type:Function
//				},
//				expandfunc:{
//					type:Function
//				},
//				cxtmenufunc:{
//					type:Function
//				}
//        	},
////			data(){
////        	    return{
////                    editDpm : [],
////				}
////			},
//            computed:{
//                // 给（根 和 子树）赋值不同的样式
//                rootClass(){
//                    var strRootClass = '';
//
//                    // 根判断
//                    if(this.root=='0'){
//
//                        strRootClass =  (this.num==0 && this.model.son.length==0) ? "roots_docu" : (this.nodes==1) || (this.num==0 && this.nodes!=this.num+1) ?
//                            "root_" : (this.nodes == this.num+1) ? "bottom_" : "center_";
//
//                        // 子树判断
//                    }else if(this.root=='1') {
//
//                        strRootClass =  this.nodes>1 && this.model.son.length>0 && this.nodes!=this.num+1
//                            ? "center_" :
//                            (this.num == 0 && this.nodes>1) || (this.nodes!=this.num+1) ? "center_docu" :
//                                this.nodes == 1&&this.num!=0 || (this.nodes==this.num+1 && this.model.son.length>0)   ? "bottom_" : "bottom_docu";
//                    }
//
//                    return  strRootClass
//                },
//                // 是否有子节点
//                isChildren(){
//                    return this.num+1 != this.nodes;
//                },
//                // 展开/收起
//                prefixClass(){
//                    var returnChar = "";
//                    if(this.rootClass.indexOf("docu")==-1){
//                        if(this.model.isFolder){
//                            returnChar = "open";
//                        }else {
//                            returnChar = 'close'
//                        }
//                    }
//
//                    if(this.model.son.length==0 && this.rootClass.indexOf("docu")==-1){
//                        returnChar = 'docu'
//                    }
//
//                    return returnChar;
//                },
//                liClassVal(){
//                    return "level"+this.num;
//                },
//                spanClassVal(){
//                    return "button level"+this.num+" switch "+this.rootClass+this.prefixClass;
//                },
//                aClassVal(){
//                    return this.model.clickNode ? "level"+this.num+' curSelectedNode':"level"+this.num;
//                },
//                ulClassVal(){
//                    return this.isChildren && this.model.son.length>0 ?"level"+this.num+' line':"level"+this.num;
//                },
//            },
//        	methods:{
//                Func(val){
//                    // 查找点击的子节点
//                    var recurFunc = (data,list) => {
//                        data.forEach((i)=>{
//                            if(i.id==val.id){
//                                i.clickNode = true;
//
//                                if(typeof this.callback == "function") {
//				                    this.callback.call(null,val,list);
//				                }
//                            }else {
//                              i.clickNode = false;
//                            }
//
//                            if(i.son){
//                               recurFunc(i.son,i);
//                            }
//                        })
//                    }
//
//                    recurFunc(this.trees,this.trees);
//                },
//                open(val){
//                	//
//                    val.isFolder = !val.isFolder;
////                	val.isExpand = !val.isExpand;
////                    if(typeof this.expandfunc == "function" && val.isExpand) {
////                        if(val.loadNode!=2) {
////		                	//
////		                    this.expandfunc.call(null,val);
////		                }else {
////		                	val.isFolder = !val.isFolder;
////		                }
////	                } else {
////                        val.isFolder = !val.isFolder;
////	                }
//                },
//                edit(id){
//                    $('#myModalEditDpm').modal('show');
//                    this.$http.get('manager/department/readDpm/id/' + id).then((res) => {
//                        this.editDpm = res.data.data
//
//                      this.$emit('EditDpm',this.editDpm)
//                    })
//				}
//        	},
//
//            template:
//                `<li :class="liClassVal">
//				<span :class="spanClassVal" @click='open(model)'></span>
//				<div :class="aClassVal" @click='Func(model)' @contextmenu.prevent='cxtmenufunc'>
//				    <span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
//				    <span :class='model.iconClass' v-show='model.iconClass'></span>
//
//					<div class="dropdown">
//						<span class="dropdown-toggle" data-toggle="dropdown"
//							aria-haspopup="true" aria-expanded="false">
//						   {{model.name}}
//						</span>
//						<ul class="dropdown-menu dropdown-menu-left" style="padding: 0 0 0 0px;">
//							<li>
//								<a @click="edit(model.id)">编辑部门</a>
//							</li>
//							<li>
//								<a>新建下级部门</a>
//							</li>
//							<li>
//								<a>启用部门</a>
//							</li>
//							<li>
//								<a>停用部门</a>
//							</li>
//							<li>
//								<a>删除部门</a>
//							</li>
//							<li>
//								<a>调迁部门</a>
//							</li>
//
//						</ul>
//                    </div>
//				</div>
//
//				<ul :class="ulClassVal" v-show='model.isFolder'>
//					<ztree-item v-for="(item,i) in model.son" :key='i' :callback='callback'
//							:expandfunc='expandfunc' :cxtmenufunc='cxtmenufunc' :model.sync="item" :num.sync='i'
//							root='1' :nodes.sync='model.son.length' :trees.sync='trees'>
//					</ztree-item>
//				</ul>
//			</li>`
//		}
//	},

}
</script>

<style>

</style>