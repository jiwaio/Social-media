<template>
  <div class="SearchIndex">
    <!-- 加上form 标签后 手机键盘右下角会出现搜索按钮 否则没有 -->
    <!-- show-action 显示右边 取消 当cancel取消则回到首页-->
    <form action="/" class="header_form">
      <van-search
        v-model="searchValue"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="showResult = false"
      >
        <div slot="right-icon"></div>
      </van-search>
    </form>

    <!-- 搜索结果 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" v-if="showResult">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error="error"
        error-text="加载失败，请点击重试"
      >
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title"/>
      </van-list>
    </van-pull-refresh>
    <!-- 搜索结果 -->

    <!-- 联想建议 -->
    <div v-else-if="searchValue">
      <van-cell icon="search" v-for="(value,index) in recommendList" :key="index">
        <div slot="title" v-html="highlight(value)"></div>
      </van-cell>
    </div>
    <!-- 联想建议 -->

    <!-- 搜索历史 -->
    <div v-else>
    <van-cell title="搜索历史">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <div slot="right-icon" @click="delHistory">
        <van-icon name="delete-o"/>
      </div>
    </van-cell>
    <van-cell v-for="(history, index) in searchHistory" :key="index">
      <div slot="title">{{ history }}</div>
      <div slot="right-icon">
        <van-icon name="close" @click="delSeaHistory(history)"></van-icon>
      </div>
    </van-cell>
    </div>
    <!-- 搜索历史 -->

  </div>
</template>

<script>
import { debounce } from 'loadsh'
import {getRecommends , getSearchResults} from '@/api/search'
import { setItem , getItem , removeItem} from '@/utils/storage'
export default {
  name: "SearchIndex",
  data() {
    return {
      searchValue: '',
      showResult:false,  //是否显示搜索结果
      list: [],    //搜索结果列表
      loading: false,   //是否加载数据
      finished: false,
      refreshing: false,
      recommendList:[],   //联想建议列表
      page:1,
      error:false,
      searchHi:1,
      searchHistory:[]
    };
  },
  created() {
    const history = getItem('SEARCH_HISTORY')
    if(history){
      this.searchHistory = history
    }else {
      return []
    }
  },
  //实时监听searchValue
  watch:{
    searchValue:{
      //使用防抖 debounce 函数，参数一：函数，参数二：延迟时间，返回值防抖后函数
      handler : debounce(function (){
        this.getRecommend();
      },500),
      immediate:true  //watch是数据发生变化时触发，immediate是一开始就触发
    }
  },
  methods: {
    //搜索（搜索在手机上显示，电脑按回车）
    onSearch(val) {
      if(val){
        this.onLoad()
      }
      //存储搜索记录
      if(!this.searchHistory.includes(val)){
        this.searchHistory.unshift(val)
      }
      //历史记录持久化 存本地
      setItem('SEARCH_HISTORY',this.searchHistory)
      this.showResult = true
    },
    //点击右边取消
    onCancel() {
      this.$router.back()
    },
    //下拉刷新触发
    async onLoad() {
      try{
        const {data} = await getSearchResults({
          page:this.page,  //页码
          per_page:10,   //每页大小
          q:this.searchValue
        })
        const {results} = data.data
        this.list.push(...results)
        this.loading = false
        if(results.length){
          this.page++
        }else {
          this.finished = false
        }
      }catch (err){
        this.error = true   //展示加载失败
        this.loading = false
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    //滚动到底部刷新触发
    onRefresh() {
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    //获取联想建议
    async getRecommend(){
      try{
        if( this.searchValue ){
          const {data} = await getRecommends(this.searchValue);
          this.recommendList = data.data.options
        }
      }catch (err){
        this.$toast('数据获取失败，稍后重试')
      }
    },
    //处理高亮函数
    highlight(value){
      //正则表达式 中间的内容都会当作匹配字符使用，而不是数据变量
      //若需要数据变量动态创建正则表达式，则手动 new RegExp (正则表达式构造函数)
      //参数一：配置字符串，参数二：配置模式，g全局，i 无视大小写
      if(value){
        const reg = new RegExp(this.searchValue, 'gi')
        return value.replace(reg, `<span style="color:#3296fa">${this.searchValue}</span>`)
      }
    },
    //点击删除历史记录
    delSeaHistory(history){
      const index = this.searchHistory.indexOf(history)
      this.searchHistory.splice(index,1)
      // this.$forceUpdate()
      setItem('SEARCH_HISTORY',this.searchHistory)
    },
    //删除所有历史记录
    delHistory(){
      removeItem('SEARCH_HISTORY');
      this.searchHistory = []
    }
  },
}
</script>

<style lang="less">
.SearchIndex {
  padding-top: 100px;
  .header_form{
    position: fixed;
    top:0;
    left: 0;
    z-index: 100;
    width: 100%;
  }
  .van-search__action {
    color: white;
  }
}

</style>
