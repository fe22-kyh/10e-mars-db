import express from 'express';
import todoController from '../controller/todoController.js';
import todoFilter from '../filter/todoFilter.js';

const router = express.Router();

router.get("/showTodos", todoFilter.handleEmptyList, todoController.showAll);

router.get("/showTodos/query", todoController.queryByTitle);

router.get("/deleteTodo", todoController.deleteByTitle);

router.get("/home", todoController.viewHome);

router.post("/createTodo", todoFilter.malformedRequestBody, todoController.createTodo);


//Om Ingen annan get hanterade förfrågan
router.get("*", (req, res) => {
  let error = new Error();
  error.serverInfo = "Path not resolved";
  error.clientInfo = "The url that you used is not valid";
  throw error; // Kasta felet till express
});


export default router;