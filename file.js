
const Math=require('./math');
console.log(Math.getCircleArea(100));



const file=require('fs');
file.readFile('database.txt','utf8',(error,data)=>{
    if (error) throw error;
    console.log(data);
});