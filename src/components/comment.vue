<template>
    <div class="comment-container">
        <h1 class="title">发表评论</h1>
        <hr>
        <textarea placeholder="此处最多输入180个字" maxlength="180" class="content" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">提交评论</mt-button>
        <ul class="commentList">
            <li class="commentItem" v-for="(item,index) in comments" :key="item.add_time">
                <div class="item-title">
                    第{{index+1}}楼&nbsp;&nbsp;用户:{{item.user_name}}&nbsp;&nbsp;发表时间:{{item.add_time | dateFormat}}
                </div>
                <p class="item-body">{{item.content}}</p>
            </li>
        </ul>
        <mt-button type="danger" size="large" plain class="btn-danger" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
    data() {
        return {
            pageindex:1,
            id:this.$route.params.id,
            comments:[],
            msg:''
        }
    },
    methods: {
        getComments(){
            this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(result=>{
                // console.log(result.body);
                if (result.body.status==0) {
                    this.comments = this.comments.concat(result.body.message)
                } 
            })
        },
        getMore(){
            this.pageindex++
            this.getComments()
        },
        postComment(){
            if (this.msg.trim().length==0) {
                return Toast('评论不能为空')
            }
            this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()}).then(result=>{
                if (result.body.status==0) {
                    Toast(result.body.message)
                    //方案1,数据拼接
                    // let cmt = {
                    //     user_name:'23期匿名用户',
                    //     add_time:Date.now(),
                    //     content:this.msg.trim()
                    // }
                    // this.comments.unshift(cmt)
                    //方案2.重新获取数据,但是要清除之前的数据(推荐)
                    this.comments=[]
                    this.pageindex=1
                    this.getComments()
                    this.msg=''
                }
                
            })
        }
    },
    created() {
        this.getComments()
    },
}
</script>

<style lang="less" scoped>
    .comment-container{
        background-color: #fff;
        .title{
            font-size: 18px;
            color: #000
        }
        .content{
            font-size: 14px;
            height: 85px;
            margin: 0;
        }
        .commentList{
            padding: 0;
            margin: 5px 0;
            .commentItem{
                list-style: none;
                font-size: 12px;
                color: #000;
                
                .item-title{
                    background-color: #ccc;
                    line-height: 30px;
                }
                .item-body{
                    text-indent: 2em;
                    line-height: 35px;
                    color: #000
                }
            }
        }
        .btn-danger{
            margin: 5px 0;
        }
    }
</style>
