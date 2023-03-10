import express from 'express';
import authController from '../controller/authController.js';
import todoController from '../controller/todoController.js';
import authFilter from '../filter/authFilter.js';
import todoFilter from '../filter/todoFilter.js';

const router = express.Router();

router.get("/showTodos", todoFilter.handleEmptyList, todoController.showAll);

router.get("/showTodos/query", todoController.queryByTitle);

router.get("/deleteTodo", todoController.deleteByTitle);

router.get("/home", authFilter.authenticate, todoController.viewHome);

const createTodoFilter = [authFilter.authenticate, todoFilter.malformedRequestBody];
router.post("/createTodo", createTodoFilter, todoController.createTodo);


/* authentication routes */
router.get("/login", authController.showLoginPage);

router.post("/login", authController.login);

router.post("/logout", authController.logout);


//Om Ingen annan get hanterade förfrågan
router.get("*", (req, res) => {
  let error = new Error();
  error.serverInfo = "Path not resolved";
  error.clientInfo = "The url that you used is not valid";
  throw error; // Kasta felet till express
});


export default router;