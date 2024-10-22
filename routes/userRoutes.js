const express = require('express');
const { login } = require('../controllers/userController'); 

const router = express.Router();

// POST /login - Route for user login
router.post('/login', login); 

module.exports = router;
