/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const app = require('./../../app');

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
  });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
      console.log('IMport success');
      process.exit();
  } catch (err) {
    console.log(err);
  }
};
//Delete all data from collection/DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
      console.log('Data deleted success');
      process.exit();
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

//in terminal
//node dev-data/data/import-dev-data.js --import
//this adds import in the arg array which we will usse:
if (process.argv[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}







// const fs = require('fs');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Tour = require('./../../models/tourModel');

// dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   })
//   .then(() => console.log('DB connection successful!'));

// // READ JSON FILE
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
// );

// // IMPORT DATA INTO DB
// const importData = async () => {
//   try {
//     await Tour.create(tours);
//     console.log('Data successfully loaded!');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await Tour.deleteMany();
//     console.log('Data successfully deleted!');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

// if (process.argv[2] === '--import') {
//   importData();
// } else if (process.argv[2] === '--delete') {
//   deleteData();
// }
