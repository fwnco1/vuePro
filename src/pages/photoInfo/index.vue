<template>
  <div class="photoInfo-container">
    <h1 class="title">{{photoInfo.title}}</h1>
    <p class="subtitle">
      <span>发表时间:{{photoInfo.add_time | dateFormat}}</span>
      <span>点击:{{photoInfo.click}}次</span>
    </p>
    <hr>
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
        :key="index"
      >
    </div>

    <div class="content" v-html="photoInfo.content"></div>
    <comment></comment>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {},
      list: []
    };
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          this.photoInfo = result.body.message[0];
        }
      });
    },
    getList() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        console.log(result.body);
        if (result.body.status === 0) {
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.list = result.body.message;
        }
      });
    }
  },
  created() {
    this.getPhotoInfo();
    this.getList();
  }
};
</script>


<style lang="less" scoped>
.photoInfo-container {
  padding: 0 5px;
  .title {
    font-size: 16px;
    color: rgb(66, 137, 218);
    margin: 14px 0;
    text-align: center;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
  }
  .thumbs {
    img{
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
