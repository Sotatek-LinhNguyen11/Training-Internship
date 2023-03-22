const fs = require('fs');
const fs_promise = require('fs/promises');
fs.readFile('./read.txt',(err, data)=>{
    if(err) throw("Error from reading read.txt!");
    console.log(data.toString());
})
fs.writeFile('./read.txt',"New Content",(err)=>{
    if(err) throw("Error from writing read.txt!");
    console.log("Writing successfully!");
})
fs_promise.readFile('./read.txt')
.then(result=>{
    console.log(result.toString());
})
.catch(err=>{
    console.log(err);
})
async function readAFile(){
    let file_read = await fs_promise.readFile('./read.txt');
    console.log(file_read.toString());
}
try{
   readAFile();
} catch(err){
    console.log(err);
}

