export const mixins = {
  data() {
    return {
      mixinsData: "mixins的data",
    };
  },
  mounted() {
    console.log("挂载mixins");
  },
  methods: {
    mixinsFn() {
      console.log("执行mixinsFn的方法");
    },
  },
};
