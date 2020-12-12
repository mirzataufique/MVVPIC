const mongoos = require('mongoose');
urls ='mongodb+srv://mvvpicDb:mvvpicDb@123@mvvpic-cluster.ajuej.mongodb.net/<dbname>?retryWrites=true&w=majority&ssl=true'
// url = "mongodb+srv://mvvpicDb:mvvpicDb@123@mvvpic-cluster.ajuej.mongodb.net/<dbname>?retryWrites=true&w=majority"
const connectDB = async()=>{
    await mongoos.connect(urls,
         { useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(()=>{
        console.log("DB connected---->");
    }) 

} 
module.exports = connectDB;
