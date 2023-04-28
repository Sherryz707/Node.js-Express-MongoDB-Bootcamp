const express = require('express');

const tourController = require('./../controller/tourHandler');

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
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router
  .route('/')
  .get(tourController.getAllTours)
  //chaining multiple middlewares. Executed in order
  //.post(tourController.checkBody, tourController.createTour);
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
