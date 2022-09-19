<template>
<div class="login">
<!--  Navbar导航栏 -->
  <van-nav-bar title="登录" class="nav-header" @click-left="$router.back()" >
    <template #left>
      <van-icon name="arrow-left" size="18" />
    </template>
  </van-nav-bar>
<!-- 登录表单 -->
  <van-form @submit="onSubmit" ref="rulesFrom">
    <van-field
      v-model="user.mobile"
      placeholder="请输入手机号"
      :rules="userFormRules.mobile"
      name="mobile"
    >
      <i slot="left-icon" class="iconfont icon-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      type="password"
      placeholder="请输入验证码"
      :rules="userFormRules.code"
      :show-error=false
    >
      <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
      <van-count-down v-if="isCountShow" slot="right-icon" :time="3100 * 10" format="ss s" @finish="isCountShow = false" />
      <van-button v-if="!isCountShow" native-type="button" slot="right-icon" block type="info" size="mini" plain class="sendMess" @click="sendTesting">发送验证码</van-button>
    </van-field>
    <div style="margin: 16px;">
      <van-button block type="info" @click="onSubmit">提交</van-button>
    </div>
  </van-form>
<!--  <van-button type="info">登录</van-button>-->
</div>
</template>

<script>
import { login ,sendSms} from '@/api/user'
export default {
name: "login",
  data(){
  return {
    user:{
      mobile:"13911111111",
      code:"246810"
    },
    //表单验证
    userFormRules: {
      mobile: [
        {required: true, message:'手机号不能为空'},
        {pattern: /^1[3|5|7|8]\d{9}$/ ,message: "手机号格式不正确" }
      ],
      code:[
        // {required: true, message:'验证码不能为空'},
        { pattern: /^\d{6}$/ ,message: "验证码错误" }
      ]
    },
    isCountShow:false,
  }
  },
  created() {

  },
  methods:{
  //点击提交
    async onSubmit(){
      //加载提示
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,  //加载时背景不能点击
        duration:0 //持续时间默认200， 一直为0则持续
      });
      try{
        const {data}  = await login(this.user);
        //将data的token 存到vuex
        this.$store.commit('setUser',data.data)
        this.$toast.success('登录成功')
        await this.$router.push('/home').catch(err=>err);
      }catch (err) {
        if(err.response.status === 400){
          this.$toast.fail('手机号和验证码错误')
        }else {
          this.$toast.fail('登录失败，稍后重试')
        }
      }
    },
    //发送验证码
    async sendTesting() {
      // 1.校验手机号 2.通过验证，显示倒计时 3.请求发送验证码
      try {
       await this.$refs.rulesFrom.validate('mobile')
      }catch (err){
        return console.log('手机验证失败')
      }
      this.isCountShow = true
      try{
        await sendSms(this.user.mobile)
      }catch (err){
        if(err.response.status === 429){
          this.$toast('发送频繁，请稍后重试')
        }else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped >
.van-nav-bar__content{
  height: 50px;
  color: white;
  background-color: #3296fa;
}
.iconfont{
  font-size: 38px;
}
.sendMess{
  border-radius: 20px;
  font-size: 17px;
}
</style>
