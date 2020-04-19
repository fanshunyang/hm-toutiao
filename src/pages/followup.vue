<template>
  <div class="my-comments">
    <hmheader>我的跟帖</hmheader>

    <!--
      van-list组件可以有下拉加载更多数据的功能，常用于移动端的分页
      包裹的内容可以随意指定
      v-model="loading" loading用于指定当前的加载状态，是一个布尔值 如果loading为true，代表正在加载中。如果加载完成，loading就为false  只有当loading为false的时候，才能触发load事件，如果loading为true，代表正在数据，不会再次触发load事件，防止无限的触发load
      finished： 用于指定是否加载完成，，，，如果没有更多的数据了，那就算加载完成。如果finished为true，代表数据全部加载完成了，不会在触发加载的事件
      finished-text： 用于指定加载完成的文本信息
      load:事件：每次滚动到最底部，就会触发load事件，适合在load中加载更多的数据
      immediate-check: 关闭页面加载立即触发load事件
    -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50"
    >
      <!-- 跟帖的数据 -->
      <div class="item" v-for="item in planets" :key="item.id">
        <div class="time">{{item.create_date | item('YYYY-MM-DD HH:mm')}}</div>
        <!--
          父级跟帖数据
          如果该评论数据与父级评论，那么就显示
        -->
        <div class="parent" v-if="item.parent">
          <p>回复： {{item.parent.user.nickname}}</p>
          <p>{{item.parent.content}}</p>
        </div>
        <div class="content">{{item.content}}</div>
        <div class="origin">
          <span class="one-txt-cut">原文：{{item.post.title}}</span>
          <span class="iconfont iconjiantou1"></span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      planets: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    async getlist () {
      const res = await this.axios.get(`/user_comments`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      if (res.data.statusCode === 200) {
        this.planets = [...this.planets, ...res.data.data]
        console.log(this.planets)

        this.loading = false
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      console.log('到底了，数据加载完成')
      setTimeout(() => {
        this.pageIndex++
        this.getlist()
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-size: 14px;
  line-height: 30px;
  .content {
    color: #000;
  }
  .time {
    color: #888;
  }
  .origin {
    color: #888;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    .one-text-cut {
      flex: 1;
    }
  }
  .parent {
    margin: 10px 0;
    background-color: #ddd;
    padding: 10px;
    border: 5px;
    p:first-child {
      font-size: 12px;
    }
  }
}
</style>
