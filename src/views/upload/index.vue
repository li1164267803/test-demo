<template>
    <div>
        <h3>上传组件，点击一个自己的按钮，可以触发element-ui的上传</h3>
        <div>
            <el-button class="btn" type="primary" @click="onBtn">自己的上传按钮</el-button>
            <el-upload ref="upload" class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :on-progress="onProgress"
                >
                <el-button class="btn2" type="primary" @click="onBtn">定位按钮</el-button>
                <i class="el-icon-upload"></i>
                <!-- <el-button slot="trigger" class="upload-btn" size="small" type="primary">选取文件</el-button> -->
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        // https://gitee.com/mirrors/element-ui/blob/master/packages/upload/src/upload.vue
        onBtn(){
            console.log('点击btn按钮',this.$refs.upload);
            this.$refs.upload.$children[0].handleClick();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) { // 点击文件列表中已上传的文件时的钩子
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) { // 删除
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        beforeUpload(file){
            console.log('上传之前',file);
        },
        onSuccess(response,file,fileList){
            console.log('上传成功',response,file,fileList);
        },
        onProgress(event,file,fileList){
            console.log('上传中',event,file,fileList);
        }
    },
}
</script>
<style lang="less" scoped>
.btn {
    margin-bottom: 20px;
}
/deep/ .upload-demo {
    position: relative;
    /deep/ .el-upload-dragger {
        overflow: visible;
    }
    /deep/ .upload-btn {
        position: absolute;
    }
}
.btn2 {
    position: absolute;
    right: 20px;
    z-index: 10;
    top: -50px;
}
</style>