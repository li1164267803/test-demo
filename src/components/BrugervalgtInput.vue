<template>
    <div>
        自定义的组件
        <input :value="val" @input="_inp" type="text">
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        val: {
            type: String,
            default: ""
        }
    },
    methods: {
        _inp(val) {
            console.log(12123, val);
            this.$emit('input', event.target.value)
        }
    },
}
</script>