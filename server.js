const dotenv = require('dotenv');

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
app.listen(port, '127.0.0.1', () => {
  //console.log('App runnning......');
});
















