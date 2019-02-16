<template>
  <div>
    <mt-swipe :auto="3000" class="mt-swipe">
      <mt-swipe-item v-for="(item,index) in banners" :key="index">
        <a :href="item.url">
          <img :src="item.img || item.src" :class="{full:'isfull'}">
        </a>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props:['banners','isfull']
};
</script>

<style lang="less" scoped>
    .mt-swipe {
        height: 200px;
        text-align: center;
        img{
            
            height: 100%;
        }
        img.full{
            width: 100%;
           
        }
    }
</style>
