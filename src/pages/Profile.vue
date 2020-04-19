<template>
  <div class="profile">
    <div class="user-info">
      <div class="avatar" @click="headportrait ">
        <img v-show="loding" :src="avater" alt="">
      </div>
      <div class="info">
        <p>
           <i v-if="profile.gender === 1" class="iconfont iconxingbienan"></i>
          <i v-else class="iconfont iconxingbienv"></i>
          <span>{{profile.nickname}}</span>
        </p>
        <p>{{profile.create_date |item}}</p>
      </div>
      <div class="icon">
        <i class="iconfont iconjiantou1"></i>
      </div>
    </div>
    <div class="list">
      <hmnav name="我的关注" desc="关注的用户" @click="fn" ></hmnav>
      <hmnav name="我得跟帖" desc="跟帖/回复" @click="$router.push('/followup')"></hmnav>
      <hmnav name="我的收藏" desc="文章/视频" @click="$router.push('/enshrine')"></hmnav>
      <hmnav name="栏目管理" desc="管理区域" @click="$router.push('/tabmanger')"></hmnav>
      <hmnav name="设置" @click="shezhi"></hmnav>
      <hmnav name="退出登录" @click="dialog"></hmnav>
    </div>
  </div>
</template>

<script>
import img from '../assets/avaters.jpg'
export default {
  data () {
    return {
      profile: {},
      loding: false
    }
  },
  computed: {
    avater () {
      if (this.profile.head_img) {
        // axios访问的是原型对象
        return this.axios.defaults.baseURL + this.profile.head_img
      } else {
        return img
      }
    }
  },
  async created () {
    const token = localStorage.getItem('token')
    const userid = localStorage.getItem('user_id')
    const res = await this.axios.get(`/user/${userid}`, {
      headers: {
        Authorization: token
      }
    })
    console.log(res)
    this.profile = res.data.data
    console.log(this.profile)
    this.loding = true
  },
  methods: {
    async dialog () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出吗'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch (e) {
        // console.log('取消了')
        this.$toast.fail('操作取消')
      }
    },
    shezhi () {
      this.$router.push('/editprofile')
    },
    headportrait () {
      this.$router.push('/editprofile')
    },
    fn () {
      this.$router.push('/interest')
    }
  }
}
</script>

<style lang="scss" scoped>
 .profile {
  .user-info {
    padding: 20px;
    display: flex;
    border-bottom: 5px solid #ccc;
    .avatar {
      width: 70px;
      height: 70px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .icon {
      width: 30px;
      i {
        line-height: 70px;
      }
    }
    .info {
      flex: 1;
      margin-left: 10px;
      p:first-child {
        height: 30px;
        line-height: 30px;
        font-size: 18px;
        color: #000;
      }

      p:last-child {
        font-size: 14px;
        color: #999;
      }
     .iconxingbienan {
       color: skyblue;
     }
     .iconxingbienv {
       color: pink ;
     }
    }
  }
  .list {
    padding: 0 20px;
  }
}
</style>
