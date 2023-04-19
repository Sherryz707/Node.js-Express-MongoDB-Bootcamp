const express = require('express');
const userController = require('./../controller/userHandler');

const router = express.Router();

router
  .route('/users')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser);

module.exports = router;
