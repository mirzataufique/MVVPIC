const express = require('express');
const app = express();
const logger = require('./Middleware/logger');
const routes = require('./routes/api/server');
const cors = require('cors');
// const csvService =  require('./Middleware/csvGenrator');

//init middle-ware
app.use(logger);
app.use(cors({
    origin:'http://localhost:4200'
}));
app.use(express.json() );
app.use('/api/server',require('./routes/api/server'));
app.use(routes);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=> console.log(`server Started on port ${PORT}`));