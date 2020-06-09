import toast from './Toast.vue'

const Toast = {}

Toast.install = function (Vue, options) {
  const ToastInstance = Vue.extend(toast)
  let currentToast
  const initInstance = () => {
    currentToast = new ToastInstance()
    let toastEl = currentToast.$mount().$el
    document.body.appendChild(toastEl)
  }

  Vue.prototype.$Toast = (options) => {
    if (!currentToast) {
      initInstance()
    }

    if (typeof options === 'string') {
      currentToast.content = options
    } else if (typeof options === 'object') {
      Object.assign(currentToast, options)
    }

    return currentToast.show()
  }
}

export default Toast
