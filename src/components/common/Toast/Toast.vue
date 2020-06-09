<template>
  <transition name="fade">
  <div v-if="visible" class="toast-wrap">
      <p class="content">{{content}}</p>
  </div>
  </transition>
</template>

<script>
export default {
  components: {},
  props: {
    content: {
      type: String,
      default: 'Toast'
    },
    duration: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      visible: false,
      hideTimer: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    show () {
      this.visible = true
      if (this.hideTimer) {
        clearTimeout(this.hideTimer)
      }
      this.hideTimer = setTimeout(() => {
        this.visible = false
      }, this.duration)
    }
  },
  created () {},
  mounted () {},
  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
//@import url(); 引入公共css类
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

.toast-wrap {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;

  .content {
    background: rgba(0,0,0,.6);
    color: #fff;
    text-align: center;
    line-height: 40px;
    padding: 0 20px;
    max-width: 400px;
    height: 40px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border-radius: 20px;
  }
}
</style>
