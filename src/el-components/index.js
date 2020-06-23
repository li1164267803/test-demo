import Vue from 'vue'
import Message from './message'
import Progress from './progress'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie'
const service = Element.Loading.service
Element.Loading.service = function(options = { lock: true, fullscreen: true,
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.7)' }) {
  return service(options)
}
Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})

// const requireComponent = require.context(
//   // 其组件目录的相对路径
//   './',
//   // 是否查询其子目录
//   false,
//   // 匹配基础组件文件名的正则表达式
//   /El[A-Z]\w+\.(vue|js)$/
// )

const requireComponent = require.context(
    // 其组件目录的相对路径
    './',
    // 是否查询其子目录
    false,
    // 匹配基础组件文件名的正则表达式
    /El[A-Z]\w+\.(vue|js)$/
  )


// console.log(requireComponent.keys(),'requireComponent');

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
Vue.prototype.$message = Message

// 重新注册progress 改写了源码
Vue.use(Progress)
