const db = require('../../../Config/dbConnection')

module.exports.create = (data,res)=> {

    db.query(`insert into registerUser(userName, userEmail, password, number, gender) values(?,?,?,?,?)`,
    [data.username,
    data.userEmail,
    data.password,
    data.number,
    data.gender], (err, results,fields) => {
        if (err){
            return  res(err);
        }
        return res(null,results);
         
    }

    )
}