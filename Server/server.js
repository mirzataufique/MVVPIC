const  http = require('http');
require('dotenv').config();
const app = require('./app')

const PORT = process.env.PORT;
const server = http.createServer(app);

// app.use(express.static('MVVPIC'));
server.listen(PORT,()=> console.log(`server Started on port ${PORT}`));