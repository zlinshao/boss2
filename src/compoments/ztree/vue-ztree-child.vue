<template>
	<div>
		<div>
			<li :class="liClassVal">
				<span :class="spanClassVal" @click='open(model)'></span>
				<div :class="aClassVal" @click='Func(model)' @contextmenu.prevent='cxtmenufunc'>
					<span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
					<span :class='model.iconClass' v-show='model.iconClass'></span>

					<div class="dropdown">
                        <span class="dropdown-toggle" data-toggle="dropdown" @click=" currentNode($event)"
                              aria-haspopup="true" aria-expanded="false">
                           {{model.name}}
                        </span>

						<ul class="dropdown-menu dropdown-menu-left" style="padding: 0 0 0 0px;">
							<li>
								<a @click="edit(model)">编辑部门</a>
							</li>
							<li>
								<a>新建下级部门</a>
							</li>
							<li>
								<a>启用部门</a>
							</li>
							<li>
								<a>停用部门</a>
							</li>
							<li>
								<a>删除部门</a>
							</li>
							<li>
								<a>调迁部门</a>
							</li>
						</ul>
					</div>
				</div>
				<ul :class="ulClassVal" v-show='model.isFolder'>
					<ztree-item v-for="(item,i) in model.son" :key='i' :callback='callback'
								:expandfunc='expandfunc' :cxtmenufunc='cxtmenufunc' :model.sync="item" :num.sync='i'
								root='1' :nodes.sync='model.son.length' :trees.sync='trees'>
					</ztree-item>
				</ul>
			</li>
		</div>
	</div>
</template>

<script>
	let operateId = '';
	export default{
		name: 'ztreeItem',
        components:{},
        data(){
            return{

            }
        },
		props: {
			model:{
				type:Object,
				twoWay:true
			},
			num:{
				type:Number,
				twoWay:true
			},
			nodes:{
				type:Number,
				twoWay:true,
				default:0
			},
			trees:{
				type:Array,
				twoWay:true,
				default:[]
			},
			root:{
				type:String,
				twoWay:true
			},
			callback:{
				type:Function
			},
			expandfunc:{
				type:Function
			},
			cxtmenufunc:{
				type:Function
			}
		},

		computed:{
			// 给（根 和 子树）赋值不同的样式
			rootClass(){
				var strRootClass = '';

				// 根判断
				if(this.root=='0'){

					strRootClass =  (this.num==0 && this.model.son.length==0) ? "roots_docu" : (this.nodes==1) || (this.num==0 && this.nodes!=this.num+1) ?
						"root_" : (this.nodes == this.num+1) ? "bottom_" : "center_";

					// 子树判断
				}else if(this.root=='1') {

					strRootClass =  this.nodes>1 && this.model.son.length>0 && this.nodes!=this.num+1
						? "center_" :
						(this.num == 0 && this.nodes>1) || (this.nodes!=this.num+1) ? "center_docu" :
							this.nodes == 1&&this.num!=0 || (this.nodes==this.num+1 && this.model.son.length>0)   ? "bottom_" : "bottom_docu";
				}

				return  strRootClass
			},
			// 是否有子节点
			isChildren(){
				return this.num+1 != this.nodes;
			},
			// 展开/收起
			prefixClass(){
				var returnChar = "";
				if(this.rootClass.indexOf("docu")==-1){
					if(this.model.isFolder){
						returnChar = "open";
					}else {
						returnChar = 'close'
					}
				}

				if(this.model.son.length==0 && this.rootClass.indexOf("docu")==-1){
					returnChar = 'docu'
				}

				return returnChar;
			},
			liClassVal(){
				return "level"+this.num;
			},
			spanClassVal(){
				return "button level"+this.num+" switch "+this.rootClass+this.prefixClass;
			},
			aClassVal(){
				return this.model.clickNode ? "level"+this.num+' curSelectedNode':"level"+this.num;
			},
			ulClassVal(){
				return this.isChildren && this.model.son.length>0 ?"level"+this.num+' line':"level"+this.num;
			},
		},
		methods:{
			Func(val){
				// 查找点击的子节点
				var recurFunc = (data,list) => {
					data.forEach((i)=>{
						if(i.id==val.id){
							i.clickNode = true;

							if(typeof this.callback == "function") {
								this.callback.call(null,val,list);
							}
						}else {
							i.clickNode = false;
						}

						if(i.son){
							recurFunc(i.son,i);
						}
					})
				};

				recurFunc(this.trees,this.trees);
			},
			open(val){
				val.isFolder = !val.isFolder;
//                    val.isExpand = !val.isExpand;
//                    if(typeof this.expandfunc == "function" && val.isExpand) {
//                        if(val.loadNode!=2) {
//                            //
//                            this.expandfunc.call(null,val);
//                        }else {
//                            val.isFolder = !val.isFolder;
//                        }
//                    } else {
//                        val.isFolder = !val.isFolder;
//                    }
			},
            currentNode(e){
				for(let i=0; i < document.getElementsByClassName('dropdown-toggle').length;i++){
                    document.getElementsByClassName('dropdown-toggle')[i].style.color = '#333'
				}
                e.target.style.color = '#316AC5';
			},
			edit(val){
				$('#myModalEditDpm').modal('show');
			}
    },
}
</script>

