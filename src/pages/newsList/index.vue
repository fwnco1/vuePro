<template>
    <div>
        <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1>{{item.title}}</h1>
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.add_time | dateFormat}}</span>
                                <span>点击:{{item.click}}</span>
                            </p>
						</div>
					</router-link>
				</li>				
			</ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newsList:[]
        }
    },
    methods: {
        getNewsList(){
            this.$http.get('api/getnewslist').then(result=>{
                // console.log(result.body);
                if (result.body.status==0) {
                  this.newsList=this.newsList.concat(result.body.message)
                }
                
                
            })
        }
    },
    created() {
        this.getNewsList()
    },
}
</script>

<style lang="less" scoped>
    .mui-media-body{
       h1{
           font-size: 13px;
        }
        p{
            display: flex;
            font-size: 12px;
            color: deeppink;
            justify-content: space-between
        } 
    }
</style>
