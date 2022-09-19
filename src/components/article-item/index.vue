<template>
<!-- 文章列表项 -->
<div class="article-item">
  <van-cell :to="'/article/' + article.art_id">
    <div slot="title">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="cover-item-img"
            fit="cover"
            :src="img"
          />
        </div>
      </div>
      <div class="detail-label">
      <span>{{ article.aut_name}}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | relativeTime}} </span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</div>
</template>

<script>
export default {
name: "ArticleItem",
  data(){
  return{

  }
  },
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  created() {
  },
  methods:{

  }
}
</script>

<style scoped lang="less">
.van-cell{
  .van-cell__value{
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 20px;
  }
  .van-image{
    width: 232px;
    height: 146px;
  }
  .cover-wrap{
    display: flex;
    justify-content: space-between;
    .cover-item{
      flex:1 ;
      height: 146px;
      &:not(:last-child){
        padding-right: 4px;
      }
    }
  }
  .detail-label{
    span {
      margin-right: 20px;
    }
  }
}

</style>
