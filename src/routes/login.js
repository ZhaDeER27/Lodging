const express = require('express');
const LoginController = require('../controllers/LoginController');

const router = express.Router();

router.get('/login', LoginController.login);
router.post('/login', LoginController.auth);
router.get('/register', LoginController.register);
router.get('/logout', LoginController.logout);
router.post('/register', LoginController.storeUser);

module.exports = router;

