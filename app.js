const express = require('express');
const morgan = require('morgan');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const globalErrorHandler = require('./controller/errorHandler');
const AppError = require('./utils/appError');
const viewRouter = require('./routes/viewRoutes');

const app = express(); //this is a router on which we have our routes
app.use(helmet({ contentSecurityPolicy: false }));
// app.use(helmet());
// app.use(
//   helmet({
//     contentSecurityPolicy: {
//       useDefaults: true,
//       directives: {
//         'script-src': ["'self'", 'https://cdnjs.cloudflare.com/']
//       }
//     }
//   })
// );

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public'))); //serving static files from folders and not from routes. in url we don't need to write public, since when it can't find route for overview.html, it searches in public ad sets is as root
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// sanitize
app.use(mongoSanitize());
// xss
app.use(xss());

// param poll
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
//using middleware for request body
//middlewares can modify req,res obj. Mostly used for request
app.use(express.json({ limit: '10kb' })); //parse data from body and can also llimit how much data is sent in body
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
//creating our own middle ware
//this one applies to each and every request since we don't apply any route unlike in route handlers
app.use((req, res, next) => {
  console.log('Hello from the middleware bro');
  // console.log(req.cookies.jwt,res.cookies);
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

app.use('/', viewRouter);

app.use('/api/v1/tours', tourRouter); //tourRouter is the middleware we want to apply on specific url
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on server`);
  // err.statusCode = 404;
  // next(err);
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
