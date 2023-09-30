const express = require('express');

const tourController = require('./../controller/tourHandler');

const reviewRouter = require('./../routes/reviewRoutes');
const authController = require('./../controller/authController');

const router = express.Router();
//const {getAllTours,...}=require(...)

//parameter middleware: run middleware for specific paramters eg id
// router.param("id",(req,res,next,val)=>{
//     console.log(`middleWare bro! Tour id is : ${val}`);
//     next();
// })
//router.param('id', tourController.checkID);
// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router.use('/:tourId/reviews', reviewRouter);
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/top-5-cheap')
  //could have added catchAsync(tourController.aliasTopTours) only here and not in controllers
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.uploadTourImages,
    tourController.resizeTourImages,
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
