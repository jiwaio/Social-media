import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入全局样式
import './styles/index.less'
import Vant from 'vant';
import 'vant/lib/index.css';
//动态更改rem基准值
import 'amfe-flexible'

import xss from "xss";
Vue.prototype.xss = xss;

//加载day.js初始化配置
import './utils/day'
//导入axios
import axios from "axios";
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
//请求拦截器

//响应拦截器

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
