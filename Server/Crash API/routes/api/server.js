const express = require('express');
const router = express.Router();
var json2csv = require('json2csv');
var fs = require('fs');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Cryptr = require('cryptr');

//Middlewares=====>
const upload = require('../../Middleware/services/fileUpload')
const db = require('../../DataBase/dbConnection');
const csv = require('../../Middleware/services/csvGenerate');
const mail = require('../../Middleware/services/mailer');
const xlsx = require('../../Middleware/services/readXlsx');



console.log('Middleware api/router called');
// ====================decription =============>


// =============node mailer===================================>
var CryptoJS = require("crypto-js");
router.get('/login/:username/:password', (req, res) => {
    console.log("login API Called=============>");
    console.log('req encripted userdetails--->', req.params.username, req.params.password);
//     var data=[{
//         "username": req.params.username,
//         "password": req.params.password  
//     }]
//     var data = [{id: 1}, {id: 2}]
//     var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
//     console.log("encdata------------>",ciphertext);
//     var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
// console.log("decr data",decryptedData);
    
    // var dcrpass = CryptoJS.AES.decrypt(password, 'secret key 123');
    // console.log("dec pass--->", dcrpass)
    // var decrypteduser = JSON.parse(dcrpass.toString(CryptoJS.enc.Utf8));
    // // console.log("decripted usrname-->", decrypteduser);
    // console.log("decripted usrname-->", dcrpass);
    // // encrypt_user='hello';
    // encrypt_pass=req.params.password;

    // cryptr = new Cryptr('mirza');
    // var decriptUser=cryptr.encrypt(encrypt_user);
    // console.log('--->',decriptUser)
    // var encriptPass =cryptr.decrypt(encrypt_pass)
    // console.log('decript--->',encriptPass);

    // console.log("deripted username-->",username);


    db.query('select * FROM login', (err, rows) => {
        console.log('login data from database---->', rows[0].username, rows[0].password);
        // if (err) {
        //     // console.log(res.status(400), err);
        //     // res.status(400).json({error: err});
        //     res.send({
        //         "status": "400",
        //         "message": "failed"
        //     })
        // } else {
        //     // console.log('data'+JSON.stringify(rows));         
        //     //res.status(200).json({Report:rows});    
        //     res.send({
        //         "status": "200",
        //         "data": rows

        //     })
        // }

        if (rows[0].username == req.params.username && rows[0].password == req.params.password) {
            console.log('successfully login');
            res.send({
                "status": true,
                "msg": 'succesfull loged-in'
            })
        }
        else {
            console.log('username & password does not match');
            res.send({
                "status": false,
                "msg": 'username & password does not match'
            })
        }



    })
})
router.post('/register', (req, res) => {
    console.log("registration PI  called==========>")
    data = req.body;
    console.log("data inside PAI-->", data)
    db.query('INSERT INTO login SET ?', data, (err) => {
        if (err) {
            console.log("failed", err);
            res.send({
                'status': false,
                'msg': 'data insertion failed'
            })
        }
        else {
            console.log("Succesfully inserted");

            res.send({
                'status': true,
                'msg': "Succesfully inserted"
            })

        }
    })
});

router.get('/mail', (req, res, err) => {
    console.log("nodemailer called------------->");
    // if (err) {
    //      console.log(err);         

    //     // res.send({
    //     //     "status": "400",
    //     //     "message": "failed"
    //     // })
    // } else {
    console.log("inside else------------->")
    mail.sendmail()
    res.send({
        "status": "true",
        "message": "email sent"

    })
    // }



});
router.get('/', (req, res) => {
    res.json(members);
    console.log(members);
    res.sendFile(path.join(__dirname))
});




//============================================CSV Generator==================>
router.get('/csv', (req, res) => {
    console.log("generate csv called in api--");
    csv.csvGenrater();
});

// const createCSV_file = (req, res) => {
//     console.log("create csv Called in function");
//     return new Promise((resolve, reject) => {
//         sqlQry = "select * FROM student";
//         db.query(sqlQry, (err, rows) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('data' + JSON.stringify(rows));
//                 //creating csv file=============================>
//                 var file_path = "newData.csv"
//                 console.log(__dirname)
//                 jsonexport(rows, function (err, csv) {
//                     if (err) {
//                         console.log(err);
//                     }
//                     else {
//                         console.log("==>", csv);
//                         fs.writeFile(file_path, csv, (err) => {
//                             if (err) {
//                                 console.log(err);
//                                 reject(err)

//                             } else {
//                                 console.log("Successfully Written to File.");
//                                 resolve({ "filepath": file_path, "csv": csv })

//                             }


//                         });
//                     }

//                 });
//                 console.log("________________________");
//             }

//         })

//     })
// }

router.get('/stdReport', (req, res) => {
    console.log("std report called");
    db.query('select * FROM student', (err, rows) => {
        if (err) {
            console.log(res.status(400), err);
            // res.status(400).json({error: err});
            res.send({
                "status": "400",
                "message": "failed"
            })
        } else {
            // console.log('data'+JSON.stringify(rows));         
            //res.status(200).json({Report:rows});    
            res.send({
                "status": "200",
                "data": rows

            })
        }


    })

});

