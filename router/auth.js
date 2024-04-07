const router = require('express').Router();
const { loginForm, loginUser, logoutUser } = require('../control/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
router.get('/login', loginForm)

router.post('/login', loginUser)
router.get('/logout', logoutUser)

module.exports = router;