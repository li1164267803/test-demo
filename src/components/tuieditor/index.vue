<template>
  <editor :initialValue="editorText" :options="editorOptions" height="500px" initialEditType="markdown" previewStyle="vertical" />
</template>
<script>
// wysiwyg  markdown
// 使用起来不方便，element-admin的用法在wysiwyg下是不起作用的，引入的文件是 tui-editor 不是 @toast-ui/vue-editor
// 本页面是使用的官网推荐方式 https://github.com/nhn/tui.editor/tree/master/apps/vue-editor
// 基于vue的写法 下载的是 npm install --save @toast-ui/vue-editor
  import 'codemirror/lib/codemirror.css';
  import '@toast-ui/editor/dist/toastui-editor.css';
  import { Editor } from '@toast-ui/vue-editor';
  export default {
    components: {
      editor: Editor
    },
    data() {
      return {
        editorText: '我是一个初始值',
        editorOptions: {
          hideModeSwitch: false
        }
      };
    }
  };
</script>