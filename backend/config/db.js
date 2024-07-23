const mongoose = require('mongoose');

const connectDB = async() => {
    mongoose.connect(process.env.MONGO_URI, {
        ssl: true,
      })
    .then(() => console.log('MongoDB Connected'.blue))
    .catch(err => console.log(err));
}

module.exports = connectDB;