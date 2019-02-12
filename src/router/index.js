import Vue from 'vue'
import Router from 'vue-router'



// import HelloWorld from '@/components/HelloWorld'
// import App from  '@/App'
 import Home from '@/pages/home'
 import Member from '@/pages/member'
 import ShopCar from '@/pages/shopcar'
 import Search from '@/pages/search'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', redirect:'/home'},
    {path: '/home', component: Home},
    {path: '/member', component: Member},
    {path: '/shopcar', component: ShopCar},
    {path: '/search', component: Search},
  ],
  linkActiveClass:"mui-active"
})
