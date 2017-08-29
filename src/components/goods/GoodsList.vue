<template>
	<div class="templateDiv">
		<ul>
			<li v-for="item in goodsList">
				<router-link v-bind="{to:'/goods/goodsinfo/'+item.id}">
					<div class="img">
						<img :src="item.img_url" alt="">
					</div>
					<h4 v-text="item.title"></h4>
					<div class="desc">
						<p>
							<span class="red">{{item.sell_price}}</span>
							<s>{{item.market_price}}</s>
						</p>
						<p>
							<h6 class="left">热卖中</h6>
							<h6 class="right">剩余{{item.stock_quantity}}件</h6>
						</p>

					</div>
				</router-link >
			</li>
			
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				goodsList:[]
			}
		},
		created(){
			this.getGoodsList();
		},
		methods:{
			getGoodsList(){
				var url = this.$urlPrefix +"/api/getgoods?pageindex=1";
				this.$http.get(url).then(function(response){
					console.log(response.body);
					this.goodsList = response.body.message;
				});
			}
		}
	}
</script>
<style scoped>
	ul{
		list-style: none;
		display: flex;
		padding-left: 0px;
		flex-wrap: wrap;
	}
	ul li{
		width: 50%;
		padding: 5px;
	}
	ul li a {
		display: block;
		border: 1px solid #ccc;
		border-radius: 5px;

	}
	ul li .img{
		text-align: center;
		margin-top: 10px;
	}
	ul li img{
		width: 80%;
	}
	 .desc{
		height: 60px;
		background-color: rgba(0,0,0,0.1);
		margin-top: 10px;
		padding: 5px;
		text-align: left;
	}
	.desc .left{
		float: left;
	}
	.desc .right{
		float: right;
	}
	.red {
		color: red;
	}
	h4{
		padding-left: 5px;
		height: 36px;
		overflow: hidden;
	}

</style>
