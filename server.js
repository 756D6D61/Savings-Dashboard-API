'user strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //req.body
const cors = require('cors'); //cross origin resource sharing 
let contacts = require('./data');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/api/contacts', (request, response) => {
    response.json(contacts);
});

const hostname = 'localhost';
const port = 3001;

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
})