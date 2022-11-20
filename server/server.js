const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const invoices = require("./data/invoices.js");

// Enable CORS
app.use(cors());

// Create middleware for checking the JWT
const checkJwt = jwt.expressjwt({
    // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.AUTH0_JWKS_URI
    }),
  
    // Validate the audience and the issuer
    audience: process.env.AUTH0_AUDIENCE,
    issuer: process.env.AUTH0_ISSUER,
    algorithms: [ 'RS256' ]
  });

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Get all invoices - 
app.get('/api/invoices', checkJwt, jwtAuthz(["read:all"], {customUserKey: "auth"}), function(req, res){
  console.log("user: {0}", req.auth);
  res.status(200).send(invoices.repository.getInvoices());
})

// Get single invoice
app.get('/api/invoices/:id', checkJwt, jwtAuthz(['read:all'], {customUserKey: "auth"}), function(req, res){
  console.log("user: {0}", req.auth.sub, req.params);
  res.status(200).send(invoices.repository.getInvoice(req.params.id));
})

// Add new invoice
app.post('/api/invoices', checkJwt, jwtAuthz(['write:all'], {customUserKey: "auth"}), function(req, res){
    console.log("user: {0}", req.auth.sub);
    res.status(201).send(invoices.repository.addInvoice(req.body));
  })

// Delete an invoice
app.delete('/api/invoices/:id', checkJwt, jwtAuthz(['write:all'], {customUserKey: "auth"}), function(req, res){
  console.log("user: {0}", req.auth.sub, req.params);
  res.status(201).send(invoices.repository.deletInvoice(req.params.id));
})


// Launch the API Server at localhost:4000
app.listen(process.env.EXPRESS_PORT);
