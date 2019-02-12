<template>
  <div >
    <!-- 轮播图区域 -->
    <mt-swipe :auto="3000" class="mt-swipe">
      <mt-swipe-item v-for="(item,index) in bannerlist" :key="index">
          <a :href="item.url">
            <img :src="item.img" >
          </a>
      </mt-swipe-item>

    </mt-swipe>

    <!--6宫格区域-->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../assets/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
          <img src="../../assets/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../assets/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../assets/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../assets/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../assets/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>

    </ul>
  </div>
</template>

<script>

export default {
    data() {
        return {
            bannerlist:[]
        }
    },
    methods: {
        getBanner(){
            this.$http.get('api/getlunbo').then(result=>{
                // console.log(result.body)
                if (result.body.status==0) {
                    this.bannerlist = result.body.message
                }
                
            })
        }
    },
    created(){
          this.getBanner()
    }
};
</script>

<style lang="less" scoped>
    .mt-swipe {
        height: 200px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .mui-grid-view{
        background-color: #fff;
        
        .mui-table-view-cell{
            border: 0;
            img{
                width: 70%;
                height: 70%;
            }
        }
        
    }
</style>
