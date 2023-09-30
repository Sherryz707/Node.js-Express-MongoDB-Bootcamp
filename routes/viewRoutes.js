const express = require('express');

const authController = require('./../controller/authController');

const viewController = require('./../controller/viewController');
const bookingController = require('./../controller/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);
router.get('/tour/:title', authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.login);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);
module.exports = router;

// pug
// mixins: resuable pcs of code that we can pass arguments into like functions
