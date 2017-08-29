import Vue from "vue";
import App from "./App.vue";

import mintUi from "mint-ui";
import "mint-ui/lib/style.css";
Vue.use(mintUi);

// import VuePreview from 'vue-preview'
// Vue.use(VuePreview)
import VuePreview from 'vue-preview';
Vue.use(VuePreview);


import"../static/mui/css/mui.css";


import Home from "./components/Home.vue";
import Member from "./components/Member.vue";
import Cart from "./components/Cart.vue";
import Search from "./components/Search.vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);

import"../static/site.css";

import VueResource from "vue-resource";
Vue.use(VueResource);

import NewsList from "./components/news/NewsList.vue";
import PhotoList from "./components/photo/PhotoList.vue";
import Video from "./components/video/Video.vue";
import CallMe from "./components/callme/CallMe.vue";
import FeedBack from "./components/feedback/FeedBack.vue";
import GoodsList from "./components/goods/GoodsList.vue";
import GoodsInfo from "./components/goods/GoodsInfo.vue";
import GoodsDesc from "./components/goods/GoodsDesc.vue";
import GoodsComment from "./components/goods/GoodsComment.vue";


Vue.filter("dateFmt",function(input,fmtString){
	return moment(input).format(fmtString);
});
import moment from "moment";

import NewsInfo from "./components/news/NewsInfo.vue";
import PhotoInfo from "./components/photo/PhotoInfo.vue";

import common from "../static/common.js";
Vue.use(common);

var router = new VueRouter({
	linkActiveClass:"mui-active",
	routes:[
		{
			path:"/",
			redirect:"/home"
		},
		{
			path:"/home",
			component:Home
        },
        {
			path:"/member",
			component:Member
        },
        {
			path:"/cart",
			component:Cart
        },
        {
			path:"/search",
			component:Search
        },
        {
			path:"/news/newlist",
			component:NewsList
        },
        {
			path:"/photo/photolist",
			component:PhotoList
        },
        {
			path:"/goods/goodslist",
			component:GoodsList
        },
        {
			path:"/feekback",
			component:FeedBack
        },
        {
			path:"/video",
			component:Video
        },
        {
			path:"/callme",
			component:CallMe
        },
        {
			path:"/news/newsinfo/:id",
			component:NewsInfo
		},
        {
			path:"/photo/photoinfo/:id",
			component:PhotoInfo
		},
        {
			path:"/goods/goodsinfo/:goodsid",
			component:GoodsInfo
		},
        {
			path:"/api/goods/getdesc/:id",
			component:GoodsDesc
		},
        {
			path:"/api/goods/goodscoment/:id",
			component:GoodsComment
		}
	]
});


new Vue({
	el:"#app",
	router:router,
	render:function(create) {
			return create(App);
	    },
	    created(){
	    	window.eventBus=this;
	    }
});
