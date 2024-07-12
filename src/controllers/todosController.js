const todosService = require("../services/todosService.js");

const listAllTodos = async (req, res) => {
  const { userId } = req.query
  try {
    const todos = await todosService.getAll(userId);

    res.status(200).send(todos.map((todo) => todosService.normalize(todo)));
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await todosService.getTodoById(id);

    if (!todo) {
      return res.sendStatus(404);
    }
    res.status(200).send(todo);
  } catch (error) {
    res.sendStatus(500);
  }
};

const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send("Title is required!");
  }

  try {
    const newToDo = await todosService.createTodo(title);

    res.status(201).json(newToDo);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const removeTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todoToRemove = await todosService.removeTodoById(Number(id));

    if (!todoToRemove) {
      return res.sendStatus(404);
    }
    const todos = listAllTodos();
    
    res.status(204).send(todos);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (!id || title === '') {
    return res.sendStatus(400);
  }

  try {
    const todoToUpdate = await todosService.updateTodo({
      id: Number(id),
      title,
      completed,
    });

    if (!todoToUpdate) {
      return res.sendStatus(404);
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).send(todoToUpdate);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  listAllTodos,
  getTodoById,
  createTodo,
  removeTodo,
  updateTodo,
};
