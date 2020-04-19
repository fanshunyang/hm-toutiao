<template>
<div class="editprofile">
    <hmheader>编辑资料</hmheader>
   <div class="box">
        <div class="confims">
        <img :src="avater" alt="">
          <div class="times">
          <van-uploader  :after-read="afterRead" />
     </div>
    </div>
    <hmnav name="昵称" :desc="profile.nickname" @click="showname"></hmnav>
    <hmnav name="密码" desc="******" @click="pass"></hmnav>
    <hmnav name="性别" :desc="genders" @click="sexualitys"></hmnav>
   </div>

   <van-dialog class="dialog" v-model="show" title="标题" show-cancel-button @confirm="editprofile">
  <van-field class="field" v-model="nickname" placeholder="请输入用户名" />
</van-dialog>

   <van-dialog class="dialog" v-model="showtime" title="修改密码" show-cancel-button @confirm="editprofilepassword">
  <van-field class="field" v-model="password" placeholder="请修改密码"  />
</van-dialog>

 <van-dialog class="dialog" v-model="sexuality" title="修改性别" show-cancel-button @confirm="studies">
  <van-radio-group v-model="gender">
  <van-radio :name="0">女</van-radio>
  <van-radio :name="1">男</van-radio>
</van-radio-group>
</van-dialog>
<div class="mask" v-show="isshow">
 <vueCropper
    ref="cropper"
    :img="option.img"
    :autoCrop="option.autoCrop"
    :autoCropWidth="option.autoCropWidth"
    :autoCropHeight="option.autoCropHeight"
    :fixed="option.fixed"
    :fixedNumber="option.fixedNumber">
  </vueCropper>
   <van-button type="primary" @click="fn">确定裁剪图片</van-button>
   <van-button type="warning" @click="fns">取消裁剪图片</van-button>
</div>
</div>
</template>

<script>
import { VueCropper } from 'vue-cropper'

import img from '../assets/avaters.jpg'
export default {
  components: {
    VueCropper
  },
  data () {
    return {
      profile: '',
      loding: false,
      show: false,
      nickname: '',
      showtime: false,
      password: '',
      sexuality: false,
      isshow: false,
      gender: 1,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [4, 4] // 截图框的宽高比例
      }
    }
  },

  methods: {
    showname () {
      this.show = true
      this.nickname = this.profile.nickname
      // console.log(this.profile)
    },
    pass () {
      this.showtime = true
      this.password = this.profile.password
      // console.log(this.profile)
    },
    sexualitys () {
      this.sexuality = true
      this.gender = this.gender
    },
    async editconrepetition (data) {
      const token = localStorage.getItem('token')
      const userid = localStorage.getItem('user_id')
      const res = await this.axios.post(`/user_update/${userid}`, data, {
        headers: {
          Authorization: token
        }
      })
      console.log(res)
      if (res.data.statusCode === 200) {
        this.profiles()
        this.$toast.success('修改成功')
      }
    },
    editprofilepassword () {
      this.editconrepetition({ password: this.password })
    },
    editprofile () {
      this.editconrepetition({ nickname: this.nickname })
    },
    studies () {
      this.editconrepetition({ gender: this.gender })
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.isshow = true
      this.option.img = file.content
      // console.log(file)
      // console.log(file.content)

      // const fd = new FormData()
      // // if (file.file.type !== 'image/jpeg') {
      // //   this.$toast.success('上传错误')
      // //   return
      // // }
      // fd.append('file', file.file)
      // const token = localStorage.getItem('token')
      // const res = await this.axios.post(`/upload`, fd, {
      //   headers: {
      //     Authorization: token
      //   }
      // })
      // console.log(res)
      // // const { statusCode, data } = res.data
      // if (res.data.statusCode === 200) {
      //   this.editconrepetition({ head_img: res.data.data.url })
      // }
    },
    fn () {
      // console.log('惠惠')
      this.$refs.cropper.getCropData(async imgda => {
        console.log(imgda)
        const file = this.convertBase64UrlToBlob(imgda)
        const fd = new FormData()
        // if (file.file.type !== 'image/jpeg') {
        //   this.$toast.success('上传错误')
        //   return
        // }
        console.log(file)

        fd.append('file', file)
        const token = localStorage.getItem('token')
        const res = await this.axios.post(`/upload`, fd, {
          headers: {
            Authorization: token
          }
        })
        console.log(res)
        // const { statusCode, data } = res.data
        if (res.data.statusCode === 200) {
          this.editconrepetition({ head_img: res.data.data.url })
        }
        this.isshow = false
      })
    },
    async fns () {
      try {
        await this.$dialog.confirm({
          title: '提示',
          message: '你确定要取消修改吗'
        })
        this.$toast.success('取消成功')
        this.isshow = false
      } catch {
        // this.$toast.success('取消成功')
      }
    },
    convertBase64UrlToBlob (urlData) {
      let bytes = window.atob(urlData.split(',')[1])// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      let ab = new ArrayBuffer(bytes.length)
      let ia = new Uint8Array(ab)
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/jpeg' })
    },
    async profiles () {
      const token = localStorage.getItem('token')
      const userid = localStorage.getItem('user_id')
      const res = await this.axios.get(`/user/${userid}`, {
        headers: {
          Authorization: token
        }
      })
      // console.log(res)
      this.profile = res.data.data
      // console.log(this.profile)
      this.loding = true
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
    },
    genders () {
      if (this.profile.gender === 1) {
        return '男'
      } else {
        return '女'
      }
    }
  },
  created () {
    this.profiles()
  }
}
</script>

<style lang="scss" scoped>
.box {
  position: relative;
    padding: 30px 20px;
    .confims {
        img {
            width: 70px;
            height: 70px;
            margin: 0 auto;
            border-radius: 50%;
        }
    }
    .times {
          position: absolute;
          top:30px;
          left: 50%;
         transform: translateX(-50%);
         opacity: 0;
      }
}
  .dialog {
      padding: 10px;
      .field {
        border: 1px solid #cccccc;
      }

    }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
.van-button {
      position: fixed;
      top: 0;
    }
  .van-button:first-child {
      left:0 ;
  }
   .van-button:last-child {
      right:0 ;
  }
}

</style>
