import express from 'express';

// Handlers
import { homeHandler } from './handlers/home.handler';
import { notFoundHandler } from './handlers/notFound.handler';
import { errorHandler } from './handlers/error.handler';
import * as handler from './handlers/shortener.handler';

const app = express();

// Tell express server to parse incomming body json data
app.use( express.json() );

/**
 *  @PATH '/', '/home', '/welcome', '/hello'
 *  @METHOD GET
 *  @DESCRIPTION Retrieve Api welcome response
 **/ 
app.get(['/', '/home', '/welcome', '/hello'], homeHandler);

/**
 *  @PATH "/"
 *  @METHOD POST
 *  @DESCRIPTION Creates a short url  
 **/ 
app.post(`/`, handler.createShortUrl);

/**
 *  @PATH "/:shortPath"
 *  @METHOD GET
 *  @DESCRIPTION Redirect client to original url
 **/ 
app.get(`/:shortPath`, handler.redirectToTrueUrl);

/**
 *  @PATH "*"
 *  @METHOD ALL
 *  @DESCRIPTION No routes match
 **/ 
app.all('*', notFoundHandler);

/**
 *  @DESCRIPTION Custom Express Error handler
 **/ 
app.use(errorHandler); 

export default app;