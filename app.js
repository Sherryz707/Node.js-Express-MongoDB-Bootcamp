const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controller/errorHandler');

const app = express(); //this is a router on which we have our routes

//using middleware for request body
//middlewares can modify req,res obj. Mostly used for request
app.use(express.json()); //parse data from body

//creating our own middle ware
//this one applies to each and every request since we don't apply any route unlike in route handlers
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log('Hello from the middleware bro');
  next(); //without it req/res cycle will be stuck.
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//THIRD-PARTY

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); //return a short summary of req, status code, time taken etc. format depends on 'dev'
}
app.use(express.static(`${__dirname}/public`)); //serving static files from folders and not from routes. in url we don't need to write public, since when it can't find route for overview.html, it searches in public ad sets is as root

//route handlers: middleware function only executed for certain routes
//USER HANDLERS

// //GET
//     //getting data of tours.json(JSON object) using top-level code
//     //JSON.parse -> JS object array
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//     //resource -> tours
// app.get("/api/v1/tours",getAllTours);

// //POST: send data from client to server. available on req.
//     //express foes not give req body. we need middleware -> express.json()
//     //save data in file
//     //201->created
// app.post("/api/v1/tours",createTour);

// //Params:Have tp specify as many var in url unless we do this: /:y?
// app.get("/api/v1/tours/:id",getTour);

// app.patch("/api/v1/tours/:id",updateTour)

// //status is 204 meaning we aren't sending any content so data is null
// app.delete("/api/v1/tours/:id",deleteTour);

//REFACTOR no.2==================================================================================================================================

//ROUTES

//const tourRouter = express.Router(); //this is a middleware
//this creates a sub-application for each resource
//mounting a new router on a route
//const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter); //tourRouter is the middleware we want to apply on specific url
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on server`);
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);
module.exports = app;
