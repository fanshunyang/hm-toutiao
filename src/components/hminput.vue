<template>
 <div class="input_box">
<input :type="type" :placeholder="placeholder" class="hmibput" :class="{success:statu==='success' , error:statu==='error'}"  :value="value" @input="fn" >
<span class="tips" v-if="hide">{{tang}}</span>
 </div>
</template>

<script>
export default {
  data () {
    return {
      statu: ''
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    rumes: {
      type: RegExp
    },
    tang: {
      type: String
    }
  },
  methods: {
    fn (e) {
      // console.log(e.target.value)
      this.$emit('input', e.target.value)
      // this.value = e.target.value
      if (!this.rumes) return
      if (this.rumes.test(e.target.value)) {
        this.statu = 'success'
        // console.log(this.rumes.test(e.target.value))
      } else {
        this.statu = 'error'
        // console.log(this.rumes.test(e.target.value))
      }
    }
  },
  computed: {
    hide () {
      return this.statu === 'error' && this.tang
    }
  }
}
</script>

<style lang='scss' scoped>
.input_box {
    position: relative;
    padding-bottom: 15px;
    .hmibput {
        width: 100%;
        // height: 38%;
        height: 40px;
        border-bottom: 1px solid #666;
        background-color: transparent;
        font-size: 16px;
        &.error {
       border-color: red;
        }
        &.success {
        border-color: green;
      }
    }
    .tips {
        color: red;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
