<template>
<div class="btn" @click="hadeclick"><slot></slot></div>
</template>

<script>
export default {
  methods: {
    hadeclick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
    background-color: #f10215;
    height: 48px;
    line-height: 48px;
    color: #ffffff;
    text-align: center;
    font-size: 18px;
    border-radius: 24px;
}
</style>
