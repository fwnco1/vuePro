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
let car = JSON.parse(localStorage.getItem('car')) || []
const store = new Vuex.Store({
  state: {
      car:car,//将购物车中的商品的数据,存到car数组中,存储一些商品的对象
             //,设计成这样{id:商品的id,count:商品的数量,price:商品的价格,selected:商品的选中状态}
  },
  mutations: {
      addToCar(state,goodinfo){
         // 加入购物车的业务逻辑:
      // 1. 即将要加入的商品是否在购物车已存在, 
      // 2. 如果存在只需要更新数量信息即可
      // 3. 如果不存在只需要push进car数组即可
      var flag = false
          state.car.some(item=>{
              if (item.id ==goodinfo.id) {
                  item.count += parseInt(goodinfo.count)
                  flag = true
                  return true
              }
          })
          //如果循环完毕,没有car中找到对应的商品,那么car就直接push这个对象
          if (!flag) {
              state.car.push(goodinfo)
          }
          localStorage.setItem('car',JSON.stringify(state.car))
      },
      //这里的数据只需要用到id 和 count即可
      updateCount(state,goodinfo) {
            state.car.some(item=>{
                if (item.id==goodinfo.id) {
                    item.count = goodinfo.count
                }
                return true
            })
        localStorage.setItem('car',JSON.stringify(state.car))
      },
      removeFromCar(state,id){
          state.car.some((item,i)=>{
              if (item.id==id) {
                  state.car.splice(i,1)
                  return true
              }
              
          })
          localStorage.setItem('car',JSON.stringify(state.car))
      },
      updateSelected(state, goodsInfo) { // 用于更新数量
      state.car.some(item => {
        if (item.id === goodsInfo.id) {
          item.selected = !goodsInfo.selected
          return true
        }
      })

      localStorage.setItem('car', JSON.stringify(state.car))
    },
    
  },
  getters:{
      totalCount(state) {
        let sum = 0
         state.car.forEach(item=>{
            sum += item.count
         })
         return sum
      },
      getGoodCount(state){
          //手动创造一个id对应count的 对象
          // let o ={88:1,89:2}
          let o ={}
        state.car.forEach(item=>{
            o[item.id] = item.count
        })
        return o 
      },
      getGoodSelected(state){
          //手动创建一个id 对应selected 的对象
          let o = {}
        state.car.forEach(item=>{
            o[item.id] = item.selected
        })
        
        
        return o
      },
      getGoodKucun(state){
        //手动创建一个id 对应kucun 的对象
        let o = {}
      state.car.forEach(item=>{
          o[item.id] = item.kucun
      })
      console.log(o);
      return o
    },
      getCarCount(state) {
        let carCount = 0
        state.car.forEach(item=>{
          if (item.selected) {
              carCount ++
          }
        })
        return carCount
      },
      getTotalPrice(state) {  
        let sum = 0
        state.car.forEach(item=>{
          if (item.selected) {
            sum += parseInt(item.count*item.price)
          }
        })
        return sum
      }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render:c => c(App),
})
