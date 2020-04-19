<template>
<div class="floors">
 <flor v-if="father.parent" :father="father.parent" :index="index-1"></flor>
 <div class="hm-floor">
    <div class="title">
      <div class="name">{{index}}{{father.user.nickname}}</div>
      <div class="time">{{father.create_date |item('YYYY-MM-DD HH:mm:ss')}}</div>
      <div class="reply" @click="bridge(father.id)">回复</div>
    </div>
    <div class="content">{{father.content}}</div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'flor',
  props: {
    father: Object,
    index: Number
  },
  created () {
    console.log('楼层', this.father)
  },
  methods: {
    bridge (id) {
      this.$emit('bridge', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.hm-floor {
  border: 1px solid #ccc;
  background-color: #eee;
  padding: 10px;
  .title {
    display: flex;
    align-items: flex-end;
    padding-bottom : 10px;
    .name {
      font-size: 14px;
    }
    .time {
      margin-left: 5px;
      flex: 1;
    }
  }
  .content {
    font-size: 14px;
  }
}
</style>
