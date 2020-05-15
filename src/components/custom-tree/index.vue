<template>
  <div class="custom-tree">
    <tree-nodes :nodes="data" @handleChange="handleChange" />
  </div>
</template>

<script>
import TreeNodes from './TreeNodes'
export default {
  components:{
    TreeNodes
  },
  props:{
    data:{
      required:true,
      type:Array,
      default(){
        return []
      }
    }
  },
  methods:{
    handleChange(){
      this.$emit('update:data',JSON.parse(JSON.stringify(this.data)))
    }
  }
}
</script>

<style>

</style>