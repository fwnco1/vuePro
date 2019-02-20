// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//设置请求根路径
Vue.http.options.root = 'http://vue.lovegf.cn:8899'
//设置全局post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true;

//全局加载
import MintUI from 'mint-ui'
import "mint-ui/lib/style.css" 
Vue.use(MintUI)
//引入mui
import "./libs/mui/css/mui.css"
import "./libs/mui/fonts/mui.ttf"
import "./libs/mui/css/icons-extra.css"
import "./libs/mui/fonts/mui-icons-extra.ttf"

//全局引入评论子组件
import comment from './components/comment.vue'
Vue.component('comment',comment)

//全局引入轮播图子组件
import swiper from './components/swiper.vue'
Vue.component('swiper',swiper)

//全局引入缩略图插件
import VuePreview from 'vue-pic-preview'
Vue.use(VuePreview)

//全局引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

Vue.config.productionTip = false

//创建Vuex实例
const store = new Vuex.Store({
  state: {
      totalCount:0
  },
  mutations: {
      addToCar(){
         // 加入购物车的业务逻辑:
      // 1. 即将要加入的商品是否在购物车已存在, 
      // 2. 如果存在只需要更新数量信息即可
      // 3. 如果不存在只需要push进car数组即可
        
      }
  },
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:c => c(App),
})
