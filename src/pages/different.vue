<template>
 <div class="home">
    <div class="header">
      <div class="left">
        <i class="iconfont iconnew"></i>
      </div>
      <div class="search" @click="$router.push('/search')">
        <i class="iconfont iconsearch"></i>
        <span>搜索新闻</span>
      </div>
      <div class="right" @click="$router.push('/profile')">
        <i class="iconfont iconwode"></i>
      </div>
    </div>
  <van-tabs v-model="active" sticky animated >
  <van-tab :title="item.name" v-for="item in difflist" :key="item.id">
<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
   <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :immediate-check = "false"
  :offset = '30'
  @load="onLoad">
                                                  <!-- //:data='data'就是把data数据给到hminput
                                                       :data='data'必须是动态的 -->
<hmpost v-for="data in postlist" :key="data.id" :data='data'></hmpost>
</van-list>
</van-pull-refresh>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import hmpost from '../components/hmpost'
export default {
  name: 'different',
  data () {
    return {
      // active 默认的下标
      active: localStorage.getItem('token') ? 1 : 0,
      difflist: [],
      pageIndex: 1,
      pageSiz: 5,
      loading: false,
      refreshing: false,
      finished: false,
      postlist: []
    }
  },
  components: {
    hmpost
  },
  async created () {
    await this.column()
    this.ideal()
  },
  methods: {
    async column () {
      const activeTabs = JSON.parse(localStorage.getItem('activeTabs'))
      if (activeTabs) {
        this.difflist = activeTabs
      } else {
        const res = await this.axios.get(`/category`)
        console.log(res)
        if (res.data.statusCode === 200) {
          this.difflist = res.data.data
        }
      }
    },
    async ideal () {
      const id = this.difflist[this.active].id
      const res1 = await this.axios.get(`/post`, {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSiz: this.pageSiz
        }
      })
      if (res1.data.statusCode === 200) {
        // this.postlist = res1.data.data
        this.postlist = [...this.postlist, ...res1.data.data]
        // this.refreshing = false
        this.loading = false
        this.refreshing = false
        // console.log(res1)
        if (res1.data.data.length < this.pageSiz) {
          this.finished = true
        }
        console.log(this.postlist)
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.ideal()
      }, 1000)
      console.log('到底了')
    },
    onRefresh () {
      console.log('hu')
      this.loading = true
      this.pageIndex = 0
      this.finished = false
      this.onLoad()
      this.postlist = []
    }
  },
  watch: {
    active (value) {
      this.loading = true
      this.pageIndex = 0
      this.finished = false
      this.onLoad()
      this.postlist = []
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .header {
    height: 50px;
    line-height: 50px;
    background-color: red;
    display: flex;
    text-align: center;
    color: #fff;
    .left,
    .right {
      width: 70px;
    }
    .search {
      flex: 1;
      height: 36px;
      line-height: 36px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 7px;
      border-radius: 18px;
      span {
        font-size: 14px;
        margin-left: 5px;
      }
    }
    .iconnew {
      font-size: 50px;
    }
    .iconwode {
      font-size: 24px;
    }
  }
}
</style>
