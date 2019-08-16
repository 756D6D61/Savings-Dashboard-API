const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/src/mongo');
const {insertAd, getAds} = require('./database/src/ads');
const {deleteAd, updateAd} = require('./database/src/ads');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://<AUTH0_DOMAIN>/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://savingsdashboard-api',
    issuer: `https://dev-yk2dwud0.auth0.com/`,
    algorithms: ['RS256']
  });

  app.use(checkJwt);

app.post('/', async (req, res) => {
    const newAd = req.body;
    await insertAd(newAd);
    res.send({ message: 'New ad inserted.' });
  });
  
  app.delete('/:id', async (req, res) => {
    await deleteAd(req.params.id);
    res.send({ message: 'Ad removed.' });
  });

  app.put('/:id', async (req, res) => {
    const updatedAd = req.body;
    await updateAd(req.params.id, updatedAd);
    res.send({ message: 'Ad updated.' });
  });

// defining an endpoint to return all ads
app.get('/', async (req, res) => {
    res.send(await getAds());
  });

//start in-memory
startDatabase().then(async () => {
    await insertAd({title: 'Hello, now from the in-memory-database!'})
    // starting the server
    app.listen(3001, () => {
    console.log('listening on port 3001');
  });
})


/*
var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-yk2dwud0.eu.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"C6VimOeYV2lGSEKl1BOKmbeIIVRMvjGR","client_secret":"BxpOCgyoKB4FdqIUZ_vGi6cN_yiDqxsgDPJZ8CyIR8VhXVuURhA6h8hhB2rF137f","audience":"https://savingsdashboard-api","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
 */

 /*
 {
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJqUkZOMFEyT0RRMlF6RTJSVEk0UkRrd1F6SXdRVVUxTVVNeU56STJNVUl6TWpBNE5ERTFRUSJ9.eyJpc3MiOiJodHRwczovL2Rldi15azJkd3VkMC5ldS5hdXRoMC5jb20vIiwic3ViIjoiQzZWaW1PZVlWMmxHU0VLbDFCT0ttYmVJSVZSTXZqR1JAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc2F2aW5nc2Rhc2hib2FyZC1hcGkiLCJpYXQiOjE1NjU5NjcwOTIsImV4cCI6MTU2NjA1MzQ5MiwiYXpwIjoiQzZWaW1PZVlWMmxHU0VLbDFCT0ttYmVJSVZSTXZqR1IiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.DwIXuCKIZ7oTk56YLByMXb4MJU2V31AUa3z0Nh4Ec8PcdV3knU_gY4ChluDzGCxa3syFuOeQEzob9o3v6cYi-FWH4PZfHxpIAFD_82wyIUT5R0VU4mwc-FEgdKQCG6RhdMCWOCEORLpcpigDID0yR-uJGMiOpB3VviDxOmXLzgXnW4P5i14vkJdKvyJnByPJNeBtUPrpuguKl-xa3-rPVHYjHv9Ln0fSFv4VU8mPsxI5yoCWvbJt5v7yE11GPQwxIHUhR8eMBqmaH0qTI-2IYZ-fv3E7z65W1aFE7U0VRq5E6wQpyRSTIvzTsG9iTuquK6bPi0H7EIqOgP_A89i-rQ",
  "token_type": "Bearer"
}

  */