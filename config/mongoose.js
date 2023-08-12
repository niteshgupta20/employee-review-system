const mongoose = require('mongoose');
require('dotenv').config();

// TO CONNECT WITH MONGODB DATABASE
mongoose.connect(process.env.DB_URI);

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
