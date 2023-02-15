const express = require("express");
const { getTodos, getTodoById, postTodos, postAllTodos, updateTodos, DeleteTodos } = require("../controllers/todos.controller");
const checkLogin = require("../middlewares/checklogin");
const Router = express.Router();

Router.get("/",checkLogin, getTodos);
Router.get("/:id",checkLogin, getTodoById);

Router.post('/',checkLogin, postTodos)
Router.post('/all',checkLogin, postAllTodos)


Router.put('/:id',checkLogin, updateTodos)

Router.delete('/:id',checkLogin, DeleteTodos)

module.exports = Router;
