<template>
  <div>
    <button @click="dowlondZip">下载zip按钮</button>
  </div>
</template>

<script>
/**
 * 官网 https://stuk.github.io/jszip/
 * npm install jszip
 * npm install file-saver
 * https://blog.csdn.net/weixin_41697143/article/details/89027238 zipJS 前端压缩使用
 * https://blog.csdn.net/static_coder/article/details/86293076 JSZip库的简单使用
 */
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { groupBy, cloneDeep } from "lodash";
export default {
  data() {
    return {
      arr: [
        {
          name: "刘格兰_0459",
          url: "https://resource.puxinwangxiao.com/pxjy2376657370.jpeg",
        },
        {
          name: "刘格兰_0459",
          url: "https://resource.puxinwangxiao.com/pxjy2376657370.jpeg",
        },
        {
          name: "承达_0459",
          url: "https://resource.puxinwangxiao.com/pxjy2376657370.jpeg",
        },
        {
          name: "承达_0459",
          url: "https://resource.puxinwangxiao.com/pxjy2376657370.jpeg",
        },
      ],
    };
  },
  methods: {
    batchZipImage(arr) {
      arr = cloneDeep(arr);
      var group = getGroup(arr);
      var promises = Object.keys(group).reduce(function(result, key) {
        var items = group[key];
        items.forEach(function(item) {
          var promise = getSource(item.url);
          promise.then(function(blob) {
            item.blob = blob;
          });
          result.push(promise);
        });
        return result;
      }, []);

      return new Promise(function(res) {
        var zip = new JSZip();
        Promise.all(promises).then(function() {
          Object.keys(group).forEach(function(key) {
            var folder = zip.folder(key);
            var items = group[key];
            items.forEach(function(item) {
              folder.file(item.name, item.blob);
            });
          });
          zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, "example.zip");
            res();
          });
        });
      });

      function getGroup(arr) {
        var group = groupBy(arr, function(item) {
          return item.name;
        });
        Object.values(group).forEach(function(items) {
          items.forEach(function(item, idx) {
            var suffix = item.url.replace(/.*\./, "");
            item.name += "_" + idx + "." + suffix;
          });
        });
        return group;
      }

      function getSource(url) {
        return new Promise(function(res) {
          var httpRequest = new XMLHttpRequest();
          httpRequest.open("GET", url);
          httpRequest.responseType = "blob";
          httpRequest.addEventListener("load", function() {
            res(httpRequest.response);
          });
          httpRequest.send();
        });
      }
    },
    dowlondZip() {
      // 开始下载文件
      this.batchZipImage(this.arr).then(function() {
        console.log("ok");
      });
    },
  },
};
</script>
