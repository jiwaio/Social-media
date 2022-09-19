<template>
<div class="xss">
  <label>
<!--    <%= escapeHTML(getParameter("keyword")) %>-->
    <input type="text" v-model="text">
  </label>
  <van-button type="info" size="small" @click="addSubmit">评论</van-button>
  <ul>
    <li v-for="(item,index) in msgList" :key="index">
      <span v-html="item"></span>
    </li>
  </ul>
<!--  <img src="11" onerror='location.href="https://baidu.com"'>-->
<!--  <img src="11" onerror="alert('哈哈，被攻击啦')" alt="">-->
</div>
</template>

<script>
import {setItem , getItem} from '@/utils/storage'
export default {
name: "index",
  data(){
  return{
    text:"",
    msgList:[]
  }
  },
  created() {
    this.msgList = getItem('item')
  },
  methods:{
    addSubmit(){
      if(typeof this.text == "undefined" || this.text == null || this.text === "") {
        return false
      }else {
        if(!getItem('item')){
          setItem('item',[])
        }
        this.msgList.push(this.text)
        setItem('item',this.msgList)
      }
    },
  }
}
</script>

<style scoped>

</style>
