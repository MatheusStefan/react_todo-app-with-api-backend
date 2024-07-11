/* eslint-disable no-console */
"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../db.js");

const Todo = sequelize.define(
  "Todo",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 628,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "todos",
    updatedAt: false,
    createdAt: false,
  }
);

Todo.sync()
  .then(() => {
    console.log("Todos table has been created.");
  })
  .catch((err) => {
    console.error("Error creating Expense table:", err);
  });

module.exports = {
  Todo,
};
