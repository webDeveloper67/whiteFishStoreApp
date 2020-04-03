const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const router = express.Router();

router.post('/signup', authController.signpUser);
router.post('/login', authController.loginUser);

router.get(
  '/me',
  authController.protect,
  userController.getMe,
  userController.getUser
);

router.route('/').get(userController.getAllUsers);

router.param('userId', userController.userByID);

module.exports = router;
