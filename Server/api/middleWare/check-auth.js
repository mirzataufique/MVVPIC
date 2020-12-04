const jwt =  require('jsonwebtoken');
module.exports = (req,res)=>{
    try{
        const decode= jwt.verify(req.bod.token,process.env.JWT_KEY);
        req.userData = decoded;
    }catch(error){
        return res.status(401).josn({
            message: "Auth Failed"
        })
    }
    
    next();
}