<template>
    <div>
        two页面
      
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    props: {
        query: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    mounted() {
        console.log(this.query.id,'传递来的id', this);
    },
}
</script>