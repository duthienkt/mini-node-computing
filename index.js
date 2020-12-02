// global.window = global;
// global.performance = {};
// global.performance.now = function () { return new Date().getTime(); };
// require("./Azar.js");
const bodyParser = require('body-parser');
const express = require("express");


const app = express();

app.use(bodyParser.text({ type: 'text/plain', limit: '10mb', extended: true }));

require('./routes/xmlParse')(app);
require('./routes/mailer')(app);


app.listen(process.env.PORT || 5000);
