'user strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //req.body
const cors = require('cors'); //cross origin resource sharing 
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const mongodbUri = 'mongodb://umma:gohil123@ds121289.mlab.com:21289/saving-db';
const mongooseUri = uriUtil.formatMongoose(mongodbUri)
const dbOptions = {};


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
app.use('/api/contacts', require('./api/contacts/routes/get_contacts'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));


const hostname = 'localhost';
const port = 3001 || process.env.PORT;
const server = app.listen(port, hostname, () => {

  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
});

module.exports = app;

