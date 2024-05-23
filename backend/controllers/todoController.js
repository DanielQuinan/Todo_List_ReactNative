const Todo = require('../models/todo');

exports.getTodos = async (req, res) => {
  const todos = await Todo.getAll();
  res.json(todos);
};

exports.addTodo = async (req, res) => {
  const { text } = req.body;
  const newTodo = { text, completed: false };
  await Todo.add(newTodo);
  res.json(newTodo);
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.remove(id);
  res.sendStatus(204);
};

exports.toggleTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.toggleComplete(id);
  res.sendStatus(200);
};
