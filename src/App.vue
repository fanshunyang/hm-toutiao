<template>
    <div id="app">
  <keep-alive :include="cacheList">
  <router-view></router-view>
   </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // 我们需要动态的提供给一个数组 keepList
    // keepList用于动态的控制那些组件需要缓存。
    ...mapState(['cacheList'])
  }
}
</script>

<style lang="scss" scoped>

</style>
