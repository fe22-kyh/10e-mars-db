import express from 'express';

const errorHandler = express.Router();

// Fångar felet från express
// Slutet av alla förfrågningar
// En use på slutet, kan endast vid fel
errorHandler.use((error, request, response, next) => {

  console.log("\n New ERROR ");
  console.log("From: " + request.ip);
  console.log("Request-id: " + request.id);
  console.log("Requested resource: " + request.path);
  console.log("Message: " + error.serverInfo);

  response.send(error.clientInfo);
});

export default errorHandler;