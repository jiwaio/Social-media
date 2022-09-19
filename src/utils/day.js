import Vue from 'vue'
import dayjs from 'dayjs'
//加载中文语言包 不加载默认英文 3 year ago
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

//配置使用相对时间插件
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')
//设置全局过滤器 参数1：过滤器名称，参数2：函数
//使用方法 {{ 表达式 | 过滤器名称 }}
Vue.filter('relativeTime',value =>{
  return dayjs().to(dayjs(value)); //to为多久以前
})
