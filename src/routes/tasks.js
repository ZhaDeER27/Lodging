const express = require('express');
const TasksController = require('../controllers/TasksController');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.post('/login', LoginController.auth);
router.get('/tasks', TasksController.index);
router.get('/create', TasksController.create);
router.post('/create', TasksController.Agregar);
router.get('/logout', LoginController.logout);
router.post('/tasks/delete', TasksController.destroy);
router.get('/tasks/edit/:IdHabitacion', TasksController.edit);
router.post('/tasks/edit/:IdHabitacion', TasksController.update);

module.exports = router;