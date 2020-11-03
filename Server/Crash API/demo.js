const express = require('express');
const app = express();
// const logger = require('./Middleware/logger');
const bodyParser = require('body-parser');
const routes = require('./routes/api/server');
const cors = require('cors');
require("dotenv").config();
// const csvService =  require('./Middleware/csvGenrator');

//init middle-ware
// app.use(logger);
app.use(cors({
    origin:'http://localhost:4200'
}));
app.use(bodyParser.json());

app.use(express.json());
app.use('/api',require('./routes/api/server'));
app.use(routes);

const PORT=process.env.PORT;
app.listen(PORT,()=> console.log(`server Started on port ${PORT}`));