const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { mongoose } = require('./database.js');
var contactController = require('./controllers/contactController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3030, () => console.log('Server started at port : 3030'));

app.use('/ContactMEAN',contactController);
