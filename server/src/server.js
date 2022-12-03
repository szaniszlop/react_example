import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import xss from 'xss-clean';
import apiRoutes from'./router/apiRouter.js';

import express from'express';
import cors from'cors';
import bodyParser from'body-parser';
import jwt from'express-jwt';
import jwksRsa from'jwks-rsa';
import dotenv from 'dotenv';
dotenv.config();

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

const apiLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 20 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (_request, res, _next) => res.status(429).json({
      status: false,
      message: "Too many requests, please try again later."
  }),
})

const app = express();

// Enable CORS and secure server
app.use(cors());
app.use(helmet());
app.use(xss());

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// configure routes
app.get('/ip', (request, response) => response.send(request.ip))
app.use('/api/v1', apiLimiter, checkJwt, apiRoutes);

// Launch the API Server at localhost:4000
app.listen(process.env.EXPRESS_PORT);
