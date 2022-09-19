<template>
  <div class="my-container">
    <!-- 头部导航 -->
    <div class="nav-header">
      <van-nav-bar class="page-nav-bar" fixed>
        <template #title>
          <van-button size="small" icon="search" round type="info" class="search-button" to="/search">搜索</van-button>
        </template>
      </van-nav-bar>
    <!-- 头部导航 -->

    <!--  文章标题  -->
    <van-tabs v-model="active" swipeable animated class="channel-tabs">
      <van-tab v-for="item in channel" :key="item.id" :title="item.name">
<!--    响应式显示，有多少个就显示多少个频道   -->
        <!--  文章列表  -->
        <article-list :channel="item"></article-list>
        <!--  文章列表  -->
      </van-tab>
      <!-- 汉堡按钮 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-button" @click="ifShowPopup = true">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
    </div>
    <!--  文章标题  -->

<!--  频道弹出层  -->
    <van-popup
      v-model="ifShowPopup"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
<!--   频道编辑组件   -->
<!--  channel传我的频道 当前高亮频道   -->
      <ChannelEdit :channel="channel" :active.sync="active"></ChannelEdit>
    </van-popup>
<!--  频道弹出层  -->


  </div>
</template>

<script>
import {getUserChannels} from "@/api/user"
import articleList from './components/ArticleList'
import ChannelEdit from "@/views/home/components/ChannelEdit";
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: "index",
  data(){
    return {
      active:'',
      //文章频道
      channel:[],
      ifShowPopup:false, //频道弹出层
    }
  },
  computed:{
    ...mapState(['user'])
  },
  components:{
    articleList,
    ChannelEdit
  },
  created() {
    this.loadChannels()
  },
  methods:{
    //获取我的频道列表
    async loadChannels(){
      try {
        if(this.user){
          const {data} = await getUserChannels();
          this.channel = data.data.channels;
        }else if(getItem('TOUTIAO_CHANNELS')){
          this.channel = getItem('TOUTIAO_CHANNELS')
        }else {
          const {data} = await getUserChannels();
          this.channel = data.data.channels;
        }
      }catch (err){
        this.$toast('获取频道数据失败')
      }
    }
  }
}
</script>

<style lang="less">
.my-container{
  //padding-top: 180px;
  padding-bottom: 100px;
  .nav-header{
    width: 100%;
    padding-top: 180px;
  }
  .page-nav-bar{
  background-color: #3296fa;
  .van-nav-bar__title{
    max-width: 100% ;
  }
  .van-icon{
    color: white;
    font-size: 32px;
  }
  .search-button{
    width: 550px;
    height: 64px;
    border: none;
    font-size: 28px;
  }
}
  //文章标题
  .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tabs__wrap{
      position: fixed;
      top:90px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    //当前选中底部样式
    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }

    .placeholder {
      //因为父节点是flex布局，不参与剩余空间的占位
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-button {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      background-color: rgba(255, 255, 255, 0.902);
      i{
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 58px;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}

</style>
