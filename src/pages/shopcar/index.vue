<template>
  <div class="shopcar-container">
    <div class="goodslist">
      <div class="mui-card" v-for="item in goodsList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h3>{{item.title}}</h3>
              <div class="numbox">
                <span class="price">¥{{item.sell_price}}</span>
                <div class="num">
                  <input type="button" value="-">
                  <input type="number" value="-">
                  <input type="button" value="+">
                </div>
                <a href="#">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
            <div class="left">
                <p>总计(不含运费)</p>
                <p>已勾选商品
                    <span class="red">1</span>件,总价
                    <span class="red"></span> 元
                </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            goodsList:[],// 购物车中所有商品的数据
        }
    },
    methods: {
        getGoodsList(){
             // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
             var idArr = []
            this.$store.state.car.forEach(item => idArr.push(item.id));
            console.log(idArr);
            
            // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
            if (idArr.length==0) {
                return
            }
            
            this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(res=>{
                if (res.body.status==0) {
                   
                    
                    this.goodsList = res.body.message
                }
            })
        }
    },
    created(){
        this.getGoodsList()
    }
};
</script>

<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goodslist {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img {
        width: 60px;
       
      }
      .info {
          display: flex;
      flex-direction: column;
      justify-content: space-between;
        h3 {
          font-size: 13px;
          color: #000;
        }
        .numbox {
          display: flex;
          height: 50px;
          align-items: center;
          justify-content: space-between;
          input {
            float: left;
            width: 30px;
            height: 30px;
            padding: 0;
            margin: 0;
            text-align: center;
            &[type="number"] {
              border-left: 0;
              border-right: 0;
              font-size: 12px;
              color: gray;
            }
          }
          .price {
            color: red;
            font-weight: bolder;
          }
        }
      }
    }
  }
  .jiesuan{
      display: flex;
      justify-content: space-between;
      .red{
          color: red;
          font-weight: bold;
      }
  }
}
</style>
