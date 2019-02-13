import Vue from 'vue'
import Router from 'vue-router'

//定义全局过滤器
import moment from 'moment'
Vue.filter('dateFormat',function(dateStr,pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dateStr).format(pattern)
})


// import HelloWorld from '@/components/HelloWorld'
// import App from  '@/App'
 import Home from '@/pages/home'
 import Member from '@/pages/member'
 import ShopCar from '@/pages/shopcar'
 import Search from '@/pages/search'
 import newsList from '@/pages/newsList'
 import newsInfo from '@/pages/newsInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect:'/home'},
    {path: '/home', component: Home},
    {path: '/member', component: Member},
    {path: '/shopcar', component: ShopCar},
    {path: '/search', component: Search},
    {path: '/home/newslist', component: newsList},
    {path: '/home/newsinfo/:id', component: newsInfo},
  ],
  linkActiveClass:"mui-active"
})
