const moment = require('moment');
const fs = require('fs');
const logger =(req,res,next )=>{
    console.log('Logger Middle-Ware called');
    console.log(`${req.protocol}://${req.get('host')}${
        req.originalUrl} : ${moment().format()}`);
    // next();

// ============> To create log file to the local system
// const now =  new Date().toString();
// var log = `${now}: ${req.method} ${req.url}`;
// fs.appendFile('server_log.txt',log +'\n ',(err)=>{ // appened method accepts 3 parameters 1-file name /2-data which will written(in my case "log")/ 3-call back fuction
// // console.log('log file created..')
// if(err){
//     console.log(err);
// }
// })
// next();
};
module.exports = logger;