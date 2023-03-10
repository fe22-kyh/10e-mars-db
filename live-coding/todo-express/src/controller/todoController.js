import { deleteTodo, fetchAllTodos, fetchTodo, saveTodo } from '../service/todoService.js';

function showAll(request, response) {
  fetchAllTodos().then(data => response.send(data));
}

function queryByTitle(request, response) {
  let query = { title: request.query.title };

  fetchTodo(query).then(todo => response.send(todo));
}

function deleteByTitle(request, response) {
  deleteTodo(request.query.title).then(todo => response.send(todo));
}

function createTodo(request, response) {
  saveTodo(request.body);

  response.redirect("/home"); // Tell the user to perform a new GET request
}

function viewHome(request, response) {
  fetchAllTodos().then(data => response.render("home-page", { todos: data }));
}


export default { showAll, queryByTitle, deleteByTitle, createTodo, viewHome }