<template>
  <div class="goodsinfo-container">

      <transition
        @before-enter="beforEnter"
        @enter="Enter"
        @after-enter="afterEnter"
      
      >
          <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
      
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :banners="banners" :isfull="false"></swiper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价:
            <span class="old">¥{{goodsinfo.market_price}}</span>&nbsp;&nbsp;
            销售价:
            <span class="now">¥{{goodsinfo.sell_price}}</span>
          </p>
          <div class="numbox">
            <span>购买数量:</span>&nbsp;
            <input type="button" value="-" @click="buyCount>=2 && buyCount--" :disabled="buyCount==1">
            <input type="number" value="buyCount" v-model="buyCount" @change="countChange">
            <input type="button" value="+" @click="buyCount<goodsinfo.stock_quantity && buyCount++" :disabled="buyCount==goodsinfo.stock_quantity">
          </div>
          <div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar" :disabled="ismove">加入购物车</mt-button>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content content">
        <p>商品货号:{{goodsinfo.goods_no}}</p>
        <p>库存情况:{{goodsinfo.stock_quantity}}件</p>
        <p>上架时间:{{goodsinfo.add_time | dateFormat}}</p>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" @click="goDesc(id)" plain>图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="goComment(id)" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      banners: [],
      goodsinfo: {},
      ballFlag:false,
      buyCount: 1,
      ismove:false
    };
  },
  methods: {
    getBanners() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.banners = res.body.message;
        }
      });
    },
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status === 0) {
          this.goodsinfo = res.body.message[0];
        }
      });
    },
    goDesc(id) {
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar(){
        this.ballFlag=!this.ballFlag
        this.ismove = !this.ismove
        setTimeout(()=>{
            this.ismove =!this.ismove
        },1000)
        
    },
    beforEnter(el){
       el.style.transform = "translate(0, 0)";
    },
    Enter(el,done){
       el.offsetWidth;

        let ballPosition=this.$refs.ball.getBoundingClientRect()
        // console.log(ballPosition);
        
        let shopcarPosition=document.getElementById('badge').getBoundingClientRect()
        // console.log(shopcarPosition);
        
        let xMOVE = shopcarPosition.left - ballPosition.left
        let yMOVE = shopcarPosition.top - ballPosition.top

        el.style.transform = `translate(${xMOVE}px, ${yMOVE}px)`;
        el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el){
        this.ballFlag=!this.ballFlag
        
    },
    countChange(){
        if (this.buyCount>this.goodsinfo.stock_quantity) {
            this.buyCount=this.goodsinfo.stock_quantity
        }
        if (this.buyCount<0) {
            this.buyCount=1
        }
    }
  },
  created() {
    this.getBanners();
    this.getGoodsInfo();
  }
};
</script>


<style lang="less" >
.goodsinfo-container {
  .price {
    .now {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
    .old {
      text-decoration-line: line-through;
    }
  }
  .content {
    p {
      text-indent: 1em;
      margin: 5px 0;
    }
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .numbox {
    input[type="number"] {
      width: 50px;
    }
    input {
      width: 25px;
      height: 25px;
      text-align: center;
      padding: 0;
    }
  }
  .ball{
      width: 15px;
      height: 15px;
      background-color: red;
      border-radius: 50%;
      position: absolute;
      z-index: 99;
      left: 132px;
      top: 385px;
      
  }
}
</style>