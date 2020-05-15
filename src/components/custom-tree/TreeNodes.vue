<template>
  <ul class="custom-tree-nodes">
    <tree-node :node="node" v-for="node in nodes" :key="node.id" v-on="$listeners"/>
  </ul>
</template>

<script>
export default {
  components:{
    TreeNode:()=>import('./TreeNode')
  },
  props:{
    nodes:{
      type:Array,
      required:true,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .custom-tree-nodes{
    list-style: none;
    padding-left: 20px;
  }
</style>>