<template>
  <div class="hmheader">
   <div class="left" @click="$router.go(-1)" >
       <i class="iconfont iconjiantou2"></i>
   </div>
   <div class="center"><slot></slot></div>
   <div class="right"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.hmheader {
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    .left,
    .right {
        width: 40px;
    }
    .center {
      font-size: 14px;
      font-weight: 700;
      flex: 1
    }
}
</style>
