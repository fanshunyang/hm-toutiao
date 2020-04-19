<template>
 <div class="interest">
 <hmheader>我的关注</hmheader>
 <div class="item" v-for="item in list" :key="item.id">
      <div class="left">
          <img :src="axios.defaults.baseURL + item.head_img" alt="">
      </div>
      <div class="center">
        <p class="name">{{item.nickname}}</p>
        <p class="time">{{item.create_date|item}}</p>
      </div>
      <div class="right" @click="cancel(item.id)">取消关注</div>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.six()
    this.tend(1)
    this.tend(2)
    this.tend(3)
    this.tend(4)
    this.tend(5)
    this.tend(6)
    this.tend(7)
    this.tend(8)
  },
  methods: {
    async six () {
      const token = localStorage.getItem('token')
      const res = await this.axios.get(`/user_follows`, {
        headers: {
          Authorization: token
        }
      })
      // console.log(res)
      if (res.data.statusCode === 200) {
        this.list = res.data.data
      }
    },
    async cancel (id) {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确定要取消用户吗'
        })
        const token = localStorage.getItem('token')
        const res = await this.axios.get(`/user_unfollow/${id}`, {
          headers: {
            Authorization: token
          }
        })
        if (res.data.statusCode === 200) {
          this.six()
          this.$toast.success('取消关注成功')
        }
        // console.log(res)
      } catch {
        this.$toast.success('取消成功')
      }
    },
    async tend (id) {
      const token = localStorage.getItem('token')
      const res = await this.axios.get(`/user_follows/${id}`, {
        headers: {
          Authorization: token
        }
      })
      if (res.data.statusCode === 200) {
        this.six()
      }
      // console.log(res)
    }
  }

}
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    padding: 20px;
    border-bottom: 1px solid #cccccc;
    .left {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%
        }
    }
    .center {
        flex: 1;
        padding-left: 10px;
        .name {
            font-size: 16px;
            color: #999;
        }
        .time {
            color: #999;
            font-size: 14px;
        }
    }
    .right {
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    background-color: #ccc;
    border-radius: 15px;
    color: #333;
    font-size: 14px;
    }
}
</style>
