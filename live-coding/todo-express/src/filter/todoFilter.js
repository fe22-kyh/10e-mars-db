function handleEmptyList(request, response, next) {
  if (db.todos.length == 0) {
    let error = new Error();
    error.clientInfo = "Todo list is empty, are you sure you have added todos?";
    error.serverInfo = "A user attempted to fetch an empty todos";
    throw error; // "Ungefär" samma som att returnera ett fel
  }

  next();
}

function malformedRequestBody(request, response, next) {
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

  next();
}

export default {handleEmptyList, malformedRequestBody}