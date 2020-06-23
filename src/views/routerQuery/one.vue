<template>
    <div>
        one页面
        <button @click="jump">one页面跳转到tow页面</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 454545445455
        }
    },
    methods: {
        jump(){
            this.$router.push({
                name: 'routerQueryTwo',
                query: {
                    id:this.id
                }
            })
        }
    },
}
</script>