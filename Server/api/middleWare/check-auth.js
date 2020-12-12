const { ConsoleReporter } = require('jasmine');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // console.log('token verifier called',process.env.JWT_KEY);
    // try{
    //     const token = request.headers.authorization.split(" ")[1]; 
    //     console.log('token with hearders-->',token)
    //     const decoded= jwt.verify(request.body.token,process.env.JWT_KEY);
    //     request.userData = decoded;
    //     next();
    // }catch(error){
    //     return response.status(401).josn({
    //         message: 'Token Verification Failed'
    //     })
    // }
    console.log("inside check auth");
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    // console.log('token',token)
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
        console.log('token',token)
    }
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
            if (error) {
                return res.json({
                    success: false,
                    message: 'token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'token is not supplied..!'
        });
    }
}


