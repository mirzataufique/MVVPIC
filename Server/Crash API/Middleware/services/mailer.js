require('dotenv').config();
const nodemailer = require('nodemailer');
module.exports.sendmail = (err,next)=> {
    console.log('Middle-ware node mailer called');
    console.log("inside service")
    // step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mirzataufique1997@gmail.com',
            pass: 'M!rza&1gg7'
            // user: process.env.EMAIL,
            // pass: process.env.PASS

        }
    }); 

    // step 2 
    let mailOption = {
        from: 'mirzataufique1997@gmail.com',
        to: 'taufique.mirza@vernost.in',
        subject: 'NodeMailer-Test ',
        text: 'Hello Nodemailer , \n welcome to node mailer test application'
    }
    // step 3
    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log("errrr--->", err);
        } else {
            console.log("email sent");
        }

    })
}