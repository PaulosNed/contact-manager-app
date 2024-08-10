const express = require('express');
const { CreateUser, Login } = require('../controllers/usersController');

const router = express.Router();

router.post('/register', CreateUser);
router.post('/login', Login);

module.exports = router;  

