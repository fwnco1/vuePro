<template>
  <div id="app" class="app-container">
    <!-- //顶部区域 -->
    <!-- <mt-header fixed title="Vue王者荣耀"></mt-header> -->
    <mt-header title="Vue王者荣耀">
      <div  slot="left" @click="reload" v-show="flag">
        <mt-button icon="back" >返回</mt-button>
      </div>
    </mt-header>

    <!-- 组件展示区域 -->
    <transition name="app">
      <router-view/>
    </transition>

    <!-- 底部区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-llb" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-llb" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      flag:1
    };
  },
  methods:{
    reload(){
       this.$router.go(-1)
    },
    
  },
  
  watch: {
        //  this.$route.path
        '$route.path': function (newVal, oldVal) {
          // console.log(newVal + ' --- ' + oldVal)
          if (newVal === '/home') {
            this.flag=0
          } else {
            this.flag=1
          }
        }
      }
};
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #fff;
}
.app-container {
  padding: 40px 0 50px 0;
  overflow-x: hidden;
  .mint-header {
    z-index: 999;
    position: fixed;
    top: 0;
    width: 100%;
    text-align: center;
    .mint-header-button{
      flex: 0;
    }
    .mint-header-button.is-left{
      position: absolute
    }
  }
  //改类名解决tabbar点击无法切换的问题
  .mui-bar-tab .mui-tab-item-llb.mui-active {
    color: #007aff;
  }
  .mui-bar-tab .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }
  .mui-bar-tab .mui-tab-item-llb .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.app-enter {
  opacity: 0;
  transform: translateX(100%);
}
.app-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.app-enter-active,
.app-leave-active {
  transition: all 0.5s ease;
}
</style>
