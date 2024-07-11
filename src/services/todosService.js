/* eslint-disable no-console */
/* eslint-disable no-shadow */
const { Todo } = require("../models/Todo.model.js");
const { Op } = require("sequelize")

const normalize = ({ id, ...rest }) => {
  return {
    id,
    ...rest,
  };
};

const getAll = async (userId) => {
  const todos = await Todo.findAll({ where: { userId } }).then((result) => {
    return result.map((todo) => todo.dataValues);
  });

  return todos;
};

const getTodoById = async (id) => {
  return Todo.findByPk(id);
};

const createTodo = async (title) => {
  return Todo.create({ title, completed: false });
};

const removeTodoById = async (id) => {
  return Todo.destroy({ where: { id } });
};

const removeTodos = async (ids) => {
  return Todo.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};

const updateTodo = async ({ id, title, completed }) => {
  const updateFields = {};

  if (title !== "") updateFields.title = title;
  if (completed !== undefined) updateFields.completed = completed;

  const [updated] = await Todo.update(updateFields, { where: { id } });

  if (updated) {
    return Todo.findByPk(id);
  }
  return null;
};

module.exports = {
  normalize,
  getAll,
  getTodoById,
  createTodo,
  removeTodoById,
  removeTodos,
  updateTodo,
};
