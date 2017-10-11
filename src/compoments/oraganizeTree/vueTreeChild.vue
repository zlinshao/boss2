<template>
	<div>
		<div>
			<li :class="liClassVal">
				<span :class="spanClassVal" @click='open(model)'></span>
				<div :class="aClassVal" @click='Func(model,$event)' @contextmenu.prevent='cxtmenufunc'>
					<span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
					<!--<span :class='model.iconClass' v-show='model.iconClass'></span>-->
					<div class="dropdown" @mouseenter="operate($event)" @mouseleave="leaveNode($event)">
                        <span @click=" currentNode($event)">
                           	<!--<i class="glyphicon glyphicon-ban-circle" v-if="model.status == 2"></i>-->
							<span class="department">{{model.name}}</span>
                        </span>
						<i class="glyphicon glyphicon-cog dropdown-toggle" @click="dropDownList"  title="操作"
						   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
						   v-if="simulate.indexOf('Department/updateDpm')>-1||simulate.indexOf('Department/saveDpm')>-1
						   ||simulate.indexOf('Department/saveDpm')>-1||simulate.indexOf('Department/softDelete')>-1
						   ||simulate.indexOf('Department/department_move')>-1||isSuper">
						</i>

						<ul class="dropdown-menu dropdown-menu-left" style="padding: 0 0 0 0px;">
							<li v-if="simulate.indexOf('Department/updateDpm')>-1||isSuper">
								<a @click="edit($event)">编辑部门</a>
							</li>
							<li v-if="simulate.indexOf('Department/saveDpm')>-1||isSuper">
								<a @click="insertDeparment($event)">新建下级部门</a>
							</li>
							<li v-if="model.id === 1&&(simulate.indexOf('Department/saveDpm')>-1||isSuper)">
								<a @click="addDeparment($event)">新建平级部门</a>
							</li>
							<!--<li>-->
								<!--<a @click="startDepartment($event)" v-if="model.status == 2">启用部门</a>-->
							<!--</li>-->
							<!--<li>-->
								<!--<a @click="stopDepartment($event)" v-if="model.status == 1">停用部门</a>-->
							<!--</li>-->
							<li v-if="simulate.indexOf('Department/softDelete')>-1||isSuper">
								<a @click="deleteDepartment($event)">删除部门</a>
							</li>
							<li v-if="simulate.indexOf('Department/department_move')>-1||isSuper">
								<a @click="transferDepartment($event)">调迁部门</a>
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
	export default{
		name: 'ztreeItem',
        components:{},
        data(){
            return{
                simulate: [],
                isSuper : false
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
//				default:0
			},
			trees:{
				type:Array,
				twoWay:true,
//				default:[]
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
        mounted(){
            this.login_status();
        },
		computed:{
			// 给（根 和 子树）赋值不同的样式
			rootClass(){
				let strRootClass = '';

				// 根判断
				if(this.root==='0'){

					strRootClass =  (this.num===0 && this.model.son.length===0) ?
						"roots_docu" : (this.nodes===1) || (this.num===0 && this.nodes!==this.num+1) ?
						"root_" : (this.nodes === this.num+1) ? "bottom_" : "center_";

					// 子树判断
				}else if(this.root==='1') {

					strRootClass =  this.nodes>1 && this.model.son.length>0 && this.nodes!==this.num+1 ?
						"center_" : (this.num === 0 && this.nodes>1) || (this.nodes!==this.num+1) ?
						"center_docu" : this.nodes === 1&&this.num!==0 || (this.nodes===this.num+1 && this.model.son.length>0) ?
						"bottom_" : "bottom_docu";
				}

				return  strRootClass
			},
			// 是否有子节点
			isChildren(){
				return this.num+1 !== this.nodes;
			},
			// 展开/收起
			prefixClass(){
				let returnChar = "";
				if(this.rootClass.indexOf("docu")===-1){
					if(this.model.isFolder){
						returnChar = "open";
					}else {
						returnChar = 'close'
					}
				}

				if(this.model.son.length===0 && this.rootClass.indexOf("docu")===-1){
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
            // 登陆状态/权限列表
            login_status (){
                this.$http.get('staff/info').then((res) => {
                    if (res.data.code === 80019) {
                        window.location.href = 'login.html'
                    } else {
                        globalConfig.urlName = res.data.name;
                        this.urlName = res.data.name;
                        this.urlCard = res.data.avatar;
                        for (let i = 0; i < res.data.auth_all.length; i++) {
                            this.simulate.push(res.data.auth_all[i].name);
                        }
                        this.isSuper = res.data.super_auth.indexOf(res.data.id)>-1;
                    }
                });
            },
			Func(val,e){
				// 查找点击的子节点
				let recurFunc = (data,list) => {
					data.forEach((i)=>{
						if(i.id===val.id){
							i.clickNode = true;

							if(typeof this.callback === "function") {
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
            dropDownList(){this.model.contentHtml = '';},
            operate(e){
                e.target.firstChild.nextElementSibling.style.display = 'inline-block';
			},
            leaveNode(e){
                e.target.firstChild.nextElementSibling.style.display = 'none';
			},
            currentNode(e){
                this.model.contentHtml = '';
				for(let i=0; i < document.getElementsByClassName('department').length;i++){
                    document.getElementsByClassName('department')[i].style.color = '#333'
				}
                e.target.style.color = '#316AC5';
			},
			edit(e){	//编辑
                this.model.contentHtml = e.target.text;
			},
            insertDeparment(e){
                this.model.contentHtml = e.target.text;
			},
            addDeparment(e){
                this.model.contentHtml = e.target.text;
			},
//            startDepartment(e){this.model.contentHtml = e.target.text;},
//            stopDepartment(e){this.model.contentHtml = e.target.text;},
            deleteDepartment(e){this.model.contentHtml = e.target.text;},
            transferDepartment(e){this.model.contentHtml = e.target.text;},
    },
}
</script>

<style scoped>
	.ztree li{position: relative; padding:0; margin:0; list-style:none; line-height:24px; text-align:left; white-space:nowrap; outline:0}
	.ztree li ul{ margin:0; padding:0 0 0 32px}
	.ztree li ul.line{ background:url('../../assets/img/line_conn.gif') 0 0 repeat-y;}

	.ztree li>div {padding:1px 3px 0 5px; margin:0; cursor:pointer; height:17px; color:#333; background-color: transparent;
		text-decoration:none; vertical-align:top; display: inline-block}
	.ztree li a:hover {text-decoration:underline;color:#316AC5;}

	.ztree li span {line-height:16px; margin-right:2px; top: 3px; display: inline-block;}
	.ztree li span.button {line-height:0; margin:0; width:16px; height:16px; display: inline-block; vertical-align:middle;
		border:0 none; cursor: pointer;outline:none;
		background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
		background-image:url("../../assets/img/zTreeStandard.png"); *background-image:url("../../assets/img/zTreeStandard.gif")}

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
	.glyphicon{
		color: #dddddd;
	}
	.glyphicon-cog{
		display: none;
	}
</style>