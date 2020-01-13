<template>
    <div>
        {{arr}}
        {{arr.length}}
        {{obj}}
        <input v-bind:value="arr[1]" @input="shijian" />
        <input v-model="something" />
        <Button @click="onButton">按钮</Button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            something: '',
            arr: [0, 3, 123, 435, 3,],
            obj: {
                aaaa: "1"
            }
        }
    },
    methods: {
        shijian(event) {
            console.log(event);
            this.arr[1] = event.target.value;
            console.log(this.arr);
        },
        onButton() {
            console.log('onButton', this.arr.length);
            this.arr[1] = 200;
            // this.obj[0] = '4545454'
            // this.obj.aaaa = '4545454'      
            // this.arr.length = 3;
            // this.$set(this.arr, 1, 200)
            console.log(this.arr, this.obj);

        },
    },
}
</script>