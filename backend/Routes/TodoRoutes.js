const express = require('express');
const router = express.Router();
const todoController = require('./../Controllers/TodoController');

router.post('/create', todoController.createTodo);
router.get('/', todoController.getTodos);
router.patch('/update/:id', todoController.updateTodo);
router.delete('/delete/:id', todoController.deleteTodo);

module.exports = router;
