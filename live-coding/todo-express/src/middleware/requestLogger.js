import express from 'express';
import crypto from 'crypto';

const requestLogger = express.Router();

requestLogger.use((request, response, next) => {
  request.id = crypto.randomInt(10e8, 10e9);

  console.log("Request id: " + request.id);

  next();
});

export default requestLogger;