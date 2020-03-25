const crypto = require('crypto');
// const decipher = crypto.decipher(userna)

const data= "test";
const encriptData = crypto.createHmac('sha256',data).digest('hex');
console.log("encrpted data->",encriptData)
console.log("hiiii----")