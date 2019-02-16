<template>
  <div class="goodslist-container">
    <div class="goodlist">
      <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="goDesc(item.id)">
        <img :src="item.img_url" alt>
        <div class="item-title">{{item.title}}</div>
        <div class="item-body">
          <p class="price">
            <span class="now">¥{{item.sell_price}}</span>&nbsp;&nbsp;
            <span class="old">¥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩余{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div> 
      <mt-button type="danger" size="large" @click="getMore">点击加载更多</mt-button>
    </div>
    

  </div>
</template>

<script>
export default {
    data() {
        return {
            goodslist:[],
            pageindex:1,
        }
    },
    methods: {
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(res=>{
                if (res.body.status==0) {
                    this.goodslist=this.goodslist.concat(res.body.message)    
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList()
        },
        goDesc(id){
            this.$router.push({name:'goodsinfo',params:{id}})
        }
    },
    created(){
        this.getGoodsList()
    }
};
</script>


<style lang="less" scoped>
.goodslist-container {
  .goodlist {
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goodsitem {
      border: 1px solid #999;
      width: 49%;
      box-shadow: 0 0 5px #999;
      padding: 2px;
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 310px;
      img {
        width: 100%;
      }
      .item-title {
        font-size: 13px;
        color: rgb(16, 71, 190);
        font-weight: bold;
        margin: 5px 0;
        
      }
      .item-body {
          background-color: #ddd;
        p {
          padding: 6px;
          margin: 0;
        }
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
        .sell {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
