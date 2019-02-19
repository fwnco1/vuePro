<template>
    <div class="goodsdesc-container">
        <h1>{{goodsdesc.title}}</h1>
        <hr>
        <div class="content" v-html="goodsdesc.content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
           id:this.$route.params.id ,
           goodsdesc:{}
        }
    },
    methods: {
        getDesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(res=>{
                if (res.body.status===0) {
                    this.goodsdesc=res.body.message[0]
                }
            })
        }
    },
    created(){
       this.getDesc()
    }
}
</script>

<style lang="less" >
     .goodsdesc-container{
        h1{
            text-align: center;
            font-size: 18px;
            color: deeppink
        }
        .content {
            p {
                margin-bottom: 0;
            }
            img{
                width: 100%;
                display: block

            }
        }
    }
</style>
