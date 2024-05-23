const express = require('express');
const todoController = require('../controllers/todoController');

const router = express.Router();

router.get('/', todoController.getTodos);
router.post('/', todoController.addTodo);
router.delete('/:id', todoController.deleteTodo);
router.patch('/:id', todoController.toggleTodo);

module.exports = router;
