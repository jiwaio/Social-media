<template>
<div class="comment-list">
  <van-cell-group>
    <van-cell v-for="(item,index) in ass" :key="index">
      <div slot="title" class="user-title"><img :src="userList.photo" alt="" class="user-photo"> <span>{{ userList.name }}</span></div>
      <div slot="label" v-html="item" ref="showA"></div>
      <div slot="default" style="margin-top: 20px; font-size: 10px">删除</div>
    </van-cell>
  </van-cell-group>
</div>
</template>

<script>
import {getMyMessage} from '@/api/user'
export default {
name: "comment-list",
  data() {
    return {
      userList: '',
      users:''
    }
  },
  props:{
  ass:{
    type:[String,Array],
    required:true
  }
  },
  created() {
    this.getUser()
  },
  //获取当前用户信息
  methods:{
    async getUser(){
      try{
        const {data} = await getMyMessage()
        this.userList = data.data;
      }catch (err){
      }
    }
  }
}
</script>

<style scoped lang="less">
.user-title{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  .user-photo{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
  }
}

</style>
