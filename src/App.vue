<template>
	<div>
		<mt-header fixed title="传智播客黑马程序员"></mt-header>
		
		<div v-if="isShow" id="back" ><a href="javascript:;" @click="backTo">返回</a></div>

		<router-view></router-view>

		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge">{{total}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	import {getTotalCount,getTop,getLeft} from "./utils.js";
	export default {
		data(){
			return {
				total:0,
				isShow:false
			}
		},
		watch:{
			"$route":function(newroute,oldroute){
					if(newroute.path.toLowerCase()=="/home"){
						this.isShow = false;
					}else{
						this.isShow = true;
					}
					// console.log(newroute);
			}					
		},
		created(){
			//var saveObj = JSON.parse(localStorage.getItem("cartData")||"{}");
			//for(var key in saveObj){
			//	this.total+=saveObj[key].count;
			//}
			this.total = getTotalCount();
			window.eventBus.$on("cartUpdated",function(){
				var currentDom= document.querySelector(".mui-badge");
				currentDom.innerText=getTotalCount() +"";
	});

		},
		mounted:function(){
			var badge=document.querySelector(".mui-badge");
			var tempLeft=getLeft(badge);
			var tempTop = getTop(badge);

			localStorage.setItem("badgeLeft",tempLeft);
			localStorage.setItem("badgeTop",tempTop);
		},
		methods:{
			backTo(){

				this.$router.go(-1);
			}
		}
	}
</script>	
<style scoped>
	#back{
		width: 60px;
		position: absolute;
		left: 20px;
		top: 10px;
		z-index: 1001;
	}
	#back a {
		color: #FFF;
		font-size: 14px;
		font-weight: bold;

	}
</style>
