<template>
  <div class="follow-user">
<!--  关注或取消关注按钮  -->
    <van-button plain
                round
                size="small"
                loading-size="14px"
                v-if="is_followed"
                class="follow_btn"
                :loading="loading"
                @click="followCli" ref="follow">已关注</van-button>

    <van-button round icon="plus"
                v-else
                size="small"
                type="info"
                loading-size="14px"
                :loading="loading"
                class="not_btn" @click="followCli">关注</van-button>
  </div>
</template>

<script>
import { FollowUser , notFollowUSer } from '@/api/user'
export default {
name: "follow-user",
  data(){
    return {
      showFollow:true,   //是否显示关注按钮
      loading: false
    }
  },
  props:{
    articleUserId:{   //文章用户id
      type:[String, Number, Object],
      required: true
    },
    is_followed:{    //是否关注
      type: Boolean,
      required: true
    }
  },
  created() {
  },
  methods:{
  //点击关注按钮
    async followCli(){
      this.loading = true // 关闭关注按钮的 loading 状态
        try{
          if(this.is_followed){
            //已关注，取消关注
            await notFollowUSer(this.articleUserId)
            this.loading = false
          }else {
            //未关注，点击关注
            await FollowUser({target:this.articleUserId})
            this.loading = false
          }
          this.$emit('update:is_followed',!this.is_followed)
        }catch (err){
          if(err.response && err.response.status === 400){
            this.$toast.fail('不能关注自己')
          }
          this.$toast('关注失败，请重试')
        }
      }
  }
}
</script>

<style scoped lang="less">
.not_btn{
  width: 140px;
}
.follow_btn{
  width: 120px;
  //&:hover{
  //  background-color: #eb5253;
  //}
}

</style>
