<template>
	<div>
		<h4>提交评论</h4>
		<p class="line"></p>
		<textarea placeholder="请输入评论内容..." v-model="contents"></textarea>
		<mt-button type="primary" size="large" @click="submitComment">发表</mt-button>
		<div class="list">
			<h4>评论列表</h4>
			<p class="line"></p>
			<div v-for="(item,index) in commentList">
				<div class="title">
					<span>第{{index + 1}}楼:</span>
					<span>用户：{{item.user_name}}</span>
					<span>发表时间：{{item.add_time | dateFmt('YYYY-MM-DD HH:mm:ss')}}</span>
				</div>
				<ul class="mui-table-view">
					<li class="mui-table-view-cell" v-text="item.content"></li>
				</ul>
			</div>
			<mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default{
		props:["myNewsId"],
		data(){
			return {
				contents:"",
				commentList:[],
				pageIndex:1
			}
		},
		methods:{
			submitComment(){
				if(this.contents.trim().length<=0){
							Toast("评论的内容不能为空");
							return;
						}

				var url = this.$urlPrefix+"/api/postcomment/"+this.myNewsId;
				this.$http.post(url,{content:this.contents},{emulateJSON:true}).then(function(respons){
		
						Toast(respons.body.message);

						//第一种方法   假数据
						// this.commentList = [{
						// "user_name": "旧游",
						// "add_time": new Date(),
						// "content": this.contents
						// }].concat(this.commentList);


						//第二种方法  缺点是要重新加载
						this.getCommentList();
						this.contents="";
				});
			},
			getCommentList(){
				var url = this.$urlPrefix+"/api/getcomments/"+this.myNewsId+"?pageindex="+this.pageIndex;
				this.$http.get(url).then(function(respons){
					// console.log(respons.body);
					this.commentList = respons.body.message;
					this.commentList = this.commentList.concat(respons.body.message);
				});
			},
			getMore(){
				this.pageIndex++;	
				this.getCommentList();
			}
		},
		created(){
			this.getCommentList();

		}
	}
</script>
<style scoped>
	h4{
		padding: 5px;
	}
	.line{
		width: 100%;
		height: 1px;
		background-color: rgba(0,0,0,0.3);
	}
	#list{
	padding: 5px;
	}
	.title{
		padding: 5px;
		color: #6d6d72;
		font-size: 15px;
		background-color: rgba(0,0,0,0.1);
	}

</style>
