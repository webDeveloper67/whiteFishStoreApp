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

router.patch(
  '/updateMe',
  authController.protect,
  userController.getMe,
  userController.updateMe
);

router.delete(
  '/deleteMe',
  authController.protect,
  userController.getMe,
  userController.deleteMe
);

router.route('/').get(userController.getAllUsers);

router.route('/:userId').get(authController.protect, userController.getUser);

router.param('userId', userController.userByID);

module.exports = router;
