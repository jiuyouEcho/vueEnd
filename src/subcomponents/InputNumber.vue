<template>
	<div>
		<div class="count">
			<div @click="substrict">-</div>
			<div v-text="count"></div>
			<div @click="add">+</div>
		</div>
	</div>
</template>

<script>

	export default {
		props:["initcount","goodsid"],
		data(){
			return {
				count:1
			}
		},
		created(){
			if(this.initcount){
				this.count = this.initcount;
			}
		},
		methods:{
			substrict(){
				if(this.count<=1){
					this.count=1;
				}else{
					this.count--;
				}
				this.sendmessage();
			},
			add(){
				this.count++;
				this.sendmessage();
			},
			sendmessage(){
				this.$emit('dataobj',this.goodsid+":"+this.count);
			}
		}
	}
</script>

<style scoped>
	.count{
		display: flex;
	}
	.inputli{
		display: flex;
	}
	.imgdesc{
		margin: 10px 0;
	}
	.count div{
		text-align: center;
		line-height: 20px;
		
		width: 50px;
		height: 20px;
		border: 1px solid rgba(0,0,0,0.2);
		
	}

</style>
