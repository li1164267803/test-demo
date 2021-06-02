<template>
  <div>
    {{content}}
    {{obj}}
    {{obj.iddddd}}
    <button @click="click"> 点击增加数字</button>
  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
  setup(props) {
  const state = reactive({
    content:0,
    obj:{
      id:123
    }
  });
  const click = ()=>{
    // state.content++
    // state.obj.id++
    state.obj.iddddd =1
    console.log(111,state.obj);
  }
    return {
      click,
    ...toRefs(state)
    };
  }
  
  // data() {
  //   return {
  //     content:0,
  //     obj:{
  //       id:123
  //     }
  //   }
  // },
  // methods: {
  //   click(){
  //     // this.content++
  //     // this.$set( this.obj, 'iddddd', 1111)
  //     this.obj.iddddd =1
  //     console.log(111,this.obj);
  //   }
  // },
}
</script>