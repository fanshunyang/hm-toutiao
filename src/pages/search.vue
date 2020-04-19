<template>
<div class="search">
    <div class="header">
      <div class="left" @click="go ">
        <i class="iconfont iconjiantou"></i>
      </div>
      <div class="center">
        <i class="iconfont iconsearch"></i>
        <input type="text" placeholder="请输入搜索关键字" @keyup.enter="grabble" v-model="substance">
      </div>
      <div class="right" @click="grabble">搜索</div>
    </div>
    <div class="post" v-if="postlist.length>0">
        <hmpost v-for="data in postlist" :key="data.id" :data='data'></hmpost>
    </div>
    <div class="connent" v-else>
        <h3>历史记录</h3>
        <ul>
           <li  v-for="item in newlist" :key="item.id" @click="found(item)">{{item}}</li>
        </ul>
        <h3>热门搜索</h3>
         <ul>
            <li  v-for="item in establish" :key="item.id" @click="found(item)">{{item}}</li>
        </ul>
    </div>
  </div>
</template>

<script>
import hmpost from '../components/hmpost'
export default {
  components: {
    hmpost
  },
  data () {
    return {
      substance: '',
      postlist: [],
      establish: ['关晓彤', '说好不哭', '性感', '王祖贤'],
      newlist: JSON.parse(localStorage.getItem('newlist')) || []
    }
  },

  methods: {
    async  grabble () {
      const res = await this.axios.get(`/post_search`, {
        params: {
          keyword: this.substance
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postlist = data
        console.log(this.postlist)

        // 过滤重复的数据
        this.newlist = this.newlist.filter(item => item !== this.substance)
        // 在搜索成功后把关键字才能到newlist中
        this.newlist.unshift(this.substance)
        localStorage.setItem('newlist', JSON.stringify(this.newlist))
      }
    },
    found (item) {
      this.substance = item
      this.grabble()
    },
    go () {
      if (this.substance) {
        this.substance = ''
      } else {
        this.$router.go(-1)
      }
    }
  },
  watch: {
    substance (value) {
      if (value === '') {
        this.postlist = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  .header {
    display: flex;
    border-bottom: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    .left,
    .right {
      width: 50px;
      text-align: center;
    }
    .center {
      flex:1;
      height: 34px;
      margin-top: 7px;
      border: 1px solid #ccc;
      border-radius: 17px;
      display: flex;
      padding-right: 20px;
      .iconfont {
        width: 40px;
        line-height: 34px;
        text-align: center;
      }
      input {
        flex: 1;
        font-size: 12px;
        background-color: #f7f7f7;
      }
    }
  }
  .connent {
      padding: 20px;
    h3 {
    font-size: 12px;
      font-weight: 700;
    }
    li {
        height: 30px;
        line-height: 30px;
    }
  }
}
</style>
