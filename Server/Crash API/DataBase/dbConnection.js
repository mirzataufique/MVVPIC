
const mysql =require('mysql');// Importing sql Package
//var myConnection = require('express-myConnection')


// 
        const db=mysql.createConnection({         //Data base Connection
            host    :'localhost',
            user    :'root',
            password:'root@123',
            database:'Student_DB',
            debug   :false,
            multipleStatements:true
        
        });
        db.connect((err)=>{
            if(!err){
                // res(db);
                console.log('DB Connection Stablished')
            }
            else
            console.log('DB connnection failed \ n error:'+JSON.stringify(err,undefined,2));
    
   })
    module.exports = db;