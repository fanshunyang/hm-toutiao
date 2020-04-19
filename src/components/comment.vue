<template>
<div class="hm-comment">
    <div class="title">
      <img :src="axios.defaults.baseURL + comment.user.head_img" alt="">
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date|item('YYYY-MM-DD HH:mm:ss')}}</div>
      </div>
      <div class="reply" @click="write(comment.id)">回复</div>
    </div>
    <fllor :index="index" v-if="comment.parent" :father="comment.parent" @bridge="write"></fllor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import fllor from './fllor'
export default {
  components: {
    fllor
  },
  data () {
    return {
      index: this.numlength(0, this.comment)
    }
  },
  props: {
    comment: Object
  },
  methods: {
    numlength (num, comment) {
      if (comment.parent) {
        return this.numlength(num + 1, comment.parent)
      } else {
        return num
      }
    },
    write (id) {
      this.$emit('back', id)
    //   console.log('惠惠')
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
    .info {
      flex: 1;
      padding-left: 10px;
      .name {
        font-size: 14px;
      }
      .time {
        color: #888;
      }
    }
  }
  .content {
    font-size: 14px;
    padding: 10px 0;
  }
}
</style>
