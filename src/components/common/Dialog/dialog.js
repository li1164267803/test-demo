import dialog from './Dialog.vue'

const Dialog = {}

Dialog.install = function (Vue, options) {
  const DialogInstance = Vue.extend(dialog)
  let currentDialog
  const initInstance = () => {
    currentDialog = new DialogInstance()
    let dialogEl = currentDialog.$mount().$el
    document.body.appendChild(dialogEl)
  }

  Vue.prototype.$Dialog = {
    show (options) {
      if (!currentDialog) {
        initInstance()
      }

      if (typeof options === 'string') {
        currentDialog.content = options
      } else if (typeof options === 'object') {
        Object.assign(currentDialog, options)
      }

      return currentDialog.show().then(val => {
        currentDialog = null
        return Promise.resolve(val)
      }).catch(val => {
        currentDialog = null
        return Promise.reject(val)
      })
    },
    hide () {
      if (!currentDialog) {
        return
      }
      return currentDialog.cancel()
    }
  }
}

export default Dialog
