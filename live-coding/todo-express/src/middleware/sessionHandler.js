import session from 'express-session';
import express from 'express';
import crypto from 'crypto';

const sessionHandler = express.Router();

/* session configuration */
const details = {
  secure: false, /* http utan SSL (https) */
  saveUninitializedData: true,
  secret: crypto.randomUUID()
}
console.log(details.secure);

sessionHandler.use(session(details));

export default sessionHandler;