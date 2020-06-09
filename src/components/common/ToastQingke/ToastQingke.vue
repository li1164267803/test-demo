<template>
    <div class="popup-mask">
        <div class="qkd-toast">
            <img v-if="showImg" :src="src"/>{{tips}}
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },

        props: {
            tips: '',
            options: {},
        },
        computed: {
            showImg() {
                // return !!this.options.type
                return true
            },
            src() {
                switch (this.options.type) {
                    case "success":
                        return "http://cdn.qkduo.cn/static/img/toast-success.png";
                    case "error":
                        return "http://cdn.qkduo.cn/static/img/toast-fail.png"
                }
            }
        }
    }
</script>
<style>
    .qkd-toast {
        height: 60px;
        min-width: 120px;
        padding: 0 20px;
        text-align: center;
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #333339;
        border-radius: 4px;
        background: #fff;
        justify-content: center;
    }

    .qkd-toast img {
        width: 28px;
        height: 28px;
        display: block;
        margin-right: 10px;
    }

    .popup-mask {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, .4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
    }
</style>
