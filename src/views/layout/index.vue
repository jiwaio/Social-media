<template>
<div class="layout-container">
  <router-view></router-view>
  <van-tabbar  route>
    <van-tabbar-item to="/home" :replace="true"><i slot="icon" class="iconfont icon-shouye"></i>首页</van-tabbar-item>
    <van-tabbar-item to="/qa" :replace="true"><i slot="icon" class="iconfont icon-wenda"></i>问答</van-tabbar-item>
    <van-tabbar-item to="/video" :replace="true"><i slot="icon" class="iconfont icon-shipin"></i>视频</van-tabbar-item>
    <van-tabbar-item to="/my" :replace="true"><i slot="icon" class="iconfont icon-wode"></i>{{ my }}</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
import { getItem } from '@/utils/storage'
export default {
name: "index",
  data(){
  return {
    my:''
  }
  },
  computed:{
  },
  created() {
    getItem('TOUTIAO_USER') === null ? this.my = '未登录' :this.my = '我的'
  }
}
</script>

<style scoped lang="less">
.van-tabbar-item{
  .van-tabbar-item__icon{
    i{
      font-size: 40px;
    }
  }
}
</style>
