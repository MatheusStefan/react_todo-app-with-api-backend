const { Router } = require("express");
const todosController = require("../controllers/todosController.js");

const todosRouter = Router();

todosRouter.get("/", todosController.listAllTodos);
todosRouter.post("/", todosController.createTodo);
todosRouter.get("/:id", todosController.getTodoById);
todosRouter.patch("/:id", todosController.updateTodo);
todosRouter.delete("/:id", todosController.removeTodo);
todosRouter.delete("/:ids", todosController.removeTodos);

module.exports = todosRouter;
