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
   * @param {*} data 需要导出的原始数据  数组形式 
   * @param {*} optionTitle json 
   *  let optionTitle={
              serialBumber:'序号',
              tutorName:'辅导老师',
              divisionName:'学段',
          }
   * @param {*} fileName 下载的文件名称
   * @param {*} headline 页面中顶部的大标题
   * @param {*} merges 合并单元格  ['A1:A2', 'B1:D1', 'E1:E2']
   * @param {*} autoWidth 是否自动适应内容宽度 true false
   * @param {*} type 导出的文件类型
   */
export function downloadExl(
  data,
  optionTitle,
  fileName,
  headline = false,
  merges = [],
  autoWidth = true,
  type = false
) {
  const wopts = {
    bookType: "xlsx",
    bookSST: true,
    type: "binary",
    cellStyles: true,
  };
  if (data) {
    // 处理原始数据变为  数组形式  [[表头]，[数据1]，[数据2]...]
    let excelData = [Object.values(optionTitle)];
    let index = 0; // 序号
    data.forEach((item) => {
      let arr = [];
      index++;
      arr.push(index);
      Object.keys(optionTitle).forEach(
        (v) => v !== "serialBumber" && arr.push(item[v])
      );
      excelData.push(arr);
    });
    // 顶部标题
    if (headline) {
      let headlineArr = [];
      excelData[0].forEach((v, index) => {
        // 给数组的第一个添加同等的数量，当作大标题
        if (index == 0) headlineArr.push(headline);
        headlineArr.push("");
      });
      excelData.unshift(headlineArr); // 第一个数组为大标题
    }
    var tmpdata = []; //用来保存转换好的json
    excelData
      .map((v, i) =>
        Object.keys(excelData[0]).map((k, j) =>
          Object.assign(
            {},
            {
              v: v[k],
              position:
                (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) +
                (i + 1),
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
    if (merges.length > 0) {
      if (!tmpdata["!merges"]) tmpdata["!merges"] = [];
      merges.forEach((item) => {
        tmpdata["!merges"].push(decode_range(item));
      });
    }
    //   tmpdata["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 16 } }]; //<====合并单元格
    if (autoWidth) {
      /*设置worksheet每列的最大宽度*/
      const colWidth = excelData.map((row) =>
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
              bookSST: false,
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

function decode_range(range) {
  var x = range.split(":").map(decode_cell);
  return { s: x[0], e: x[x.length - 1] };
}
function decode_cell(cstr) {
  var splt = split_cell(cstr);
  return { c: decode_col(splt[0]), r: decode_row(splt[1]) };
}
function split_cell(cstr) {
  return cstr.replace(/(\$?[A-Z]*)(\$?\d*)/, "$1,$2").split(",");
}

// 处理列合并
function decode_col(colstr) {
  var c = unfix_col(colstr),
    d = 0,
    i = 0;
  for (; i !== c.length; ++i) d = 26 * d + c.charCodeAt(i) - 64;
  return d - 1;
}
function unfix_col(cstr) {
  return cstr.replace(/^\$([A-Z])/, "$1");
}

// 处理行合并
function decode_row(rowstr) {
  return parseInt(unfix_row(rowstr), 10) - 1;
}
function unfix_row(cstr) {
  return cstr.replace(/\$(\d+)$/, "$1");
}
