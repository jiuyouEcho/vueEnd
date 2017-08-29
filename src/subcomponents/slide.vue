<template>
	<div class="templateDiv">
		<mt-swipe :auto="2000">
			<mt-swipe-item v-for="item in imgs">
				<img v-bind:src="item.img">
			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	export default {
		props:["imgs"],
		data(){
			return {

			}
		}
	}
</script>

<style scoped>
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

</style>
