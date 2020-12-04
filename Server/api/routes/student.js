const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Students = require('../model/student');
const multer = require('multer');
const checkAuth = require('../middleWare/check-auth');

//Upload a file and its configuration
const storage = multer.diskStorage({
    destination: function (req, file, callbback) {
        callbback(null, './uploads');
    },
    filename: function (res, file, callbback) {
        callbback(null, file.originalname + new Date().toISOString());
    }

});
const fileFilter = (req, file, callbback) => {
    // if (file.mimetype === '/image/jpg' || file.mimetype === '/image/png') {
        callbback(null, true)
    // } else {
        callbback(null, false);
    // }
}
const upload = multer({
    storage: storage,
    limits: {
        //setting filesize as 5mb
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
});


router.get('/', (req, res, next) => {
    Students.find()
        .exec()
        .then(doc => {
            console.log("doc", doc);
            // res.status(200).json(doc);
            if (doc.length >= 0) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No data found..!" });
            }

        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: err });
        });
});
// router.post('/', upload.single('marksheetImg'), (req, res, next) => {
    router.post('/',(req, res, next) => {
    console.log("post hit--->", req.body)
    const students = new Students({
        _id: new mongoose.Types.ObjectId(),
        std_name: req.body.std_name,
        std_father: req.body.std_father,
        std_mother: req.body.std_mother,
        std_dob: req.body.std_dob,
        std_address: req.body.std_address,
        std_mobile: req.body.std_mobile,
        std_department: req.body.std_department,
        std_email: req.body.std_email
        // marksheetImg: req.file.path
    });
    students
        .save()
        .then(result => {
            // console.log("result-->", result);
            res.status(201).json({
                message: 'success',
                Createstudents: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Data Writing failed",
                error: err
            });
        });

});
router.get('/:std_id', (req, res, next) => {
    const id = req.params.std_id;
    Students.findById(id)
        .exec()
        .then(doc => {
            console.log("doc--->", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({ message: "No valid entry found for the id" });
            }

        })
        .catch(err => {
            console.log("Doesn't exist the for the provided Id")
            res.status(500).json({
                message: "Doesn't exist the for the provided Id",
                error: err
            });
        });

});
router.patch('/:std_id', (req, res, next) => {
    const id = req.params.std_id;
    const updateOps = {};
    for (let ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Students.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                message: "success",
                result: result
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "failed..",
                error: err
            });
        })
});
router.delete('/:std_id', (req, res, next) => {
    const id= req.params.std_id;
    Students.deleteMany({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'success',
                result: result,
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "failed..",
                error: err
            });
        });

});
module.exports = router;