const mongoose = require('mongoose');

//creating schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'a tour must have a name'],
    unique: true,
    trim: true
  },
  rating: {
    type: Number,
    required: [false, 'A tour requires a rating or it will default to 4.5'],
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price']
  },
  priceDiscount: Number, //doesn't require schema options
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    require: [true, 'A tour must have a group size']
  },
  summary: {
    type: String,
    trim: true //removes all white space at beginning and end
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a description']
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a cover image'] //name of image. basically a reference will be stored in the database
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
});
//creating model out of schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;

//testing the model by creating document instance of it
// const testTour = new Tour({
//   name: "Disney Land",
//   rating: 4.7,
//   price: 497
// });
// testTour
//   .save()
//   .then(doc => {
//   console.log(doc);
// })
//   .catch(error => {
//   console.log(`Error has occured: ${error}`);
// })
