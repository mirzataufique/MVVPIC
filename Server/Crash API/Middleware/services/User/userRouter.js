const createUser =  require('./user.Controller')
const router =  require('express').Router();

router.post('/createUser',createUser);

module.exports  = router;