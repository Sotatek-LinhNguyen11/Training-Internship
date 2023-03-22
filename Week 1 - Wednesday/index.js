const fs = require('fs');
const fs_promise = require('fs/promises');
const rp = require('request-promise');

// fs.readFile('./read.txt',(err, data)=>{
//     if(err) throw("Error from reading read.txt!");
//     console.log(data.toString());
// })
// fs.writeFile('./read.txt',"New Content",(err)=>{
//     if(err) throw("Error from writing read.txt!");
//     console.log("Writing successfully!");
// })
// fs_promise.readFile('./read.txt')
// .then(result=>{
//     console.log(result.toString());
// })
// .catch(err=>{
//     console.log(err);
// })
// async function readAFile(){
//     let file_read = await fs_promise.readFile('./read.txt');
//     console.log(file_read.toString());
// }
// try{
//    readAFile();
// } catch(err){
//     console.log(err);
// }

var options = {
    uri: 'https://dexscreener-api.sotatek.works/api/v1/trading-history/recent/bsc/0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE?limit=100',
    // qs: {
    //     access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    // },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};
 
rp(options)
    .then(function (data) {
        // console.log(typeof(data));
        console.log(JSON.stringify(data));
    })
    .catch(function (err) {
        console.log(err);
    });