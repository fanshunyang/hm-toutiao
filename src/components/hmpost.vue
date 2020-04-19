<template>
<div class="hmpost" @click="$router.push(`/article/${data.id}`)">
<div class="videoPost" v-if="data.type === 2">
  <div class="title txt-cut">{{data.title}}</div>
  <div class="video">
    <img :src="  revision(data.cover[0].url)" alt="">
    <i class="iconfont iconshipin"></i>
  </div>
  <div class="info">
    <span class="user">{{data.user.nickname}}</span>
    <span class="count">{{data.comment_length}}跟帖</span>
  </div>
</div>
<div class="singimg" v-else-if="data.cover.length<3">
      <div class="info">
        <div class="title">{{data.title}}</div>
        <div class="bottom">
          <span>{{data.user.nickname}}</span>
          <span>{{data.comment_length}}</span>
        </div>
      </div>
     <img :src="revision(data.cover[0].url)" alt="">
</div>
 <div class="multipleImg" v-else>
  <div class="title txt-cut">{{data.title}}</div>
  <div class="imgs">
    <img v-for="item in data.cover" :key="item.id" :src="item.url" alt="">

  </div>
  <div class="info">
    <span class="user"></span>
    <span class="count">跟帖</span>
  </div>
</div>

</div>

</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
.singimg {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    flex: 1;
    display: flex;
    height: 75px;
    // 修改flex主轴的方向
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 14px;
    }
    .bottom {
      color: #888;
      span:first-child {
        margin-right: 10px;
      }
    }
  }
  img {
    width: 120px;
    height: 75px;
    // object-fit:样式 可以保证图片在定死宽高的情况下不失真
    // object-fit: cover contain
    // background-size
    object-fit: cover;
  }
}
.multipleImg {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
}
  .video {
    padding: 10px 0;
    position: relative;
    img {
      height: 170px;
      object-fit: cover;
    }
    .iconshipin {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, .3);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      text-align: center;
      line-height: 50px;
      font-size: 30px;
      color: #fff;
    }
  }
</style>
