const { genSaltSync, hashSync, genSalt } = require('bcryptjs');
const _createService = require('./user.Service');

module.exports._createService = (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt)
    _create(body, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json(
                {
                    success: 0,
                    message: "Db Connection error"
                })
        }
        return res.status(500).json(
            {
                success: 1,
                data: results
            })
    });


}