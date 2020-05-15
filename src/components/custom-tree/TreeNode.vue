<template>
  <li class="custom-tree-node">
    <span v-if="node.children" class="custom-tree-arrow" :class="{'custom-tree-arrow-open':node._open}" @click="handleToggleOpen">
      <!-- ∨ -->
      <Icon :size="16" type="ios-arrow-down"></Icon>
    </span>
    <label>
      <input type="checkbox" @change="handleChange" :checked="node.checked"/>
      {{node.name}}
    </label>
    <template
      v-if="node.children &&node._open"
    >
      <tree-nodes :nodes="node.children" v-on="$listeners"/>
    </template>
  </li>
</template>

<script>
export default {
  components:{
    TreeNodes:()=>import('./TreeNodes')
  },
  props:{
    node:{
      required:true,
      default:null,
      type:Object
    }
  },
  methods:{
    handleToggleOpen(){
      this.node._open = !this.node._open
      this.$emit('handleChange')
    },
    handleChange(e){
      var checked = e.target.checked
      this.node.checked = checked
      this.handleCheck(this.node.children,checked)
      this.$emit('handleChange')
    },
    handleCheck(nodes=[],checked){
      nodes.forEach(node=>{
        node.checked = checked
        this.handleCheck(node.children,checked)
      })
    }
  }
}
</script>

<style scoped>
  .custom-tree-arrow{
    line-height: 1;
    cursor: pointer;
    transition: all .2s ease-in-out;
    transform: rotate(-90deg);
    display: inline-block;
  }
  .custom-tree-arrow-open{
    transform: rotate(0);
  }
  input[type=checkbox] {
    position: relative;
    width:14px;
    height:14px; 
    text-align: center;
    vertical-align: middle;
  }
  input[type=checkbox]:after {
    position: absolute;
    left: 0;
    top:0;
    width: 100%;
    height: 100%;
    content:"";
    background-color:#fff;
    display: inline-block;
    border:1px solid #dcdfe6;
    border-radius: 2px;
    transition: border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);
  }
  input[type=checkbox]:checked:after {
    content: "\2713";/*UNICODE中对号*/
    line-height: 14px;
    font-size: 12px;
    color: #fff;
    border-color: #409eff;
    background-color: #409eff;
  }
</style>