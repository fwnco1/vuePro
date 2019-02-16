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

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:c => c(App),
})
