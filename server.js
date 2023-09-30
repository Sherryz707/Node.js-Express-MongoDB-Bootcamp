const dotenv = require('dotenv');
// SYNC ERROR
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception..Shutting down.....');
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

//app must be later so config file is initialized and can be read in app.js
const app = require('./app');

//console.log(process.env.NODE_ENV);
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(connectionObj => {
    console.log(`connection: ${connectionObj.connection}`);
  })
  .catch(error => {
    console.log(`Error occured: ${error}`);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, '127.0.0.1', () => {
  console.log(port)
  //console.log('App runnning......');
});

// ASYNC ERRORS: handling uncaught promise rejection: eg-> wrong db pass
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection..Shutting down.....');
  server.close(() => {
    process.exit(1);
    //  although ideally we'd like to restart the node app and not shut it down
  });
  // process.exit(1);
  // 0->success, 1->unchaught error
  // issue with process.exit -> aborts all req
  // sol: shut down server and then shut down everything. we give time to server first finish pending requests and then shut down gracefully
});
