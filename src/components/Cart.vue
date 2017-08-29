<template>
	<div class="templateDiv">
		<div class="row" v-for="item in dataList">
			<mt-switch class="switch" v-model="item.checked" v-on:change="switchChange"></mt-switch>
		    <img class="img" alt="商品图片" src="http://pic.58pic.com/58pic/15/23/09/15u58PICUQp_1024.jpg">
			<div class="inforight">
				<h4>{{item.title}}</h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.price}}元</li>
						<li>
							<inputNumber v-on:dataobj="getMessage" v-bind:initcount="item.count" v-bind:goodsid="item.id"></inputNumber>
						</li>
						<li>
							<a href="javascript:void(0)">删除</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品{{totalAmount}}件,总价:￥{{totalPrice}}元</li>
				</ul>
			</div>
			<div id="button">
				<mt-button type="danger" size="small">去结算</mt-button>
			</div>
		</div>

	</div>
</template>

<script>
	import inputNumber from "../subcomponents/inputNumber.vue";
	import {getAll,updateTo} from "../utils.js";
	export default {
		components:{inputNumber:inputNumber},
		data(){
			return {
				dataList:[],
				totalAmount:0,
				totalPrice:0
			}
		},
		created(){
			this.dataList=getAll();
			for(var key in this.dataList){
				this.dataList[key].checked=false;
			}
			this.cals();

			
		},
		methods:{
			getMessage(input){
				
				var goodsId = parseInt(input.split(":")[0]);
				var finalNumber = parseInt(input.split(":")[1]);

				updateTo(goodsId,finalNumber);
				// console.log(finalNumber);

				console.log(goodsId);
				window.eventBus.$emit("cartUpdated","");

				this.datalist[goodsId].count = parseInt(finalNumber);
				
				this.cals();
				
			},
			cals(){
				var totalAmount =0;
				var totalPrice =0;

				for(var key in this.dataList){
					var obj = this.dataList[key];
					if(obj.checked){

						totalAmount+= parseInt(obj.count);
						totalPrice +=parseInt(obj.count)*parseInt(obj.price)
					}
				}
				this.totalAmount=totalAmount;
				this.totalPrice = totalPrice;
			},
			switchChange(){

				this.cals();


			}
		}
	}
</script>

<style coped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 5px;
	}
	
	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}
.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}
	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}
	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}
	.bottom li:last-child{
		margin-left: 5px;
	}
	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;;
	}
	#total ul {
		padding-left: 0px;
	}
	#total li{
		list-style: none;
		font-size: 14px;
	}
	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}
	.desc{
		flex:1;
	}

</style>


