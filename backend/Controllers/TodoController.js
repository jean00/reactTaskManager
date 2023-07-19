const Todo = require('../Models/TodoModel');

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({ status: 'success', data: { todo: newTodo } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ status: 'success', data: { todos } });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { todo } });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};
