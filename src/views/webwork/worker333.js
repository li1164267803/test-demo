// import axios from 'axios';

onmessage = function onmessage (event) {
    //从1加到num
    var num = event.data;
    var result = 0;
    for (var i = 1; i < num; i++) {
        result += i;
    }
    let index = 0;
    setInterval(() => {
        index++;
        console.log(index);
        if(index==10){
            close() // 子进程自己关闭到自己
        }
    }, 1000);
    postMessage(result);

    // let url = 'https://resource.puxinwangxiao.com/pxjy2376657370.jpeg'
    // axios.create().get(url, { responseType: 'blob' })
    //     .then(res => {
    //         console.log(Promise,'location');
    //         // location.href = res.data; // location 为只读属性
    //         postMessage(res.data);
    //     })
}

// function saveAs(obj, fileName) {
//     var tmpa = document.createElement("a");
//     tmpa.download = fileName || "下载";
//     tmpa.href = URL.createObjectURL(obj);
//     tmpa.click();
//     setTimeout(function () {
//         URL.revokeObjectURL(obj);
//     }, 100);
// }