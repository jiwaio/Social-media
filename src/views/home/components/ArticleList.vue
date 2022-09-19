<template>
  <div class="article-list">
    <!--  下拉刷新 下拉调用函数   -->
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-duration="1500">
      <!-- list列表 @load初始化或滚动到底部调用onload -->
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
        <article-item v-for="item in list" :key="item.id" :article="item"></article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: "ArticleList",
  data() {
    return {
      list: [],
      loading: false,  //控制加载中loading状态
      finished: false,  //加载结束状态 （显示没有更多了）
      timestamp: Date.now(),  //请求获取下一页数据的时间戳
      isLoading:false,  //下拉刷新
    }
  },
  components:{
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  created() {

  },
  methods: {
    //下拉刷新触发
    async onRefresh(){
      //1.请求获取数据
      //2.将数据追加到列表顶部
      //3.关闭下拉刷新状态
      //4.更新下拉成功提示文本
      try{
        const { data } = await getArticles({channel_id:this.channel.id,timestamp:this.timestamp})
        this.list.unshift(...data.data.results)
        this.isLoading = false
      }catch (err){
        console.log(err);
      }
    },
    //滚动到底部和初始化标签触发
   async onLoad() {
     // 1.请求获取数据
     //2.将数据放入list
     //3.本次数据加载结束之后设置 加载状态结束
     //4.判断数据是否全部加载完成
     try {
       //timestamp	时间戳，请求数据的页码，请求第一页数据:当前最新时间戳
       const {data} = await getArticles({channel_id:this.channel.id,timestamp:this.timestamp})
       const { results } = data.data;
       this.list.push(...results)
       this.loading = false;
       if(data.data.pre_timesta4rcxtloopmp){
         //更新获取下一页数据的时间戳
         this.timestamp = data.data.pre_timestamp
       }else {
         //没有数据了，将finished 设为true
         this.finished = true;
       }
     }catch (err){
       console.log(err);
     }
    },
    //点击进入文章详情
    showDetail(item){
    }
  }
}
</script>

<style scoped>
.article-list{
  height: 80vh;
  overflow-y: auto;
}
</style>
