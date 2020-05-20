function saveAs(obj, fileName) {
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj);
  tmpa.click();
  setTimeout(function() {
    URL.revokeObjectURL(obj);
  }, 100);
}

/**
 * 导出列表方法
 * @param {*} json 需要导出的数据  数组形式  [[表头]，[数据1]，[数据2]...]
 * @param {*} fileName 下载的文件名称
 * @param {*} headline 页面中顶部的大标题
 * @param {*} type 导出的文件类型
 */
export function downloadExl(
  json,
  fileName,
  headline = false,
  autoWidth = true,
  type
) {
  const wopts = {
    bookType: "xlsx",
    bookSST: true,
    type: "binary",
    cellStyles: true,
  };
  //   var tmpdata = json[0];

  if (headline) {
    let headlineArr = [];
    json[0].forEach((v, index) => {
      // 给数组的第一个添加同等的数量，当作大标题
      if (index == 0) headlineArr.push(headline);
      headlineArr.push("");
    });
    json.unshift(headlineArr); // 第一个数组为大标题
  }

  var tmpdata = []; //用来保存转换好的json
  json
    .map((v, i) =>
      Object.keys(json[0]).map((k, j) =>
        Object.assign(
          {},
          {
            v: v[k],
            position:
              (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1),
          }
        )
      )
    )
    .reduce((prev, next) => prev.concat(next))
    .forEach((v) => {
      if (v.v !== undefined) {
        tmpdata[v.position] = {
          v: v.v,
          s: {
            // 处理合并单元格后没用边框问题
            border: {
              top: {
                style: "thin",
                color: {
                  rgb: "D4D4D4",
                },
              },
              left: {
                style: "thin",
                color: {
                  rgb: "D4D4D4",
                },
              },
              bottom: {
                style: "thin",
                color: {
                  rgb: "D4D4D4",
                },
              },
              right: {
                style: "thin",
                color: {
                  rgb: "D4D4D4",
                },
              },
            },
          },
        };
      }
    });

  var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
  tmpdata["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 16 } }]; //<====合并单元格
  tmpdata["A1"].s = {
    //<====设置xlsx单元格样式
    font: {
      sz: 14,
      bold: true,
      color: {
        rgb: "FFFFAA00",
      },
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    },
    fill: {
      bgColor: {
        indexed: 64,
      },
      fgColor: {
        rgb: "FFFFFF",
      },
    },
  };

  if (autoWidth) {
    /*设置worksheet每列的最大宽度*/
    const colWidth = json.map((row) =>
      row.map((val) => {
        /*先判断是否为null/undefined*/
        if (val == null) {
          return {
            wch: 10,
          };
        } else if (val.toString().charCodeAt(0) > 255) {
          /*再判断是否为中文*/
          return {
            wch: val.toString().length * 2,
          };
        } else {
          return {
            wch: val.toString().length,
          };
        }
      })
    );
    /*以第二行为初始值*/
    let result = colWidth[1];
    for (let i = 1; i < colWidth.length; i++) {
      for (let j = 0; j < colWidth[i].length; j++) {
        if (result[j]["wch"] < colWidth[i][j]["wch"]) {
          result[j]["wch"] = colWidth[i][j]["wch"];
        }
      }
    }
    tmpdata["!cols"] = result;
  }
  /* add worksheet to workbook */
  var tmpWB = {
    SheetNames: [headline], //保存的表标题 Sheets对象名字一定要注意和SheetNames一致，否则报 !printHeader 错误
    Sheets: {
      [headline]: Object.assign(
        {},
        tmpdata, //内容
        {
          "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1], //设置填充区域
        }
      ),
    },
  };

  let tmpDown = new Blob(
    [
      s2ab(
        XLSX.write(
          tmpWB,
          {
            bookType: type == undefined ? "xlsx" : type,
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: "binary",
          } //这里的数据是用来定义导出的格式类型
        )
      ),
    ],
    {
      type: "",
    }
  );

  saveAs(
    tmpDown,
    fileName + "." + (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
  );
}

function getCharCol(n) {
  // 获取字符列
  let temCol = "",
    s = "",
    m = 0;
  while (n > 0) {
    m = (n % 26) + 1;
    s = String.fromCharCode(m + 64) + s;
    n = (n - m) / 26;
  }
  return s;
}

function s2ab(s) {
  // 字符串转字符流
  if (typeof ArrayBuffer !== "undefined") {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    var buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
}
