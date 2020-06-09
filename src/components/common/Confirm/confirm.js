import confirm from './Confirm.vue'

const Confirm = {}

Confirm.install = function (Vue, options) {
  const ConfirmInstance = Vue.extend(confirm)
  let currentConfirm
  const initInstance = () => {
    currentConfirm = new ConfirmInstance()
    let confirmEl = currentConfirm.$mount().$el
    document.body.appendChild(confirmEl)
  }

  Vue.prototype.$Confirm = {
    show (options) {
      if (!currentConfirm) {
        initInstance()
      }

      if (typeof options === 'string') {
        currentConfirm.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentConfirm, options)
      }

      return currentConfirm.show().then(val => {
        currentConfirm = null
        return Promise.resolve(val)
      }).catch(val => {
        currentConfirm = null
        return Promise.reject(val)
      })
    },
    hide () {
      if (!currentConfirm) {
        return
      }
      return currentConfirm.cancel()
    }
  }
}

export default Confirm
