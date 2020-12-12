const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleWare/check-auth');



router.get('/', (req, res, next) => {
    // Users.find({userType: 'student'}) // get where user Tpye is Student
    Users.find()
        .select('_id userEmail userType userPhoto userPassword')
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
})
router.post('/signup', (req, res, next) => {
    console.log("inside signup -->");
    Users.find({ userEmail: req.body.userEmail })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    message: 'Opps..! Email is already exits',
                });
            } else {
                bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            message: 'Failed..!',
                            error: err
                        });

                    } else {
                        const users = new Users({
                            _id: new mongoose.Types.ObjectId(),
                            userEmail: req.body.userEmail,
                            userType: req.body.userType,
                            userPhoto: req.body.userPhoto,
                            userPassword: hash
                        });
                        users.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'success',
                                    users: users
                                });
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    message: "Data Writing failed..!",
                                    error: err
                                });
                            });
                    }
                })

            }
        });
});

router.post('/login', (req, res, next) => {
    console.log("inside login -->", req.body);
    Users.find({ userEmail: req.body.userEmail, userType: req.body.userType })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Authentication Failed"
                });
            }
            bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Authentication Failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            userEmail: user[0].userEmail,
                            userId: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1hr"
                        }
                    );
                    return res.status(200).json(token);
                }
                return res.status(401).json({
                    message: "Authentication Failed"
                });
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Something went wrong..!",
                error: err
            });
        });
});

// router.get('/userEmail', verifyT, (req, res, next) => {
//     console.log("res--",res)
// return  res.status(200).json(this.decodedToken.userEmail);
// });;

// var decodedToken='';
// function verifyToken(req, res, next) {
//     let token = req.query.token;
//     console.log("Toekn for verifcation")
//     jwt.verify(token, process.env.JWT_KEY, (err, tokendata) => {
//         if (err) {
//             res.status(500).json({
//                 message: "Unauthorized requiest",
//                 error: err
//             });
//         }
//         if(tokendata){
//             decodedToken :tokendata;
//             next();
//         }
//     });
// };

router.get('/:user_id', (req, res, next) => {
    const id = req.params.user_id;
    Users.findById(id)
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
router.patch('/:user_id', (req, res, next) => {
    const user_id = req.params.user_id;
    res.status(200).json({
        message: 'update a single users',
        user_id: user_id
    })
})
router.delete('/:user_id', (req, res, next) => {
    console.log("deleted called")
    const id = req.params.user_id;
    Users.deleteMany({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Success',
                result: result

            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "Failed to Delete the user..!",
                error: err
            });
        });



})

module.exports = router;