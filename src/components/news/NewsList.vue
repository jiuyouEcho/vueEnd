<template>
	<div class="templateDiv">

		<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list">
					<router-link v-bind="{to:'/news/newsinfo/' + item.id}">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							{{item.title}}
							<p class='mui-ellipsis'>{{item.zhaiyao}}</p>
							<p class="ft">
								<span>{{item.add_time | dateFmt("YYYY-MM-DD HH-mm-SS")}}</span>
								<span class="click-number">{{item.click}}</span>
							</p>
						</div>
					</router-link>
				</li>
		</ul>
	</div>
</template>

<script>
	export default{
		
			data(){
				return {
					list:{}
				}
			},
			created(){
				this.getNewsList()
			},
			methods:{
				getNewsList(){
					// console.log("1234")
					var url = this.$urlPrefix + "/api/getnewslist";
					this.$http.get(url).then(function(response) {
						var datalist=response.body;
						this.list=datalist.message;
					})
				}
			}


		//  created(){
		//  	this.getNewsList();
		//  	console.log("123");
		//  },
		//  methods:{
		//  	getNewsList(){
		//  		var url = "http://139.199.192.48:8888/api/getnewslist";
		//  		this.$http.get(url).then(function(response){

		//  			this.newsList=response.body.message;
		//  		});
		//  	}
		// }
		
	}
</script>
<style scoped>
	.mui-table-view .mui-media-object{
		width: 80px;
		height: 80px;
		max-width: 80px;
		line-height: 80px;
	}
	.ft{
		font-size: 12px;
		margin-top: 1em;
		color:#0094ff;
	}
	.click-number{
		margin-left: 10px;
	}

</style>
