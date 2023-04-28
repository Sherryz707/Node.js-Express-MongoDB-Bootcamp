const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');
// exports.aliasTopTours = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    // creating API features Obj
    // eslint-disable-next-line no-unused-vars

    // console.log(req.query);
    // const tour = await Tour.find(); //retunrs  a js array of all items;
    //build the query
    //1)Filtering
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach(el => delete queryObj[el]);

    //2)Advanced Filtering
    // let queryStr = JSON.stringify(queryObj);

    // queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, match => `$${match}`); //=> $gt
    // console.log(queryStr);
    // console.log(JSON.parse(queryStr));
    // let query = Tour.find(JSON.parse(queryStr));

    //3)Sorting
    // if (req.query.sort) {
    //   const sortBy = req.query.sort.split(',').join();
    //   query = query.sort(sortBy);
    // } else {
    //   query = query.sort('-createdAt');
    // }

    //4)limiting fields
    // if (req.query.fields) {
    //   const fields = req.query.fields.split(',').join(' ');
    //   console.log(fields);
    //   query = query.select(fields);
    // } else {
    //   query = query.select('-__v');
    // }
    //5)pagination
    // const page = req.query.page * 1 || 1;
    // const limit = req.query.limit * 1 || 100;
    // const skip = (page - 1) * limit;

    // query = query.skip(skip).limit(limit);

    // if (req.query.page) { no need to throw error
    //   const numTour = await Tour.countDocuments();
    //   if (skip >= numTour) {
    //     throw new Error("This page doesn't exist");
    //   }
    // }

    //Execute query
    // const tour = await query;
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tour = await features.query;

    res.status(200).json({
      status: 'success',
      results: tour.length,
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${err}`
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    //   const newTour = new Tour({});
    //   newTour.save();
    const newTour = await Tour.create(req.body); //returns a promise. newTour is a document
    //Tour.create({}); //Create on model itself.Returns promise.in method number 1 we save in the new document
    res.status(201).json({
      status: 'success',
      data: {
        newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      //400:bad request
      status: 'fail',
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id); //called id since in tour routes we name it id
    //shorthand for this : Tour.findOne({__id: req.params.id})

    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${err}`
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true //this returns the new modified tour document and not the original
    }); //called id since in tour routes we name it id
    //shorthand for this : Tour.findOne({__id: req.params.id})
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${err}`
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `error: ${err}`
    });
  }
};
