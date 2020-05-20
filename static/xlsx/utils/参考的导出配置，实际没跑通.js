/**
 * 导出列表方法
 * @param {*} data  需要导出的数据  数组形式  [[表头]，[数据1]，[数据2]...]
 * @param {*} fileName 下载的文件名称
 * @param {*} titleName 表格标题
 * @param {*} time  表格时间范围
 * @param {*} keyMap   排序标准
 * @param {*} district   地区名称
 * @param {*} condition  筛选条件
 * @param {*} specialObj   特殊要求，全站搜索使用
 */
export function downloadExl(
  data,
  fileName,
  titleName,
  time = "无",
  keyMap,
  district = "",
  condition,
  specialObj = []
) {
  const self = this;
  data.unshift({}); //空出标题等行
  data.unshift({});
  data.unshift({});
  data.unshift({});
  data = XLSX.format2Sheet(data, 0, 0, keyMap); //偏移3行按keyMap顺序转换
  var wb = XLSX.format2WB(data, undefined, undefined);
  const range = keyMap.length - 1;
  const wopts = { bookType: "xlsx", bookSST: false, type: "binary" };
  var dataInfo = wb.Sheets[wb.SheetNames[0]];

  dataInfo["A1"].v = district + "广播电视安全播出监管中心"; //设置表格标题
  dataInfo["A2"] = { v: titleName }; //设置表格标题
  dataInfo["A3"] = { v: "日期：" + time }; //设置表格日期
  dataInfo["A4"] = { v: condition }; //设置筛选条件
  dataInfo["!merges"] = [
    {
      //合并第一行数据[B1,C1,D1,E1]
      s: {
        //s为开始
        c: 0, //开始列
        r: 0, //开始取值范围
      },
      e: {
        //e结束
        c: range, //结束列
        r: 0, //结束范围
      },
    },
    {
      //合并第一行数据[B2,C2,D2,E2]
      s: {
        //s为开始
        c: 0, //开始列
        r: 1, //开始取值范围
      },
      e: {
        //e结束
        c: range, //结束列
        r: 1, //结束范围
      },
    },
    {
      //合并第一行数据[B3,C3,D3,E3]
      s: {
        //s为开始
        c: 0, //开始列
        r: 2, //开始取值范围
      },
      e: {
        //e结束
        c: range, //结束列
        r: 2, //结束范围
      },
    },
    {
      //合并第一行数据[B3,C3,D3,E3]
      s: {
        //s为开始
        c: 0, //开始列
        r: 3, //开始取值范围
      },
      e: {
        //e结束
        c: range, //结束列
        r: 3, //结束范围
      },
    },
  ];

  if (specialObj) {
    let rowNum = 5;
    _.each(specialObj, (data, index) => {
      if (data.num) {
        dataInfo["A" + rowNum].v = data.name + "列表";
        dataInfo["A" + rowNum].s = {
          //设置副标题样式
          font: {
            name: "宋体",
            sz: 14,
            color: { rgb: "#FFFF0000" },
            bold: false,
            italic: false,
            underline: false,
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
        };
        dataInfo["!merges"].push({
          s: {
            //s为开始
            c: 0, //开始列
            r: rowNum - 1, //开始取值范围
          },
          e: {
            //e结束
            c: range, //结束列
            r: rowNum - 1, //结束范围
          },
        });
        _.each(dataInfo, (data, key) => {
          if (key.replace(/[^0-9]/gi, "") == rowNum + 1) {
            dataInfo[key].s = {
              font: {
                name: "宋体",
                sz: 11,
                color: { rgb: "#FFFF0000" },
                bold: true,
                italic: false,
                underline: false,
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
              },
            };
          }
        });
        rowNum += data.num + 1;
      }
    });
  }

  dataInfo["A1"].s = {
    //设置主标题样式
    font: {
      name: "宋体",
      sz: 18,
      color: { rgb: "#FFFF0000" },
      bold: true,
      italic: false,
      underline: false,
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    },
  };
  dataInfo["A2"].s = {
    //设置副标题样式
    font: {
      name: "宋体",
      sz: 16,
      color: { rgb: "#FFFF0000" },
      bold: false,
      italic: false,
      underline: false,
    },
    alignment: {
      horizontal: "center",
      vertical: "center",
    },
  };
  dataInfo["A3"].s = {
    //设置日期样式
    font: {
      name: "宋体",
      sz: 11,
      color: { rgb: "#FFFF0000" },
      bold: false,
      italic: false,
      underline: false,
    },
  };
  dataInfo["A4"].s = {
    font: {
      name: "宋体",
      sz: 11,
      color: { rgb: "#FFFF0000" },
      bold: false,
      italic: false,
      underline: false,
    },
  };
  if (specialObj.length == 0) {
    _.each(dataInfo, (data, key) => {
      //设置表头样式      由于表头是第四行，所以判断其表格单元格编号是否是 4
      if (key.replace(/[^0-9]/gi, "") == 5) {
        dataInfo[key].s = {
          font: {
            name: "宋体",
            sz: 11,
            color: { rgb: "#FFFF0000" },
            bold: true,
            italic: false,
            underline: false,
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
          },
        };
      } else if (
        key.replace(/[^0-9]/gi, "") != 1 &&
        key.replace(/[^0-9]/gi, "") != 2 &&
        key.replace(/[^0-9]/gi, "") != 3
      ) {
        dataInfo[key].s = {
          font: {
            name: "宋体",
            // sz: 11,
            color: { rgb: "#FFFF0000" },
            // bold: false,
            // italic: false,
            // underline: false
          },
          // alignment: {
          //   horizontal: "center" ,
          //   vertical: "center"
          // }
        };
      }
    });
  }

  self.saveAs(XLSX.utils.format2Blob(wb), fileName + ".xlsx");
}
