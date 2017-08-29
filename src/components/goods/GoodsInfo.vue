<template>
	<div class="templateDiv">
		<div class="silder">
			<!-- <silder :imgs="imgs"></silder>	 -->
			<mt-swipe :auto="2000">
			<mt-swipe-item v-for="item in imgs">
				<img v-bind:src="item">
			</mt-swipe-item>
		</mt-swipe>
		</div>

		<div id="buy">
			<h4 v-text="descList.title"></h4>
			<p class="line"></p>
			<ul>
				<li class="price">
					市场价: <s>￥{{descList.market_price}}</s>
					销售价：<span>￥{{descList.sell_price}}</span>
				</li>
				<li class="inputli">
					<div class="buyCount">购买数量：</div> 
					<inputNumber v-on:dataobj="getMessage"></inputNumber>
					<!-- <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter"> -->
						<transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
							<div v-show="show" class="ball"></div>
						</transition>
					<!-- </transition> -->
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="addToCart">加入购物车</mt-button>
					
				</li>
			</ul>
		</div>
		
		<div id="params">
			<h5>商品参数</h5>
			<p class="line"></p>
			<ul>
				<li>商品货号：{{descList.goods_no}}</li>
				<li>库存情况：{{descList.stock_quantity}}</li>
				<li>上架时间：{{descList.add_time | dateFmt("YYYY-MM-DD")}}</li>
			</ul>
		</div>

		<div id="other">
			<router-link v-bind="{to:'/api/goods/getdesc/'+descList.id}">
				<mt-button class="imgdesc" type="primary" plain size="large">图文详情</mt-button>
			</router-link>
			<router-link v-bind="{to:'/api/goods/goodscoment/'+descList.id}">
				<mt-button type="danger" plain size="large">商品评论</mt-button>
			</router-link>
		</div>


	</div>
</template>

<script>
	// import slider from "../../subcomponents/slide.vue";
	import inputNumber from "../../subcomponents/inputNumber.vue";
	import {addNumber,getTop,getLeft} from "../../utils.js";
	

	export default {
		// components:{silder:slider},
		 components:{inputNumber:inputNumber},
		data(){
			return {
				goodsId:0,
				imgs:[],
				descList:[],
				inputNumberCount:0,
				show:false
				
			}
		},
		created(){
			this.goodsId = this.$route.params.goodsid;
			this.getimgs();
			this.getDesc();
		},
		methods:{
			getimgs(){
				var url=this.$urlPrefix+'/api/getthumimages/'+this.goodsId;
				this.$http.get(url).then(function(response){

					// console.log(response.body)
					// this.imgs=response.body.message;
					var tempUrlList=[						
						"http://www.people.com.cn/mediafile/pic/20150917/23/10030234897474881435.jpg",					
						"http://jiangsu.china.com.cn/uploadfile/2016/0413/1460530872607118.jpg"
						];
					this.imgs=tempUrlList;
					

				});
			},
			getDesc(){
				var url = this.$urlPrefix+"/api/goods/getinfo/"+this.goodsId;
				this.$http.get(url).then(function(response){
					console.log(response.body);
					this.descList = response.body.message[0];
					// console.log(this.descList.title);
				});
			},
			getMessage(input){
				this.inputNumberCount=parseInt(input.split(":")[1]);

			},
			addToCart(){
				//var cartDataStr = localStorage.getItem("cartData") || "{}";
				//var cartObj = JSON.parse(cartDataStr);
				//
				//var savedItem  = cartObj[this.descList.id];
				//// console.log(savedItem);
				//if(savedItem){
				//	savedItem.count= parseInt(savedItem.count)+parseInt(this.inputNumberCount);
				//}else{
				//	savedItem={};
				//	savedItem.id=this.descList.id;
				//	savedItem.title=this.descList.title;
				//	savedItem.price=this.descList.sell_price;
				//	savedItem.count=this.inputNumberCount;
				//}
				//cartObj[this.descList.id] = savedItem;
				//localStorage.setItem("cartData",JSON.stringify(cartObj));

				addNumber(this.descList,this.inputNumberCount);
				window.eventBus.$emit("cartUpdated","");
				this.show=true;
			},
			beforeEnter(el){
				el.style.transform="translate(0px,0px)";
			},
			enter(el,done){
				el.offsetWidth;

				var currentDivTop = getTop(el);
				var currentDivLeft = getLeft(el);

				var badgeLeft = localStorage.getItem("badgeLeft");
				var badgeTop = localStorage.getItem("badgeTop");



				var targetX=badgeLeft-currentDivLeft;
				var targetY=badgeTop-(currentDivTop-window.scrollY);
				el.style.transform="translate("+targetX+"px,"+targetY+"px)";
				done();
			},
			afterEnter(el){
				this.show=false;
			}

		}
	}
</script>

<style scoped>
	.silder{
		/*padding: 5px;*/
		border: 1px solid #ccc;
		border-radius: 5PX;
	}
	.mint-swipe{
		height: 200px;
	}
	.mint-swipe-item img{
		width: 100%;
		height: 300px;
	}
	.mint-swipe-item{
		width: 100%;
		height: 300px;
	}
	#buy,#params{
		border: 1px solid #ccc;
		border-radius: 5PX;
		margin: 5px 0;
		padding: 5px;
	}
	#buy h4{
		color: #009fff;
	}
	.line{
		
		height: 1px;
		border: 1px solid rgba(0,0,0,0.2);
	}
	#buy ul,#params ul,#other{
		list-style: none;
		padding: 0;
	}
	
	.price,.inputli{
		margin: 5px 0;
	}
	.inputli{
		display: flex;
		position: relative;
	}
	.ball{
		width: 20px;
		height: 20px;
		border-radius:10px;
		background-color: red;
		position: absolute;
		top: 50%;
		left: 150px;
		transform: translateY(-50%);
		transition: all 2s;
		z-index: 1000;

	}
	
</style>  