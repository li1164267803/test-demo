<template>
    <div>
        <button @click="toastBtn">弹框按钮</button>
        <button @click="toastBtnSS">弹框按钮SS</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        toastBtn(){
            this.$Toast('一个弹框信息')
        },
        toastBtnSS(){
            console.log(this);
            // this.$toast.success('绑定手机号成功')
            // this.$toast.error('失败')
            // this.$toast.msg() // // axios请求出错的提示信息
        }
    },
}
</script>