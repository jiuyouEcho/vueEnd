<template>
	<div class="templateDiv">
		<comment v-bind:myNewsId="goodsId"></comment>
	</div>
</template>

<script>
	import comment from "../../subcomponents/Comment.vue";
	export default {
		components:{comment:comment},
		data(){
			return {
				goodsId:0
			}
		},
		created(){
			this.goodsId=this.$route.params.id;
			console.log(this.goodsId);
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	

</style>
