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
// cloneDeep 深度拷贝
// groupBy 筛选所有某个属性一样的数据，分组
import { groupBy, cloneDeep } from "lodash"; // 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

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
          name: "承达_0460",
          url: "https://resource.puxinwangxiao.com/pxjy2376657370.jpeg",
        },
        {
          name: "承达_0460",
          url: "https://resource.puxinwangxiao.com/pxjy2376657370.jpeg",
        },
      ],
    };
  },
  mounted() {
    console.log(cloneDeep(), "cloneDeep");
    console.log(groupBy(), "groupBy");
  },
  methods: {
    batchZipImage(arr) {
      arr = cloneDeep(arr);
      console.log(arr, "arr");
      var group = getGroup(arr);
      console.log(group, "groupgroup");
      // 数组的reduce  https://www.jianshu.com/p/e375ba1cfc47
      var promises = Object.keys(group).reduce(function(result, key) {
        console.log(result, key, "result, key");
        var items = group[key];
        items.forEach(function(item) {
          var promise = getSource(item.url); // 请求获取源数据流6
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
            var folder = zip.folder(key); // 创建文件夹
            var items = group[key];
            items.forEach(function(item) {
              folder.file(item.name, item.blob); // 写入文件
            });
          });
          zip.generateAsync({ type: "blob" }).then(function(content) {
            saveAs(content, "example.zip"); // 下载文件
            res();
          });
        });
      });

      function getGroup(arr) {
        /**
         * https://www.lodashjs.com/docs/lodash.groupBy
         * groupBy(collection, [iteratee=_.identity]) 前端处理数据，根据name筛选所有name一样的数据，分组
         * collection (Array|Object): 一个用来迭代的集合。
         * [iteratee=_.identity] (Array|Function|Object|string): 这个迭代函数用来转换key。
         * 创建一个对象，key 是 iteratee 遍历 collection(集合) 中的每个元素返回的结果。 分组值的顺序是由他们出现在 collection(集合) 中的顺序确定的。
         * 每个键对应的值负责生成 key 的元素组成的数组。iteratee 调用 1 个参数： (value)。
         */
        var group = groupBy(arr, function(item) {
          return item.name;
        });
        console.log(group, "group", Object.values(group), Object.keys(group));
        Object.values(group).forEach(function(items) {
          items.forEach(function(item, idx) {
            var suffix = item.url.replace(/.*\./, "");
            console.log(suffix, "suffix");
            item.name += "_" + idx + "." + suffix;
          });
        });
        return group;
      }

      function getSource(url) {
        // 请求获取源数据流
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
