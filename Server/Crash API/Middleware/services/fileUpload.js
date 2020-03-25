
const fileupload = require('express-fileupload');
const express = require('express');
const app = express();
app.use(fileupload())// middleware to upaload data


module.exports.fileuploader = (req,res)=> {
    console.log("=========>file uploader service called");
    console.log("->", req);
    if (req.files) {
        console.log('------->', req.files)
        var file = req.files.photo;
        file.mv("/home/taufique/Desktop/NodeJs/Crash API/uploadedData/" + file.name, (err, result) => {
            if (err) {
                console.log(err);
                res.send({
                    'status': false,
                    'msg': 'error occure'
                })
            } else {
                res.send({
                    'status': true,
                    'msg': 'SUCCESSFULLY UPLOADED'
                })
            }
        })

    }
}