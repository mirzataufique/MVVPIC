
const mysql =require('mysql');// Importing sql Package
const {createPool} = require('mysql')
//var myConnection = require('express-myConnection')


// 
        const pool=mysql.createConnection({         //Data base Connection
            // host    : process.env.APP_HOST,
            // port    : process.env.DB_PORT,
            // user    : process.env.DB_USER,
            // password: process.env.DB_PASS,
            // database:process.env.MYSQL_DB,
            // debug   :false,
            // multipleStatements:true,
            // createConnection: 10,



            // host    :'localhost',
            // user    :'root',
            // password:'root@123',
            // database:'Student_DB',
            // debug   :false,
            // multipleStatements:true,
            // createConnection: 10,

        
        });
        pool.connect((err)=>{
            if(!err){
                // res(db);
                console.log('DB Connection Stablished')
            }
            else
            console.log('DB connnection failed \ n error:'+JSON.stringify(err,undefined,2));
    
   })
    module.exports = pool;