<template>
  <transition name="fade">
  <div v-if="visible" @click="cancel()" class="confirm-wrap">
        <div @click.stop="" class="confirm">
            <h3 class="title" v-if="title">{{title}}</h3>
            <p class="content">{{content}}</p>
            <p class="btn-wrap">
                <button class="btn cancel-btn" @click="cancel()">{{cancelText}}</button>
                <button class="btn confirm-btn" @click="confirm()">{{confirmText}}</button>
            </p>
        </div>
  </div>
  </transition>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    content: {
      type: String,
      default: '确定要执行该操作吗？'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      visible: false,
      resolve: '',
      reject: '',
      promise: ''
    }
  },
  methods: {
    confirm () {
      this.visible = false
      this.resolve('confirm')
      this.remove()
    },
    cancel () {
      this.visible = false
      this.reject('cancel')
      this.remove()
    },
    show () {
      this.visible = true
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      return this.promise
    },
    remove () {
      setTimeout(() => {
        this.$destroy()
        document.body.removeChild(this.$el)
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-wrap{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba(0,0,0,.7);
    z-index: 1;

    .confirm{
        padding: 10px;
        border-radius: 10px;
        background-color: rgb(56,56,56);
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        align-content: center;
        align-items: center;

        .title{
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,.6);
            color: #fff;
        }

        .content{
            min-height: 50px;
            vertical-align: center;
            padding-top: 20px;
            padding: 0 30px;
        }

        .btn-wrap{
            .btn{
                padding: 7px 30px;
                border: none;
                outline: none;
                border-radius: 5px;
                font-size: 14px;
                margin: 0 30px;
                color: #fff;
                cursor: pointer;
            }

            .cancel-btn{
                background-color: rgba(0,0,0,0);
                padding: 6px 29px;
                border: 1px solid rgba(255,255,255,.6);
            }

            .confirm-btn{
                background-color: #0488FF;
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
</style>
