const  http = require('http');
require('dotenv').config();
const app = require('./app');
// const path = require('path'); 
const PORT = process.env.PORT;
// const express = require('express')

// app.use(express.static(__dirname + '/dist/MVVPI'));
// app.get('/*',(req,res)=>res.sendFile(path.join(__dirname)));

const server = http.createServer(app);


server.listen(PORT,()=> console.log(`server Started on port ${PORT}`));