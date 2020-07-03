<template>
    <div>
        asdasd
    </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        this.SSE()
    },
    methods: {
        SSE () {
      console.log(12123)
      if ('EventSource' in window) {
        // let url = 'http://192.168.2.135:8103/server/connect?classId=2&chapterId=2'
        let url = 'http://123.56.135.138:8102/server/connect?classId=123&chapterId=192726700895019008'

        var source = new EventSource(url, { withCredentials: true })
        // eventSource实例的readyState属性，表明连接的当前状态。该属性只读，可以取以下值。
        // 0：相当于常量eventSource.CONNECTING，表示连接还未建立，或者断线正在重连。
        // 1：相当于常量eventSource.OPEN，表示连接已经建立，可以接受数据。
        // 2：相当于常量eventSource.CLOSED，表示连接已断，且不会重连。
        console.log(source, 'sourcesourcesource')
        source.onopen = function (event) {
          console.log('建立链接', event)
        }
        source.onmessage = function (event) {
          var data = event.data
          console.log('返回的数据', data)
        }
        source.onerror = function (error) {
          console.log('通信错误', error)
        }
        // setTimeout(async () => {
        //   try {
        //     source.close()
        //     const service = await axios.create({
        //       baseURL: 'http://192.168.2.135:8103/server/disconnect?classId=2&chapterId=2', // api的base_url
        //       timeout: 5000 // 请求超时时间
        //     })()
        //     console.log('关闭请求', service)
        //   } catch (error) {
        //   }
        //   console.log('关闭sse')
        // }, 5000)
      }
    },
    },
}
</script>