router.get('/stdCvs', (req, res) => {
    console.log("=====>stdCsv Called");
    // console.log('erro--->', err);

    db.query('select std_id, std_name,std_address,std_mobile FROM student', (err, rows) => {
        console.log("data", rows);
        csv.csvGenrater(rows);
    });
    res.send({
        'status': true,
        'msg': 'CSV Created successfully'
    })


});

router.get('/stdReport/:std_id', (req, res) => {
    console.log("student report by Id called", req.params.id);
    // sql = "select * FROM Employee where empId ='" + req.params.empId + "' ";

    db.query('select * FROM student where std_id =?', [req.params.std_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.send({
                "status": "400",
                "message": "failed"
            })
        } else {
            console.log(rows);
            res.send({
                "status": "200",
                "data": rows
            })
        }

    })
});
router.delete('/stdReport/:std_id', (req, res) => {
    console.log("emp report by Id called", req.params.id);
    // sql = "select * FROM Employee where empId ='" + req.params.empId + "' ";

    db.query('delete FROM student where std_id =?', [req.params.std_id], (err, rows) => {
        if (err) {
            console.log(err);
            res.send({
                "status": "400",
                "message": "data delete failed"
            })
        } else {
            console.log('data deleted successfully');
            res.send({
                "status": "200",
                "mesage": "data successfully deleted"
            })
        }

    })
});

router.post('/stdSave', (req, res) => {

    console.log("std Post data called----->");
    var data = req.body;
    console.log('data is==>', data);
    const token_no = { id: req.std_id };
    const token = jwt.sign(token_no, 'my-token_num');
    console.log('===>', token)
    data.token = token;

    // var final=JSON.stringify(data);
    console.log('Final data token===>', data);
    // db.query('insert into Employee values(empId,emoName,empSalary,empDesig)values(?)',(err,rows,results)=>{
    db.query('INSERT INTO student SET ?', data, (err, results, fields) => {
        if (err) {
            console.log("---->", err);
            res.send({

                "status": "400",
                "message": "data inertion failed"
            })
        } else {
            console.log('data inserted');
            res.send({
                "status": "200",
                "mesage": "data successfully inserted "
            })
        }
    })


});


router.put('/stdUpdate', (req, res) => {

    console.log("std update data called");
    var data = req.body;
    console.log('data is==>', data);
    sql = "update student set std_name='" + req.body.std_name + "',std_father='" + req.body.std_father + "',std_Mother='" + req.body.std_Mother + "', \
    stdDob='" + req.body.std_dob + "',std_address='" + req.body.std_address + "',std_department='" + req.body.std_department + "',\
    std_email='" + req.body.std_email + "',std_mobile='" + req.body.std_mobile + "',token='" + req.body.token + "',\
       where std_Id ='" + req.body.std_id + "' ";
    db.query(sql, (err, rows) => {

        if (err) {
            console.log(err);
            res.send({
                "status": "400",
                "message": "data update failed"
            })
        } else {
            console.log('data deleted successfully');
            res.send({
                "status": "200",
                "mesage": "data successfully updated"
            })
        }

    })
});

// router.post('/get_token',(req,res)=>{
//     console.log('token called');
// const token_no = {id: 3};
// const token = jwt.sign({token_no},'my-token_num');

//   console.log('===>',token)
//   res.send({
//     "token": token
//   });
// })

//=============================== File Uploading =================================>
const fileupload = require('express-fileupload');
router.use(fileupload())// middleware to upaload data

router.post('/fileupload', (req, res, next) => {
    console.log("upload method called--");
    console.log("->", req.files)
    if (req.files) {
        console.log('------->', req.files)
        var file = req.files.photo;
        file.mv("/home/taufique/Desktop/NodeJs/Crash API/uploadedData/" + file.name, (err, result) => {
            if (err) {
                console.log(err);
                res.send("error occuere");
            } else {
                console.log(req.files);
                res.send("Successfully Uploded");
            }
        })
    }
});
//============> file uplader using service
router.post('/upaldFiles', (req, res, next) => {
    console.log("=======>File Uploader called in api");

    upload.fileuploader(req, res, next);

});
// =============================>Xlsx File reader
router.get('/readFile',(req,res,err)=>{
    console.log("inside read file---->");
    xlsx.readXlsx();
    if(err){
        console.log(err);
        res.send({
            "status": false,
            message :"failed"

        })
    }else{
        
        res.send({
            "status": true,
            message :"successfully Inserted"

        })
    }
    
  
    
})
router.get('/quiz', (req, res) => {
    console.log("quiz called");
    // sql = "select * FROM Employee where empId ='" + req.params.empId + "' ";

    db.query('SELECT * FROM Questions;', (err, rows) => {
        if (err) {
            console.log(err);
            res.send({
                "status": "400",
                "message": "failed"
            })
        } else {
            console.log(rows);
            res.send({
                "status": "200",
                "data": rows
            })
        }

    })
});



module.exports = router;