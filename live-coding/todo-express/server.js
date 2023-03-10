//const express = require('express') <-- icke module
import express from 'express';
import path from 'path';
import url from 'url';
import mustache from 'mustache-express';
import router from './src/router/router.js';
import requestLogger from './src/middleware/requestLogger.js';
import errorHandler from './src/middleware/errorHandler.js';

/* configure working directory path */
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Current working directory

/* Serer init parameter */
const app = express();
const addr = "127.0.0.1"; // <-- localhost
const port = 3030; // <-- any number between 3000 and 65535

/* configure template engine */
app.engine('html', mustache()); //initializes the templat engine
app.set('view engine', 'html'); // use files with .html
app.set('views', __dirname + '/views'); //sets the views folder to be used by render later on

/* Set body to json coded */
app.use(express.urlencoded({ extended: true })) // for html forms (extended is true by default, allows for form to json)
app.use(express.json()); // transform request (data in) data to json

/* Logger */
app.use(requestLogger);

/* Resource routes */
app.use(router);

/* Error handling */
app.use(errorHandler);

/* Server startup */
async function afterWebContainerStarted() {
  console.log(`Server initialized on addr ${addr}`);
  console.log(`Port ${port} is used for server traffic`);

  console.log("Server is ready...");
}


app.listen(port, addr, afterWebContainerStarted); // There server awaits connections