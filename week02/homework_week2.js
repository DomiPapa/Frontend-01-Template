// 写一个正则表达式 匹配所有 Number 直接量
const re_1 = /\d*/g;
// 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
const re_2 = /(\'\S+\')|(\"\S+\")/g;
// 写一个 UTF-8 Encoding 的函数
function UTF8Encoding(sInput) {
  let res;
  let inputArr = sInput.split("");
  console.log(inputArr);
  let codePointArr = inputArr.map((ele) => ele.codePointAt(0));
  console.log(codePointArr);
  let binaryArr = codePointArr.map((ele) => {
    let resEle = "";
    if (ele <= 127) {
      // 单字节字符
      resEle = 0 + ele.toString(2);
    } else {
      // 先把十进制数转成二进制字符串，转成数组存储
      let arrReBinRes = ele.toString(2).split("");
      let arrTemplet = [];
      if (127 < ele <= 2047) {
        // 双字节字符
        arrTemplet = "xxxxxx01 xxxxx011".split("");
      } else if (2047 < ele <= 65535) {
        // 三字节字符
        arrTemplet = "xxxxxx01 xxxxxx01 xxxx0111".split("");
      } else {
        // 四字节字符
        arrTemplet = "xxxxxx01 xxxxxx01 xxxxxx01  xxx01111".split("");
      }
      resEle = handleEncoding(arrReBinRes, arrTemplet);
    }
    return resEle;
  });
  function handleEncoding(srcArr, temArr) {
    let res = "";
    for (let i = 0; i < temArr.length; i++) {
      if (temArr[i] === "x") {
        if (srcArr.length != 0) {
          // 只要需被填入的数组不为空，向模板数组中替换值
          temArr[i] = srcArr.pop();
        } else {
          // 被填入的数组数组为空，替换模板数组中剩下的x为0
          temArr[i] = "0";
        }
      }
    }
    res = temArr.reverse().join("");
    return res;
  }
  console.log(binaryArr);
  res = binaryArr;
  return res;
}
