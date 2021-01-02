// const mongoose = require('mongoose');

// async function connect() {
//     try {
//         await mongoose.connect('mongodb://localhost:27017/hust_education', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//         });
//         console.log('Connect successfully!!!');
//     } catch (error) {
//         console.log('Connect failure!!!');
//     }
// }

// module.exports = { connect };
const {
    PORT,
  
    MONGO_HOST,
    MONGO_PORT,
    MONGO_DATABASE,
    MONGO_USERNAME,
    MONGO_PASSWORD,
  
    JWT_SECRET_KEY,
    JWT_EXPIRES_TIME,
  } = process.env;
  
  const { A_WEEK } = require('../app/constants');
  
  module.exports = {
    PORT: PORT || 3000,
    MONGO_URI: `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`,
    JWT_SECRET_KEY,
    JWT_EXPIRES_TIME: parseInt(JWT_EXPIRES_TIME, 10) || A_WEEK,
  };