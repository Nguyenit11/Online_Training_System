const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');

const registerSchema = {
  email: { required: true },
  password: { required: true, minLength: 6 },
  full_name: { minLength: 2 },
  name: { minLength: 2 },
};

const loginSchema = {
  email: { required: true },
  password: { required: true },
};

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;
