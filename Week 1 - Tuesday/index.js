const data = require('./data.json');
const array = [1, 2, 3, 4, 5 , 6, 7, 8, 11, 122, 1111, 2122, 9999, 8888];
var arrayOdd = array.filter((iterator) => iterator%2 != 0);
console.log('mảng mới gồm các số lẻ: ', arrayOdd);
var arrayLarger10 = array.filter((i) => i > 10);
console.log('mảng mới gồm các số > 10: ', arrayLarger10);
var arraySum = array.reduce((sum, i) => sum + i, 0);
console.log('tổng các số trong mảng: ', arraySum);

// JSON file
const arrayLogs = data["logs"];
var arrayType = arrayLogs.filter((element) =>  element["txnType"] == "buy");
console.log('mảng dữ liệu của “logs” thoản mãn có “txnType” = “buy: ”',arrayType);
var arrayPrice = arrayLogs.filter((element) =>  element["priceUsd"] > 100);
console.log('mảng dữ liệu của “logs” thoản mãn có “priceUsd” > 100 đô: ',arrayPrice);
var sumLogs = arrayLogs.reduce((sum, i) => sum + Number(i["priceUsd"]),0);
console.log('Tổng priceUsd: ',sumLogs);
var sortLogs = arrayLogs.sort((a, b) => parseFloat(b.blockTimestamp) - parseFloat(a.blockTimestamp));
console.log('mảng dữ liệu của “logs” thoản mãn sắp xếp theo thứ tự giảm dần của “blockTimestamp”: ',sortLogs);
var arrayMaker =  arrayLogs.filter((element) =>  element["maker"] == "0x4dD11dd96f4460490d3426fEEbF201Ad369b80F6");
console.log('mảng dữ liệu của “logs” thoản mãn có “maker” là “0x4dD11dd96f4460490d3426fEEbF201Ad369b80F6”: ',arrayMaker);