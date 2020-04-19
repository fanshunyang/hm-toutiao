<template>
     <div class="my-favorite">
    <hmheader>我的收藏</hmheader>
    <hmpost v-for="item in mylist" :key="item.id" :data="item"></hmpost>
  </div>
</template>

<script>
import hmpost from '../components/hmpost'
export default {
  data () {
    return {
      mylist: []
    }
  },
  components: {
    hmpost
  },
  created () {
    this.creatlist()
  },
  methods: {
    async creatlist () {
      const res = await this.axios.get(`/user_star`)
      console.log(res)
      if (res.data.statusCode === 200) {
        res.data.data.forEach(item => {
          item.comment_length = item.comments.length
        })
        this.mylist = res.data.data
      }
      //   console.log(this.mylist)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
