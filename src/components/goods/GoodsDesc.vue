<template>
	<div class="templateDiv">
		<h3 v-text="list.title"></h3>
		<div v-html="list.content"></div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				list:[],
				descId:0
			}
		},
		created(){
			this.descId = this.$route.params.id;
			this.getData();
		},
		methods:{
			getData(){
				var url = this.$urlPrefix+"/api/goods/getdesc/"+this.descId;
				this.$http.get(url).then(function(response){
					console.log(response.body);
					this.list = response.body.message[0];
				});
			}
		}
	}
</script>

<style scoped>
	h3{
		color: #009fff;
	}

</style>
