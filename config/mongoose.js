const mongoose = require('mongoose');

// TO CONNECT WITH MONGODB DATABASE
mongoose.connect('mongodb://127.0.0.1:27017/ers');

// get the connection instance
const db = mongoose.connection;

// open --> eventName
db.on('open', function listener() {
  console.log('MongoDB connected Successfully');
});

// error --> eventName
db.on('error', function listener(err) {
  console.error('Error in connecting MongoDb ', err);
});

module.exports = db;
