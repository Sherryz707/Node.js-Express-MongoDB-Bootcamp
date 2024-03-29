const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    //   const newTour = new Tour({});
    //   newTour.save();
    const doc = await Model.create(req.body); //returns a promise. doc is a document
    //Tour.create({}); //Create on model itself.Returns promise.in method number 1 we save in the new document
    res.status(201).json({
      status: 'success',
      data: {
        doc
      }
    });
  });
exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true //this returns the new modified doc document and not the original
    }); //called id since in doc routes we name it id
    //shorthand for this : doc.findOne({__id: req.params.id})
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    // let query = await Model.findById(req.params.id);
    let query;
    if (popOptions) {
      query = await Model.findById(req.params.id).populate(popOptions);
    } else {
      query = await Model.findById(req.params.id);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError('No tour found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) {
      filter = { tour: req.params.tourId };
    }
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc
      }
    });
  });
// exports.getOne = Model =>
//   catchAsync(async (req, res, next) => {
//     const tour = await Model.findById(req.params.id).populate({
//       path: 'reviews'
//     }); //called id since in tour routes we name it id
//     //shorthand for this : Tour.findOne({__id: req.params.id})
//     if (!tour) {
//       return next(new AppError('No tour found with that ID', 404));
//     }
//     res.status(200).json({
//       status: 'success',
//       data: {
//         tour
//       }
//     });
//   });
