//const express = require('express') <-- icke module
import express from 'express';
import path from 'path';
import url from 'url';
import mustache from 'mustache-express';
import crypto from 'crypto';
import { deleteTodo, fetchAllTodos, fetchTodo, saveTodo } from './src/service/todoService.js';

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

/* custom built middlewares */

// Logger
app.use((request, response, next) => {
  request.id = crypto.randomInt(10e8, 10e9);

  //console.log("Request id: " + request.id);

  next();
});

/* Resource routes */

app.get("/showTodos", (request, response) => {
  if (db.todos.length == 0) {
    let error = new Error();
    error.clientInfo = "Todo list is empty, are you sure you have added todos?";
    error.serverInfo = "A user attempted to fetch an empty todos";
    throw error; // "Ungefär" samma som att returnera ett fel
  }

  response.send(db.todos); //displays all todos in json format
});

// http://localhost:3030/showTodos/query?title=....
app.get("/showTodos/query", (request, response) => {
  let query = { title: request.query.title };

  fetchTodo(query).then(todo => response.send(todo));

});

app.get("/deleteTodo", (request, response) => {

  deleteTodo(request.query.title).then(todo => response.send(todo));

})

app.post("/createTodo", (request, response) => {
  const todo = request.body; //request.body set by middleware urlencoded or json
  if (request.body == undefined) {
    let error = new Error();
    error.clientInfo = "Something went encoding, contact server admin";
    error.serverInfo = "The requested body was undefined";
    throw error;
  } else if (todo.title == undefined) {
    let error = new Error();
    error.clientInfo = "Title was empty, make sure it has a value";
    error.serverInfo = "A title submitted by a user was empty";
    throw error;
  }

  //db.todos.push(todo); //add todo in database
  saveTodo(todo);

  response.redirect("/home"); // Tell the user to perform a new GET request
});


app.get("/home", (request, response) => {

  fetchAllTodos().then(data => response.render("home-page", { todos: data }));

});

//Om Ingen annan get hanterade förfrågan
app.get("*", (req, res) => {
  let error = new Error();
  error.serverInfo = "Path not resolved";
  error.clientInfo = "The url that you used is not valid";
  throw error; // Kasta felet till express
});

// Fångar felet från express
// Slutet av alla förfrågningar
// En use på slutet, kan endast vid fel
app.use((error, request, response, next) => {

  console.log("\n New ERROR ");
  console.log("From: " + request.ip);
  console.log("Request-id: " + request.id);
  console.log("Requested resource: " + request.path);
  console.log("Message: " + error.serverInfo);

  response.send(error.clientInfo);
});

/* Server startup */
async function afterWebContainerStarted() {
  console.log(`Server initialized on addr ${addr}`);
  console.log(`Port ${port} is used for server traffic`);

  console.log("Server is ready...");
}


app.listen(port, addr, afterWebContainerStarted); // There server awaits connections