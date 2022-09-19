import axios from "axios";
import store from '../store'
import {Toast} from "vant";

const request = axios.create({
  baseURL:'http://toutiao.itheima.net'
})

//请求拦截器
request.interceptors.request.use((config)=>{
  // config 本次请求的请求配置对象，
  // 每次请求配置token
  const { user } = store.state
  if( user && user.token ){
    config.headers.Authorization = `Bearer ${user.token}`
  }
  if(config.headers.Authorization === ''){
    this.$toast.fail('登陆已过期');
    console.log(config);
    return false;
  }
  return config
})

//响应拦截器
// request.interceptors.response.use(function (response){
//   let res = response.data
//   if(res.status === 401){
//     console.log(1);
//     Toast.fail('用户未登录')
//     return response
//   }else if(res.status <= 300 && res.status>=200){
//     return response
//   }else {
//     return false
//   }
// })
// axios.interceptors.response.use(function (response){
//   let res = response.data;
//   if(res.status === 0){
//     return res.data;
//   }else if(res.status === 10){
//     //  登陆拦截，未登陆的错误码问后端
//     //跳转到登录页面
//     window.location.href = "/login";
//   }else{
//     alert(res.msg)
//   }
// })


export default request

