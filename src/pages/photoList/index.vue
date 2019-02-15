<template>
  <div class="photoList-container">
    <!-- 顶部分类菜单 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
            v-for="item in cates"
            :key="item.id"
            @tap="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link
        v-for="item in photoList"
        :key="item.src"
        class="photo-item"
        tag="li"
        :to="'/home/photoinfo/'+item.id"
      >
        <img v-lazy="item.img_url">
        <div class="photo-body">
        <h3>{{item.title}}</h3>
        <p>{{item.zhaiyao}}</p>
      </div>
      </router-link>
      
    </ul>
  </div>
</template>

<script>
//引入mui.js文件
import mui from "../../libs/mui/js/mui.js";
export default {
  data() {
    return {
      cates: [],
      photoList: []
    };
  },
  mounted() {
    //初始化mui
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCates() {
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          this.cates = result.body.message;
          this.cates.unshift({ id: 0, title: "全部" });
        }
      });
    },
    getPhotoList(id) {
      this.$http.get("api/getimages/" + id).then(result => {
        if (result.body.status === 0) {
          this.photoList = result.body.message;
         
        }
      });
    }
  },
  created() {
    this.getCates();
    this.getPhotoList(0);
  }
};
</script>

<style lang="less" scoped>
.photoList-container {
  touch-action: none;
  .photo-list {
    padding: 10px;
    .photo-item {
      list-style: none;
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;
      img {
        width: 100%;
        vertical-align: middle;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .photo-body {
        position: absolute;
        bottom: 0;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.3);
        h3 {
          font-size: 14px;
          text-align: left;
        }
        p {
          font-size: 13px;
          color: #fff;
          text-align: left;
        }
      }
    }
  }
}
</style>
