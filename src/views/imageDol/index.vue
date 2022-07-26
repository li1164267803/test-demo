<template>
    <div>
        <div>
            <el-button @click="btn">下载按钮</el-button>
            <el-button @click="asdasd">下载按钮2</el-button>
        </div>
        <img src="@/assets/img/2.jpeg" alt="">
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    methods: {
        btn(){
            console.log(1111,);
                  const link = document.createElement('a')
            link.style.display = 'none'
             fetch('./src/assets/img/2.jpeg')
                .then((res) =>                     {
                    console.log(234234234,res);
                    return res.blob()
                })
                .then((blob) => {
                    console.log(3333,blob);
                    link.href = URL.createObjectURL(blob)
                    link.download = 'fileName.jpeg'
                    document.body.appendChild(link)
                    link.click()
                })
        },
        asdasd(){
               this.download('./src/assets/img/2.jpeg')
console.log(222);
        },
          download(link, picName){
              console.log(3333,link);
                let img = new Image()
                console.log(444,img);
                // img.setAttribute('crossOrigin', 'Anonymous')
                img.onload = function(){
                    console.log(33453);
                    let canvas = document.createElement('canvas')
                    let context = canvas.getContext('2d')
                    canvas.width = img.width
                    canvas.height = img.height
                    context.drawImage(img, 0, 0, img.width, img.height)
                    canvas.toBlob(blob => {
                        console.log(888,blob);
                        let url = URL.createObjectURL(blob)
                        let a = document.createElement('a')
                        let event = new MouseEvent('click')
                        a.download = picName || 'default.png'
                        a.href = url
                        a.dispatchEvent(event)
                        URL.revokeObjectURL(url)  // 内存管理,将这句代码注释掉,则将以 blob:http 开头的url复制到浏览器地址栏有效,否则无效.
                    })    
                }
                img.src = link + '?v=' + Date.now()
            }
    },
}
</script>

<style lang="less" scoped>
div{
    // display: flex;
}
</style>