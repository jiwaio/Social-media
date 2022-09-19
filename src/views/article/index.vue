<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中
        </van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
          <!--   关注按钮组件   -->
          <follow-user
            :article-user-id="article.art_id"
            class="follow-btn"
            :is_followed.sync="article.is_followed"
          />
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
<!--        <div-->
<!--          class="article-content markdown-body"-->
<!--          v-html="article.content"-->
<!--          ref="articles"-->
<!--        ></div>-->
        <van-divider>正文结束</van-divider>

        <!--   文章评论列表   -->
<!--        <van-cell-group>-->
<!--          <van-cell value="内容" v-for="(item,index) in ass" :key="index">-->
<!--            <div slot="title" v-html="item"></div>-->
<!--          </van-cell>-->
<!--        </van-cell-group>-->
        <CommentList :ass="ass"></CommentList>
        <!--   文章评论列表   -->

      </div>
      <!-- 加载完成-文章详情 -->

      <!--  加载失败：404  -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure"></van-icon>
        <p>该资源不存在或已删除</p>
      </div>
      <!--  加载失败：404  -->

      <!--  加载失败：其他错误原因  -->
      <div v-else class="error-wrap">
        <van-icon name="failure"></van-icon>
        <p> &nbsp; 内容加载失败！</p>
        <van-button plain type="info" @click="getArticle" size="small">重新加载</van-button>
      </div>
      <!--  加载失败：其他错误原因  -->

      </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
      >写评论
      </van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :badge="totalCommentCount"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论底部弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost :isPostShow.sync="isPostShow" :ass.sync="ass"></CommentPost>
    </van-popup>
    <!-- 发布评论底部弹出层 -->

    <!-- /加载完成-文章详情 -->


  </div>
  <!--  </div>-->
</template>

<script>
import {getItem} from '@/utils/storage'
import {getArticleById} from '@/api/article'
import FollowUser from '@/components/follow-user'
import CommentList from './components/comment-list'
import CommentPost from './components/comment-post'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    // CollectArticle,
    CommentList,
    CommentPost
  },
  // 给所有的后代组件提供数据
  // 注意：不要滥用
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态
      errStatus: 0, // 失败的状态码
      followLoading: false,
      totalCommentCount: 0,
      isPostShow: false, // 控制发布评论的显示状态
      commentList: [], // 评论列表
      isReplyShow: false,
      currentComment: {}, // 当前点击回复的评论项
      ass:[],   //当前评论内容
    }
  },
  computed: {},
  watch: {
    ass:{
      handler(){
        this.totalCommentCount = this.ass.length
      },
      deep:true
    }
  },
  created() {
    this.getArticle();
    this.showComment();
  },
  mounted() {
  },
  methods: {
    //获取文章详情
    async getArticle() {
      try {
        const {data} = await getArticleById(this.articleId)
        //数据驱动视图不是立即的，所以是undefined  console.log(this.$refs['article-content']);
        this.article = data.data
        // setTimeout(() => {
        //   this.previewImage();
        // },0)
      } catch (err) {
        if(err.response && err.response.status === 404){
          this.errStatus = 320
        }
        this.$toast.fail('数据获取失败')
      }
      this.loading = false
    },
    //当前评论内容展示
    showComment(){
      const item = getItem('item')
      if(item){
        this.ass = item;
      }
    }
    //文章正文处理图片，图片预览
    // previewImage () {
    //   const articleContent = this.$refs.articles
    //   console.log(articleContent);
    //   const imgs = articleContent.querySelectorAll('p')
    //     const images = []
    //     imgs.forEach((img, index) => {
    //       images.push(img.src)
    //       // 给每个 img 注册点击事件，在处理函数中调用预览
    //       img.onclick = () => {
    //         ImagePreview({
    //           // 预览的图片地址数组
    //           images,
    //           // 起始位置，从 0 开始
    //           startPosition: index
    //         })
    //       }
    //     })
    //
    // }

    //   // 获取所有 img 地址
    //   const images = []
    //   imgs.forEach((img, index) => {
    //     images.push(img.src)
    //
    //     // 给每个 img 注册点击事件，在处理函数中调用预览
    //     img.onclick = () => {
    //       ImagePreview({
    //         // 预览的图片地址数组
    //         images,
    //         // 起始位置，从 0 开始
    //         startPosition: index
    //       })
    //     }
    //   })
    // },
    //
    // onPostSuccess (data) {
    //   // 关闭弹出层
    //   this.isPostShow = false
    //   // 将发布内容显示到列表顶部
    //   this.commentList.unshift(data.new_obj)
    // },
    //
    // onReplyClick (comment) {
    //   this.currentComment = comment
    //
    //   // 显示评论回复弹出层
    //   this.isReplyShow = true
    // }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }

  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;

    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;

      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }

      .van-cell__label {
        margin-top: 0;
      }

      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }

      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }

      .follow-btn {
        width: 170px;
      }
    }

    .article-content {

      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;

    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }

    p {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }

    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }

    /deep/ .van-icon {
      font-size: 40px;
    }

    .comment-icon {
      top: 2px;
      color: #777;

      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }

    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777
    }

    .collect-btn--collected {
      color: #ffa500;
    }

    .like-btn--liked {
      color: #e5645f;
    }
  }
}
</style>
