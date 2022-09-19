<template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button
            size="mini"
            round
            to="/XSS"
          >编辑资料
          </van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="../../assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录头部 -->


    <!-- 宫格导航   -->
    <van-grid :column-num="2" clickable v-show="user">
      <van-grid-item text="收藏">
        <i slot="icon" class="iconfont icon-shoucang"></i>
      </van-grid-item>
      <van-grid-item text="历史">
        <i slot="icon" class=" iconfont icon-lishi"></i>
      </van-grid-item>
    </van-grid>

    <van-cell is-link title="消息通知" v-show="user"/>
    <van-cell is-link title="小智同学" v-show="user"/>
    <van-cell
      v-show="user"
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import {getMyMessage} from '@/api/user'
import {mapState} from 'vuex'

export default {
  name: "index",
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.getMessage();
  },
  methods: {
    //获取用户信息
    async getMessage() {
      try {
        let {data} = await getMyMessage();
        this.userInfo = data.data
      } catch (err) {
        //401为token过期了
        if(err.response.status === 401){
          this.$toast.fail('未登陆')
          this.$store.commit('setUser',null)
        }
      }
    },
    //退出登录
    onLogout() {
      //弹窗
      this.$dialog.confirm({
        message: '是否确认退出登录',
      }).then(() => {
        //将vuex的user和本地token删除
          this.$store.commit('setUser', null)
          this.$toast.success('退出成功')
        }).catch(() => {
          this.$toast.fail('已取消退出')
        });
    }
  }
}
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  //未登陆头部
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }

      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  //登陆头部
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        display: flex;
        align-items: center;

        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }

        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }

    .data-stats {
      display: flex;

      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;

        .count {
          font-size: 36px;
        }

        .text {
          font-size: 23px;
        }
      }
    }
  }

  //gird宫格
  .van-grid {
    .van-grid-item {
      height: 141px;

      i {
        font-size: 45px;
      }

      .icon-shoucang {
        color: #eb5253;
      }

      .icon-lishi {
        color: #ff9d1d;
      }

      span.text {
        font-size: 28px;
      }
    }
  }

  .logout-cell {
    text-align: center;
    color: #d86262;
    margin-top: 10px;
  }

}
</style>
