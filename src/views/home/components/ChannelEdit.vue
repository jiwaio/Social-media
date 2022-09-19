<template>
  <div class="Channel-edit">
    <!-- 我的频道 -->
    <div class="my-channel">
    <van-cell :border="false">
      <span slot="title">我的频道</span>
      <van-button round plain slot="default" type="danger" size="mini" style="width: 50px;" @click="ifShowClose">{{ closeExplain }}</van-button>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(value,index) in channel" :key="value.id" @click="touchMyChannel(value,index)">
      <div slot="text" :class="active === index ? 'activeColor' :''">{{ value.name }}</div>
      <van-icon slot="icon" :name="value.id === 0 ? '' : 'close'" v-if="showClose" class="detail-close"></van-icon>
      </van-grid-item>
    </van-grid>
    </div>
    <!-- 我的推荐 -->

    <!-- 频道推荐 -->
    <div class="recommend-channel">
    <van-cell :border="false">
      <span slot="title">频道推荐</span>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item v-for="(value,index) in reChannels" :key="index" :text="value.name" icon="plus" @click="AddChannel(value)"/>
    </van-grid>
    </div>
    <!-- 频道推荐 -->

  </div>
</template>

<script>
import {getAllChannels} from '@/api/user'
import { delMyChannel , addMyChannel} from '@/api/channel'
import { mapState } from 'vuex'
import {getItem, setItem} from "@/utils/storage";
export default {
  name: "ChannelEdit",
  data(){
    return{
      //所有频道
      allChannels:[],
      //我的频道显示close图标
      showClose:false,
      closeExplain:"编辑"
    }
  },
  props:{
    //我的频道
    channel:{
      type:Array,
      required:true
    },
    active:{
      type:Number,
      required: true
    }
  },
  computed:{
    ...mapState(['user']),
    reChannels(){
      //将所有频道 - 我的频道 = 推荐频道
      //filter 会自创建空数组
      return this.allChannels.filter(channel => {
        //find 返回相同项
        return !this.channel.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  created() {
    this.AllChannels();
  },
  methods:{
    //获取所有频道列表
    async AllChannels(){
      try{
        let { data } = await getAllChannels();
        this.allChannels = data.data.channels
      }catch (err){
        console.log(err);
      }
    },
    //编辑按钮
    ifShowClose(){
      this.showClose = !this.showClose;
      this.showClose === true ? this.closeExplain = '完成' : this.closeExplain = '编辑'
    },
    //点击我的频道宫格
    async touchMyChannel(value,index){
      //编辑删除我的频道
      if(this.showClose && value.id !== 0){
        try{
          const i = this.channel.indexOf(value)
          this.channel.splice(i,1)
          if(this.user){
            await delMyChannel(value.id)
          }else {
            //未登录，判断是否有本地列表数据
            setItem('TOUTIAO_CHANNELS',this.channel)
            const a = getItem('TOUTIAO_CHANNELS')
            a.splice(i,1);
            setItem('TOUTIAO_CHANNELS',a)
          }
        }catch (err){
          console.log(err);
          this.$toast.fail('删除失败，稍后重试')
        }
      }else {
        //将当前频道高亮并在首页显示
        this.$emit('update:active',index)  //将active向上传给父组件
      }
    },
    //点击频道推荐宫格
    async AddChannel(value){
      this.channel.push(value)
      //已登录，将数据请求接口放到线上
      if(this.user){
        await addMyChannel({id:value.id,seq:this.channel.length})   //seq为序号
      }else {
        //未登录，将数据存到本地
        setItem('TOUTIAO_CHANNELS',this.channel)
      }
    }
  }
}
</script>

<style lang="less">
.Channel-edit {
  padding-top: 85px;
.my-channel{
  .van-grid-item__content {
    white-space: nowrap;
    width: 160px;
    height: 86px;
    background-color: #f4f5f6;
    position: relative;
    .activeColor{
      color: #eb5253;
    }
    .van-grid-item__icon-wrapper{
     position: unset;
      .detail-close{
        position: absolute;
        top:-7px;
        right: -7px;
        font-size: 30px;
        //color: red;
      }
    }
    div {
      margin-top: 0;
      font-size: 28px;
      color: #222;
    }
  }
}
  .recommend-channel{
    .van-grid-item__content {
      white-space: nowrap;
      width: 160px;
      height: 86px;
      background-color: #f4f5f6;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      i{
        font-size: 30px;
      }
      span {
        margin-top: 0;
        font-size: 28px;
        color: #222;
      }
    }
  }

}
</style>