<style>
	div.ztree_content_wrap div.left{float: left;width: 100%;}
	div.zTreeDemoBackground {width:100%;height:100%;text-align:left;}

	ul.ztree {border:1px solid #ddd;background: #ffffff;width:100%;height:auto;}

	.ztree li{position: relative; padding:0; margin:0; list-style:none; line-height:24px; text-align:left; white-space:nowrap; outline:0}
	.ztree li ul{ margin:0; padding:0 0 0 32px}
	.ztree li ul.line{ background:url('../../images/ztree/line_conn.gif') 0 0 repeat-y;}

	.ztree li>div {padding:1px 3px 0 5px; margin:0; cursor:pointer; height:17px; color:#333; background-color: transparent;
		text-decoration:none; vertical-align:top; display: inline-block}
	.ztree li a:hover {text-decoration:underline;color:#316AC5;}
	.ztree li a.curSelectedNode {padding-top:0px;  color:#316AC5; height:24px; opacity:0.8;}
	.ztree li a input.rename {height:14px; width:80px; padding:0; margin:0;
		font-size:12px; border:1px #7EC4CC solid; *border:0px}
	.ztree li span {line-height:16px; margin-right:2px; top: 3px; display: inline-block;}
	.ztree li span.button {line-height:0; margin:0; width:16px; height:16px; display: inline-block; vertical-align:middle;
		border:0 none; cursor: pointer;outline:none;
		background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
		background-image:url("../../images/ztree/zTreeStandard.png"); *background-image:url("../../images/ztree/zTreeStandard.gif")}

	.ztree li span.button.chk {width:13px; height:13px; margin:0 3px 0 0; cursor: auto}
	.ztree li span.button.chk.checkbox_false_full {background-position:0 0}
	.ztree li span.button.chk.checkbox_false_full_focus {background-position:0 -14px}
	.ztree li span.button.chk.checkbox_false_part {background-position:0 -28px}
	.ztree li span.button.chk.checkbox_false_part_focus {background-position:0 -42px}
	.ztree li span.button.chk.checkbox_false_disable {background-position:0 -56px}
	.ztree li span.button.chk.checkbox_true_full {background-position:-14px 0}
	.ztree li span.button.chk.checkbox_true_full_focus {background-position:-14px -14px}
	.ztree li span.button.chk.checkbox_true_part {background-position:-14px -28px}
	.ztree li span.button.chk.checkbox_true_part_focus {background-position:-14px -42px}
	.ztree li span.button.chk.checkbox_true_disable {background-position:-14px -56px}
	.ztree li span.button.chk.radio_false_full {background-position:-28px 0}
	.ztree li span.button.chk.radio_false_full_focus {background-position:-28px -14px}
	.ztree li span.button.chk.radio_false_part {background-position:-28px -28px}
	.ztree li span.button.chk.radio_false_part_focus {background-position:-28px -42px}
	.ztree li span.button.chk.radio_false_disable {background-position:-28px -56px}
	.ztree li span.button.chk.radio_true_full {background-position:-42px 0}
	.ztree li span.button.chk.radio_true_full_focus {background-position:-42px -14px}
	.ztree li span.button.chk.radio_true_part {background-position:-42px -28px}
	.ztree li span.button.chk.radio_true_part_focus {background-position:-42px -42px}
	.ztree li span.button.chk.radio_true_disable {background-position:-42px -56px}

	.ztree li span.button.switch {width:18px; height:18px}
	.ztree li span.button.root_open{background-position:-92px -54px}
	.ztree li span.button.root_close{background-position:-74px -54px}
	.ztree li span.button.roots_open{background-position:-92px 0}
	.ztree li span.button.roots_close{background-position:-74px 0}
	.ztree li span.button.center_open{background-position:-92px -18px}
	.ztree li span.button.center_close{background-position:-74px -18px}
	.ztree li span.button.bottom_open{background-position:-92px -36px}
	.ztree li span.button.bottom_close{background-position:-74px -36px}
	.ztree li span.button.noline_open{background-position:-92px -72px}
	.ztree li span.button.noline_close{background-position:-74px -72px}
	.ztree li span.button.root_docu{ background:none;}
	.ztree li span.button.roots_docu{background-position:-56px 0}
	.ztree li span.button.center_docu{background-position:-56px -18px}
	.ztree li span.button.bottom_docu{background-position:-56px -36px}
	.ztree li span.button.noline_docu{ background:none;}

	.ztree li span.button.ico_open{margin-right:2px; background-position:-110px -16px; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.ico_close{margin-right:2px; background-position:-110px 0; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.ico_docu{margin-right:2px; background-position:-110px -32px; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.edit {margin-right:2px; background-position:-110px -48px; vertical-align:top; *vertical-align:middle}
	.ztree li span.button.remove {margin-right:2px; background-position:-110px -64px; vertical-align:top; *vertical-align:middle}
	.dropdown-menu li {
		text-align: center;
	}
	.dropdown-menu>li>a {
		padding: 5px 20px;
	}
	.dropdown-menu>li>a:hover {
		text-decoration:none;
		color: #316AC5;
		background: #EEEEEE;
	}
</style>