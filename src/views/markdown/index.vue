<template>
  <div>
    asdas
    <div id="editor">
      <mavon-editor style="height: 100%;"></mavon-editor>
    </div>
  </div>
</template>

<script>
// Local Registration
// 使用的是 mavon-editor

import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'editor',
  components: {
    mavonEditor,
    // or 'mavon-editor': mavonEditor
  },
}
</script>
<style>
#editor {
  margin: auto;
  width: 80%;
  height: 580px;
}
</style>
