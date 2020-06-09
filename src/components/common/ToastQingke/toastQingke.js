import ToastQingkeComponent from './ToastQingke.vue';
let ToastQingke = {}; // 实例对象

// https://cn.vuejs.org/v2/api/#Vue-extend
ToastQingke.install = function (Vue) {
    function _toast(tips, options = {}) {
        let promise = new Promise((resolve, reject) => {
            let toastTpl = Vue.extend(ToastQingkeComponent); // 构造函数
            let t = new toastTpl();
            t.tips = tips
            t.options = options;
            let tpl = t.$mount().$el
            document.body.appendChild(tpl); // 添加到body中
            setTimeout(() => { // 删除添加的元素
                document.body.removeChild(tpl);
                resolve()
            }, 1500);
        })
        return promise;
    };
    let toast = function (tips) {
        return _toast(tips, { type: 'error' });
    };
    toast.success = function (tips) { // 成功
        return _toast(tips, { type: 'success' })
    };
    toast.error = function (tips) { // 失败
        return _toast(tips, { type: 'error' })
    };
    toast.msg = function (e) { // axios请求出错的提示信息
        let msg = e && e.response && e.response.data && e.response.data.msg || '失败'
        return toast(msg)
    };

    // console.dir(toast,'toast');
    Vue.prototype.$toast = toast;
}

export default ToastQingke
