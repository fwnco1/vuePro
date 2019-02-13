<template>
    <div class="newsInfo-container">
        <h1 class="title">{{newsInfo.title}}</h1>
        <p class="subtitle">
            <span>发表时间:{{newsInfo.add_time | dateFormat}}</span>
            <span>点击:{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content"></div>

        <comment></comment>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    methods: {
        getnews(){
            this.$http.get('api/getnew/'+this.id).then(result=>{
                this.newsInfo = result.body.message[0]
                // console.log(this.newsInfo);
                
            })
        }
    },
    created() {
        this.getnews()
    },
}
</script>


<style lang="less" >
    .newsInfo-container{
        padding: 0 5px;
        .title{
            font-size: 16px;
            color: red;
            margin: 14px 0 ;
            text-align: center;
        }
        .subtitle {
            display: flex;
            justify-content: space-between;
            color: blue;
            font-size: 13px;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }
</style>
