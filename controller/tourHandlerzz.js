// eslint-disable-next-line no-unused-vars
const Tour = require('./../models/tourModel');
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// ); //getting data of tours.json(JSON object) using top-level code
//JSON.parse -> JS object array

// exports.checkID = (req, res, next, val) => {
//   if (req.params.id * 1 > tours.length - 1) {
//     return res.status(404).json({
//       //cannot send two responses sp be sure to return res so only one resp is sent
//       status: 'fail',
//       message: 'invalid ID'
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Bro who gon add the name or price?'
//     });
//   }
//   next();
// };
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
  });
  // //requestTime taken from middleware in app.js
  // console.log(`Req time: ${req.requestTime}`);
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   reqTime: req.requestTime,
  //   data: {
  //     tours: tours
  //   }
  // });
};
exports.createTour = (req, res) => {
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour
    // }
  });
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   err => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour
  //       }
  //     });
  //   }
  // );
  //console.log(req.body); checking middleware
  //res.send("Done"); cannot set set headers after they're sent to the client: cannot send two responses.
};
exports.getTour = (req, res) => {
  //console.log(req.params);
  // eslint-disable-next-line no-unused-vars
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour
  //   }
  // });
};
exports.updateTour = (req, res) => {
  r res.status(200).json({
    status: 'success'
  });
};
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null
  });
};
