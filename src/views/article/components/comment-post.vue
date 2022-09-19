<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="200"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onPost"
      :disabled="!message.length"
    >发布
    </van-button>
  </div>
</template>

<script>
import {setItem, getItem} from '@/utils/storage'
export default {
  name: 'CommentPost',
  components: {},
  data() {
    return {
      message: '',
      msgList: []
    }
  },
  props: {
    isPostShow: {
      type: Boolean,
      required: true
    },
    ass:{
      type:[String,Array],
      required: true
    }
  },
  methods: {
    //点击发布评论
    onPost() {
      if (typeof this.message == "undefined" || this.message == null || this.message === "") {
        return false
      } else {
        if (!getItem('item')) {
          setItem('item', [])
        }
        //引入xss包
        // const xss = require("xss")
        //自定义设置
        // const option = {
        //   stripIgnoreTagBody: false, // 不在白名单中的标签以及标签里面的内容直接删除
        //   whiteList: {
        //     img: ['src'] //img标签保留src,onerror属性
        //   }
        // }
        // const myxss = new xss.FilterXSS(option);
        // const html = myxss.process(this.message);
        //
        // const newList = []
        // this.message.split('').forEach(item =>{
        //   if(item === '<') {
        //     item = '&lt'
        //   }
        //   newList.push(item)
        // })
        this.ass.push(this.message)
        setItem('item', this.ass)
        this.message = ''
        //让底部发布评论取消
        this.$emit('update:ass',this.ass)
        this.$emit('update:isPostShow',false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;

    &::before {
      display: none;
    }
  }
}
</style>
