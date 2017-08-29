<template>
	<div class="templateDiv">
		<div class="category">
			<ul v-bind="{style:'width:' + ulWidth + 'px'}">
				<li @click="getPhotoList(0)">全部</li><li v-for="item in list" @click="getPhotoList(item.id)">{{item.title}}</li>
			</ul>
		</div>
		<div class="imglist">
			<ul>
				<li v-for="item in PhotoList">
					<router-link v-bind='{to:"/photo/photoinfo/"+item.id}'>
						<img v-lazy="tempurl">
						<div class="desc">
							<h4>{{item.title}}</h4>
							<p>{{item.zhaiyao}}</p>
						</div>
					</router-link>
				</li>
			</ul>

		</div>
		
	</div>
</template>

<script>
	// var lis = document.getElementsByTagName('li');
	// console.log(lis);
	

	export default{
		data(){
			return {
				list:[],
				ulWidth:0,
				PhotoList:[],
				tempurl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503257839589&di=2c41f519b7a4cb04483e9e6f0df864b6&imgtype=0&src=http%3A%2F%2Fimg2.cache.netease.com%2Fphoto%2F0026%2F2017-04-10%2FCHML2S0K78LH0026.jpg"
			}
		},
		methods:{
			getData(){
				var url = this.$urlPrefix+"/api/getimgcategory";
				this.$http.get(url).then(function(response){
					// console.log(response.body);
					this.list = response.body.message;

					var liWidth = 72;
					var count = this.list.length+1;
					this.ulWidth = liWidth*count;
					// console.log(ulWidth);
					
				});
			},
			getPhotoList(categoryId){
				var url = this.$urlPrefix+"/api/getimages/"+categoryId;
				this.$http.get(url).then(function(response){
					this.PhotoList = response.body.message;
					// console.log(response.body);
				});
			}
		},
		created(){
			this.getData();
			this.getPhotoList(0);
		}
	}
</script>
<style scoped>
	.templateDiv{
		padding: 0px;
	}
	.category{
		width: 100%;
		overflow: auto;
	}
	.category ul{
		/*padding: 0;*/
		list-style: none;
		width: 2000px;
		padding-left: 0px;
	}
	.category ul li{

		font-size: 14px;
		display: inline-block;
		padding: 5px;
		width: 70px;
		text-align: center;
		color:#0094ff;
		cursor: pointer;
	}
	.imglist img{
		width: 100%;
		height: 300px;
	}
	.imglist ul{
		list-style: none;
		padding: 5px;
	}
	.imglist ul li{
		position: relative;
	}
	.imglist .desc{
		background-color: rgba(0,0,0,0.4);
		position: absolute;
		bottom: 5px;
		left: 0;
	}
	.imglist .desc p{
		color: #ccc;
	}
	.imglist .desc h4{
		color: #ffffff;
	}
	image[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
</style>
